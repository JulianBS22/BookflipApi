var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var logger = require('morgan');
const cors = require('cors');
require('./lib/conectmongoose');
const User = require('./models/users.js')
const bcrypt = require('bcryptjs');
const { createSecretKey } = require('crypto');
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = '834jnadndKSDNAD9494aamDASD#@#~#'

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = "BookflipApi";

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  credentials:true,
  origin:'http://localhost:3000',
}));

/**
 * Rutas del Api
 */
app.use('/api/adverts', require ('./routes/api/adverts'));

/**
 * Rutas del Website
 */

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.post('/register', async (req,res) =>{
  const {username,email,password} = req.body;
  try {
    const userDoc = await User.create({
    username,
    email,
    password:bcrypt.hashSync(password, bcryptSalt)
  });
  res.json(userDoc);
  } catch (error) {
    res.status(422).json(error)
  }
  
});

app.post('/login', async (req, res) => {
  const {email, password} = req.body
  const userDoc = await User.findOne({email})
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk) {
      jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {},(err, token)=>{
        if (err) throw err;
        res.cookie('token',token).json(userDoc)
      })
      
    }
    else {
      res.status(422).json (' pass failed')
    }
  }
  else {
    res.json('Not found')
  }
})
app.get('/profile', (req, res) => {
  const  {token} = req.cookies;
  res.json ({token});
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  //comprobar si es error de validación
  if (err.array) {
    const errorInfo = err.error[0];
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }
  res.status(err.status || 500);
  //si lo que ha fallado es una peticion al API, devuelvo el error en json
  if (req.originalUrl.startsWith('/api/'))
    res.json({ error:err.message});
    return;

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  
  res.render('error');
});


module.exports = app;
