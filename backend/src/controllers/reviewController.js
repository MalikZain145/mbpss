const { validationResult } = require('express-validator');
const Review = require('../models/Review');
let Sentiment;
try { Sentiment = require('sentiment'); } catch { Sentiment = null; }

const analyzeSentiment = (text) => {
  if (!Sentiment) return { label: 'neutral', score: 0 };
  const s = new Sentiment();
  const result = s.analyze(text);
  const score = result.comparative;
  const label = score > 0.2 ? 'positive' : score < -0.2 ? 'negative' : 'neutral';
  return { label, score: parseFloat(score.toFixed(3)) };
};

// Public: submit review (pending approval)
exports.submitReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  try {
    const { label, score } = analyzeSentiment(req.body.text);
    const review = await Review.create({
      ...req.body,
      approved: false,
      sentiment: label,
      sentimentScore: score,
    });
    res.status(201).json({ success: true, message: 'Review submitted and pending approval.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
};

// Public: get approved reviews
exports.getApprovedReviews = async (req, res) => {
  const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 }).limit(50);
  const total = await Review.countDocuments({ approved: true });
  const avg = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : 0;
  res.json({ reviews, total, averageRating: Number(avg) });
};

// Admin: get all reviews
exports.getAllReviews = async (req, res) => {
  const { approved, page = 1, limit = 20 } = req.query;
  const filter = approved !== undefined ? { approved: approved === 'true' } : {};
  const [reviews, total] = await Promise.all([
    Review.find(filter).sort({ createdAt: -1 }).skip((page-1)*limit).limit(Number(limit)),
    Review.countDocuments(filter),
  ]);
  res.json({ reviews, total });
};

// Admin: approve review
exports.approveReview = async (req, res) => {
  const r = await Review.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  if (!r) return res.status(404).json({ error: 'Not found' });
  res.json(r);
};

// Admin: reject/delete
exports.deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

// Admin: update review
exports.updateReview = async (req, res) => {
  const r = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!r) return res.status(404).json({ error: 'Not found' });
  res.json(r);
};

// Admin: sentiment analytics
exports.getSentimentAnalytics = async (req, res) => {
  const [sentimentBreakdown, ratingDist, recentTrend, total] = await Promise.all([
    Review.aggregate([
      { $match: { approved: true } },
      { $group: { _id: '$sentiment', count: { $sum: 1 } } },
    ]),
    Review.aggregate([
      { $match: { approved: true } },
      { $group: { _id: '$rating', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]),
    Review.aggregate([
      { $match: { approved: true, createdAt: { $gte: new Date(Date.now() - 90*24*60*60*1000) } } },
      { $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        count: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        avgSentiment: { $avg: '$sentimentScore' },
      }},
      { $sort: { _id: 1 } },
    ]),
    Review.countDocuments({ approved: true }),
  ]);

  const approved = await Review.find({ approved: true });
  const avgRating = approved.length
    ? (approved.reduce((a,r) => a+r.rating,0) / approved.length).toFixed(1)
    : 0;

  const pending = await Review.countDocuments({ approved: false });

  res.json({ sentimentBreakdown, ratingDist, recentTrend, total, avgRating: Number(avgRating), pending });
};
