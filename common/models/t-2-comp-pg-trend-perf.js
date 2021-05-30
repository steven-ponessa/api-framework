'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2comppgtrendperf) {
    T2comppgtrendperf.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        var dataMessage = '';
        var formatedJson = {
                "DATA_MESSAGE": dataMessage,
                "SELECTED_LABEL": " ",
                "PG0_PERFORMANCE_LABEL": "PG0 Performance",
                "PG1_4_PERFORMANCE_LABEL": "PG1-4 Performance",
                "PG1_PERFORMANCE_LABEL": "PG1 Performance",
                "PG2_PERFORMANCE_LABEL": "PG2 Performance",
                "PG3_PERFORMANCE_LABEL": "PG3 Performance",
                "PG4_PERFORMANCE_LABEL": "PG4 Performance",
                "GREEN_LABEL": "Green",
                "GREEN_COLOR": "#8CD211",
                "YELLOW_LABEL": "Yellow",
                "YELLOW_COLOR": "#FDD600",
                "ORANGE_LABEL": "Orange",
                "ORANGE_COLOR": "#FF7832",
                "RED_LABEL": "Red",
                "RED_COLOR": "#E71D32",
                "PG0_PERFORMANCE": [],
                "PG1_4_PERFORMANCE": [],
                "PG1_PERFORMANCE": [],
                "PG2_PERFORMANCE": [],
                "PG3_PERFORMANCE": [],
                "PG4_PERFORMANCE": []
        }

        if (!message.length <= 0) {

          formatedJson.SELECTED_LABEL = req.query['label'];

        var precentDecimal = 1;

          for (var i = 0; i < message.length; i++) {
            formatedJson.PG0_PERFORMANCE.push({
                "label": "PG0 Performance",
                "value": "PG0_PERFORMANCE",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "green_label": "Green",
                "green_color": "#8CD211",
                "yellow_label": "Yellow",
                "yellow_color": "#FDD600",
                "orange_label": "Orange",
                "orange_color": "#FF7832",
                "red_label": "Red",
                "red_color": "#E71D32",
				"green_count": message[i].PG_0_GREEN_CNT,
				"red_count": message[i].PG_0_RED_CNT,
				"yellow_count": message[i].PG_0_YELLOW_CNT,
				"orange_count": message[i].PG_0_ORANGE_CNT,
				"green_perc": calcs.formatPercentage100(message[i].PG_0_GREEN_PERC,1),
				"red_perc": calcs.formatPercentage100(message[i].PG_0_RED_PERC,1), 
				"yellow_perc": calcs.formatPercentage100(message[i].PG_0_YELLOW_PERC,1),
				"orange_perc": calcs.formatPercentage100(message[i].PG_0_ORANGE_PERC,1)
              });
            formatedJson.PG1_4_PERFORMANCE.push({
                "label": "PG1-4 Performance",
                "value": "PG1_4_PERFORMANCE",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "green_label": "Green",
                "green_color": "#8CD211",
                "yellow_label": "Yellow",
                "yellow_color": "#FDD600",
                "orange_label": "Orange",
                "orange_color": "#FF7832",
                "red_label": "Red",
                "red_color": "#E71D32",
				"green_count": message[i].PG_1_4_GREEN_CNT,
				"red_count": message[i].PG_1_4_RED_CNT,
				"yellow_count": message[i].PG_1_4_YELLOW_CNT,
				"orange_count": message[i].PG_1_4_ORANGE_CNT,
				"green_perc": calcs.formatPercentage100(message[i].PG_1_4_GREEN_PERC,1),
				"red_perc": calcs.formatPercentage100(message[i].PG_1_4_RED_PERC,1), 
				"yellow_perc": calcs.formatPercentage100(message[i].PG_1_4_YELLOW_PERC,1),
				"orange_perc": calcs.formatPercentage100(message[i].PG_1_4_ORANGE_PERC,1)
              });
            formatedJson.PG1_PERFORMANCE.push({
                "label": "PG1 Performance",
                "value": "PG1_PERFORMANCE",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "green_label": "Green",
                "green_color": "#8CD211",
                "yellow_label": "Yellow",
                "yellow_color": "#FDD600",
                "orange_label": "Orange",
                "orange_color": "#FF7832",
                "red_label": "Red",
                "red_color": "#E71D32",
				"green_count": message[i].PG_1_GREEN_CNT,
				"red_count": message[i].PG_1_RED_CNT,
				"yellow_count": message[i].PG_1_YELLOW_CNT,
				"orange_count": message[i].PG_1_ORANGE_CNT,
				"green_perc": calcs.formatPercentage100(message[i].PG_1_GREEN_PERC,1),
				"red_perc": calcs.formatPercentage100(message[i].PG_1_RED_PERC,1), 
				"yellow_perc": calcs.formatPercentage100(message[i].PG_1_YELLOW_PERC,1),
				"orange_perc": calcs.formatPercentage100(message[i].PG_1_ORANGE_PERC,1)
              });
            formatedJson.PG2_PERFORMANCE.push({
                "label": "PG2 Performance",
                "value": "PG2_PERFORMANCE",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "green_label": "Green",
                "green_color": "#8CD211",
                "yellow_label": "Yellow",
                "yellow_color": "#FDD600",
                "orange_label": "Orange",
                "orange_color": "#FF7832",
                "red_label": "Red",
                "red_color": "#E71D32",
				"green_count": message[i].PG_2_GREEN_CNT,
				"red_count": message[i].PG_2_RED_CNT,
				"yellow_count": message[i].PG_2_YELLOW_CNT,
				"orange_count": message[i].PG_2_ORANGE_CNT,
				"green_perc": calcs.formatPercentage100(message[i].PG_2_GREEN_PERC,1),
				"red_perc": calcs.formatPercentage100(message[i].PG_2_RED_PERC,1), 
				"yellow_perc": calcs.formatPercentage100(message[i].PG_2_YELLOW_PERC,1),
				"orange_perc": calcs.formatPercentage100(message[i].PG_2_ORANGE_PERC,1)
              });
            formatedJson.PG3_PERFORMANCE.push({
                "label": "PG3 Performance",
                "value": "PG3_PERFORMANCE",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "green_label": "Green",
                "green_color": "#8CD211",
                "yellow_label": "Yellow",
                "yellow_color": "#FDD600",
                "orange_label": "Orange",
                "orange_color": "#FF7832",
                "red_label": "Red",
                "red_color": "#E71D32",
				"green_count": message[i].PG_3_GREEN_CNT,
				"red_count": message[i].PG_3_RED_CNT,
				"yellow_count": message[i].PG_3_YELLOW_CNT,
				"orange_count": message[i].PG_3_ORANGE_CNT,
				"green_perc": calcs.formatPercentage100(message[i].PG_3_GREEN_PERC,1),
				"red_perc": calcs.formatPercentage100(message[i].PG_3_RED_PERC,1), 
				"yellow_perc": calcs.formatPercentage100(message[i].PG_3_YELLOW_PERC,1),
				"orange_perc": calcs.formatPercentage100(message[i].PG_3_ORANGE_PERC,1)
              });
            formatedJson.PG4_PERFORMANCE.push({
                "label": "PG4 Performance",
                "value": "PG4_PERFORMANCE",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "green_label": "Green",
                "green_color": "#8CD211",
                "yellow_label": "Yellow",
                "yellow_color": "#FDD600",
                "orange_label": "Orange",
                "orange_color": "#FF7832",
                "red_label": "Red",
                "red_color": "#E71D32",
				"green_count": message[i].PG_4_GREEN_CNT,
				"red_count": message[i].PG_4_RED_CNT,
				"yellow_count": message[i].PG_4_YELLOW_CNT,
				"orange_count": message[i].PG_4_ORANGE_CNT,
				"green_perc": calcs.formatPercentage100(message[i].PG_4_GREEN_PERC,1),
				"red_perc": calcs.formatPercentage100(message[i].PG_4_RED_PERC,1), 
				"yellow_perc": calcs.formatPercentage100(message[i].PG_4_YELLOW_PERC,1),
				"orange_perc": calcs.formatPercentage100(message[i].PG_4_ORANGE_PERC,1)
            });
        }
      } else {
        formatedJson.DATA_MESSAGE = "No Data Available";
      } //end if empty


    cb(err, formatedJson);
});
};

T2comppgtrendperf.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompPGTrendPerf', type: 'object'}
  });

};
