// Import Modules

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
const dotenv = require('dotenv');

// Set up Global configuration access
dotenv.config();

var app = express();

const route = require('./routes/route');
const { pipeline } = require('stream');

// Connect to mongo db
var uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.xzjwavi.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri);

// Test Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  if (err) {
    console.log('Error: ' + err);
  }
});

// Add Middleware - cors
app.use(cors());

// Body-parser
app.use(bodyparser.json());

// Static Files

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', route);

// Testing Server Status

app.get('/', (req, res) => {
  res.send('TrackMe');
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});
