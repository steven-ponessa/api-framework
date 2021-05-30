'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2reportvariance) {

    T2reportvariance.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }
          var jsonData = {};

          try {
            jsonData = {
                "category": "",
                "data":[
                {
                  "label": "CQ to AP",
                  "ytyVar": {"value": 0 },
                  "qtqVar":{"value": 0 }
                },
                {
                  "label": "FC EaC to AP",
                  "ytyVar": {"value": 0 },
                  "qtqVar":{"value": 0 }
                },
                {
                  "label": "3 Mo. Cost Overrun",
                  "ytyVar": {"value": 0 },
                  "qtqVar":{"value": 0 }
                }]
              };

            jsonData.category = message[0].CATEGORY;
            // jsonData.data[0].ytyVar.value = calcs.calcValue(message[0].CQ_GP_LKG_YTY);
            jsonData.data[0].ytyVar.value = null;
            jsonData.data[0].qtqVar.value = (message[0].CQ_GP_LKG_QTQ);
            // jsonData.data[1].ytyVar.value = calcs.calcValue(message[0].EAC_LKG_YTY);
            jsonData.data[1].ytyVar.value = null;
            jsonData.data[1].qtqVar.value = (message[0].EAC_LKG_QTQ);
            // jsonData.data[2].ytyVar.value = calcs.calcValue(message[0].COST_OVERRUN_YTY);
            jsonData.data[2].ytyVar.value = null;
            jsonData.data[2].qtqVar.value = (message[0].COST_OVERRUN_QTQ);
          } catch (e) {
            jsonData = {"msg" : e.message}
          }

          cb(err, jsonData);
        });
    };

    T2reportvariance.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2ReportVariance', type: 'object'}
    });

};
