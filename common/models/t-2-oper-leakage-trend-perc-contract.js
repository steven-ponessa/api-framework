'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2operleakagetrendperccontract) {
    T2operleakagetrendperccontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        var precentDecimal = 1;

        var formatedJson = {
          "PC_LEAKAG_LABEL":"AP to PC",
          "PC_LEAKAG_COLOR":"#34D084",
          "FC_LABEL":"FC EaC to AP",
          "FC_LEAKAG_COLOR":"#C6D0DC",
          "PC_LEAKAG": [],
          "FC_LEAKAG": []
          }

          try {
            for (var i = 0; i < message.length; i++) {
              formatedJson.PC_LEAKAG.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
              "value":calcs.calcPercent(message[i].AP_TO_PC_LKG,message[i].PC_PLAN_REV_A,1)});
              formatedJson.FC_LEAKAG.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
              "value":calcs.calcPercent(message[i].FC_TO_AP_LKG,message[i].PC_PLAN_REV_A,1)});
            };

          } catch(e) {
            formatedJson = {msg: e.message};
          }

      cb(err, formatedJson);
  });
};

T2operleakagetrendperccontract.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2OperLeakageTrendPercContract', type: 'object'}
  });

};
