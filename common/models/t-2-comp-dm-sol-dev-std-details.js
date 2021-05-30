    'use strict';

    var calcs = require("./utils/tieredLeakageCalcs");
    var dateUtils = require("./utils/dateUtils");

    module.exports = function(T2compdmsoldevstddetails) {

        T2compdmsoldevstddetails.processChild = function(req, filter, cb) {
              this.process(req, filter, function(err, message){
                if (err) {
                    return cb(err, null);
                }

                try {

                var dataMessage = '';

                var formatedJson = {
                    "DATA_MESSAGE": dataMessage,
                    "DATE":"",
                    "OPPTNY_NUM_LABEL": "Opportunity No.",
                    "CLIENT_NAME_LABEL": "Client Name",
                    "PROJ_NAME_LABEL": "Project",
                    "PRACTICE_LABEL": "Practice",
                    "METHOD_LABEL": "Method",
                    "DEV_TYPE_LABEL": "Type of Deviation",
                    "NON_COMP_CAT_LABEL": "Non-Compliant Category",
                    "NON_STD_USED_LABEL": "Non-Standard PM&T Used",
                    "DATA":[]
                };

                if (!message.length <= 0) {
                    formatedJson.DATE = message[0].DATA_LOAD_DESC;
                    for (var i = 0; i < message.length; i++) {
                        formatedJson.DATA.push({
                            "OPPTNY_NUM": message[i].OPTY_ID,
                            "CLIENT_NAME": message[i].CLIENT,
                            "PROJ_NAME": message[i].PROJECT,
                            "PRACTICE":message[i].PRACTICE,
                            "METHOD": message[i].METHOD,
                            "DEV_TYPE": message[i].DEV_TYPE,
                            "NON_COMP_CAT":message[i].NOT_COMPL_CAT,
                            "NON_STD_USED":message[i].NOT_STNDRT_PMT

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

        T2compdmsoldevstddetails.remoteMethod('processChild', {
              http: {path: '/', verb: 'get', status: 200},
              accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                          {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompDMSolDevStdDetails', type: 'object'}
          });

    };
