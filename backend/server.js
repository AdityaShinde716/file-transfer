const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.js');
const fileRoutes = require('./routes/file.js');
const cors = require('cors');
const error = require('./middlewares/error.js');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",//you should give your port
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

app.use('/uploads', express.static('uploads'));

app.set('socketio', io);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })//you need to give your own mongodb database connection string
  .then(() => console.log('Database has been connected'))
  .catch(err => console.log(err));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });

  socket.on('transfer-file', (data) => {
    io.to(data.recipient).emit('receive-file', data);
  });
});

app.use(error);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));




