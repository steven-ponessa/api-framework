'use strict';

var dateUtils = require("./utils/dateUtils");
var calcs = require("./utils/tieredLeakageCalcs");

function getMtMColor(currQtrPct, prevQtrPct) {

  //Here I use the formatPercentage100() to ensure the comparison is doing exactly against the same numbers
  //showing for percentages in the UI. JS rounding seems to work slightly different form JS toFixed()
  //which is the method used to format the percentages, that's why the second was the choosen path
  var qtrPctDiff = Number(calcs.formatPercentage100(currQtrPct)) - Number(calcs.formatPercentage100(prevQtrPct))

  if (qtrPctDiff >= 0)
   return "#33AC2E";
  else
   return "#D63649";
}

module.exports = function(T1gpleak) {

  T1gpleak.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
      }
      
        var jsonData = {};
        if (message.length > 0) { //Avoid processing a empty result set
          jsonData = {
              "date": "DD MMM YYYY",

              "data": [
                {
                  "label": "ItD to PC",
                  "value": "0.00",
                  "value_color": "7A7A7A",
                  "percent": "0.0",
                  "percent_color": "FFD08F",
                  "arc_color": "",
                  "prev_label": "Previous month",
                  "prev_value": "0.00",
                  "prev_percent": "0.0"
                },
                {
                  "label": "CQ to PC",
                  "value": "0.00",
                  "value_color": "7A7A7A",
                  "percent": "0.0",
                  "percent_color": "FFD08F",
                  "arc_color": "",
                  "prev_label": "Previous month",
                  "prev_value": "0.00",
                  "prev_percent": "0.0"
                },
                {
                  "label": "FC EaC to PC",
                  "value": "0.00",
                  "value_color": "7A7A7A",
                  "percent": "0.0",
                  "percent_color": "FFD08F",
                  "arc_color": "",
                  "prev_label": "Previous month",
                  "prev_value": "0.00",
                  "prev_percent": "0.0"
                },
                {
                  "label": "FC EaC to AP",
                  "value": "0.00",
                  "value_color": "7A7A7A",
                  "percent": "0.0",
                  "percent_color": "FFD08F",
                  "arc_color": "",
                  "prev_label": "Previous month",
                  "prev_value": "0.00",
                  "prev_percent": "0.0"
                }
              ]
            };

            var valueDecimalPlace = 2;

            jsonData.date = message[0].DATA_LOAD_DATE;
            // ITD to PC
            //jsonData.data[0].value = calcs.calcValue(message[0].ITD_TO_PC_LKG, valueDecimalPlace);
            jsonData.data[0].value = message[0].ITD_TO_PC_LKG;
            jsonData.data[0].percent = calcs.formatPercentage100(message[0].ITD_TO_PC_PERC);
            jsonData.data[0].arc_color = getMtMColor(message[0].ITD_TO_PC_PERC, message[0].PREV_ITD_TO_PC_PERC);
            //jsonData.data[0].prev_value = calcs.calcValue(message[0].PREV_ITD_TO_PC, valueDecimalPlace);
            jsonData.data[0].prev_value = message[0].PREV_ITD_TO_PC;
            jsonData.data[0].prev_percent = calcs.formatPercentage100(message[0].PREV_ITD_TO_PC_PERC);
            // CQ to PC
            //jsonData.data[1].value = calcs.calcValue(message[0].CQ_TO_PC_LKG, valueDecimalPlace);
            jsonData.data[1].value = message[0].CQ_TO_PC_LKG;
            jsonData.data[1].percent = calcs.formatPercentage100(message[0].CQ_TO_PC_PERC);
            jsonData.data[1].arc_color = getMtMColor(message[0].CQ_TO_PC_PERC, message[0].PREV_CQ_TO_PC_PERC);
            //jsonData.data[1].prev_value = calcs.calcValue(message[0].PREV_CQ_TO_PC, valueDecimalPlace);
            jsonData.data[1].prev_value = message[0].PREV_CQ_TO_PC;
            jsonData.data[1].prev_percent = calcs.formatPercentage100(message[0].PREV_CQ_TO_PC_PERC);
            // FC EaC to PC
            //jsonData.data[2].value = calcs.calcValue(message[0].FC_TO_PC_LKG, valueDecimalPlace);
            jsonData.data[2].value = message[0].FC_TO_PC_LKG;
            jsonData.data[2].percent = calcs.formatPercentage100(message[0].FC_TO_PC_PERC);
            jsonData.data[2].arc_color = getMtMColor(message[0].FC_TO_PC_PERC, message[0].PREV_FC_TO_PC_PERC);
            //jsonData.data[2].prev_value = calcs.calcValue(message[0].PREV_FC_TO_PC_LKG, valueDecimalPlace);
            jsonData.data[2].prev_value = message[0].PREV_FC_TO_PC_LKG;
            jsonData.data[2].prev_percent = calcs.formatPercentage100(message[0].PREV_FC_TO_PC_PERC);
            // FC EaC to PC
            //jsonData.data[3].value = calcs.calcValue(message[0].FC_TO_AP_LKG, valueDecimalPlace);
            jsonData.data[3].value = message[0].FC_TO_AP_LKG;
            jsonData.data[3].percent = calcs.formatPercentage100(message[0].FC_TO_AP_PERC);
            jsonData.data[3].arc_color = getMtMColor(message[0].FC_TO_AP_PERC, message[0].PREV_FC_TO_AP_PERC);
            //jsonData.data[3].prev_value = calcs.calcValue(message[0].PREV_FC_TO_AP_LKG, valueDecimalPlace);
            jsonData.data[3].prev_value = message[0].PREV_FC_TO_AP_LKG;
            jsonData.data[3].prev_percent = calcs.formatPercentage100(message[0].PREV_FC_TO_AP_PERC);
            /*
            jsonData.data[1].value = calcs.calcValue(message[0].ITD_TO_PC_LKG, valueDecimalPlace);
            jsonData.data[1].percent = calcs.calcPercent(Number(message[0].ITD_TO_PC_LKG),
            Number(message[0].ITD_REV_CB_GOOD_PC));
            jsonData.data[1].status = calcs.getStatusNoColor(Number(message[0].PREV_ITD_TO_PC),
            Number(message[0].PREV_ITD_REV_CB_GOOD_PC),
            Number(message[0].ITD_TO_PC_LKG),
            Number(message[0].ITD_REV_CB_GOOD_PC));
            */
        }

        cb(err, jsonData);
      });
  };

  T1gpleak.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't1GPLeak', type: 'object'}
  });

};
