'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2tieredleakcontractexport) {
    T2tieredleakcontractexport.processChild = function(req, filter, cb) {
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
                "CONTRACT_NUMBER":message[i].CNTRCT_NUM,
                "CONTRACT_DESCRIPTION":message[i].CNTRCT_DESC,
                //"WORK_NUMBER":message[i].WORK_NUM,
                //"WORK_NUMBER_DESCRIPTION":message[i].WKNUM_DESC,
                "GEO":message[i].GEO_DESC,
                "MARKET":message[i].MKT_DESC,
                "COUNTRY":message[i].COUNTRY,
                "SECTOR":message[i].SECTOR_DESC,
                "GROWTH_PLATFORM":message[i].GROWTH_PLATFORM,
                "SERVICE_LINE":message[i].SERVICE_LINE,
                "CLUSTER_NAME":message[i].CLUSTER_NAME,
                "CUSTOMER":message[i].CUSTOMER,
                "TCV":message[i].TCV,
                "CONTRACT_SIGNED_DATE":message[i].CNTRCT_SGND_DT,
                "ACCT_YEAR":message[i].ACCT_YR,
                "ACCT_MO":message[i].ACCT_MO,
                "STATUS":message[i].STATUS,
                "PC_PLAN_REV":message[i].PC_PLAN_REV,
                "PC_PLAN_COST":message[i].PC_PLAN_COST,
                "PC_GP":message[i].PC_GP,
                "PC_GP_PCT":calcs.calcX100(message[i].PC_GP_PCT),
                "EAC_REV":message[i].EAC_REV,
                "EAC_COST":message[i].EAC_COST,
                "EAC_GP":message[i].EAC_GP,
                "EAC_GP_PCT":calcs.calcX100(message[i].EAC_GP_PCT),
                "AP_REV":message[i].AP_REV,
                "AP_COST":message[i].AP_COST,
                "AP_GP":message[i].AP_GP,
                "AP_GP_PCT":calcs.calcX100(message[i].AP_GP_PCT),
                "ITD_ACT_REV":message[i].ITD_ACT_REV,
                "ITD_ACT_COST":message[i].ITD_ACT_COST,
                "ITD_ACT_GP":message[i].ITD_ACT_GP,
                "ITD_ACT_GP_PCT":calcs.calcX100(message[i].ITD_ACT_GP_PCT),
                //"CQ_GP_LKG_PCT":calcs.calcX100(message[i].CQ_GP_LKG_PCT),
                "CQ_GP_LKG_PCT":(Number(message[i].CQ_GP_LKG_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].CQ_GP_LKG_PCT)),
                "CQ_GP_LKG":message[i].CQ_GP_LKG,
                "TIER_GP_LKG_NUM":message[i].TIER_GP_LKG_NUM,
                //"COST_OVERRUN_PCT":calcs.calcX100(message[i].COST_OVERRUN_PCT),
                "COST_OVERRUN_PCT":(Number(message[i].COST_OVERRUN_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].COST_OVERRUN_PCT)),
                "COST_OVERRUN":message[i].COST_OVERRUN,
                "TIER_COST_OVERRUN_NUM":message[i].TIER_COST_OVERRUN_NUM,
                //"EAC_LKG_PCT":calcs.calcX100(message[i].EAC_LKG_PCT),
                "EAC_LKG_PCT":(Number(message[i].EAC_LKG_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].EAC_LKG_PCT)),
                "EAC_LKG":message[i].EAC_LKG,
                "TIER_EAC_LKG_NUM":message[i].TIER_EAC_LKG_NUM,
                "ITD_TO_PC_LKG":message[i].ITD_TO_PC_LKG,
                "ITD_TO_PC_PCT":calcs.calcX100(message[i].ITD_TO_PC_PCT),
                "FC_TO_PC_LKG":message[i].FC_TO_PC_LKG,
                "FC_TO_PC_PCT":calcs.calcX100(message[i].FC_TO_PC_PCT),
                "YTD_TO_PC_LKG":message[i].YTD_TO_PC_LKG,
                "YTD_TO_PC_PCT":calcs.calcX100(message[i].YTD_TO_PC_PCT),
                "FC_TO_AP_LKG":message[i].FC_TO_AP_LKG,
                "FC_TO_AP_PCT":calcs.calcX100(message[i].FC_TO_AP_PCT),
                "AP_TO_PC_LKG":message[i].AP_TO_PC_LKG,
                "AP_TO_PC_PCT":calcs.calcX100(message[i].AP_TO_PC_PCT)
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2tieredleakcontractexport.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2TieredLeakContractExport', type: 'object'}
  });
};

