'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2gpleakcountcqqcontract) {

  T2gpleakcountcqqcontract.processChild = function(req, filter, cb) {
    this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
      }
        try {

          //var tf_val = '';
            
          if (!message.length <= 0) {
              //tf_val = message[0].QTR;
              var yearVal = message[0].DATA_LOAD_DATE.substring(0, 4);
              var monthVal = dateUtils.getMonthAbb(message[0].DATA_LOAD_DATE.substring(5, 7));
              var dayVal = message[0].DATA_LOAD_DATE.substring(8, 10);
          }; // end if data exists

            var jsonData = {
              "DATA_LOAD_DATE" :dayVal + " " + monthVal + " " + yearVal,
              "data": [
              {
                "label": "CQ to PC",
                "value": "CQ_TO_PC",
                "color": "#0043CE",
                "busAttrData": []
              }
            ]
            };

            if(message.length >= 0) { //Avoid processing a empty result set
              
              message.forEach(function (element) {

                var cq = {
                  "name": "",
                  "count": "",
                  "amount": "",
                  "percent": ""
                };

                cq.name = element.BUS_ATTR;
                cq.count = element.CQ_CNTRCT_CNT;
                cq.amount = calcs.calcValue(Number(element.CQ_TO_PC_LKG));
                cq.percent = calcs.formatPercentage100(Number(element.CQ_TO_PC_PCT));

                jsonData.data[0].busAttrData.push(cq);


            }, this);
          }
          } catch(e) {
            jsonData = {msg: e.message};
          }

          cb(err, jsonData);
      });
  };

  T2gpleakcountcqqcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2GPLeakCountCQQContract', type: 'object'}
  });

};
