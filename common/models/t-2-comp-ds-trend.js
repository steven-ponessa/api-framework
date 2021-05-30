'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdstrend) {
  T2compdstrend.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

        var dataMessage = '';
        var compl_count = '';
        var compl_percent = '';
        var compColor = '';
        var metricLabel = '';
        var formatedJson = {
            "DATA_MESSAGE": dataMessage,
            "SELECTED_LABEL": " ",
            "DEL_START_COLOR":"",
            "TARGET_PCT" : "",
            "graph_count": compl_count,
            "graph_percent": compl_percent,
            "DEL_START": []
        }

        if (!message.length <= 0) {
          // color will be #24A148 for Compliance or #DA1E28 for Non Compliance depending on compl value, #33B1FF for 14 day wait
          // default is set to 0, for Compliant... might change based on DB values
          switch (message[0].COMPL) { 
            case 0:
              compl_count = "compl_count";
              compl_percent = "compl_percent";
              compColor = "#24A148";
              metricLabel = "Delivery Start";
            break;
            case 1:
              compl_count = "non_compl_count";
              compl_percent = "non_compl_percent";
              compColor = "#DA1E28";
              metricLabel = "Delivery Start";
            break;
            case -1:
              compl_count = "COMBINED_CNT";
              //compl_percent = "non_compl_percent";
              compColor = "#33B1FF";
              metricLabel = "14 Day Wait Period";
            break;
          };
          formatedJson.graph_count = compl_count;
          formatedJson.graph_percent = compl_percent;
          formatedJson.TARGET_PCT = calcs.formatPercentage100(Number(message[0].TARGET));
          formatedJson.DEL_START_COLOR = compColor;

          for (var i = 0; i < message.length; i++) {
            formatedJson.DEL_START.push({
                "id":i+1,
                "label": metricLabel,
                "yrMoKey": message[i].YEARMONTH,
                "value": "del_start",
                "color": compColor,
                "date": message[i].YEARMONTH.slice(0,4) + '/' + message[i].YEARMONTH.slice(4,6) + '/01',
                "compl_count": message[i].COMPLIANT_CNT,
                "non_compl_count": message[i].NONCOMPLIANT_CNT,
                "total_count": message[i].COMBINED_CNT,
                "compl_percent": calcs.formatPercentage100(Number(message[i].COMP_DELIVERY_START_PERC)),
                "non_compl_percent": calcs.formatPercentage100(Number(message[i].NONCOMP_DELIVERY_START_PERC))
              });
            }
          } else {
            formatedJson.DATA_MESSAGE = "No Data Available";
          } //end if empty
  
        cb(err, formatedJson);
    });
  };

  T2compdstrend.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompDSTrend', type: 'object'}
  });

};
