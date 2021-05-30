
'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2comppgpopupsum) {

    T2comppgpopupsum.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }
          var formatedJson = {};
          try {
            formatedJson = {
              "data":[],
              "gbs_dms_scope":[],
              "pg_compliance":[]
            };

            formatedJson.data.push({
              "CNTRCT_NUM":message[0].CNTRCT_NUM,
              "CONTRACT_KEY":message[0].CNTRCT_KEY,
              "CLIENT_NM": message[0].CUSTOMER,
              "TCV": calcs.calcValue(message[0].TCV),
              "CNTRCT_DESC":message[0].CNTRCT_DESC,
              "WBS_START_DATE": message[0].WBS_START_DT,
              "DELI_START_DATE": message[0].DELI_START_DATE,
              "CONTRACT_SIGN_DATE": message[0].CONTRACT_SIGN_DATE,
              "BRAND_PM": message[0].BRAND_PM,
              "BRAND_PE": message[0].BRAND_PE,
              "PRACTICE": message[0].PRACTICE,
              "SECTOR": message[0].SECTOR,
              // Exempt_days & Pure_pre
              "EXEMPT_PERIOD_DAYS_LABEL":"Contract "+ message[0].EXEMPT_FLAG + " within "+ message[0].EXEMPT_DAYS + " days exemption period limit.",
              "EXEMPT_PERIOD_DAYS": message[0].EXEMPT_DAYS,
              "PCW_ONLY_PURE_PRE_LABEL":"Contract is PCW only, no active L2s (work numbers)",
              "PCW_ONLY_PURE_PRE": message[0].PURE_PRE, 
              //IPPF LINK
              "IPPF_URL": message[0].IPPF_URL
            });

            formatedJson.gbs_dms_scope.push({
              //GBS DMS SCOPE
              "PG_DMS_SCOPE_LABEL":"GBS DMS Scope",
              "PG_REQ_LABEL":"Phase Gates Required",
              "PG_REQ_SCOPE": (message[0].PG_REQ),
              "PG0_LABEL":"Phase Gate 0",
              "PG0_SCOPE": message[0].PG0_REQ,
              "PG1_LABEL":"Phase Gate 1",
              "PG1_SCOPE": message[0].PG1_REQ,
              "PG2_LABEL":"Phase Gate 2",
              "PG2_SCOPE": message[0].PG2_REQ,
              "PG3_LABEL":"Phase Gate 3",
              "PG3_SCOPE": message[0].PG3_REQ,
              "PG4_LABEL":"Phase Gate 4",
              "PG4_SCOPE": message[0].PG4_REQ,
            });

            formatedJson.pg_compliance.push({
              //PG COMPLIANCE
              "TYPE_LABEL": "Phase Gate Type",
              "ASSESSED_LABEL": "Assessed",
              "COMP_STATUS_LABEL": "Compliance Status",
              "RO_RESULT_LABEL": "Red or Orange Result",
              "RO_ACTIONS_LABEL": "R/O with Actions",
              "RO_OVERDUE_LABEL": "R/O Overdue Actions",         
              "PG0_TYPE": "Phase Gate 0",
              "PG0_ASSESSED": message[0].PG_O_ASSESSED,
              "PG0_CMPLNCE_COLOR": message[0].PG_O_CMPLNCE_COL, 
              "PG0_CMPLNCE": message[0].PG_O_CMPLNCE,
              "PG0_RED_ORANGE_RES": message[0].PG_0_RO_RES,
              "PG0_RED_ORANGE_ACTION_COLOR": message[0].PG_0_RO_AT_COL,
              "PG0_RED_ORANGE_ACTION": message[0].PG_0_RO_AT,
              "PG0_RED_ORANGE_ACTION_OVERDUE_COLOR": message[0].PG_0_RO_ATO_COL,
              "PG0_RED_ORANGE_ACTION_OVERDUE": message[0].PG_0_RO_ATO, 
              "PG1_4_TYPE": "Phase Gate 1-4",
              "PG1_4_ASSESSED": message[0].PG_1_4_ASSESSED, 
              "PG1_4_CMPLNCE_COLOR": message[0].PG_1_4_CMPLNCE_COL, 
              "PG1_4_CMPLNCE": message[0].PG_1_4_CMPLNCE,
              "PG1_4_RED_ORANGE_RES": message[0].PG_1_4_RO_RES, 
              "PG1_4_RED_ORANGE_ACTION_COLOR": message[0].PG_1_4_RO_AT_COL, 
              "PG1_4_RED_ORANGE_ACTION": message[0].PG_1_4_RO_AT, 
              "PG1_4_RED_ORANGE_ACTION_OVERDUE_COLOR": message[0].PG_1_4_RO_ATO_COL,
              "PG1_4_RED_ORANGE_ACTION_OVERDUE": message[0].PG_1_4_RO_ATO
            });

          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2comppgpopupsum.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompPGPopupSum', type: 'object'}
    });

};
