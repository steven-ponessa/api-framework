'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2tltrendqtrcontract) {
  T2tltrendqtrcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        var formatedJson = {};
        
		try {
        formatedJson = {
          "TREND_MESSAGE" : "Historical data is calculated using current business rules; values may vary from previously published excel Actuals reports",

          "CQ_LABEL": "CQ to AP",
          "CQ_COLOR": "#FE9D98",

          "CQ": []
        }

        for (var i = 0; i < message.length; i++) {

          if (message[i].QUARTER != '2018Q2') {
              formatedJson.CQ.push({
                "id":i+1,
                "label": "CQ to AP",
                "color": "#FE9D98",
                "value": "CQ_TO_AP",
                "date": message[i].QUARTER.slice(4, 6) + ' ' + message[i].QUARTER.slice(0, 4),
                "percent": calcs.formatPercentage100(message[i].CQ_TO_AP_LKG_TIER_PCT),
                "count": message[i].CQ_TO_AP_LKG_CNT,
                "amount": calcs.calcValue(message[i].CQ_TO_AP_LKG)
              });
            }; //end if not 2018Q2, temp fix

        };
      } catch (e) {
        formatedJson = { msg: e.message };
      }

      cb(err, formatedJson);
  });
};

T2tltrendqtrcontract.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2TLTrendQtrContract', type: 'object'}
  });

};
