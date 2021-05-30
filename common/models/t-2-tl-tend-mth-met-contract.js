'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2tltrendmthmetcontract) {
  T2tltrendmthmetcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        var formatedJson = {};
        var ITD_COLOR = "#00CFF4";
        var YTD_COLOR = "#A2D603";
        var FCPC_COLOR = "#FFDD3E";
        var CQ_COLOR = "#FC9D9A";
        var AP_COLOR = "#26D181";
        var FCAP_COLOR = "#FF3CA0";
        var CQAP_COLOR = "#4178BE";
        var CSTOVRN_COLOR = "#8439CA";

        try {
          formatedJson = {
          "ITD_LABEL": "ItD to PC",
          "ITD_COLOR": ITD_COLOR,
          "YTD_LABEL": "YtD to PC",
          "YTD_COLOR": YTD_COLOR,
          "FCPC_LABEL": "FC EaC to PC",
          "FCPC_COLOR": FCPC_COLOR,
          "CQ_LABEL": "CQ to PC",
          "CQ_COLOR": CQ_COLOR,
          "AP_LABEL": "AP to PC",
          "AP_COLOR": AP_COLOR,
          "FCAP_LABEL": "FC EaC to AP",
          "FCAP_COLOR": FCAP_COLOR,
/*
          "CQAP_LABEL": "CQ to AP",
          "CQAP_COLOR": CQAP_COLOR,
          "CSTOVRN_LABEL": "3 Mo. Cost Overrun",
          "CSTOVRN_COLOR": CSTOVRN_COLOR,
*/          
          "ITD": [],
          "YTD": [],
          "FCPC": [],
          "CQ": [],
          "AP": [],
          "FCAP": []
/*          ,
          "CQAP": [],
          "CSTOVRN": []
*/          
        };

            for (var i = 0; i < message.length; i++) {
              formatedJson.ITD.push({
				"id":i+1,
                "label": "ItD to PC",
                "color": ITD_COLOR,
                "value": "ITD_TO_PC",
                "date": message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
                "percent": calcs.formatPercentage100(message[i].ITD_TO_PC_PCT),
                "amount": calcs.calcValue(message[i].ITD_TO_PC_LKG)
              });

              formatedJson.YTD.push({
				"id":i+1,
                "label": "YtD to PC",
                "color": YTD_COLOR,
                "value": "YTD_TO_PC",  
                "date": message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
                "percent": calcs.formatPercentage100(message[i].YTD_TO_PC_PCT),
                "amount": calcs.calcValue(message[i].YTD_TO_PC_LKG)
              });

              formatedJson.FCPC.push({
				"id":i+1,
                "label": "FC EaC to PC",
                "color": FCPC_COLOR,
                "value": "FC_EAC_TO_PC", 
                "date": message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
                "percent": calcs.formatPercentage100(message[i].FC_TO_PC_PCT),
                "amount": calcs.calcValue(message[i].FRCST_TO_PC_LKG)
              });

              formatedJson.CQ.push({
				"id":i+1,
                "label": "CQ to PC",
                "color": CQ_COLOR,
                "value": "CQ_TO_PC",
                "date": message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
                "percent": calcs.formatPercentage100(message[i].CQ_TO_PC_PCT),
                "amount": calcs.calcValue(message[i].CQ_TO_PC_LKG)
              });

              formatedJson.AP.push({
				"id":i+1,
                "label": "AP to PC",
                "color": AP_COLOR,
                "value": "AP_TO_PC",
                "date": message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
                "percent": calcs.formatPercentage100(message[i].AP_TO_PC_PCT),
                "amount": calcs.calcValue(message[i].AP_TO_PC_LKG)
              });

              formatedJson.FCAP.push({
				"id":i+1,
                "label": "FC EaC to AP",
                "color": FCAP_COLOR,
                "value": "FC_EAC_TO_AP",
                "date": message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
                "percent": calcs.formatPercentage100(message[i].FC_TO_AP_PCT),
                "amount": calcs.calcValue(message[i].FC_TO_AP_LKG)
              });
/*
              formatedJson.CQAP.push({
				"id":i+1,
                "label": "CQ to AP",
                "color": CQAP_COLOR,
                "value": "CQ_TO_AP",
                "date": message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
                "percent": calcs.formatPercentage100(message[i].CQ_TO_AP_PCT),
                "amount": calcs.calcValue(message[i].CQ_TO_AP_LKG)
              });

              formatedJson.CSTOVRN.push({
				"id":i+1,
                "label": "3 Mo. Cost Overrun",
                "color": CSTOVRN_COLOR,
                "value": "COST_OVER",
                "date": message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
                "percent": calcs.formatPercentage100(message[i].COST_OVER_PCT),
                "amount": calcs.calcValue(message[i].COST_OVER)
              });
*/              
            };
          } catch (e) {
            formatedJson = {msg: e.message};
          }

    cb(err, formatedJson);
  });
};

T2tltrendmthmetcontract.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2TLTrendMthMetContract', type: 'object'}
  });

};
