'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2gppsidemonthplan) {

    T2gppsidemonthplan.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }
          try {

            var jsonData = {
              "TIMEFRAME": message[0].DATA_LOAD_DATE,
              "SELECTED_COLOR" : "#f2f5fa",
              "TITLE" : "Monthly Plan Performance",
              "FC_EaC_PCT_LABEL": "FC EaC%",
              "FC_EaC_PCT_COLOR": "#2d660a",
              "AP_PCT_LABEL": "AP%",
              "AP_PCT_COLOR": "#fdd600",
              "PC_PCT_LABEL": "PC%",
              "PC_PCT_COLOR": "#59a8f3",              
              "data": [
                {
                  "label": "Plan Performance",
                  "busAttrData": []
                }]
              };
            
              message.forEach(function (element) {
                var details = {
                  "name": "",
                  "fc_pct": "",
                  "ap_pct": "",
                  "pc_pct": ""
                };

                details.name = element.BUS_ATTR;
                details.fc_pct = calcs.formatPercentage100(Number(element.FC_PCT));
                details.ap_pct = calcs.formatPercentage100(Number(element.AP_PCT));
                details.pc_pct = calcs.formatPercentage100(Number(element.PC_PCT));

                jsonData.data[0].busAttrData.push(details);
            
                }, this);

              } catch(e) {
                jsonData = {"msg": e.message};
              }
      
              cb(err, jsonData);
            });
        };

    T2gppsidemonthplan.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2gppSideMonthPlan', type: 'object'}
    });

  };
