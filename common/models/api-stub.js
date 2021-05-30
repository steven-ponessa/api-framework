'use strict';
var request = require("request");
var fs = require("fs");

module.exports = function(Apistub) {

    Apistub.process = function(req, filter, cb) {
        var serviceNm = req.baseUrl.substring(5,req.baseUrl.length); //-1);
        var json = fs.readFileSync('./stubs/'+serviceNm+'.json').toString();
        cb(null, JSON.parse(json));
    }

};
