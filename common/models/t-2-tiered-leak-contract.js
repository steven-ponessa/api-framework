'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2tieredleakcontract) {
  T2tieredleakcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
    try {


        var formatedJson = {};

        formatedJson.month = '';
        formatedJson.year = '';

        formatedJson.data = [];

        for (var i = 0; i < message.length; i++) {

          if (i == 0) {
            formatedJson.month = message[0].DATA_LOAD_DATE;
            formatedJson.year = message[0].ACCT_YR;
          }

          formatedJson.data.push({
              "contract": message[i].CNTRCT_NUM,
              "description": message[i].DESCRIPTION,
              "status": message[i].STATUS_ABBR,
              "market": message[i].MKT_ABBR,
              "sector": message[i].SECTOR_ABBR,
              "sign-date": message[i].CNTRCT_SGND_DT,
              "brand-pe": message[i].PE_NOTES_ID,
              "ap-date": message[i].AP_DATE,
              "pc-revenue": calcs.removeMinusZero(calcs.calcValue(Number(message[i].PC_PLAN_REV_A))),

              //"eac-leakage-pct": calcs.removeMinusZero(calcs.calcX100(Number(message[i].EAC_LKG_PCT))),
              "eac-leakage-pct": (Number(message[i].EAC_LKG_PCT) > 0.0) ? "0.0" : calcs.removeMinusZero(calcs.calcX100(Number(message[i].EAC_LKG_PCT))),
              "eac-leakage": calcs.removeMinusZero(calcs.calcValue(Number(message[i].EAC_LKG))),
              "tier-eac-leakage-num": message[i].TIER_EAC_LKG_NUM,

              //"cq-gp-leakage-pct": calcs.removeMinusZero(calcs.calcX100(Number(message[i].CQ_GP_LKG_PCT))),
              "cq-gp-leakage-pct": (Number(message[i].CQ_GP_LKG_PCT) > 0.0) ? "0.0" : calcs.removeMinusZero(calcs.calcX100(Number(message[i].CQ_GP_LKG_PCT))),
              "cq-gp-leakage": calcs.removeMinusZero(calcs.calcValue(Number(message[i].CQ_GP_LKG))),
              "tier-cq-gp-leakage-num": message[i].TIER_GP_LKG_NUM,

              //"cq-overrun-pct": calcs.removeMinusZero(calcs.calcX100(Number(message[i].COST_OVERRUN_PCT))),
              "cq-overrun-pct": (Number(message[i].COST_OVERRUN_PCT) > 0.0) ? "0.0" : calcs.removeMinusZero(calcs.calcX100(Number(message[i].COST_OVERRUN_PCT))),
              "cq-overrun": calcs.removeMinusZero(calcs.calcValue(Number(message[i].COST_OVERRUN))),
              "tier-cost-overrun-num": message[i].TIER_COST_OVERRUN_NUM,
          });
        };

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }



        cb(err, formatedJson);
      });
  };

  T2tieredleakcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 'T2tieredleakcontract', type: 'object'}
  });
};
