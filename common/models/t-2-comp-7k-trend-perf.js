'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2comp7ktrendperf) {
  T2comp7ktrendperf.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

        var dataMessage = '';
        var formatedJson = {
          "DATA_MESSAGE": dataMessage,
          "SELECTED_LABEL": " ",
          "GREEN_LABEL": "Green",
          "GREEN_COLOR": "#8CD211",
          "ORANGE_LABEL": "Orange",
          "ORANGE_COLOR": "#FF7832",
          "RED_LABEL": "Red",
          "RED_COLOR": "#E71D32",
          "SEVEN_KEYS_PERF": []
        }

        if (!message.length <= 0){

          formatedJson.SELECTED_LABEL = req.query['label'];

        var precentDecimal = 1;

          for (var i = 0; i < message.length; i++) {
            formatedJson.SEVEN_KEYS_PERF.push({
              "label": "7 Keys",
              "value": "seven_keys",
              "green_label": "Green",
              "green_color": "#8CD211",
              "orange_label": "Orange",
              "orange_color": "#FF7832",
              "red_label": "Red",
              "red_color": "#E71D32",
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "green_count": message[i].GREEN_COUNT,
              "green_perc": calcs.formatPercentage100(message[i].GREEN_PERC,1),
              "orange_count": message[i].ORANGE_COUNT,
              "orange_perc": calcs.formatPercentage100(message[i].ORANGE_PERC,1),
              "red_count": message[i].RED_COUNT,
              "red_perc": calcs.formatPercentage100(message[i].RED_PERC,1)
            });
          }
        } else {
          formatedJson.DATA_MESSAGE = "No Data Available";
        } //end if empty

      cb(err, formatedJson);
  });
};

T2comp7ktrendperf.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2Comp7KTrendPerf', type: 'object'}
  });

};
