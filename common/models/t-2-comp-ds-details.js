'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2compdsdetails) {

    T2compdsdetails.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message){
            if (err) {
                return cb(err, null);
            }

            try {

            var formatedJson = {
                // shared for either Comp or Non Comp
                "DATA_MESSAGE": " ",
                "CNTRCT_NUM_HDR":"Contract No.",
                "CLIENT_NAME_HDR":"Client Name",
                "TCV_HDR":"TCV $",
                "PM_NAME_HDR":"PM Name",
                "WBS_START_DATE_HDR":"WBS Start Date",
                "WBS_END_DATE_HDR":"WBS End Date",

                // for Compliant only
                "DEL_START_DATE_HDR":"Delivery Start Date",

                // for Non Compliant only
                "PM_SUB_HDR":"PM Submission",
                "PE_APPROVAL_HDR":"PE Approval",
                "DEL_START_OVER_DAYS_HDR":"Delivery Start Overdue days",

                //rest of columns needed
                "GEO_HDR":"Geography",
                "MARKET_HDR":"Market / Region",
                "COUNTRY_HDR":"Country",
                "GROWTH_PLATFORM_HDR":"Growth Platform",
                "SERVICE_LINE_HDR":"Service Line",
                "PRACTICE_HDR":"Practice",
                "IPPF_INDUSTRY_SD_HDR":"IFFP Industry S&D",
                "IPPF_INDUSTRY_LOCAL_HDR":"IPPF Industry local",
                "IPPF_SECTOR_BRAND_HDR":"IPPF Sector (Brand)",
                "IPPF_SECTOR_SD_HDR":"IPPF Sector (S&D)",
                "IPPF_SECTOR_GB_HDR":"IPPF Sector (GB Overlay)",
                "IPPF_SECTOR_LOCAL_HDR":"IPPF Secor local",
                "CNTRCT_STATUS_HDR":"Contract Status",
                "CNTRCT_SIGN_DT_HDR":"Contract Sign Date",
                "CNTRCT_END_DT_HDR":"Contract End Date",
                "PROCESS_IND_HDR":"Process Indicator",
                "BRAND_PM_HDR":"Brand PM Name",
                "BRAND_PE_HDR":"Brand PE Name",
                "BRAND_DE_HDR":"Brand DE Name",
                "DMS_SCOPE_HDR":"GBS DMS Scope",
                "WBS_SHORT_DESC_HDR":"WBS Short Description",
                "CNTRCT_STATUS_CD_HDR":"Contract Status Code",
                "WBS_STATUS_HDR":"WBS IPPF Status",
                "DEL_START_PROC_COMPL_HDR":"Delivery Start process completion",
                "DEL_START_STATUS_HDR":"Delivery Start status",
                "DEL_START_SUB_HDR":"Delivery Start Submitter",
                "DEL_START_APPR_HDR":"Delivery Start Approver",
                "PM_COMMENTS_HDR":"Brand PM Comments",
                "PE_COMMENTS_HDR":"Brand PE Comments",
                "DEL_EXC_HDR":"Delivery Excellence",
                "SYS_CNTRCT_NBR_HDR":"System Contract Number",
                "DEL_START_OVER_CAT_HDR":"Delivery Start Overdue Category",
                "IPPF_CUST_NBR_HDR":"IPPF Customer Number",
                "CPM_REQ_HDR":"GBS CPM required",
                "PLAN_GP_PCT_HDR":"Plan GP %",
                "RECENT_CLAIM_DT_HDR":"Most Recent Claim Date",
                "DEL_START_TGT_COMPL_DT_HDR":"Delivery Start Target Completion date",

                "DATA":[]
            };

            if (!message.length <= 0) {

                // color will be #24A148 for Compliance or #DA1E28 for Non Compliance depending on compl value
                // default is set to 0, for Compliant... might change based on DB values

/*                 var compColor = '';
                switch (message[0].COMPL) { 
                case "0":
                compColor = "#24A148";
                    break;
                default:
                compColor = "#DA1E28";
                    break;
                };  */              

                for (var i = 0; i < message.length; i++) {
                    formatedJson.DATA.push({
                        //"COLOR": compColor,
                        "CNTRCT_NUM" : message[i].CONTRACT,
                        "CLIENT_NAME" : message[i].CLIENT_NAME,
                        "TCV" : message[i].TCV,
                        "PM_NAME" : message[i].PM_NAME,
                        "WBS_START_DATE" : message[i].WBS_START_DATE,
                        "WBS_END_DATE" :  message[i]. WBS_END_DATE,
                        "DEL_START_DATE" : message[i].DELIVERY_STARTDATE,
                        "PM_SUB" : message[i].PM_SUBMISSION_STATUS,
                        "PE_APPROVAL" : message[i].PM_APPROVED_STATUS,
                        "DEL_START_OVER_DAYS" : message[i].OVERDUE_DAYS,
                        "GEO": message[i].GEO,
                        "MARKET": message[i].MARKET,
                        "COUNTRY": message[i].COUNTRY,
                        "GROWTH_PLATFORM": message[i].GROWTH_PLATFORM,
                        "SERVICE_LINE": message[i].SERVICE_LINE,
                        "PRACTICE": message[i].PRACTICE,
                        "IPPF_INDUSTRY_SD": message[i].IPPF_INDUSTRY_SD,
                        "IPPF_INDUSTRY_LOCAL": message[i].IPPF_INDUSTRY_LOCAL,
                        "IPPF_SECTOR_BRAND": message[i].IPPF_SECTOR_BRAND,
                        "IPPF_SECTOR_SD": message[i].IPPF_SECTOR_SD,
                        "IPPF_SECTOR_GB": message[i].IPPF_SECTOR_GB,
                        "IPPF_SECTOR_LOCAL": message[i].IPPF_SECTOR_LOCAL,
                        "CNTRCT_STATUS": message[i].CNTRCT_STATUS,
                        "CNTRCT_SIGN_DT": message[i].CNTRCT_SIGN_DT,
                        "CNTRCT_END_DT": message[i].CNTRCT_END_DT,
                        "PROCESS_IND": message[i].PROCESS_IND,
                        "BRAND_PM": message[i].BRAND_PM,
                        "BRAND_PE": message[i].BRAND_PE,
                        "BRAND_DE": message[i].BRAND_DE,
                        "DMS_SCOPE": message[i].DMS_SCOPE,
                        "WBS_SHORT_DESC": message[i].WBS_SHORT_DESC,
                        "CNTRCT_STATUS_CD": message[i].CNTRCT_STATUS_CD,
                        "WBS_STATUS": message[i].CNTRCT_STATUS, 
                        "DEL_START_PROC_COMPL": message[i].DEL_START_PROC_COMPL,
                        "DEL_START_STATUS": message[i].DEL_START_STATUS,
                        "DEL_START_SUB": message[i].DEL_START_SUB,
                        "DEL_START_APPR": message[i].DEL_START_APPR,
                        "PM_COMMENTS": message[i].PM_COMMENTS,
                        "PE_COMMENTS": message[i].PE_COMMENTS,
                        "DEL_EXC": message[i].DEL_EXC,
                        "SYS_CNTRCT_NBR": message[i].SYS_CNTRCT_NBR,
                        "DEL_START_OVER_CAT": message[i].DEL_START_OVER_CAT,
                        "IPPF_CUST_NBR": message[i].IPPF_CUST_NBR,
                        "CPM_REQ": message[i].CPM_REQ,
                        "PLAN_GP_PCT": message[i].PLAN_GP_PCT,
                        "RECENT_CLAIM_DT": message[i].RECENT_CLAIM_DT,
                        "DEL_START_TGT_COMPL_DT": message[i].DEL_START_TGT_COMPL_DT,
                        //"NONCOMPLBOOL" : message[i].NONCOMPLBOOL,
                        "CMPLNT_CNT" : message[i].CMPLNT_CNT
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

    T2compdsdetails.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't2CompDSDetails', type: 'object'}
      });

};
