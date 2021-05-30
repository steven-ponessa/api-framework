'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var fs = require("fs")
var https = require('https');
var http = require('http');
var cors = require('cors');

//SP Adds
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var util = require('util');
var secret = 'yourSuperSecretPassword';
var request = require("request");
//end SP Adds

const dotenv = require('dotenv');
dotenv.config();

var app = module.exports = loopback();

console.log('process.env.PORT :: ' + process.env.PORT);

app.startSecureServer = function () {
  console.log('===> app.startSecureServer()');
  // start the web server
  var privateKey = fs.readFileSync('./server/.security/server.key', 'utf8');
  var certificate = fs.readFileSync('./server/.security/server.crt', 'utf8');
  var credentials = {
    key: privateKey, cert: certificate,
    /*passphrase: '****',*/
    requestCert: false,
    rejectUnauthorized: false
  };

  app.use(cors());
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  var httpsServer = https.createServer(credentials, app);

  return httpsServer.listen(securePort, function () {
    //console.log('Web server listening on port: %s',securePort );
  });

  /*
    return app.listen(function() {
      app.emit('started');
      var baseUrl = app.get('url').replace(/\/$/, '');
      console.log('Web server listening at: %s', baseUrl);
      if (app.get('loopback-component-explorer')) {
        var explorerPath = app.get('loopback-component-explorer').mountPath;
        console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
      }
    });*/

};


app.startInSecureServer = function () {

  console.log('===> app.startInSecureServer()-13');
  //sp add
  app.use(session({ resave: false, saveUninitialized: false, secret: "Niall rocks!" }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  //end sp add

  // start the web server
  app.use(cors());


  //sp add
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; /* Allows self signed certificates */
  console.log("#*%^#$ T&#&$: process.env="+JSON.stringify(process.env));
  console.log("#*%^#$ T&#&$: process.env.JDBC_HOST="+process.env.JDBC_HOST);

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  //##### auth.js not in this build.
  //app.use('/auth', require('./auth'));
  //end sp add

  app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] == 'http') {
      console.log('User using http->Redirecting to https ' + req.originalUrl);
      res.redirect(process.env.URL2 + req.originalUrl);
    } else {
      next();
    }
  });

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    //console.log(req);
    next();
  });

  var httpServer = http.createServer(app);
  return httpServer.listen(process.env.PORT, function () {
    console.log('Web server listening on port (httpServer, line server/server.js line 88): %s', process.env.PORT);
    /*
    var exec = require('child_process').exec;
    //var cmd = 'npm ls --json';
    var cmd = 'npm ls';
    exec(cmd, function (error, stdout, stderr) {
      //var treeObject = JSON.parse(stdout);
      console.log(stdout);
      //console.log("$$$$$$$$$ Start treeObject $$$$$$$$$");
      //console.log(JSON.stringify(treeObject));
      //console.log("$$$$$$$$$ End treeObject $$$$$$$$$");
    });
    */

  });

};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;
  console.log('boot app + __dirname: '+ __dirname);
  // start the server if `$ node server.js`
  if (require.main === module)
    //app.startSecureServer();
    console.log('boot app.startInSecureServer()');
    app.startInSecureServer();
});
