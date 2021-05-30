'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2topcontributorseac2planworkNumber) {


    T2topcontributorseac2planworkNumber.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message){
            if (err) {
              return cb(err, null);
          }
            var formatedJson = {};

            formatedJson.filter1 = "EAC to Plan";
            formatedJson.filter2 = "WorkNumber";
            formatedJson.month = message[0].DATA_LOAD_DATE;
            //formatedJson.month = dateUtils.getMonthName(Number(message[0].ACCT_MO));
            formatedJson.year = message[0].ACCT_YR;

            formatedJson.data = [];

            for (var i=0; i < message.length; i++) {
              formatedJson.data.push(
                {
                  "worknumber":message[i].WORK_NUM,
                  "status":[message[i].STATUS_ABBR],
                  "service-line":message[i].SVC_LINE_ABBR,
                  "growth-platform":message[i].GROWTH_PLATFORM_ABBR,
                  "sector":message[i].SECTOR_ABBR,
                  "customer":message[i].CUSTOMER_NM,
                  "project":message[i].W_DESC,
                  "brand-pe":message[i].PE_NOTES_ID,
                  "qtd-gp-leakage":calcs.calcX100(message[i].QTR_GP_LKG),
                  "cost-overrun":calcs.calcX100(message[i].COST_OVERRUN),
                  "tcv":calcs.calcValue(message[i].TCV_PLAN_RT_USD),
                  "plan":calcs.calcX100(message[i].EAC_TO_PLAN_PLAN),
                  "actual":calcs.calcX100(message[i].EAC_TO_PLAN_ACT),
                  "variance-percentage":calcs.calcX100(message[i].VAR_PERC),
                  "variance":calcs.calcValue(message[i].EAC_TO_PLAN_VAR)
                }
              );
            };

              cb(err, formatedJson);
          });
      };

      T2topcontributorseac2planworkNumber.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't2TopContributorsEac2PlanWorkNumber', type: 'object'}
      });

};

