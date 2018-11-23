'use strict';

var express = require('express');
var cors = require('cors');


// require and use "multer"...
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage}).single('upfile');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// file upload
app.post('/api/fileanalyse', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.send('There was an error with Multer when uploading');
    } else if (err) {
      res.send('Unknown error occured when uploading');
    }

    res.send({name: req.file.originalname, type: req.file.mimetype, size: req.file.size});
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
