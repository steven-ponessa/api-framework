'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2gpleaktrendqtrmetcontract) {
  T2gpleaktrendqtrmetcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        var formatedJson = {};
        
        try {
          formatedJson = {
            "TREND_MESSAGE" : "Historical data is calculated using current business rules; values may vary from previously published excel Actuals reports",
/*            "ITD_LABEL":"ItD to PC",
            "ITD_COLOR":"#005D5D",
            "YTD_LABEL":"YtD to PC",
            "YTD_COLOR":"#FF832B", 
*/
            "CQ_LABEL":"CQ to PC",
            "CQ_COLOR":"#0043CE",
            //"ITD": [],
            //"YTD": [],
            "CQ": []
            }

            for (var i = 0; i < message.length; i++) {
/*
              formatedJson.ITD.push({
				      "id":i+1,
                "label": "ItD to PC",
                "color": "#005D5D",
                "value": "ITD_TO_PC",
                "date": message[i].QTR_KEY_CD.slice(4, 6) + ' ' + message[i].QTR_KEY_CD.slice(0, 4),
                "percent": calcs.formatPercentage100(message[i].ITD_TO_PC_PCT),
                "amount": calcs.calcValue(message[i].ITD_TO_PC_LKG)
				
				});

              formatedJson.YTD.push({
				      "id":i+1,
                "label": "YtD to PC",
                "color": "#FF832B",
                "value": "YTD_TO_PC",  
                "date": message[i].QTR_KEY_CD.slice(4, 6) + ' ' + message[i].QTR_KEY_CD.slice(0, 4),
                "percent": calcs.formatPercentage100(message[i].YTD_TO_PC_PCT),
                "amount": calcs.calcValue(message[i].YTD_TO_PC_LKG)
				
				});
*/
              if (message[i].QTR_KEY_CD != '2018Q2') {
                  formatedJson.CQ.push({
                  "id":i+1,
                    "label": "CQ to PC",
                    "color": "#0043CE",
                    "value": "CQ_TO_PC",
                    "date": message[i].QTR_KEY_CD.slice(4, 6) + ' ' + message[i].QTR_KEY_CD.slice(0, 4),
                    "percent": calcs.formatPercentage100(message[i].CQ_TO_PC_PCT),
                    "amount": calcs.calcValue(message[i].CQ_TO_PC_LKG)
                  });
                }; //end if not 2018Q2, temp fix

            };
          } catch (e) {
            formatedJson = {msg: e.message};
          }

    cb(err, formatedJson);
  });
};

T2gpleaktrendqtrmetcontract.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2GPLeakTrendQtrMetContract', type: 'object'}
  });

};
