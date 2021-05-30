'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2businessleakageexpansionexclusiontrendpercentagework) {
  T2businessleakageexpansionexclusiontrendpercentagework.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

        var precentDecimal = 1;

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
          };

          for (var i = 0; i < message.length; i++) {
            formatedJson.ITD.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
            "value":calcs.calcPercent(message[i].ITD_TO_PC_LKG,message[i].ITD_ACT_REV)});
            formatedJson.YTD.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
            "value":calcs.calcPercent(message[i].YTD_TO_PC_LKG,message[i].YTD_ACT_REV)});
            formatedJson.FRCST.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
            "value":calcs.calcPercent(message[i].FC_TO_PC_LKG,message[i].PC_PLAN_REV)});
            formatedJson.CQ.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
            "value":calcs.calcPercent(message[i].CQ_TO_PC_LKG,message[i].CQ_REV)});
          };
        } catch (e) {
          formatedJson = {"msg" : e.message}
        }

      cb(err, formatedJson);
  });
};

  T2businessleakageexpansionexclusiontrendpercentagework.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2businessleakageexpansionexclusiontrendpercentagework', type: 'object'}
  });

};
