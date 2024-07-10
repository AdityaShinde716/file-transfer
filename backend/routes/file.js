const express = require('express');
const { uploadFile, handleFileUpload } = require('../controllers/fileController.js');
const auth = require('../middlewares/auth.js');

const router = express.Router();

router.post('/upload', auth, uploadFile, handleFileUpload);

module.exports = router;



