const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();
//middleware
app.use(
  helmet(/* {
    contentSecurityPolicy: false,
  } */)
);
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concerts routes to server
app.use('/api', seatsRoutes); // add seats routes to server

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

// connects our backend code with the database
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.ui4tv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
} else if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost:27017/NewWaveDBtest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} else {
  mongoose.connect('mongodb://localhost:27017/NewWaveDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('New socket');
  socket.on('seatsUpdated', (seats) => {
    socket.broadcast('seatsUpdated', seats);
  });
});

module.exports = server;
