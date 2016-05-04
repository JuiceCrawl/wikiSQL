'use strict';

var router = require('express').Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 



router.get('/', function(req, res){
  //res.redirect('/');
  Page.findAll({
  }).then(function(foundUrls){
    console.log(foundUrls);
    res.render('index', {urls: foundUrls});
  });
  // res.render('index');
});

router.post('/', function(req, res){

  var user = User.build({
    name: req.body.name,
    email: req.body.email
  });

  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    status: req.body.status
  });

  user.save()
  .then(function(){
    return page.save()
  })
  .then(function(savedPage){
      return savedPage.setAuthor(user);
    })
  .then(function(savedPage){
      res.redirect(savedPage.route);
    })
     
  // .then(function(){
  //   return user.save();
  // })
  // .then(function(data){
  //   res.redirect('/wiki');
  // })
  .catch(function(err){
    console.error(err);
  });

  

});

router.get('/add', function(req, res){
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next){
  Page.findAll({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    var locals = foundPage[0].dataValues;
    res.render('wikipage', locals);
  })
  .catch(next);
  //res.send('welcome to ' + req.params.urlTitle + '\'s page' );
});



module.exports = router;