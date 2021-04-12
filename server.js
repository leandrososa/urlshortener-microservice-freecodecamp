require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dns = require('dns');


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const shortenUrlSchema = new Schema({
  originalUrl:  String
});

let ShortenURL = mongoose.model('ShortenURL', shortenUrlSchema);

let lastId;

const createShortenURL = (url, done) => {
  let newURL = new ShortenURL({originalUrl: url});

  newURL.save(function(err, data){
    done(null, data)
  });
}

const retrieveShortenURL = (urlId, done) => {
  ShortenURL.findById(urlId, function(err, data){
    done(null, data);
  })
}

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl/new', (req,res) => {
  createShortenURL(req.body.url, function(){
    lastId = data._id;
    console.log(lastId)
  });
  res.json({})
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
