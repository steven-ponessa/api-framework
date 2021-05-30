'use strict';

var dateUtils = require("./utils/dateUtils");
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T1businessgpleakage) {

  T1businessgpleakage.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
        }
        var jsonData = {};
        if(message.length > 0) { //Avoid processing a empty result set
          jsonData = {
              "date": "DD MMM YYYY",

              "data": [
                {
                  "label": "CQ to PC",
                  "value": "0.00",
                  "value_color": "7A7A7A",
                  "percent": "0.0",
                  "percent_color": "FFD08F",
                  "status": "up"
                },
                {
                  "label": "ItD to PC",
                  "value": "0.00",
                  "value_color": "7A7A7A",
                  "percent": "0.0",
                  "percent_color": "FFD08F",
                  "status": "up"
                },
                {
                  "label": "YtD to PC",
                  "value": "0.00",
                  "value_color": "7A7A7A",
                  "percent": "0.0",
                  "percent_color": "FFD08F",
                  "status": "up"
                },
                {
                  "label": "FC EaC to PC",
                  "value": "0.00",
                  "value_color": "7A7A7A",
                  "percent": "0.0",
                  "percent_color": "FFD08F",
                  "status": "up"
                }
              ]
            };

            var valueDecimalPlace = 2;
            var percentDecimalPlace = 2;

            jsonData.date = message[0].DATA_LOAD_DATE;

            jsonData.data[0].value = calcs.calcValue(message[0].CQ_TO_PC_LKG, valueDecimalPlace);
            jsonData.data[0].percent = calcs.calcPercent(Number(message[0].CQ_TO_PC_LKG),
              Number(message[0].CQ_REV));
            jsonData.data[0].status = calcs.getStatusNoColor(Number(message[0].PREV_CQ_TO_PC),
              Number(message[0].PREV_CQ_REV),
              Number(message[0].CQ_TO_PC_LKG),
              Number(message[0].CQ_REV));

            jsonData.data[1].value = calcs.calcValue(message[0].ITD_TO_PC_LKG, valueDecimalPlace);
            jsonData.data[1].percent = calcs.calcPercent(Number(message[0].ITD_TO_PC_LKG),
              Number(message[0].ITD_REV_CB_GOOD_PC));
            jsonData.data[1].status = calcs.getStatusNoColor(Number(message[0].PREV_ITD_TO_PC),
              Number(message[0].PREV_ITD_REV_CB_GOOD_PC),
              Number(message[0].ITD_TO_PC_LKG),
              Number(message[0].ITD_REV_CB_GOOD_PC));

            jsonData.data[2].value = calcs.calcValue(message[0].YTD_TO_PC_LKG, valueDecimalPlace);
            jsonData.data[2].percent = calcs.calcPercent(Number(message[0].YTD_TO_PC_LKG),
              Number(message[0].YTD_ACT_REV));
            jsonData.data[2].status = calcs.getStatusNoColor(Number(message[0].PREV_YTD_TO_PC_LKG),
              Number(message[0].PREV_YTD_ACT_REV ),
              Number(message[0].YTD_TO_PC_LKG),
              Number(message[0].YTD_ACT_REV));

            jsonData.data[3].value = calcs.calcValue(message[0].FC_TO_PC_LKG, valueDecimalPlace);
            jsonData.data[3].percent = calcs.calcPercent(Number(message[0].FC_TO_PC_LKG),
              Number(message[0].PC_PLAN_REV_A));
            jsonData.data[3].status = calcs.getStatusNoColor(Number(message[0].PREV_FC_TO_PC_LKG),
              Number(message[0].PREV_PC_PLAN_REV_A ),
              Number(message[0].FC_TO_PC_LKG),
              Number(message[0].PC_PLAN_REV_A));
        }

        cb(err, jsonData);
      });
  };

  T1businessgpleakage.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't1BusinessGPLeakage', type: 'object'}
  });

};
