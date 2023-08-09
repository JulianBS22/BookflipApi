var express = require('express');
const Adverts = require('../models/adverts');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
   
    
    const adverts = await Adverts.find();
    res.locals.adverts= adverts;
      
    res.render('index');
  } 
  catch (err) {
    next (err);
  }
});

module.exports = router;
