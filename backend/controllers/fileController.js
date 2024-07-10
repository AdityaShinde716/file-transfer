const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.uploadFile = upload.single('file');

exports.handleFileUpload = (req, res) => {
  try {
    const io = req.app.get('socketio');
    const filePath = `/uploads/${req.file.filename}`;
    io.emit('file-uploaded', { filePath, filename: req.file.originalname });
    res.json({ filePath });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed' });
  }
};

