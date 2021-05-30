'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compcoscountcomp) {

  T2compcoscountcomp.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }

          try {

            var target_value = '';
            
            if (!message.length <= 0) {
              target_value = calcs.formatPercentage100(Number(message[0].TARGET_PCT));
            }

            var jsonData = {
              "SELECTED_LABEL" :"",
              "DATA_LOAD_DATE" :message[0].DATA_LOAD_DESC,
              "TOTAL_BAR_COLOR": "#D0DADA",
              "SELECTED_COLOR" : "#F4F6FB",
              "TARGET_COLOR"   : "#000000",
              "TARGET_LABEL"   : "Target",
              "TARGET_PCT"     : target_value,
              "COS_WITHIN_12MONTH_COLOR": "#3D70B2",
              "COS_GREATER_THAN_12MONTH_COLOR": "#7CC7FF",
              "data": [
                  {
                    "label": "CoS",
                    "busAttrData": []
                  }]
              };

              message.forEach(function (element) {


                  var CoS = {
                    "name": "",
                    "abbr": "-",
                    "count": "",
                    "target_pct": "",
                    "percent": "",
					"count_gt12Month": "",
					"percent_gt12Month": ""
                  };

           


                  CoS.name = element.BUS_ATTR;
                  CoS.abbr = element.BUS_ATTR;
                  CoS.count = element.CMPL_IN_12_MTH;
                  CoS.target_pct = calcs.formatPercentage100(Number(element.TARGET_PCT));
                  CoS.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.COS_IN_12_PERC)));
                  CoS.count_gt12Month = element.CMPL_GREATER_12_MTH;
                  CoS.percent_gt12Month = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.COS_GREATER_THAN_12_PERC)));

                  jsonData.data[0].busAttrData.push(CoS);

              }, this);
            } catch(e) {
              jsonData = {msg: e.message};
            }

            cb(err, jsonData);
        });
    };

    T2compcoscountcomp.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompCOSCountComp', type: 'object'}
    });

  };
