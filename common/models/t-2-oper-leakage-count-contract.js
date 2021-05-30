'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2operleakagecountcontract) {

    T2operleakagecountcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
      }
        try {
            var jsonData = {
              "data": [
              {
                "label": "AP to PC",
                "value": "AP_TO_PC",
                "color": "#34D084",
                "busAttrData": []
              },
              {
                "label": "FC EaC to AP",
                "value": "FC_EAC_AP",
                "color": "#C6D0DC",
                "busAttrData": []
              }]
            };

            message.forEach(function (element) {
                var fc = {
                  "name": "",
                  "count": "",
                  "amount": "",
                  "percent": ""
                };

                var ap = {
                  "name": "",
                  "count": "",
                  "amount": "",
                  "percent": ""
                };

                ap.name = element.BUS_ATTR;
                ap.count = element.AP_CNTRCT_CNT;
                ap.amount = calcs.removeMinusZero(calcs.calcValue(Number(element.AP_TO_PC_LKG)));
                ap.percent = calcs.removeMinusZero(calcs.calcPercent(Number(element.AP_TO_PC_LKG), Number(element.PC_PLAN_REV_A)));

                fc.name = element.BUS_ATTR;
                fc.count = element.FC_CNTRCT_CNT;
                fc.amount = calcs.removeMinusZero(calcs.calcValue(Number(element.FC_TO_AP_LKG)));
                fc.percent = calcs.removeMinusZero(calcs.calcPercent(Number(element.FC_TO_AP_LKG), Number(element.PC_PLAN_REV_A)));

                jsonData.data[0].busAttrData.push(ap);
                jsonData.data[1].busAttrData.push(fc);
            }, this);
          } catch(e) {
            jsonData = {msg: e.message};
          }
          //jsonData = message;
          cb(err, jsonData);
      });
  };

  T2operleakagecountcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2OperLeakageCountContract', type: 'object'}
  });

};
