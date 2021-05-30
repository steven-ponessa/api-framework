    'use strict';

    var calcs = require("./utils/tieredLeakageCalcs");
    var dateUtils = require("./utils/dateUtils");

    module.exports = function(T2comp7kdetailscomp) {

        T2comp7kdetailscomp.processChild = function(req, filter, cb) {
              this.process(req, filter, function(err, message){
                if (err) {
                    return cb(err, null);
                }

                try {

                var formatedJson = {
                    //"SELECTED_LABEL": message[0].LABEL,
                    "CNTRCT_NUM_LABEL":"Contract",
                    "TCV_LABEL":"TCV",
                    "IPPF_CUSTOMER_LABEL":"IPPF Customer",
                    "PM_SUB_LABEL":"PM Submission",
                    "PE_APPROVAL_LABEL":"PE Approval",
                    "OVERALL_7K_LABEL":"Overall 7 Keys",
                    "DATA":[]
                };

                for (var i = 0; i < message.length; i++) {
                    formatedJson.DATA.push({
                        "COLOR": "#AF6EE8",
                        "CNTRCT_NUM": message[i].CNTRCT_NUM,
                        "TCV": calcs.calcValue(message[i].TOT_TCV),
                        "IPPF_CUSTOMER_NM": message[i].CLNT_NM,
                        "PM_SUB": message[i].PM_SUB,
                        "PE_APPROVAL": message[i].PE_APPROVAL,
                        "OVERALL_7K": message[i].OVERALL_7K
                    })
                }

            } catch (e) {
                formatedJson = {"msg" : e.message}
              }

              cb(err, formatedJson);
            });
        };

            T2comp7kdetailscomp.remoteMethod('processChild', {
              http: {path: '/', verb: 'get', status: 200},
              accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                          {arg: 'filter', type: 'object'}],
              returns: {arg: 't2Comp7KDetailsComp', type: 'object'}
          });

    };
