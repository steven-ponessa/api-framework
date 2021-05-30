'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2gppsideitdfin) {

    T2gppsideitdfin.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }
          try {

            var jsonData = {
              "TIMEFRAME": message[0].DATA_LOAD_DATE,
              "SELECTED_COLOR" : "#F4F6FB",
              "TITLE" : "ITD Financial Performance",
              "REVENUE_LABEL": "Revenue $",
              "REVENUE_COLOR": "#0076FF",
              "GP_LABEL": "GP $",
              "GP_COLOR": "#F20F0F",
              "GP_PCT_LABEL": "GP %",
              "GP_PCT_COLOR": "#000000",              
              "data": [
                {
                  "label": "Financial Performance",
                  "busAttrData": []
                }]
              };
            
              message.forEach(function (element) {
                var details = {
                  "name": "",
                  "revenue": "",
                  "gp": "",
                  "gp_pct": ""
                };

                details.name = element.BUS_ATTR;
                details.revenue = calcs.calcValue(Number(element.REV));
                details.gp = calcs.calcValue(Number(element.GP));
                details.gp_pct = calcs.formatPercentage100(Number(element.GP_PCT));

                jsonData.data[0].busAttrData.push(details);
            
                }, this);

              } catch(e) {
                jsonData = {"msg": e.message};
              }
      
              cb(err, jsonData);
            });
        };

    T2gppsideitdfin.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2gppSideITDFin', type: 'object'}
    });

  };
