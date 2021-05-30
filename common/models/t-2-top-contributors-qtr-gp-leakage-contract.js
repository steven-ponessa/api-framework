'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function (T2topcontributorsqtrgpleakagecontract) {

    T2topcontributorsqtrgpleakagecontract.processChild = function (req, filter, cb) {
        this.process(req, filter, function (err, resArray) {
            if (err) {
                return cb(err, null);
            }
            var jsonData = {
                "filter1": "Qtr GP Leakage",
                "filter2": "Contract",
                "month": null,
                "year": null,
                "data": []
            };

            for (var i = 0; i < resArray.length; i++) {
                if (i == 0) {
                    jsonData.year = resArray[i].ACCT_YR;
                    jsonData.month = resArray[i].DATA_LOAD_DATE;
                }

                var recordData = {
                  "contract": resArray[i].CNTRCT_NUM,
                  "status":resArray[i].STATUS_ABBR.split(','),
                  "service-line": resArray[i].SVC_LINE_ABBR,
                  "growth-platform": resArray[i].GROWTH_PLATFORM_ABBR,
                  "sector": resArray[i].SECTOR_ABBR,
                  "customer": resArray[i].CUSTOMER_NM,
                  "project": resArray[i].DESCRIPTION,
                  "brand-pe": resArray[i].PE_NOTES_ID,
                  "cost-overrun": calcs.calcX100(resArray[i].COST_OVERRUN_3MO_VAR_PCT),
                  "eac-to-plan": calcs.calcX100(resArray[i].EAC_TO_PLAN),
                  "tcv": calcs.calcValue(resArray[i].TCV),
                  "plan": calcs.calcValue(resArray[i].CQ_GP_PLAN),
                  "actual": calcs.calcValue(resArray[i].CQ_GP_ACTUAL),
                  "variance-percentage": (Number(resArray[i].CQ_GP_LKG_VARIANCE_PCT) > 0.0) ? "0.0" : calcs.calcX100(resArray[i].CQ_GP_LKG_VARIANCE_PCT),
                  "variance": calcs.calcValue(resArray[i].CQ_GP_LKG_VARIANCE)
                };

                jsonData.data.push(recordData);
            }
            cb(err, jsonData);
        });
    };

    T2topcontributorsqtrgpleakagecontract.remoteMethod('processChild', {
        http: { path: '/', verb: 'get', status: 200 },
        accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
        { arg: 'filter', type: 'object' }],
        returns: { arg: 't2TopContributorsQtrGpLeakageContract', type: 'object' }
    });

};
