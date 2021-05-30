    'use strict';

    var calcs = require("./utils/tieredLeakageCalcs");
    var dateUtils = require("./utils/dateUtils");

    module.exports = function(T2compcosdetailscomp) {

        T2compcosdetailscomp.processChild = function(req, filter, cb) {
              this.process(req, filter, function(err, message){
                if (err) {
                    return cb(err, null);
                }

                try {

                var formatedJson = {};
                 
                formatedJson = {
                    "CNTRCT_NUM_LABEL":"Contract",
                    "TCV_LABEL":"TCV",
                    "CUSTOMER_NM_LABEL":"IPPF Customer",
                    "BRAND_PM_LABEL":"PM ID",
                    "CNTRCT_SIGN_DT_LABEL":"Signed Date",
                    "ASSMT_DATE_LABEL":"Assessment Date"
                };
                formatedJson.DATA = [];
                
                for (var i = 0; i < message.length; i++) {
                    formatedJson.DATA.push({
                        "COLOR": message[i].COLOR,
                        "CNTRCT_NUM": message[i].CON,
                        "TCV": calcs.calcValue(message[i].TCV),
                        "CUSTOMER_NM": message[i].CUSTOMER,
                        "BRAND_PM": message[i].BRAND_PM,
						"CNTRCT_SIGN_DT": message[i].CNTRCT_SIGN_DATE,
                        "ASSMT_DATE": message[i].ASSMT_DT
                    })
                }

            } catch (e) {
                formatedJson = {"msg" : e.message}
              }

              cb(err, formatedJson);
            });
        };

        T2compcosdetailscomp.remoteMethod('processChild', {
              http: {path: '/', verb: 'get', status: 200},
              accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                          {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompCOSDetailsComp', type: 'object'}
          });

    };
