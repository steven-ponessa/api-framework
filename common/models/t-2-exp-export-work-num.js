'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2expexportworknum) {
    T2expexportworknum.processChild = function(req, filter, cb) {
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

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "contract_num":message[i].CNTRCT_NUM,
                "work_num":message[i].WORK_NUM,
                "work_num_desc":message[i].WKNUM_DESC,
                "geo":message[i].GEO_DESC,
                "market":message[i].MKT_DESC,
                "country":message[i].COUNTRY,
                "sector":message[i].SECTOR_DESC,
                "industry": message[i].INDUSTRY_DESC,
                "growth_platform":message[i].GROWTH_PLATFORM,
                "service_line":message[i].SERVICE_LINE,
                //"practice": "Practice",
                "cluster_name":message[i].CLUSTER_NAME,
                //"gbl_buying_grp": "Global Buying Group",
                "customer":message[i].CUSTOMER_NAME,
                "TCV":message[i].TCV,
                "sign_date":message[i].CNTRCT_SGND_DT,
                "end_date": message[i].END_DATE,
                "acct_year":message[i].ACCT_YR,
                "acct_mo":message[i].ACCT_MO,
                "status":message[i].STATUS,
                "PC_PLAN_REV":message[i].PC_PLAN_REV,
                "PC_PLAN_COST":message[i].PC_PLAN_COST,
                "PC_GP":message[i].PC_GP,
                "PC_GP_PCT":calcs.calcX100(Number(message[i].PC_GP_PCT)),
                "FC_REV":message[i].EAC_REV,
                "FC_COST":message[i].EAC_COST,
                "FC_GP":message[i].EAC_GP,
                "FC_GP_PCT":calcs.calcX100(Number(message[i].EAC_GP_PCT)),
                "AP_REV":message[i].AP_REV,
                "AP_COST":message[i].AP_COST,
                "AP_GP":message[i].AP_GP,
                "AP_GP_PCT":calcs.calcX100(Number(message[i].AP_GP_PCT)),
                "ITD_ACT_REV":message[i].ITD_ACT_REV,
                "ITD_ACT_COST":message[i].ITD_ACT_COST,
                "ITD_ACT_GP":message[i].ITD_ACT_GP,
                "ITD_ACT_GP_PCT":calcs.calcX100(Number(message[i].ITD_ACT_GP_PCT)),
                "CQ_GP_LKG":message[i].CQ_TO_AP,
                "CQ_GP_LKG_PCT":(Number(message[i].CQ_TO_AP_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].CQ_GP_LKG_PCT)),
                "TIER_GP_LKG_NUM":message[i].TIER_GP_LKG_NUM,
                "COST_OVER_PCT":(Number(message[i].COST_OVER_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].COST_OVER_PCT)),
                "COST_OVER":message[i].COST_OVER,
                "TIER_COST_OVER_NUM":message[i].TIER_COST_OVER_NUM,
                "FC_EAC_TO_AP":message[i].FC_EAC_TO_AP,
                "FC_EAC_TO_AP_PCT":calcs.calcX100(Number(message[i].FC_EAC_TO_AP_PCT)),
                "TIER_FC_EAC_TO_AP_NUM":message[i].TIER_FC_EAC_TO_AP_NUM,
                "ITD_TO_PC":message[i].ITD_TO_PC,
                "ITD_TO_PC_PCT":calcs.calcX100(Number(message[i].ITD_TO_PC_PCT)),
                "FC_EAC_TO_PC":message[i].FC_EAC_TO_PC,
                "FC_EAC_TO_PC_PCT":calcs.calcX100(Number(message[i].FC_EAC_TO_PC_PCT)),
                "YTD_TO_PC":message[i].YTD_TO_PC,
                "YTD_TO_PC_PCT":calcs.calcX100(Number(message[i].YTD_TO_PC_PCT)),
                "FC_EAC_AP":message[i].FC_EAC_AP,
                "FC_EAC_AP_PCT":calcs.calcX100(Number(message[i].FC_EAC_AP_PCT)),
                "AP_TO_PC":message[i].AP_TO_PC,
                "AP_TO_PC_PCT":calcs.calcX100(Number(message[i].AP_TO_PC_PCT)),
                "CQ_TO_PC":message[i].CQ_TO_PC,
                "CQ_TO_PC_PCT":calcs.calcX100(Number(message[i].CQ_TO_PC_PCT))
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2expexportworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2ExpExportWorkNum', type: 'object'}
  });
};

