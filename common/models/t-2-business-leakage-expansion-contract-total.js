'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2businessleakageexpansioncontracttotal) {

    T2businessleakageexpansioncontracttotal.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }

        try {
          var jsonData = {
            "data": [
            {
              "label": "ItD to PC",
              "value": "",
              "percent": "",
              "status": ""
            },
            {
              "label": "YtD to PC",
              "value": "",
              "percent": "",
              "status": ""
            },
            {
              "label": "FC EaC to PC",
              "value": "",
              "percent": "",
              "status": ""
            },
            {
              "label": "CQ to PC",
              "value": "",
              "percent": "",
              "status": ""
            }]
          };

          jsonData.data[0].value =  calcs.calcValue(Number(message[0].ITD_TO_PC_LKG));
          jsonData.data[0].percent = calcs.calcPercent(Number(message[0].ITD_TO_PC_LKG), Number(message[0].ITD_REV_CB_GOOD_PC));
          jsonData.data[0].status = calcs.getStatusNoColor(Number(message[0].PRI_ITD_TO_PC_LKG), Number(message[0].PRI_ITD_REV_CB_GOOD_PC), Number(message[0].ITD_TO_PC_LKG), Number(message[0].ITD_REV_CB_GOOD_PC));

          jsonData.data[1].value =  calcs.calcValue(Number(message[0].YTD_TO_PC_LKG));
          jsonData.data[1].percent = calcs.calcPercent(Number(message[0].YTD_TO_PC_LKG), Number(message[0].YTD_ACT_REV));
          jsonData.data[1].status = calcs.getStatusNoColor(Number(message[0].PRI_YTD_TO_PC_LKG), Number(message[0].PRI_YTD_ACT_REV), Number(message[0].YTD_TO_PC_LKG), Number(message[0].YTD_ACT_REV));

          jsonData.data[2].value =  calcs.calcValue(Number(message[0].FC_TO_PC_LKG));
          jsonData.data[2].percent = calcs.calcPercent(Number(message[0].FC_TO_PC_LKG), Number(message[0].PC_PLAN_REV_A));
          jsonData.data[2].status = calcs.getStatusNoColor(Number(message[0].PRI_FC_TO_PC_LKG), Number(message[0].PRI_PC_PLAN_REV_A), Number(message[0].FC_TO_PC_LKG), Number(message[0].PC_PLAN_REV_A));

          jsonData.data[3].value =  calcs.calcValue(Number(message[0].CQ_TO_PC_LKG));
          jsonData.data[3].percent = calcs.calcPercent(Number(message[0].CQ_TO_PC_LKG), Number(message[0].CQ_REV));
          jsonData.data[3].status = calcs.getStatusNoColor(Number(message[0].PRI_CQ_TO_PC_LKG), Number(message[0].PRI_CQ_REV), Number(message[0].CQ_TO_PC_LKG), Number(message[0].CQ_REV));

        } catch(e) {
          jsonData = {msg: e.message};
        }

        cb(err, jsonData);
        });
    };

    T2businessleakageexpansioncontracttotal.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2BusinessLeakageExpansionContractTotal', type: 'object'}
    });

  };
