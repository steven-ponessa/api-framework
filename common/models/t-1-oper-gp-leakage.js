'use strict';

var dateUtils = require("./utils/dateUtils");
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T1opergpleakage) {

    T1opergpleakage.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
      }

        var jsonData = {};

        if(message.length > 0) { //Avoid processing an empty result set 

          jsonData = {
            "date": "DD MMM YYYY",

            "data": [
              {
                "label": "AP to PC",
                "value": "0.00",
                "value_color": "7A7A7A",
                "percent": "0.0",
                "percent_color": "FFD08F",
                "status": "down"
              },
              {
                "label": "FC EaC to AP",
                "value": "0.00",
                "value_color": "7A7A7A",
                "percent": "0.0",
                "percent_color": "FFD08F",
                "status": "up"
              }
            ]
          };

          jsonData.date = message[0].DATA_LOAD_DATE;

          jsonData.data[0].value =  calcs.calcValue(Number(message[0].AP_TO_PC_LKG));
          jsonData.data[0].percent = calcs.calcPercent(Number(message[0].AP_TO_PC_LKG),
            Number(message[0].PC_PLAN_REV_A));
          jsonData.data[0].status = calcs.getStatusNoColor(Number(message[0].PRI_AP_TO_PC_LKG),
            Number(message[0].PRI_PC_PLAN_REV_A),
            Number(message[0].AP_TO_PC_LKG),
            Number(message[0].PC_PLAN_REV_A));

          jsonData.data[1].value =  calcs.calcValue(Number(message[0].FC_TO_AP_LKG));
          jsonData.data[1].percent = calcs.calcPercent(Number(message[0].FC_TO_AP_LKG),
            Number(message[0].PC_PLAN_REV_A));
          jsonData.data[1].status = calcs.getStatusNoColor(Number(message[0].PRI_FC_TO_AP_LKG),
            Number(message[0].PRI_PC_PLAN_REV_A),
            Number(message[0].FC_TO_AP_LKG),
            Number(message[0].PC_PLAN_REV_A));
        }

        cb(err, jsonData);
      });
  };

  T1opergpleakage.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't1OperGPLeakage', type: 'object'}
  });

};
