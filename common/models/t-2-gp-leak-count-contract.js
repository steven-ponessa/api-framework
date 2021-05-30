'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2gpleakcountcontract) {

  T2gpleakcountcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
      }
        try {
            var jsonData = {
              "DATA_LOAD_DATE" :message[0].DATA_LOAD_DESC,
              "data": [
              {
                "label": "ItD to PC",
                "value": "ITD_TO_PC",
                "color": "#005D5D",
                "busAttrData": []
              },
              {
                "label": "YtD to PC",
                "value": "YTD_TO_PC",
                "color": "#FF832B",
                "busAttrData": []
              },
              {
                "label": "FC EaC to PC",
                "value": "FC_EAC_TO_PC",
                "color": "#F1C21B",
                "busAttrData": []
              },
              {
                "label": "CQ to PC",
                "value": "CQ_TO_PC",
                "color": "#0043CE",
                "busAttrData": []
              },
              {
                "label": "AP to PC",
                "value": "AP_TO_PC",
                "color": "#A2191F",
                "busAttrData": []
              },
              {
                "label": "FC EaC to AP",
                "value": "FC_EAC_AP",
                "color": "#3DDBD9",
                "busAttrData": []
              }
            ]
            };

            message.forEach(function (element) {
                var itd = {
                  "name": "",
                  "date": "",
                  "date_label": "",
                  "count": "",
                  "amount": "",
                  "percent": ""
                };

                var ytd = {
                  "name": "",
                  "date": "",
                  "date_label": "",
                  "count": "",
                  "amount": "",
                  "percent": ""
                };

                var fc = {
                  "name": "",
                  "date": "",
                  "date_label": "",
                  "count": "",
                  "amount": "",
                  "percent": ""
                };

                var cq = {
                  "name": "",
                  "date": "",
                  "date_label": "",
                  "count": "",
                  "amount": "",
                  "percent": ""
                };

                var ap = {
                  "name": "",
                  "date": "",
                  "date_label": "",
                  "count": "",
                  "amount": "",
                  "percent": ""
                };

                var fc_ap = {
                  "name": "",
                  "date": "",
                  "date_label": "",
                  "count": "",
                  "amount": "",
                  "percent": ""
                }; 

                itd.name = element.BUS_ATTR;
                itd.date = element.YR_MO_KEY;
                itd.date_label = element.DESC_2;
                itd.count = element.ITD_CNTRCT_CNT;
                itd.amount = calcs.calcValue(element.ITD_TO_PC_LKG);
                itd.percent = calcs.formatPercentage100(Number(element.ITD_TO_PC_PCT));
                //itd.percent = calcs.calcPercent(Number(element.ITD_TO_PC_LKG), Number(element.ITD_REV_CB_GOOD_PC));

                ytd.name = element.BUS_ATTR;
                ytd.date = element.YR_MO_KEY;
                ytd.date_label = element.DESC_2;                
                ytd.count = element.YTD_CNTRCT_CNT;
                ytd.amount = calcs.calcValue(element.YTD_TO_PC_LKG);
                ytd.percent = calcs.formatPercentage100(Number(element.YTD_TO_PC_PCT));
                //ytd.percent = calcs.calcPercent(Number(element.YTD_TO_PC_LKG), Number(element.YTD_ACT_REV));

                fc.name = element.BUS_ATTR;
                fc.date = element.YR_MO_KEY;
                fc.date_label = element.DESC_2;                
                fc.count = element.FC_CNTRCT_CNT;
                fc.amount = calcs.calcValue(element.FC_TO_PC_LKG);
                fc.percent = calcs.formatPercentage100(Number(element.FC_TO_PC_PCT));
                //fc.percent = calcs.calcPercent(Number(element.FC_TO_PC_LKG), Number(element.PC_PLAN_REV_A));

                cq.name = element.BUS_ATTR;
                cq.date = element.YR_MO_KEY;
                cq.date_label = element.DESC_2;                
                cq.count = element.CQ_CNTRCT_CNT;
                cq.amount = calcs.calcValue(element.CQ_TO_PC_LKG);
                cq.percent = calcs.formatPercentage100(Number(element.CQ_TO_PC_PCT));
                //cq.percent = calcs.calcPercent(Number(element.CQ_TO_PC_LKG), Number(element.CQ_REV));

                ap.name = element.BUS_ATTR;
                ap.date = element.YR_MO_KEY;
                ap.date_label = element.DESC_2;                
                ap.count = element.AP_CNTRCT_CNT;
                ap.amount = calcs.calcValue(element.AP_TO_PC_LKG);
                ap.percent = calcs.formatPercentage100(Number(element.AP_TO_PC_PCT));
                //ap.percent = calcs.calcPercent(Number(element.FC_TO_PC_LKG), Number(element.PC_PLAN_REV_A));

                fc_ap.name = element.BUS_ATTR;
                fc_ap.date = element.YR_MO_KEY;
                fc_ap.date_label = element.DESC_2;                
                fc_ap.count = element.FCAP_CNTRCT_CNT;
                fc_ap.amount = calcs.calcValue(element.FC_TO_AP_LKG);
                fc_ap.percent = calcs.formatPercentage100(Number(element.FC_TO_AP_PCT));
                //fc_ap.percent = calcs.calcPercent(Number(element.FC_TO_AP_LKG), Number(element.PC_PLAN_REV_A));

                jsonData.data[0].busAttrData.push(itd);
                jsonData.data[1].busAttrData.push(ytd);
                jsonData.data[2].busAttrData.push(fc);
                jsonData.data[3].busAttrData.push(cq);
                jsonData.data[4].busAttrData.push(ap);
                jsonData.data[5].busAttrData.push(fc_ap);

            }, this);
          } catch(e) {
            jsonData = {msg: e.message};
          }

          cb(err, jsonData);
      });
  };

  T2gpleakcountcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2GPLeakCountContract', type: 'object'}
  });

};
