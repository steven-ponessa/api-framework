
'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compippfpopup) {

  T2compippfpopup.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }

          var formatedJson = {};
          try {
            formatedJson = {
              "data":[]
            };

            formatedJson.data.push({
              "WORK_NUM"  : message[0].WORK_NUM,
              "WORK_KEY":message[0].PROJ_KEY,
              "CONTRACT_KEY":message[0].CNTRCT_KEY,
              "WORK_NUM_DESC_LABEL":"Work Number Description",
              "WORK_DESC"  : message[0].WORK_DESC,
              "CNTRCT_LABEL":"Contract Number",
              "CNTRCT_NUM"  : message[0].CNTRCT_NUM,
              "PM_LABEL":"Project Manager",
              "PM"  : message[0].PM,
              "GROWTH_PLAT_LABEL":"Growth Platform",
              "GROWTH_PLAT"  : message[0].GROWTH_PLATFORM,
              "EXCL_RSN_LABEL":"Exclusion Reason",
              "EXCL_RSN"  : message[0].EXCL_REASON,
              "EXCL_APR_BY_LABEL":"Exclusion Approved By",
              "EXCL_APR_BY"  : message[0].EXCL_APR_BY,
              "EXCL_RSC_CODE_LABEL":"Exclusion Reason Code",
              "EXCL_RSC_CODE"  : message[0].EXCL_RSC_CODE,
              "EXCL_APR_ON_LABEL":"Exclusion Approved On",
              "EXCL_APR_ON"  : message[0].EXCL_APR_ON,
              "REMAIN_REV_LABEL":"Remaining Rev",
              "REMAIN_REV"  : calcs.calcValue(message[0].REMAIN_REV),
              "WBS_STATUS_LABEL":"WBS Status",
              "WBS_STATUS"  : message[0].WBS_STATUS,
              "CLIENT_LABEL":"Client",
              "CLIENT"  : message[0].CLIENT,
              "SERVICE_LINE_LABEL":"Service Line",
              "SERVICE_LINE"  : message[0].SERVICE_LINE,
              "MKT_LABEL":"Market",
              "MKT"  : message[0].MKT_DESC,
              "BRAND_PE_LABEL":"Brand PE",
              "BRAND_PE"  : message[0].BRAND_PE,
              "CNTRCT_SIGN_DT_LABEL":"Contract Sign Date",
              "CNTRCT_SIGN_DT"  : message[0].CNTRCT_SIGN_DT,
              "WBS_CREATE_DT_LABEL":"WBS Created Date",
              "WBS_CREATE_DT"  : message[0].WBS_CREATE_DT,
              "SECTOR_LABEL":"GB Sector",
              "SECTOR"  : message[0].SECTOR,
              "LAST_SUB_DATE_LABEL":"Last Submitted Date",
              "LAST_SUB_DATE"  : message[0].LAST_SUB_DATE,
              "LAST_APR_DATE_LABEL":"Last Approved Date",
              "LAST_APR_DATE"  : message[0].LAST_APR_DATE,
              "BRAND_PM_COMMENTS_LABEL":"Brand PM Comments",
              "BRAND_PM_COMMENTS"  : message[0].BRAND_PM_COMMENTS,
              "REV_LABEL":"Revenue",
              "GP_LABEL":"GP",
              "GP_PCT_LABEL":"GP%",
              "AP_LABEL":"AP",
              "AP_REV"  : calcs.calcValue(message[0].AP_REV),
              "AP_GP"  : calcs.calcValue(message[0].AP_GP),
              "AP_GP_PCT"  : calcs.formatPercentage100(message[0].AP_GP_PCT,1),
              "FC_LABEL":"FC",
              "FC_REV"  : calcs.calcValue(message[0].FC_REV),
              "FC_GP"  : calcs.calcValue(message[0].FC_GP),
              "FC_GP_PCT"  : calcs.formatPercentage100(message[0].FC_GP_PCT,1),
              "ITD_LABEL":"ITD",
              "ITD_REV"  : calcs.calcValue(message[0].ITD_REV),
              "ITD_GP"  : calcs.calcValue(message[0].ITD_GP),
              "ITD_GP_PCT"  : calcs.formatPercentage100(message[0].ITD_GP_PCT,1),
              "PC_LABEL":"PC",
              "PC_REV"  : calcs.calcValue(message[0].PC_REV),
              "PC_GP"  : calcs.calcValue(message[0].PC_GP),
              "PC_GP_PCT"  : calcs.formatPercentage100(message[0].PC_GP_PCT,1),
              "YTD_LABEL":"YTD",
              "YTD_REV"  : calcs.calcValue(message[0].YTD_REV),
              "YTD_GP"  : calcs.calcValue(message[0].YTD_GP),
              "YTD_GP_PCT"  : calcs.formatPercentage100(message[0].YTD_GP_PCT,1),
              "IPPF_URL": message[0].IPPF_URL
            });

          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2compippfpopup.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompIPPFPopup', type: 'object'}
    });

};
