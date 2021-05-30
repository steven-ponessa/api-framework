'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2expdetailsworknum) {
    T2expdetailsworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
    try {

        var formatedJson = {};

        if(message.length == 0) {
          formatedJson = {};
        } else {
          formatedJson = {
            "Year":message[0].ACCT_YR,
            "Month":message[0].ACCT_MO,
            "Sort Column":message[0].SORT_KEY,
            "Sort Direction":message[0].SORT_DIRECTION
          }

          formatedJson.data = [];

        // Build metricArray which holds values of metrics passed in
        var metricArray = [];
        for(var i = 1; i < 4; i++) {
          var param = "metric" + i;
          if(req.query[param]) { metricArray.push(req.query[param]); }
        }
        for (var i = 0; i < message.length; i++) {

            var worknum = {
              "contract": message[i].CNTRCT_NUM,
              "worknum": message[i].WORK_NUM,
              "worknum_name": message[i].DESCRIPTION,
              "status": message[i].STATUS_ABBR,
              "market": message[i].MKT_ABBR,
              "sector": message[i].SECTOR_ABBR,
              "sign_date": message[i].CNTRCT_SGND_DT,
              "end_date": message[i].END_DATE,
              "brand_pe": message[i].PE_NOTES_ID,
              "ap_date": message[i].AP_DATE,
              "PC_PLAN_REV": calcs.calcValue(Number(message[i].PC_PLAN_REV)),
              "CQ_TO_AP_PCT": (Number(message[i].CQ_TO_AP_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].CQ_TO_AP_PCT)),
              "CQ_TO_AP": calcs.calcValue(Number(message[i].CQ_TO_AP)),
              "CQ_TO_AP_tier": message[i].TIER_CQ_TO_AP_NUM,
              "FC_EAC_TO_AP_PCT": (Number(message[i].FC_EAC_TO_AP_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].FC_EAC_TO_AP_PCT)),
              "FC_EAC_TO_AP": calcs.calcValue(Number(message[i].FC_EAC_TO_AP)),
              "FC_EAC_TO_AP_tier": message[i].TIER_FC_EAC_TO_AP_NUM,
              "COST_OVER_PCT": (Number(message[i].COST_OVER_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].COST_OVER_PCT)),
              "COST_OVER": calcs.calcValue(Number(message[i].COST_OVER)),
              "COST_OVER_tier": message[i].TIER_COST_OVER_NUM,
              "FC_EAC_AP_PCT": calcs.calcPercent(Number(message[i].FC_EAC_AP), Number(message[i].PC_PLAN_REV)),
              "FC_EAC_AP": calcs.calcValue(Number(message[i].FC_EAC_AP)),
              "AP_TO_PC_PCT": calcs.calcPercent(Number(message[i].AP_TO_PC), Number(message[i].PC_PLAN_REV)),
              "AP_TO_PC": calcs.calcValue(Number(message[i].AP_TO_PC)),
              "ITD_TO_PC_PCT": calcs.calcPercent(Number(message[i].ITD_TO_PC), Number(message[i].ITD_ACT_REV)),
              "ITD_TO_PC": calcs.calcValue(message[i].ITD_TO_PC),
              "YTD_TO_PC_PCT": calcs.calcPercent(Number(message[i].YTD_TO_PC), Number(message[i].YTD_ACT_REV)),
              "YTD_TO_PC": calcs.calcValue(message[i].YTD_TO_PC),
              "FC_EAC_TO_PC_PCT": calcs.calcPercent(Number(message[i].FC_EAC_TO_PC), Number(message[i].PC_PLAN_REV)),
              "FC_EAC_TO_PC": calcs.calcValue(message[i].FC_EAC_TO_PC),
              "CQ_TO_PC_PCT": calcs.calcPercent(Number(message[i].CQ_TO_PC), Number(message[i].CQ_PV_REV)),
              "CQ_TO_PC": calcs.calcValue(message[i].CQ_TO_PC)
            };
            /*for (var j = 0; j < metricArray.length; j++) {
              switch(metricArray[j]) {
                case 'CQ_TO_AP':
                  worknum.CQ_TO_AP_pct = (Number(message[j].CQ_GP_LKG_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[j].CQ_GP_LKG_PCT)));
                  worknum.CQ_TO_AP = calcs.calcValue(Number(message[j].CQ_GP_LKG)));
                  worknum.CQ_TO_AP_tier = message[j].TIER_GP_LKG_NUM;
                  break;

                case 'FC_EAC_TO_AP':
                  worknum.FC_EAC_TO_APpct = (Number(message[j].EAC_LKG_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[j].EAC_LKG_PCT)));
                  worknum.FC_EAC_TO_AP = calcs.calcValue(Number(message[j].EAC_LKG)));
                  worknum.FC_EAC_TO_AP_tier = message[j].TIER_EAC_LKG_NUM;
                  break;

                case 'COST_OVER':
                  worknum.COST_OVER_pct = (Number(message[j].COST_OVERRUN_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[j].COST_OVERRUN_PCT)));
                  worknum.COST_OVER = calcs.calcValue(Number(message[j].COST_OVERRUN)));
                  worknum.COST_OVER_tier = message[j].TIER_COST_OVERRUN_NUM;
                  break;

                  case 'FC_TO_AP':
                  worknum.FC_TO_AP_pct = calcs.calcPercent(Number(message[j].FC_TO_AP_LKG),
                    Number(message[j].PC_PLAN_REV));
                  worknum.FC_TO_AP = calcs.calcValue(Number(message[j].AP_TO_PC_LKG));
                  break;
                case 'AP_TO_PC':
                  worknum.AP_TO_PC_pct = calcs.calcPercent(Number(message[j].AP_TO_PC_LKG),
                    Number(message[j].PC_PLAN_REV));
                  worknum.AP_TO_PC = calcs.calcValue(Number(message[j].AP_TO_PC_LKG));
                  break;
                case 'ITD_TO_PC':
                  worknum.ITD_TO_PC_pct = calcs.calcPercent(Number(message[j].ITD_TO_PC_LKG),
                    Number(message[j].PC_PLAN_REV));
                  worknum.ITD_TO_PC = calcs.calcValue(message[j].ITD_TO_PC_LKG);
                  break;
                case 'YTD_TO_PC':
                  worknum.YTD_TO_PC_pct = calcs.calcPercent(Number(message[j].YTD_TO_PC_LKG),
                    Number(message[j].PC_PLAN_REV));
                  worknum.YTD_TO_PC = calcs.calcValue(message[j].YTD_TO_PC_LKG);
                  break;
                case 'FC_TO_PC':
                  worknum.FC_TO_PC_pct = calcs.calcPercent(Number(message[j].FC_TO_PC_LKG),
                    Number(message[j].PC_PLAN_REV));
                  worknum.FC_TO_PC = calcs.calcValue(message[j].FC_TO_PC_LKG);
                  break;
              }

            }*/

            formatedJson.data.push(worknum);
          };

        }

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }



        cb(err, formatedJson);
      });
  };

  T2expdetailsworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2ExpDetailsWorkNum', type: 'object'}
  });
};
