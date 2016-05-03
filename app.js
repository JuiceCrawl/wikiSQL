//'use strict';

var logger = require('morgan');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes/index.js');
var swig = require('swig');

var models = require('./models');

// ... other stuff

models.User.sync({})
.then(function () {
    return models.Page.sync({});
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);


// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});


app.use(logger('tiny'));

app.use('/', routes);

