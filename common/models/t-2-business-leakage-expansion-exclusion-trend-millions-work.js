'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2businessleakageexpansionexclusiontrendmillionswork) {
  T2businessleakageexpansionexclusiontrendmillionswork.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

        var formatedJson = {};

        try {
          formatedJson = {
            "ITD_LABEL":"ItD to PC",
            "ITD_COLOR":"#00CFF4",
            "YTD_LABEL":"YtD to PC",
            "YTD_COLOR":"#A2D603",
            "FRCST_LABEL":"FC EaC to PC",
            "FRCST_COLOR":"#FFDD3E",
            "CQ_LABEL":"CQ to PC",
            "CQ_COLOR":"#FC9D9A",
            "ITD": [],
            "YTD": [],
            "FRCST": [],
            "CQ": []
            }

            for (var i = 0; i < message.length; i++) {
              formatedJson.ITD.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
              "value":calcs.calcValue(message[i].ITD)});
              formatedJson.YTD.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
              "value":calcs.calcValue(message[i].YTD)});
              formatedJson.FRCST.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
              "value":calcs.calcValue(message[i].FRCST)});
              formatedJson.CQ.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
              "value":calcs.calcValue(message[i].CQ)});
            };
          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

    cb(err, formatedJson);
  });
};

  T2businessleakageexpansionexclusiontrendmillionswork.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2businessleakageexpansionexclusiontrendmillionswork', type: 'object'}
  });

};
