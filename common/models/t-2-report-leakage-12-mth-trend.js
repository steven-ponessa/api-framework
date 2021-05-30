'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2reportleakage12mthtrend) {

    T2reportleakage12mthtrend.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, resArray){
            if (err) {
                return cb(err, null);
            }
            var jsonData = {};

            try {
                jsonData = {
                    "category": "",
                    "qtrGpLeakage": [],
                    "eacLeakageToPlan": [],
                    "costOverrun": []
                };
/*
                for (var i = 0; i < resArray.length; i++) {
                    if (i==0) jsonData.category = resArray[i].CATEGORY;
                    var recordQtrGpLeakage = {
                        "date": resArray[i].ACCT_YR + '/' + resArray[i].ACCT_MO + '/01',
                        "value": calcs.calcValue(resArray[i].CQ_GP_LKG_SUM)
                    };

                    var recordEacLeakageToPlan = {
                        "date": resArray[i].ACCT_YR + '/' + resArray[i].ACCT_MO + '/01',
                        "value": calcs.calcValue(resArray[i].EAC_LKG_SUM)
                    };

                    var recordCostOverrun = {
                        "date": resArray[i].ACCT_YR + '/' + resArray[i].ACCT_MO + '/01',
                        "value": calcs.calcValue(resArray[i].COST_OVERRUN_SUM)
                    };

                    jsonData.qtrGpLeakage.push(recordQtrGpLeakage);
                    jsonData.eacLeakageToPlan.push(recordEacLeakageToPlan);
                    jsonData.costOverrun.push(recordCostOverrun);
                } //end -  for (var i = 0; i < resArray.length; i++)
*/                
            } catch (e) {
                jsonData = {"msg" : e.message};
            }

            cb(err, jsonData);
        });
    };

    T2reportleakage12mthtrend.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2ReportLeakage12MthTrend', type: 'object'}
    });

};
