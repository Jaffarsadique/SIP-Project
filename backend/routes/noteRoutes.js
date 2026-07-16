const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Note = require('../models/Note');
const { protect } = require('../middleware/authMiddleware');

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|doc|docx|txt/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Documents only! (PDF, DOC, TXT)');
    }
  }
});

// @desc    Fetch all notes (with optional search/filtering)
// @route   GET /api/notes
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      title: { $regex: req.query.keyword, $options: 'i' }
    } : {};
    
    const subject = req.query.subject ? { subject: req.query.subject } : {};
    const notes = await Note.find({ ...keyword, ...subject }).populate('uploader', 'name email');
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Upload a new note
// @route   POST /api/notes
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const { title, description, subject, topic, institution, tags, isPremium } = req.body;
    
    const note = new Note({
      title,
      description,
      fileUrl: `/uploads/${req.file.filename}`,
      fileType: path.extname(req.file.originalname).replace('.', ''),
      uploader: req.user._id,
      subject,
      topic,
      institution,
      tags: tags ? JSON.parse(tags) : [],
      isPremium: isPremium || false,
      aiSummary: 'AI summary is being generated...' // Mock AI summary for MVP
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Fetch single note
// @route   GET /api/notes/:id
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('uploader', 'name');
    if (note) {
      note.views += 1;
      await note.save();
      res.json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create new review
// @route   POST /api/notes/:id/reviews
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const note = await Note.findById(req.params.id);

    if (note) {
      const alreadyReviewed = note.reviews.find(r => r.user.toString() === req.user._id.toString());
      if (alreadyReviewed) return res.status(400).json({ message: 'Note already reviewed' });

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
      };

      note.reviews.push(review);
      note.numReviews = note.reviews.length;
      note.rating = note.reviews.reduce((acc, item) => item.rating + acc, 0) / note.reviews.length;

      await note.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
