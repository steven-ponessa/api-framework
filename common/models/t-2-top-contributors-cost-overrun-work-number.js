'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2topcontributorscostoverrunworknumber) {

    T2topcontributorscostoverrunworknumber.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
            if (err) {
                return cb(err, null);
            }            
          var formatedJson = {};

          formatedJson.filter1 = "Cost Overrun";
          formatedJson.filter2 = "WorkNumber";
          formatedJson.month = '';
          formatedJson.year = '';

          formatedJson.data = [];

          for (var i = 0; i < message.length; i++) {

            if (i == 0) {
              formatedJson.month = message[0].DATA_LOAD_DATE;                
              //formatedJson.month = dateUtils.getMonthName(Number(message[0].ACCT_MO));
              formatedJson.year = message[0].ACCT_YR;
            }

            formatedJson.data.push({
                "worknumber":message[i].WORK_NUM,
                "status":[message[i].STATUS_ABBR],
                "service-line":message[i].SVC_LINE_ABBR,
                "growth-platform":message[i].GROWTH_PLATFORM_ABBR,
                "sector":message[i].SECTOR_ABBR,
                "customer":message[i].CUSTOMER_NM,
                "project":message[i].DESCRIPTION,
                "brand-pe":message[i].PE_NOTES_ID,
                "qtd-gp-leakage":calcs.calcX100(message[i].QUARTER_GP_LEAKAGE),
                "qtd-gp-leakage-status": calcs.getColorStatus(message[i].QUARTER_GP_LEAKAGE),
                "eac-to-plan":calcs.calcX100(message[i].EAC_TO_PLAN),
                "eac-to-plan-status": calcs.getColorStatus(message[i].EAC_TO_PLAN),
                "tcv":calcs.calcValue(message[i].TCV_PLAN_RT_USD),
                "plan":calcs.calcValue(message[i].LAST_3MO_COST_PLAN),
                "actual":calcs.calcValue(message[i].LAST_3MO_COST_ACT),
                "variance-percentage":calcs.calcX100(message[i].THREE_MO_COST_VAR),
                "variance":calcs.calcValue(message[i].COST_OVERRUN)
            });
          };

          cb(err, formatedJson);
        });
    };

    T2topcontributorscostoverrunworknumber.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 'T2topcontributorscostoverrunworknumber', type: 'object'}
    });

};
