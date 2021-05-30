'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2compcostrendperf) {
  T2compcostrendperf.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

        var dataMessage = '';
        var formatedJson = {
                "DATA_MESSAGE": dataMessage,
                "SELECTED_LABEL": " ",
                "CoS_PERFORMANCE_LABEL": "CoS Performance",
                "GREEN_LABEL": "Green",
                "GREEN_COLOR": "#8CD211",
                "YELLOW_LABEL": "Yellow",
                "YELLOW_COLOR": "#FDD600",
                "ORANGE_LABEL": "Orange",
                "ORANGE_COLOR": "#FF7832",
                "RED_LABEL": "Red",
                "RED_COLOR": "#E71D32",
                "CoS_PERFORMANCE": []
        }

        if (!message.length <= 0) {

          formatedJson.SELECTED_LABEL = req.query['label'];

        var precentDecimal = 1;

          for (var i = 0; i < message.length; i++) {
            formatedJson.CoS_PERFORMANCE.push({
                "label": "CoS Performance",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "green_label": "Green",
                "green_color": "#8CD211",
                "yellow_label": "Yellow",
                "yellow_color": "#FDD600",
                "orange_label": "Orange",
                "orange_color": "#FF7832",
                "red_label": "Red",
                "red_color": "#E71D32",
				"green_count": message[i].GREEN_COUNT,
				"red_count": message[i].RED_COUNT,
				"yellow_count": message[i].YELLOW_COUNT,
				"orange_count": message[i].ORANGE_COUNT,
				"green_perc": calcs.formatPercentage100(message[i].GREEN_PERC,1),
				"red_perc": calcs.formatPercentage100(message[i].RED_PERC,1), 
				"yellow_perc": calcs.formatPercentage100(message[i].YELLOW_PERC,1),
				"orange_perc": calcs.formatPercentage100(message[i].ORANGE_PERC,1)
              });
        }
      } else {
        formatedJson.DATA_MESSAGE = "No Data Available";
      } //end if empty


    cb(err, formatedJson);
});
};

T2compcostrendperf.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompCOSTrendPerf', type: 'object'}
  });

};
