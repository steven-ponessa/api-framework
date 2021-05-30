'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2gpleakcortrendmthworknum) {
  T2gpleakcortrendmthworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
	  var formatedJson = {};

      try {
        formatedJson = {
          "TREND_MESSAGE" : "Historical data is calculated using current business rules; values may vary from previously published excel Actuals reports",
          "COR_LABEL": "3 Mo. Cost Overrun",
          "COR_COLOR": "#BE95FF",
          "COR": []
        }

        for (var i = 0; i < message.length; i++) {

          var dateValue = '';
          if (message[i].DESC_2 == 'Latest refresh') {
            dateValue = 'Latest';
            } else {
                dateValue = message[i].NEW_DATE;
          }; // end if Latest row

          formatedJson.COR.push({
            "id":i+1,
            "label": "3 Mo. Cost Overrun",
            "color": "#BE95FF",
            "value": "COST_OVER",
            "refresh_date": message[i].DATA_LOAD_DATE,
            //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
            //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
            "date": dateValue,
            "yrMoKey": message[i].YR_MO_KEY,
            "date_label": message[i].DESC_2,
            "percent": calcs.formatPercentage100(message[i].COST_LKG_PCT),
            "count": message[i].COST_LKG_CNT,
            "amount": calcs.calcValue(message[i].COST_LKG_AMT)
          });

        };
      } catch (e) {
        formatedJson = { msg: e.message };
      }

      cb(err, formatedJson);
  });
};

  T2gpleakcortrendmthworknum.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2GPLeakCORTrendMthWorkNum', type: 'object'}
  });

};
