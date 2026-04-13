const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const imageCtrl = require('../controllers/imageController');
const pdfCtrl = require('../controllers/pdfController');

// Image Studio Route
router.post('/image-convert', upload.single('image'), imageCtrl.convertImage);

// PDF Master Route (upload.array allows multiple files)
router.post('/pdf-merge', upload.array('pdfs', 10), pdfCtrl.mergePDFs);

module.exports = router;