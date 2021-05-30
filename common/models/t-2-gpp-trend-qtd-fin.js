'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2gpptrendqtdfin) {
    T2gpptrendqtdfin.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        var formatedJson = {
                "TREND_LABEL":"Trend",
                "SELECTED_LABEL":"",

                "REVENUE_LABEL": "Revenue $",
                "REVENUE_COLOR": "#0076FF",

                "GP_LABEL": "GP $",
                "GP_COLOR": "#FD4F46",

                "GP_PCT_LABEL": "GP %",
                "GP_PCT_COLOR": "#000000",

                "REVENUE": [],
                "GP": [],
                "GP_PCT": []
        };

        if (message != null && !message.length < 1){

        formatedJson.SELECTED_LABEL = req.query['label'];

          for (var i = 0; i < message.length; i++) {
            formatedJson.REVENUE.push({
                "id":i+1,
                "label":"Revenue $",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "rev": calcs.calcValue(message[i].REV),
                "gp": calcs.calcValue(message[i].GP),
                "pct": calcs.formatPercentage100(message[i].GP_PCT)
              });
                formatedJson.GP.push({
                "id":i+1,
                "label":"GP $",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "rev": calcs.calcValue(message[i].REV),
                "gp": calcs.calcValue(message[i].GP),
                "pct": calcs.formatPercentage100(message[i].GP_PCT)
              });
                formatedJson.GP_PCT.push({
                "id":i+1,
                "label":"GP %",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "rev": calcs.calcValue(message[i].REV),
                "gp": calcs.calcValue(message[i].GP),
                "pct": calcs.formatPercentage100(message[i].GP_PCT)
              });
          }
        }

      cb(err, formatedJson);
  });
};

T2gpptrendqtdfin.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2gppTrendQTDFin', type: 'object'}
  });

};
