const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true });

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, default: 'pdf' },
  uploader: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  institution: { type: String },
  tags: [{ type: String }],
  aiSummary: { type: String, default: 'AI summary will be generated soon...' },
  views: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
  isPremium: { type: Boolean, default: false },
  reviews: [reviewSchema],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
