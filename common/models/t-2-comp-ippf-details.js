
'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2compippfdetails) {

    T2compippfdetails.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message){
            if (err) {
              return cb(err, null);
          }

            try {
                var formatedJson = {};

                switch (req.query['metric']) {
                    case "ACT":
                     if(message.length >= 0) {
                        formatedJson = {
                        "ACTIVE_LABEL": "Total Active Work No.",
                        "WORK_NUM_LABEL":"Work Number",
                        "WORK_NUM_DESC_LABEL":"Description",
                        "CLIENT_LABEL":"Client",
                        "PM_LABEL":"Project Manager",
                        "REM_REV_LABEL":"Remaining Rev"
                    }
                    formatedJson.DATA = [];
        
                     for (var i = 0; i < message.length; i++) {
                        formatedJson.DATA.push({
                        "WORK_NUM": message[i].WRK,
                        "WORK_NUM_DESC": message[i].DESCRIPTION,
                        "CLIENT": message[i].CLT,
                        "PM": message[i].PM,
                        "REM_REV": calcs.calcValue(message[i].RMREV)
                        })
                     }
                       }; 
                        break;

                    case "REQ":
                    if (req.query['tgl'] == 0){
                      if(message.length >= 0) {
                        formatedJson = {
                        "REQ_LABEL":"IPPF Required",
                        "WORK_NUM_LABEL":"Work Number",
                        "REASON_CODE_LABEL":"Reason Code",
                        "REASON_LABEL":"Reason",
                        "CLIENT_LABEL":"Client",
                        "PM_LABEL":"Project Manager",
                        "REM_REV_LABEL":"Remaining Rev"
                    }
                    formatedJson.DATA = [];

                     for (var i = 0; i < message.length; i++) {
                        formatedJson.DATA.push({
                        "WORK_NUM": message[i].WRK,
                        "REASON_CODE": message[i].RSNCD,
                        "REASON": message[i].REASON,
                        "CLIENT": message[i].CLT,
                        "PM": message[i].PM,
                        "REM_REV": calcs.calcValue(message[i].RMREV)
                          })
                     }
                       };
                    }else if(req.query['tgl'] == 1){
                      if(message.length >= 0) {
                        formatedJson = {
                        "REQ_LABEL":"IPPF Required",
                        "WORK_NUM_LABEL":"Work Number",
                        "WORK_NUM_DESC_LABEL":"Description",
                        "CLIENT_LABEL":"Client",
                        "PM_LABEL":"Project Manager",
                        "REM_REV_LABEL":"Remaining Rev"
                    }
                    formatedJson.DATA = [];

                     for (var i = 0; i < message.length; i++) {
                        formatedJson.DATA.push({
                        "WORK_NUM": message[i].WRK,
                        "WORK_NUM_DESC": message[i].DESCRIPTION,
                        "CLIENT": message[i].CLT,
                        "PM": message[i].PM,
                        "REM_REV": calcs.calcValue(message[i].RMREV)
                          })
                     }
                       };
                    };
                      break;

                    case "FCST":
                    if(message.length >= 0) {
                      formatedJson = {
                      "FCST_LABEL": "Forcasted IPPF",
                      "WORK_NUM_LABEL":"Work Number",
                      "WORK_NUM_DESC_LABEL":"Description",
                      "CLIENT_LABEL":"Client",
                      "PM_LABEL":"Project Manager",
                      "LAST_SUB_DT_LABEL":"Last Submitted On",
                      "REM_REV_LABEL":"Remaining Rev"
                  }
                  formatedJson.DATA = [];
      
                   for (var i = 0; i < message.length; i++) {
                      formatedJson.DATA.push({
                      "WORK_NUM": message[i].WRK,
                      "WORK_NUM_DESC": message[i].DESCRIPTION,
                      "CLIENT": message[i].CLT,
                      "PM": message[i].PM,
                      "LAST_SUB_DT": message[i].SUBDT,
                      "REM_REV": calcs.calcValue(message[i].RMREV)
                      })
                   }
                     };
                      break;

                    case "PM":
                    if(message.length >= 0) {
                      formatedJson = {
                      "SUB_FC_PM_LABEL": "Submitted FC Brand PM",
                      "WORK_NUM_LABEL":"Work Number",
                      "WORK_NUM_DESC_LABEL":"Description",
                      "CLIENT_LABEL":"Client",
                      "PM_LABEL":"Project Manager",
                      "LAST_SUB_DT_LABEL":"Last Submitted On",
                      "REM_REV_LABEL":"Remaining Rev"
                  }
                  formatedJson.DATA = [];

                   for (var i = 0; i < message.length; i++) {
                      formatedJson.DATA.push({
                      "WORK_NUM": message[i].WRK,
                      "WORK_NUM_DESC": message[i].DESCRIPTION,
                      "CLIENT": message[i].CLT,
                      "PM": message[i].PM,
                      "LAST_SUB_DT": message[i].SUBDT,
                      "REM_REV": calcs.calcValue(message[i].RMREV)
                      })
                   }
                     };
                        break;

                    case "PE":
                    if(message.length >= 0) {
                      formatedJson = {
                      "APR_FC_PE_LABEL": "Approved FC Brand PE",
                      "WORK_NUM_LABEL":"Work Number",
                      "WORK_NUM_DESC_LABEL":"Description",
                      "CLIENT_LABEL":"Client",
                      "PE_LABEL":"Brand PE",
                      "LAST_APPR_DT_LABEL":"Last Approved Date",
                      "REM_REV_LABEL":"Remaining Rev"
                  }
                  formatedJson.DATA = [];

                   for (var i = 0; i < message.length; i++) {
                      formatedJson.DATA.push({
                      "WORK_NUM": message[i].WRK,
                      "WORK_NUM_DESC": message[i].DESCRIPTION,
                      "CLIENT": message[i].CLT,
                      "PE": message[i].PE,
                      "LAST_APPR_DT": message[i].LAST_APPROVED,
                      "REM_REV": calcs.calcValue(message[i].RMREV)
                      })
                   }
                     };
                      break;
                };


        } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

        T2compippfdetails.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't2CompIPPFDetails', type: 'object'}
      });

};
