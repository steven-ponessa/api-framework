'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2exptrend) {
    T2exptrend.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        var formatedJson = {
                "TREND_LABEL":"Trend",
                "SELECTED_LABEL":"",

                //1. CQ to AP
                "CQ_TO_AP_LABEL": "CQ to AP",
                "CQ_TO_AP_COLOR": "#97CFF6",
                //2. FC EaC to AP
                "FC_EAC_TO_AP_LABEL": "FC EaC to AP",
                "FC_EAC_TO_AP_COLOR": "#FFB400",
                //3. 3 Mo Cost Overrun
                "COST_OVER_LABEL": "3 Mo. Cost Overrun",
                "COST_OVER_COLOR": "#CFA6FC",
                //4. FC EaC to AP
                "FC_EAC_AP_LABEL": "FC EaC to AP",
                "FC_EAC_AP_COLOR": "#C6D0DC",
                //5. AP to PC
                "AP_TO_PC_LABEL": "AP to PC",
                "AP_TO_PC_COLOR": "#34D084",
                //6. ItD to PC
                "ITD_TO_PC_LABEL": "ItD to PC",
                "ITD_TO_PC_COLOR": "#00CFF4",
                //7. YtD to PC
                "YTD_TO_PC_LABEL": "YtD to PC",
                "YTD_TO_PC_COLOR": "#A2D603",
                //8.FC EaC to PC
                "FC_EAC_TO_PC_LABEL": "FC EaC to PC",
                "FC_EAC_TO_PC_COLOR": "#FFDD3E",
                //9.CQ_TO_PC
                "CQ_TO_PC_LABEL": "CQ to PC",
                "CQ_TO_PC_COLOR": "#FC9D9A",

                "CQ_TO_AP": [],
                "FC_EAC_TO_AP": [],
                "COST_OVER": [],
                "FC_EAC_AP": [],
                "AP_TO_PC": [],
                "ITD_TO_PC": [],
                "YTD_TO_PC": [],
                "FC_EAC_TO_PC": [],
                "CQ_TO_PC": []
        };

        try {

          if (message != null && !message.length < 1) {

            formatedJson.SELECTED_LABEL = req.query['label'];

            for (var i = 0; i < message.length; i++) {

              var date = message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01';

              formatedJson.CQ_TO_AP.push({
                  "label":"CQ to AP",
                  "date": date,
                  "value": calcs.calcValue(Number(message[i].CQ_TO_AP)),
                  "pct": calcs.formatPercentage100(message[i].CQ_TO_AP_PCT)
                });
              formatedJson.FC_EAC_TO_AP.push({
                  "label":"FC EaC to AP",
                  "date": date,
                  "value": calcs.calcValue(Number(message[i].FC_TO_AP)),
                  "pct": calcs.formatPercentage100(message[i].FC_TO_AP_PCT)
                });
              formatedJson.COST_OVER.push({
                  "label":"3 Mo. Cost Overrun",
                  "date": date,
                  "value": calcs.calcValue(Number(message[i].COST_OVERRUN)),
                  "pct": calcs.formatPercentage100(message[i].COST_OVERRUN_PCT)
                });
              formatedJson.FC_EAC_AP.push({
                  "label":"FC EaC to AP",
                  "date": date,
                  "value": calcs.calcValue(Number(message[i].FC_TO_AP)),
                  "pct": calcs.formatPercentage100(message[i].FC_TO_AP_PCT)
                });
              formatedJson.AP_TO_PC.push({
                  "label":"AP to PC",
                  "date": date,
                  "value":calcs.calcValue(Number(message[i].AP_TO_PC)),
                  "pct": calcs.formatPercentage100(message[i].AP_TO_PC_PCT)
                });
              formatedJson.ITD_TO_PC.push({
                  "label":"ItD to PC",
                  "date": date,
                  "value": calcs.calcValue(Number(message[i].ITD_TO_PC)),
                  "pct": calcs.formatPercentage100(message[i].ITD_TO_PC_PCT)
                });
              formatedJson.YTD_TO_PC.push({
                  "label":"YtD to PC",
                  "date": date,
                  "value": calcs.calcValue(Number(message[i].YTD_TO_PC)),
                  "pct": calcs.formatPercentage100(message[i].YTD_TO_PC_PCT)
                });
              formatedJson.FC_EAC_TO_PC.push({
                  "label":"FC EaC to PC",
                  "date": date,
                  "value": calcs.calcValue(Number(message[i].FC_TO_PC)),
                  "pct": calcs.formatPercentage100(message[i].FC_TO_PC_PCT)
                });
              formatedJson.CQ_TO_PC.push({
                  "label":"CQ to PC",
                  "date": date,
                  "value": calcs.calcValue(Number(message[i].CQ_TO_PC)),
                  "pct": calcs.formatPercentage100(message[i].CQ_TO_PC_PCT)
              });
            }
          }
        } catch(e) {
          formatedJson = {msg: e.message};
        }

      cb(err, formatedJson);
  });
};

T2exptrend.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2ExpTrend', type: 'object'}
  });

};
