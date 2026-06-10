const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const transporter = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

exports.submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  try {
    const contact = await Contact.create(req.body);
    if (process.env.SMTP_USER) {
      const t = transporter();
      t.sendMail({
        from: `"MBPSS Website" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
        subject: `New Contact Message — ${req.body.name}`,
        html: `<h2>New Contact Message</h2><p><b>Name:</b> ${req.body.name}</p><p><b>Email:</b> ${req.body.email}</p><p><b>Phone:</b> ${req.body.phone||'N/A'}</p><p><b>Service:</b> ${req.body.service||'N/A'}</p><p><b>Message:</b> ${req.body.message}</p>`,
      }).catch(console.error);
      t.sendMail({
        from: `"MBPSS Property Solutions" <${process.env.SMTP_USER}>`,
        to: req.body.email,
        subject: 'Thanks for contacting MBPSS',
        html: `<h2>Hi ${req.body.name},</h2><p>Thank you for getting in touch. We will respond within 2 hours.</p><p>Call us on +44 7540 387542</p><p>MBPSS Property Solutions</p>`,
      }).catch(console.error);
    }
    res.status(201).json({ success: true, id: contact._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

exports.getAllContacts = async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = status ? { status } : {};
  const [contacts, total] = await Promise.all([
    Contact.find(filter).sort({ createdAt: -1 }).skip((page-1)*limit).limit(Number(limit)),
    Contact.countDocuments(filter),
  ]);
  res.json({ contacts, total, page: Number(page), pages: Math.ceil(total/limit) });
};

exports.getContact = async (req, res) => {
  const c = await Contact.findById(req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  if (c.status === 'new') { c.status = 'read'; await c.save(); }
  res.json(c);
};

exports.updateContact = async (req, res) => {
  const c = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
};

exports.deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
