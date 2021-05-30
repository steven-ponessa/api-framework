
'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compcospopup) {

    T2compcospopup.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }

          var formatedJson = {};

          try {
            formatedJson = {
              "CNTRCT_NUM_LABEL":"Contract Number",
              "TCV_LABEL":"TCV",
              "IPPF_CUST_NM_LABEL":"IPPF Customer",
              "IPPF_INDUSTRY_SND_LABEL":"IPPF Industry S&D",
              "WBS_START_DATE_LABEL":"WBS Start Date",
              "COMPLETED_BY_LABEL":"Completed By",
              "COMPLETED_DATE_LABEL":"Completed Date",
              "DEL_START_DATE_LABEL":"Delivery Start Date",
              "OVERALL_COS_LABEL":"Overall CoS",
              "IPPF_SECTOR_LABEL":"IPPF Sector (GB Overlay)",
              "COUNTRY_LABEL":"Country",
              "CNTRCT_SIGN_DATE_LABEL":"Contract Signature Date",
              "BRAND_PM_LABEL":"Brand PM Name",
              "BRAND_PE_APPR_LABEL":"Brand PE Approval",
              "BRAND_PM_COMMENTS_LABEL":"Brand PM Comments",
              "BRAND_PE_COMMENTS_LABEL":"Brand PE Comments",
              "CNTRCT_STATUS_CD_LABEL":"Contract Status Code",
              "WBS_DESC_LABEL":"WBS Short Description",
              "GENERAL_COMMENTS_LABEL":"General Comments",
              "data":[],
            };
            if (message.length > 0 ) {
              formatedJson.data.push({
                "CNTRCT_NUM":message[0].CNTRCT_NUM,
                "CONTRACT_KEY":message[0].CNTRCT_KEY,
                "TCV": calcs.calcValue(message[0].TCV),
                "IPPF_CUST_NM": message[0].CUSTOMER,
                "IPPF_INDUSTRY_SND": message[0].IPPF_INDUSTRY,
                "WBS_START_DATE": message[0].WBS_START_DT,
                "COMPLETED_BY": message[0].COMPLETED_BY,
                "COMPLETED_DATE": message[0].COMPLETED_DT,
                "DEL_START_DATE": message[0].DELI_START_DT,
                "OVERALL_COS_COLOR": message[0].OVERALL_COS_COLOR, 
                "IPPF_SECTOR": message[0].IPPF_SECTOR,
                "COUNTRY": message[0].COUNTRY,
                "CNTRCT_SIGN_DATE": message[0].CNTRCT_SIGN_DATE,
                "BRAND_PM": message[0].BRAND_PM,
                "BRAND_PE_APPR": message[0].BRAND_PE_APR,
                "BRAND_PM_COMMENTS": message[0].PM_COMNT,
                "BRAND_PE_COMMENTS": message[0].PE_COMNT,
                "CNTRCT_STATUS_CD": message[0].CNTRCT_STATUS_CD,
                "WBS_DESC":message[0].CNTRCT_DESC,
                "GENERAL_COMMENTS":message[0].GEN_COMNT,
                "IPPF_URL": message[0].IPPF_URL
            });
          }; // End if not empty

          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2compcospopup.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompCOSPopup', type: 'object'}
    });

};
