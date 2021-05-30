'use strict';

var dateUtils = require("./utils/dateUtils");
var calcs = require("./utils/tieredLeakageCalcs");


module.exports = function(T1PMContPerfPCWorkNum) {

  T1PMContPerfPCWorkNum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
      }
      
         var jsonData = {};
        if (message.length > 0) { //Avoid processing a empty result set
          jsonData = {
            "date": "DD MMM YYYY",
            "RED": "#E71D32",
            "GREEN": "#33AC2E",
            "BLUE": "#007AFF",

            "data": [
            {
            "label": "ItD to PC",
            "curr_label": "Current Month",
            "curr_value": "0.00",
            "curr_percent": "0.0",
            "prev_label": "Previous Month",
            "prev_value": "0.00",
            "prev_percent": "0.0"
            },
            {
            "label": "EaC to PC",
            "curr_label": "Current Month",
            "curr_value": "0.00",
            "curr_percent": "0.0",
            "prev_label": "Previous Month",
            "prev_value": "0.00",
            "prev_percent": "0.0"
            },
            {
            "label": "YtD to PC",
            "curr_label": "Current Month",
            "curr_value": "0.00",
            "curr_percent": "0.0",
            "prev_label": "Previous Month",
            "prev_value": "0.00",
            "prev_percent": "0.0"
            },
            {
            "label": "QtD to PC",
            "curr_label": "Current Month",
            "curr_value": "0.00",
            "curr_percent": "0.0",
            "prev_label": "Previous Month",
            "prev_value": "0.00",
            "prev_percent": "0.0"
            },
            {
            "label": "EtC",
            "curr_label": "Current Month",
            "curr_value": "0.00",
            "curr_percent": "0.0",
            "prev_label": "Previous Month",
            "prev_value": "0.00",
            "prev_percent": "0.0"
            }
              ]
            };

            var valueDecimalPlace = 2;

            jsonData.date = message[0].DATA_LOAD_DESC;

            // ITD to PC
            jsonData.data[0].curr_value = (message[0].CURRENT_MONTH_ITD_TO_PC);
            jsonData.data[0].curr_percent = calcs.formatPercentage100(message[0].CURRENT_MONTH_ITD_TO_PC_PER);
            jsonData.data[0].prev_value = (message[0].PREVIOUS_MONTH_ITD_TO_PC);
            jsonData.data[0].prev_percent = calcs.formatPercentage100(message[0].PREVIOUS_MONTH_ITD_TO_PC_PER);
            // EaC to PC
            jsonData.data[1].curr_value = (message[0].CURRENT_MONTH_EAC_TO_PC);
            jsonData.data[1].curr_percent = calcs.formatPercentage100(message[0].CURRENT_MONTH_EAC_TO_PC_PER);
            jsonData.data[1].prev_value = (message[0].PREVIOUS_MONTH_EAC_TO_PC);
            jsonData.data[1].prev_percent = calcs.formatPercentage100(message[0].PREVIOUS_MONTH_EAC_TO_PC_PER);
            // YtD to PC
            jsonData.data[2].curr_value = (message[0].CURRENT_MONTH_YTD_TO_PC);
            jsonData.data[2].curr_percent = calcs.formatPercentage100(message[0].CURRENT_MONTH_YTD_TO_PC_PER);
            jsonData.data[2].prev_value = (message[0].PREVIOUS_MONTH_YTD_TO_PC);
            jsonData.data[2].prev_percent = calcs.formatPercentage100(message[0].PREVIOUS_MONTH_YTD_TO_PC_PER);
            // QtD to PC
            jsonData.data[3].curr_value = (message[0].CURRENT_MONTH_QTD_TO_PC);
            jsonData.data[3].curr_percent = calcs.formatPercentage100(message[0].CURRENT_MONTH_QTD_TO_PC_PER);
            jsonData.data[3].prev_value = (message[0].PREVIOUS_MONTH_QTD_TO_PC);
            jsonData.data[3].prev_percent = calcs.formatPercentage100(message[0].PREVIOUS_MONTH_QTD_TO_PC_PER);
			      // EtC
            jsonData.data[4].curr_value = (message[0].CURRENT_MONTH_ETC);
            jsonData.data[4].curr_percent = calcs.formatPercentage100(message[0].CURRENT_MONTH_ETC_PER);
            jsonData.data[4].prev_value = (message[0].PREVIOUS_MONTH_ETC);
            jsonData.data[4].prev_percent = calcs.formatPercentage100(message[0].PREVIOUS_MONTH_ETC_PER);
  
        }

        cb(err, jsonData);
      });
  };

  T1PMContPerfPCWorkNum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't1PMContPerfPCWorkNum', type: 'object'}
  });

};
