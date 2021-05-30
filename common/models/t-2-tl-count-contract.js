'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2tlcountcontract) {

  T2tlcountcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
      }
        try {
            var jsonData = {
              "DATA_LOAD_DATE" :message[0].DATA_LOAD_DESC,
              "tier_0_color":"#B4E0FF",
              "tier_1_color":"#6BB9FF",
              "tier_2_color":"#4A97F8",
              "tier_3_color":"#FFB400",
              "data": [
              {
                "label": "CQ to AP",
                "value": "CQ_TO_AP",
                "color": "#FE9D98",
                "busAttrData": []
              },
              {
                "label": "FC EaC to AP",
                "value": "FC_EAC_AP",
                "color": "#FC6227",
                "busAttrData": []
              },
              {
                "label": "3 Mo. Cost Overrun",
                "value": "COST_OVER",
                "color": "#26D181",
                "busAttrData": []
              }
            ]
            };

            message.forEach(function (element) {
                var cq = {
                  //more columns needed here... need to review inVision and sql response
                  "tier": "",
                  "name": "",
                  "date": "",
                  "date_label": "",
                  "amount": "",
                  "percent": ""
                };

                var fc_ap = {
                  //more columns needed here... need to review inVision and sql response
                  "tier": "",
                  "name": "",
                  "date": "",
                  "date_label": "",
                  "amount": "",
                  "percent": ""
                }; 

                var mo = {
                  //more columns needed here... need to review inVision and sql response 
                  "tier": "",
                  "name": "",
                  "date": "",
                  "date_label": "",
                  "amount": "",
                  "percent": ""
                };

                cq.tier = element.TIER_NO;
                cq.name = element.CATEGORY;
                cq.date = element.YR_MO_KEY;
                cq.date_label = element.DESC_2;
                cq.count = element.CQ_CNTRCT_CNT;
                cq.amount = calcs.calcValue(element.CQ_TO_AP_LKG);
                cq.percent = calcs.formatPercentage100(Number(element.CQ_TO_PC_PCT));

                ap.name = element.CATEGORY;
                ap.date = element.YR_MO_KEY;
                ap.date_label = element.DESC_2;
                ap.count = element.AP_CNTRCT_CNT;
                ap.amount = calcs.calcValue(element.AP_TO_PC_LKG);
                ap.percent = calcs.formatPercentage100(Number(element.AP_TO_PC_PCT));

                fc_ap.name = element.CATEGORY;
                fc_ap.date = element.YR_MO_KEY;
                fc_ap.date_label = element.DESC_2;
                fc_ap.count = element.FCAP_CNTRCT_CNT;
                fc_ap.amount = calcs.calcValue(element.FC_TO_AP_LKG);
                fc_ap.percent = calcs.formatPercentage100(Number(element.FC_TO_AP_PCT));

                jsonData.data[0].busAttrData.push(cq);
                jsonData.data[1].busAttrData.push(fc_ap);
                jsonData.data[2].busAttrData.push(mo);

            }, this);
          } catch(e) {
            jsonData = {msg: e.message};
          }

          cb(err, jsonData);
      });
  };

  T2tlcountcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2TLCountContract', type: 'object'}
  });

};
