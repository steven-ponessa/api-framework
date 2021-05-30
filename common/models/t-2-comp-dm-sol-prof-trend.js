'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdmsolproftrend) {
  T2compdmsolproftrend.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

      var dataMessage = '';
      var formatedJson = {
          "DATA_MESSAGE": dataMessage,
          "DEL_METHOD_COLOR":"",
          //"TARGET_PCT" : "",
          //"graph_count": compl_count,
          //"graph_percent": compl_percent,
          "DM_DATA": []
      }

      if (!message.length <= 0) {
        var metColor = '';
        var metLabel = '';
        switch (req.query['metric']) { 
          case "SUB":
            metColor = "#FFB400";
            metLabel = "Solutioning: Submitted";
          break;
          case "NSUB":
            metColor = "#9F1853";
            metLabel = "Solutioning: Not Submitted";
          break;
          case "COM":
            metColor = "#26D181";
            metLabel = "Solutioning: Compliant";
          break;
          case "NCOM":
            metColor = "#4D5358";
            metLabel = "Solutioning: Non Compliant";
          break;
          default:
            metColor = "#FFB400";
            metLabel = "Solutioning: Submitted";
          break;
        };
        //formatedJson.graph_count = compl_count;
        //formatedJson.graph_percent = compl_percent;
        formatedJson.DEL_METHOD_COLOR = metColor;

        for (var i = 0; i < message.length; i++) {
          formatedJson.DM_DATA.push({
              "id":i+1,
              "label": metLabel,
              "yrMoKey": message[i].YR_MO_KEY,
              "value": "del_method",
              "color": metColor,
              "date": "Q" + message[i].QTR_NUM + " " + message[i].YEAR,
              "count": message[i].VALUES,
              "total_count": message[i].TOTAL_COUNT,
              "percent": calcs.formatPercentage(Number(message[i].PERCENT))
            });
          }
        } else {
          formatedJson.DATA_MESSAGE = "No Data Available";
        } //end if empty

      cb(err, formatedJson);
  });
};

  T2compdmsolproftrend.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompDMSolProfTrend', type: 'object'}
  });

};
