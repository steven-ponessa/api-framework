'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2planhealthexclusionworknum) {
  T2planhealthexclusionworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
            return cb(err, null);
        }
          try {
            var jsonData = {
              "DATE":message[0].DATA_LOAD_DESC,
              "data": [
              {
                "label": "Price Case",
                "color": "#00CFF6",
                "busAttrData": []
              },
              {
                "label": "Approved Plan",
                "color": "#A1D800",
                "busAttrData": []
              },
              {
                "label": "Forecast",
                "color": "#FFB400",
                "busAttrData": []
              }]
            };

            message.forEach(function (element) {
                var pc = {
                    name: "",
                    count: "",
                    percent: "",
                    amount: ""
                };

                var ap = {
                    name: "",
                    count: "",
                    percent: "",
                    amount: ""
                };

                var fc = {
                    name: "",
                    count: "",
                    percent: "",
                    amount: ""
                };

                pc.name = element.BUS_ATTR;
                pc.count = element.PC_EXCLUDED_CNTRCT_CNT;
                pc.percent = calcs.calcPercent(element.PC_EXCLUDED_CNTRCT_CNT, element.PC_NOT_NULL_CNTRCT_CNT);
                pc.amount = calcs.calcValue(Number(element.PC_EXCLUDED_REV_AMT));
                

                fc.name = element.BUS_ATTR;
                fc.count = element.FC_EXCLUDED_CNTRCT_CNT;
                fc.percent = calcs.calcPercent(element.FC_EXCLUDED_CNTRCT_CNT, element.AP_NOT_NULL_CNTRCT_CNT);
                fc.amount = calcs.calcValue(Number(element.FC_EXCLUDED_REV_AMT));
                

                ap.name = element.BUS_ATTR;
                ap.count = element.AP_EXCLUDED_CNTRCT_CNT;
                ap.percent = calcs.calcPercent(element.AP_EXCLUDED_CNTRCT_CNT, element.FC_NOT_NULL_CNTRCT_CNT);
                ap.amount = calcs.calcValue(Number(element.AP_EXCLUDED_REV_AMT));
                

                jsonData.data[0].busAttrData.push(pc);
                jsonData.data[1].busAttrData.push(ap);
                jsonData.data[2].busAttrData.push(fc);
            }, this);
          } catch(e) {
            jsonData = {msg: e.message};
          }

          cb(err, jsonData);
      });
  };

  T2planhealthexclusionworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PlanHealthExclusionWorkNum', type: 'object'}
  });
};
