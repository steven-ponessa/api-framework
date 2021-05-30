'use strict';

var calcs = require("./utils/tieredLeakageCalcs"); /// do we need this??

module.exports = function(T2pmproccomppgpopupdet) {

    T2pmproccomppgpopupdet.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
            if (err) {
                return cb(err, null);
            }

            try {
              var dataMessage = "No data available";
              var formatedJson = {
                  "DATA_MESSAGE": dataMessage,
                  "pg_assesment_status":[],
                  "pg_result":[]
            };

            if (!message.length <= 0) {
              dataMessage = "";
              formatedJson.DATA_MESSAGE = dataMessage;

                  formatedJson.pg_assesment_status.push({
                      //Phase Gate Assessment Status
                      "CNTRCT_NUM"  : message[0].CNTRCT_NUM,
                      "CONTRACT_KEY":message[0].CNTRCT_KEY,
                      "PG_ASSESSMENT_STATUS_LABEL":"Phase Gate Assessment Status",
                      "PG_TYPE_LABEL":"Phase Gate Type",
                      "PG_EXCEPTION_LABEL":"Exception",
                      "PG_SCHEDULED_LABEL":"Scheduled",
                      "PG_SCHEDULED_OVERDUE_LABEL":"Scheduled Overdue",
                      "PG_IN_PROGRESS_LABEL":"In Progress",
                      "PG_IN_PROGRESS_OVERDUE_LABEL":"In Progress Overdue",
                      "PG_COMPLETE_LABEL":"Complete IPPF",
                      "PG_COMPLETE_LEGACY_LABEL":"Complete Legacy PG",
                      "PG_0_TYPE":"Phase Gate 0",
                      "PG_0_EXCPTN": message[0].PG_0_EXCPTN,
                      "PG_0_SKE": message[0].PG_0_SKE,
                      "PG_0_SKEO": message[0].PG_0_SKEO,
                      "PG_0_IPR": message[0].PG_0_IPR,
                      "PG_0_IPRO": message[0].PG_0_IPRO,
                      "PG_0_CMPLT": message[0].PG_0_CIPPF,
                      "PG_0_CMPLT_LEGACY": message[0].PG_0_CLGCY,                 
                      "PG_1_TYPE":"Phase Gate 1",
                      "PG_1_EXCPTN": message[0].PG_1_EXCPTN,
                      "PG_1_SKE": message[0].PG_1_SKE,
                      "PG_1_SKEO": message[0].PG_1_SKEO,
                      "PG_1_IPR": message[0].PG_1_IPR,
                      "PG_1_IPRO": message[0].PG_1_IPRO,
                      "PG_1_CMPLT": message[0].PG_1_CIPPF,
                      "PG_1_CMPLT_LEGACY": message[0].PG_1_CLGCY,
                      "PG_2_TYPE":"Phase Gate 2",
                      "PG_2_EXCPTN": message[0].PG_2_EXCPTN,
                      "PG_2_SKE": message[0].PG_2_SKE,
                      "PG_2_SKEO": message[0].PG_2_SKEO,
                      "PG_2_IPR": message[0].PG_2_IPR,
                      "PG_2_IPRO": message[0].PG_2_IPRO,
                      "PG_2_CMPLT": message[0].PG_2_CIPPF,
                      "PG_2_CMPLT_LEGACY": message[0].PG_2_CLGCY,
                      "PG_3_TYPE":"Phase Gate 3",
                      "PG_3_EXCPTN": message[0].PG_3_EXCPTN,
                      "PG_3_SKE": message[0].PG_3_SKE,
                      "PG_3_SKEO": message[0].PG_3_SKEO,
                      "PG_3_IPR": message[0].PG_3_IPR,
                      "PG_3_IPRO": message[0].PG_3_IPRO,
                      "PG_3_CMPLT": message[0].PG_3_CIPPF,
                      "PG_3_CMPLT_LEGACY": message[0].PG_3_CLGCY,
                      "PG_4_TYPE":"Phase Gate 4",
                      "PG_4_EXCPTN": message[0].PG_4_EXCPTN,
                      "PG_4_SKE": message[0].PG_4_SKE,
                      "PG_4_SKEO": message[0].PG_4_SKEO,
                      "PG_4_IPR": message[0].PG_4_IPR,
                      "PG_4_IPRO": message[0].PG_4_IPRO,
                      "PG_4_CMPLT": message[0].PG_4_CIPPF,
                      "PG_4_CMPLT_LEGACY": message[0].PG_4_CLGCY
                  });

                  formatedJson.pg_result.push({
                      //Phase Gate Result
                      "PG_RESULTS_LABEL":"Phase Gate Results",
                      "PG_TYPE_LABEL":"Phase Gate Type",
                      "PG_GREEN_LABEL":"Green Result",
                      "PG_YELLOW_LABEL":"Yellow Result",
                      "PG_ORANGE_LABEL":"Orange Result",
                      "PG_RED_LABEL":"Red Result",
                      "PG_RO_ACTIONS_LABEL":"R/O with Actions Created",
                      "PG_RO_ACTIONS_OVERDUE_LABEL":"R/O with Overdue Actions",
                      "PG_0_TYPE":"Phase Gate 0",
                      "PG_0_GREEN":message[0].PG_0_GREEN,
                      "PG_0_YELLOW":message[0].PG_0_YELLOW,
                      "PG_0_ORANGE":message[0].PG_0_ORANGE,
                      "PG_0_RED":message[0].PG_0_RED,
                      "PG_0_ROAT":message[0].PG_0_ROAT,
                      "PG_0_ROATO":message[0].PG_0_ROATO,
                      "PG_1_TYPE":"Phase Gate 1",
                      "PG_1_GREEN":message[0].PG_1_GREEN,
                      "PG_1_YELLOW":message[0].PG_1_YELLOW,
                      "PG_1_ORANGE":message[0].PG_1_ORANGE,
                      "PG_1_RED":message[0].PG_1_RED,
                      "PG_1_ROAT":message[0].PG_1_ROAT,
                      "PG_1_ROATO":message[0].PG_1_ROATO,
                      "PG_2_TYPE":"Phase Gate 2",
                      "PG_2_GREEN":message[0].PG_2_GREEN,
                      "PG_2_YELLOW":message[0].PG_2_YELLOW,
                      "PG_2_ORANGE":message[0].PG_2_ORANGE,
                      "PG_2_RED":message[0].PG_2_RED,
                      "PG_2_ROAT":message[0].PG_2_ROAT,
                      "PG_2_ROATO":message[0].PG_2_ROATO,
                      "PG_3_TYPE":"Phase Gate 3",
                      "PG_3_GREEN":message[0].PG_3_GREEN,
                      "PG_3_YELLOW":message[0].PG_3_YELLOW,
                      "PG_3_ORANGE":message[0].PG_3_ORANGE,
                      "PG_3_RED":message[0].PG_3_RED,
                      "PG_3_ROAT":message[0].PG_3_ROAT,
                      "PG_3_ROATO":message[0].PG_3_ROATO,
                      "PG_4_TYPE":"Phase Gate 4", 
                      "PG_4_GREEN":message[0].PG_4_GREEN,
                      "PG_4_YELLOW":message[0].PG_4_YELLOW,
                      "PG_4_ORANGE":message[0].PG_4_ORANGE,
                      "PG_4_RED":message[0].PG_4_RED,
                      "PG_4_ROAT":message[0].PG_4_ROAT,
                      "PG_4_ROATO":message[0].PG_4_ROATO,
                      //including ippf link
                      "IPPF_URL": message[0].IPPF_URL
                  });
                }; // end if empty message

          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2pmproccomppgpopupdet.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2PMProcCompPGPopupDet', type: 'object'}
    });

};
