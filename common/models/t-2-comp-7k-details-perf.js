    'use strict';

    var calcs = require("./utils/tieredLeakageCalcs");
    var dateUtils = require("./utils/dateUtils");

    module.exports = function(T2comp7kdetailsperf) {

        T2comp7kdetailsperf.processChild = function(req, filter, cb) {
              this.process(req, filter, function(err, message){
                if (err) {
                    return cb(err, null);
                }

                try {

                var formatedJson = {
                    "CNTRCT_NUM_LABEL":"Contract",
                    "TCV_LABEL":"TCV",
                    "IPPF_CUSTOMER_LABEL":"IPPF Customer",
                    "CNTRCT_DESC_LABEL":"Description",
                    "OVERALL_7K_LABEL":"Overall 7 Keys",
                    "DATA":[]
                };
                    //formatedJson.SELECTED_LABEL = req.query['label'];
    
                    for (var i = 0; i < message.length; i++) {
                        formatedJson.DATA.push({
                            "COLOR": message[i].COLOR, 
                            "CNTRCT_NUM": message[i].CNTRCT_NUM,
                            "TCV": calcs.calcValue(message[i].TOT_TCV),
                            "IPPF_CUSTOMER_NM": message[i].CLNT_NM,
                            "CNTRCT_DESC": message[i].CNTRCT_DESC,
                            "OVERALL_7K": message[i].STATUS
                        })
                    }

            } catch (e) {
                formatedJson = {"msg" : e.message}
              }

              cb(err, formatedJson);
            });
        };

        T2comp7kdetailsperf.remoteMethod('processChild', {
              http: {path: '/', verb: 'get', status: 200},
              accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                          {arg: 'filter', type: 'object'}],
              returns: {arg: 't2Comp7KDetailsPerf', type: 'object'}
          });

    };
