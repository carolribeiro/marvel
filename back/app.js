const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/config');

const app = express();

app.set('port', process.env.PORT || 8080);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/characters', require('./api/characters'));
app.use('/api/comics', require('./api/comics'));

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send(err.message);
});

app.listen(app.get('port'), 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening on port ' + app.get('port'));
});

module.exports = app;
