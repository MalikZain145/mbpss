const { validationResult } = require('express-validator');
const Quote = require('../models/Quote');
const nodemailer = require('nodemailer');

const transporter = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

exports.submitQuote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  try {
    const quote = await Quote.create(req.body);

    // Email notifications (non-blocking)
    if (process.env.SMTP_USER) {
      const t = transporter();
      const services = (req.body.selectedServices || []).join(', ');
      t.sendMail({
        from: `"MBPSS Website" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
        subject: `New Quote Request — ${req.body.name} (${req.body.postcode || ''})`,
        html: `<h2>New Quote Request</h2><p><b>Name:</b> ${req.body.name}</p><p><b>Email:</b> ${req.body.email}</p><p><b>Phone:</b> ${req.body.phone}</p><p><b>Services:</b> ${services}</p><p><b>Property:</b> ${req.body.propertyType || ''}, ${req.body.postcode || ''}</p><p><b>Notes:</b> ${req.body.notes || 'None'}</p>`,
      }).catch(console.error);
      t.sendMail({
        from: `"MBPSS Property Solutions" <${process.env.SMTP_USER}>`,
        to: req.body.email,
        subject: 'Your Quote Request — MBPSS Property Solutions',
        html: `<h2>Hi ${req.body.name},</h2><p>Thank you for your quote request. We will be in touch within 2 hours with a personalised quote.</p><p><b>Services requested:</b> ${services}</p><p>Call us anytime on +44 7540 387542</p><p>MBPSS Property Solutions</p>`,
      }).catch(console.error);
    }

    res.status(201).json({ success: true, id: quote._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit quote request' });
  }
};

// Admin routes
exports.getAllQuotes = async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = status ? { status } : {};
  const [quotes, total] = await Promise.all([
    Quote.find(filter).sort({ createdAt: -1 }).skip((page-1)*limit).limit(Number(limit)),
    Quote.countDocuments(filter),
  ]);
  res.json({ quotes, total, page: Number(page), pages: Math.ceil(total/limit) });
};

exports.getQuote = async (req, res) => {
  const q = await Quote.findById(req.params.id);
  if (!q) return res.status(404).json({ error: 'Not found' });
  if (q.status === 'new') { q.status = 'read'; await q.save(); }
  res.json(q);
};

exports.updateQuote = async (req, res) => {
  const q = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!q) return res.status(404).json({ error: 'Not found' });
  res.json(q);
};

exports.deleteQuote = async (req, res) => {
  await Quote.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

exports.getQuoteStats = async (req, res) => {
  const [total, newCount, responded] = await Promise.all([
    Quote.countDocuments(),
    Quote.countDocuments({ status: 'new' }),
    Quote.countDocuments({ status: 'responded' }),
  ]);
  // Last 30 days grouped by day
  const thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000);
  const daily = await Quote.aggregate([
    { $match: { createdAt: { $gte: thirtyDaysAgo } } },
    { $group: { _id: { $dateToString: { format:'%Y-%m-%d', date:'$createdAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  // Services breakdown
  const serviceBreakdown = await Quote.aggregate([
    { $unwind: '$selectedServices' },
    { $group: { _id: '$selectedServices', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);
  res.json({ total, newCount, responded, daily, serviceBreakdown });
};
