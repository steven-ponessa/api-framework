    'use strict';

    var calcs = require("./utils/tieredLeakageCalcs");
    var dateUtils = require("./utils/dateUtils");

    module.exports = function(T2compdmdelusgdetails) {

        T2compdmdelusgdetails.processChild = function(req, filter, cb) {
              this.process(req, filter, function(err, message){
                if (err) {
                    return cb(err, null);
                }

                try {

                    var dataMessage = '';
    
                    var formatedJson = {
                        "DATA_MESSAGE": dataMessage,
                        "DATE":"",
                        "CNTRCT_NUM_LABEL": "Contract No.",
                        "CLIENT_NAME_LABEL": "Client Name",
                        "PROJ_NAME_LABEL": "Project",
                        "NON_APR_DEV_LABEL": "Un-approved Deviations",
                        "PRACTICE_LABEL": "Practice",
                        "SUB_PRACTICE_LABEL": "Sub Practice",
                        "METHOD_LABEL": "Method",
                        "OTHER_METHOD_LABEL": "Other Method",
                        "DATA":[]
                    };
    
                    if (!message.length <= 0) {
                        formatedJson.DATE = message[0].DATA_LOAD_DESC;
                        for (var i = 0; i < message.length; i++) {
                            formatedJson.DATA.push({
                                "CNTRCT_NUM":message[i].CNTRCT_NUM,
                                "CLIENT_NAME": message[i].CLIENT,
                                "PROJ_NAME": message[i].PROJECT,
                                "NON_APR_DEV":message[i].NON_APRVD_DERIVATIONS,
                                "PRACTICE":message[i].PRACTICE,
                                "SUB_PRACTICE":message[i].SUB_PRACTICE,
                                "METHOD": message[i].METHOD,
                                "OTHER_METHOD":message[i].OTHER_METHODS
                            })
                        }
                    } else {
                      formatedJson.DATA_MESSAGE = "No Data Available";
                    } //end if empty
    
                } catch (e) {
                    formatedJson = {"msg" : e.message}
                  }
    
                  cb(err, formatedJson);
                });
            };

        T2compdmdelusgdetails.remoteMethod('processChild', {
              http: {path: '/', verb: 'get', status: 200},
              accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                          {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompDMDelUsgDetails', type: 'object'}
          });

    };
