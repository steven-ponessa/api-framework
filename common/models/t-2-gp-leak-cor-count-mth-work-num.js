'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2gpleakcorcountmthworknum) {
  T2gpleakcorcountmthworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
      }
        try {
          var jsonData = {
            "DATA_LOAD_DATE" :message[0].DATA_LOAD_DESC,
            "data": [
            {
              "label": "3 Mo. Cost Overrun",
              "value": "COST_OVER",
              "color": "#BE95FF",
              "busAttrData": []
            }
          ]
          };

          message.forEach(function (element) {

              var cost_over = {
                "name": "",
                "date": "",
                "date_label": "",
                "count": "",
                "amount": "",
                "percent": ""
              }; 

              cost_over.name = element.BUS_ATTR;
              cost_over.date = element.DATA_LOAD_DATE;
              cost_over.date_label = element.DESC_2;
              cost_over.count = element.LKG_CNT;
              cost_over.amount = calcs.calcValue(element.LKG_AMT);
              cost_over.percent = calcs.formatPercentage100(Number(element.LKG_PCT));

              jsonData.data[0].busAttrData.push(cost_over);

            }, this);
          } catch(e) {
            jsonData = {msg: e.message};
          }

          cb(err, jsonData);
      });
  };

  T2gpleakcorcountmthworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2GPLeakCORCountMthWorkNum', type: 'object'}
  });
};
