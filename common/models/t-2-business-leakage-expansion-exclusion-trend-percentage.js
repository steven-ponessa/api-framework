'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2businessleakageexpansionexclusiontrendpercentage) {
  T2businessleakageexpansionexclusiontrendpercentage.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

        var precentDecimal = 1;

        var formatedJson = {};

        try{

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
            "value":calcs.calcPercent(Number(message[i].ITD_TO_PC_LKG),Number(message[i].ITD_REV_CB_GOOD_PC))});
            formatedJson.YTD.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
            "value":calcs.calcPercent(Number(message[i].YTD_TO_PC_LKG),Number(message[i].YTD_ACT_REV))});
            formatedJson.FRCST.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
            "value":calcs.calcPercent(Number(message[i].FC_TO_PC_LKG),Number(message[i].PC_PLAN_REV_A))});
            formatedJson.CQ.push({"date":message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
            "value":calcs.calcPercent(Number(message[i].CQ_TO_PC_LKG),Number(message[i].CQ_REV))});
          };
        } catch (e) {
          formatedJson = {"msg" : e.message}
        }

      cb(err, formatedJson);
  });
};

  T2businessleakageexpansionexclusiontrendpercentage.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2businessleakageexpansionexclusiontrendpercentage', type: 'object'}
  });

};
