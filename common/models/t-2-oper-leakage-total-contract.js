'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2operleakagetotalcontract) {

    T2operleakagetotalcontract.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }
        try {
          var jsonData = {
            "data": [
            {
              "label": "AP to PC",
              "value": "",
              "percent": "",
              "status": ""
            },
            {
              "label": "FC EaC to AP",
              "value": "",
              "percent": "",
              "status": ""
            }]
          };

          jsonData.data[0].value =  calcs.calcValue(Number(message[0].AP_TO_PC_LKG));
          jsonData.data[0].percent = calcs.calcPercent(Number(message[0].AP_TO_PC_LKG),
            Number(message[0].PC_PLAN_REV_A));
          jsonData.data[0].status = calcs.getStatusNoColor(Number(message[0].PRI_AP_TO_PC_LKG),
            Number(message[0].PRI_PC_PLAN_REV_A),
            Number(message[0].AP_TO_PC_LKG),
            Number(message[0].PC_PLAN_REV_A));

          jsonData.data[1].value =  calcs.calcValue(Number(message[0].FC_TO_AP_LKG));
          jsonData.data[1].percent = calcs.calcPercent(Number(message[0].FC_TO_AP_LKG),
            Number(message[0].PC_PLAN_REV_A));
          jsonData.data[1].status = calcs.getStatusNoColor(Number(message[0].PRI_FC_TO_AP_LKG),
            Number(message[0].PRI_PC_PLAN_REV_A),
            Number(message[0].FC_TO_AP_LKG),
            Number(message[0].PC_PLAN_REV_A));
        } catch(e) {
          jsonData = {msg: e.message};
        }

        cb(err, jsonData);
        });
    };

    T2operleakagetotalcontract.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2OperLeakageTotalContract', type: 'object'}
    });

  };
