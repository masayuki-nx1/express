//必要なライブラリをロードする
var createError = require('http-errors');     //HTTPエラーの対処を行うもの
var express = require('express');             //Express本体
var path = require('path');                   //ファイルパスを扱う
var cookieParser = require('cookie-parser');  //クッキーのパース(値の変換)
var logger = require('morgan');               //HTTPリクエストのログ出力に関する者

//ルート用のモジュールのロード
var indexRouter = require('./routes/index');    //index.js
var usersRouter = require('./routes/users');    //users.js
var helloRouter = require('./routes/hello');    //hello.jsを追加
var notesRouter = require('./routes/notes');
var catRouter = require('./routes/cat');        //cat.jsを追加
var qrcodeRouter = require('./routes/qrcode');  //qrcode.jsを追加
var dogRouter = require('./routes/dog');        //dog.jsを追加
//Expressオブジェクトの作成と基本設定
var app = express();

// view engine setup　テンプレートエンジンの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//関数の組み込み
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloRouter);
app.use('/notes',notesRouter);
app.use('/cat',catRouter);          //CatAPI
app.use('/qrcode',qrcodeRouter);    //QRCodeAPI
app.use('/dog',dogRouter);          //dogAPI   

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//module.Expressの設定　appオブジェクトを渡す
module.exports = app;
