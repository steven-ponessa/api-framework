'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2gpptrendmonthfin) {
    T2gpptrendmonthfin.processChild = function(req, filter, cb) {
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

        var precentDecimal = 1;

        formatedJson.SELECTED_LABEL = req.query['label'];

          for (var i = 0; i < message.length; i++) {
            formatedJson.REVENUE.push({
                "label":"Revenue $",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "rev": calcs.calcValue(message[i].REV),
                "gp": calcs.calcValue(message[i].GP),
                "pct": calcs.formatPercentage100(message[i].GP_PCT,precentDecimal)
              });
                formatedJson.GP.push({
                "label":"GP $",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "rev": calcs.calcValue(message[i].REV),
                "gp": calcs.calcValue(message[i].GP),
                "pct": calcs.formatPercentage100(message[i].GP_PCT,precentDecimal)
              });
                formatedJson.GP_PCT.push({
                "label":"GP %",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "rev": calcs.calcValue(message[i].REV),
                "gp": calcs.calcValue(message[i].GP),
                "pct": calcs.formatPercentage100(message[i].GP_PCT,precentDecimal)
              });
          }
        }

      cb(err, formatedJson);
  });
};

T2gpptrendmonthfin.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2gppTrendMonthFin', type: 'object'}
  });

};
