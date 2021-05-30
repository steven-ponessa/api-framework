'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdspopup) {

  T2compdspopup.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }

          var formatedJson = {};
          try {
            formatedJson = {
              "CNTRCT_NUM_LABEL":"Contract Number",
              "IPPF_CUSTOMER_LABEL":"IPPF Customer",
              "TCV_LABEL":"TCV",
              "CNTRCT_SIGN_DATE_LABEL":"Contract Signature Date",
              "DEL_START_DATE_LABEL":"Delivery Start Date",
              "WBS_START_DATE_LABEL":"WBS Start Date",
              "DEL_START_CHECKLIST_LABEL":"Delivery Start Checklist",
              "DRAFT_LABEL":"Draft",
              "LAST_SUBMIT_LABEL":"Last Submitted",
              "CNTRCT_SETUP_LABEL":"Contract Setup",
              "COS_DEL_START_LABEL":"CoS (Delivery Start)",
              "GBS_LAUNCH_LABEL":"GBS Launch",
              "GDPR_ASSESSMENT_LABEL":"GDPR Assessment (Delivery Start)",
              "SEVEN_KEYS_LABEL":"7 Keys (Delivery Start)",
              "GB_SECTOR_LABEL": "GB Sector",
              "COUNTRY_LABEL":"Country",
              "WBS_DESC_LABEL":"WBS Short Description",
              "BRAND_PM_GEN_REM_LABEL":"Brand PM General Remarks",
              "BRAND_PM_GEN_SUB_LABEL":"Brand PM Submission",
              "BRAND_PM_NAME_LABEL":"Brand PM Name/ID",
              "BRAND_PM_COMMENTS_LABEL":"Brand PM Comments",
              "BRAND_PE_NAME_LABEL":"Brand PE Name/ID",
              "BRAND_PE_APRV_LABEL":"Brand PE Approval",
              "BRAND_PE_COMMENTS_LABEL":"Brand PE Comments",
              "IPPF_LINK_LABEL": "IPPF",
              "PM_LINK_LABEL": "PHD PM",
              "data":[]
              };
              
                formatedJson.data.push({

                  "CONTRACT": message[0].CONTRACT,
                  "CONTRACT_KEY":message[0].CNTRCT_KEY,
                  "CLIENT_NAME": message[0].CLIENT_NAME,	
                  "TCV": calcs.calcValue(message[0].TCV),	
                  "CONTRACT_DATE": message[0].CONTRACT_DATE,	
                  "DELIVERY_STARTDATE": message[0].DELIVERY_STARTDATE,	
                  "WBS_START_DATE": message[0].WBS_START_DATE,	
                  "CONTRACTSETUPCOLOR": message[0].CONTRACTSETUPCOLOR,	
                  "COSCOLOR": message[0].COSCOLOR,	
                  "GBS_LAUNCHCOLOR": message[0].GBS_LAUNCHCOLOR,	
                  "GDPRCOLOR": message[0].GDPRCOLOR,	
                  "SEVENKEYSCOLOR": message[0].SEVENKEYSCOLOR,	
                  "DCONTRACTSETUPCOLOR": message[0].DCONTRACTSETUPCOLOR,	
                  "DCOSCOLOR": message[0].DCOSCOLOR,	
                  "DGBS_LAUNCHCOLOR": message[0].DGBS_LAUNCHCOLOR,	
                  "DGDPRCOLOR": message[0].DGDPRCOLOR,	
                  "DSEVENKEYSCOLOR": message[0].DSEVENKEYSCOLOR,	
                  "WBSSHORTDESC": message[0].WBSSHORTDESC,
                  "IPPF_SECTOR": message[0].IPPF_SECTOR,	
                  "COUNTRY": message[0].COUNTRY,	
                  "BRANDPM_GENCOM": message[0].BRANDPM_GENCOM,	
                  "PM_SUBMISSION_STATUS": message[0].PM_SUBMISSION_STATUS,	
                  "PM_NAME": message[0].PM_NAME,	
                  "PM_COMMENTS": message[0].PM_COMMENTS,	
                  "PE_NAME": message[0].PE_NAME,	
                  "PE_APPROVAL_STATUS": message[0].PE_APPROVAL_STATUS,	
                  "PE_COMMENT": message[0].PE_COMMENT,	
                  "IPFF_DS_URL": message[0].IPFF_DS_URL,	
                  "NONCOMPLBOOL": message[0].NONCOMPLBOOL
                });

          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2compdspopup.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompDSPopup', type: 'object'}
    });

};
