'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2topcontributorseac2plancontract) {

    T2topcontributorseac2plancontract.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message){
            if (err) {
              return cb(err, null);
          }            
            var formatedJson = {};

            try {
              formatedJson.filter1 = "EAC to Plan";
              formatedJson.filter2 = "Contract";
              formatedJson.month = message[0].DATA_LOAD_DATE;
              //formatedJson.month = dateUtils.getMonthName(Number(message[0].ACCT_MO));
              formatedJson.year = message[0].ACCT_YR;

              formatedJson.data = [];

              for (var i=0; i < message.length; i++) {

                formatedJson.data.push(
                  {
                    "contract":message[i].CNTRCT_NUM,
                    "status":[message[i].STATUS_ABBR,],
                    "service-line":message[i].SVC_LINE_ABBR,
                    "growth-platform":message[i].GROWTH_PLATFORM_ABBR,
                    "sector":message[i].SECTOR_ABBR,
                    "customer":message[i].CUSTOMER_NM,
                    "project":message[i].C_DESC,
                    "brand-pe":message[i].C_BPE,
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
            } catch (e) {
              formatedJson = {"msg" : e.message}
            }

              cb(err, formatedJson);
          });
      };

      T2topcontributorseac2plancontract.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't2TopContributorsEac2PlanContract', type: 'object'}
      });

};

/* function MonthFromNumber(num) {
  switch(num) {
    case '01':
      return "January";
      break;
    case '02':
      return "February";
      break;
    case '03':
      return "March";
      break;
    case '04':
      return "April";
      break;
    case '05':
      return "May";
      break;
    case '06':
      return "June";
      break;
    case '07':
      return "July";
      break;
    case '08':
      return "August";
      break;
    case '09':
      return "September";
      break;
    case '10':
      return "October";
      break;
    case '11':
      return "November";
      break;
    case '12':
      return "December";
      break;
    default:
      return "null";
  }
} */
