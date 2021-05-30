'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdmdelstdtrend) {
  T2compdmdelstdtrend.processChild = function(req, filter, cb) {
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
            case "COM":
              metColor = "#A1D800";
              metLabel = "Delivery: Compliant";
            break;
            case "NCOM":
              metColor = "#00539A";
              metLabel = "Delivery: Non Compliant";
            break;
            case "APR":
              metColor = "#A1D800";
              metLabel = "Delivery: Approved";
            break;
            case "UAPR":
              metColor = "#00539A";
              metLabel = "Delivery: Unapproved";
            break;
            default:
              metColor = "#A1D800";
              metLabel = "Delivery: Compliant";
            break;
          };
          //formatedJson.graph_count = compl_count;
          //formatedJson.graph_percent = compl_percent;
          formatedJson.DEL_METHOD_COLOR = metColor;

          for (var i = 0; i < message.length; i++) {
            formatedJson.DM_DATA.push({
                "id":i+1,
                "label": metLabel,
                "yrMoKey": message[i].YRMOKEY,
                "value": "del_method",
                "color": metColor,
                "date": "Q" + message[i].QTR_NUM + " " + message[i].YEAR_NUM,
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

  T2compdmdelstdtrend.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompDMDelStdTrend', type: 'object'}
  });

};
