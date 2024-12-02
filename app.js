var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var authorRouter = require('./routes/authorRoutes'); 
var userRouter = require('./routes/userRoutes'); 
var bookRouter = require('./routes/bookRoutes'); 

var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/authors', authorRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/books', bookRouter);

 mongoose.connect('mongodb+srv://annvps41218:2692005@cluster0.olub1.mongodb.net/hihi')
    .then(() => console.log('Kết nối MongoDB thành công'))
    .catch((err) => console.error('Lỗi kết nối MongoDB:', err));





app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
