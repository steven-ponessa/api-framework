    'use strict';

    var calcs = require("./utils/tieredLeakageCalcs");
    var dateUtils = require("./utils/dateUtils");

    module.exports = function(T2comppgdetailsperf) {

        T2comppgdetailsperf.processChild = function(req, filter, cb) {
              this.process(req, filter, function(err, message){
                if (err) {
                    return cb(err, null);
                }

                try {

                var formatedJson = {
                    //"SELECTED_LABEL": message[0].LABEL,
                    "CNTRCT_NUM_LABEL":"Contract",
                    "CUSTOMER_NM_LABEL":"Customer",
                    "DESC_LABEL":"Description",
                    "TCV_LABEL":"TCV",
                    "PG_COMP_DATE_LABEL":"WBS Start Date",
                    "DATA":[]
                };

                for (var i = 0; i < message.length; i++) {
                    formatedJson.DATA.push({
                        "COLOR": message[i].COLOR,
                        "CNTRCT_NUM": message[i].CNTRCT_NUM,
                        "CNTRCT_DESC": message[i].CNTRCT_DESC,
                        "CUSTOMER_NM": message[i].CLNT_NM,
                        "TCV": calcs.calcValue(message[i].TCV),
						"STATUS": message[i].STATUS,
                        "PG_COMPLETED_DATE": message[i].PG_DATE
                    })
                }

            } catch (e) {
                formatedJson = {"msg" : e.message}
              }

              cb(err, formatedJson);
            });
        };

        T2comppgdetailsperf.remoteMethod('processChild', {
              http: {path: '/', verb: 'get', status: 200},
              accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                          {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompPGDetailsPerf', type: 'object'}
          });

    };
