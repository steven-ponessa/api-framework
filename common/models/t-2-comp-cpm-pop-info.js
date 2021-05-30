'use strict';

var calcs = require("./utils/tieredLeakageCalcs"); /// do we need this??

module.exports = function(T2compcpmpopinfo) {

  T2compcpmpopinfo.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
            if (err) {
                return cb(err, null);
            }

            var formatedJson = {};
          try {
            formatedJson = {
              "CNTRCT_NUM_LABEL":"Contract No",
              "WBS_SHRT_DESC_LABEL":"WBS Short Description",
              "CLIENT_LABEL":"Client",
              "CLIENT_NUM_LABEL":"Client Number",
              "GEO_LABEL":"Geography",
              "MARKET_REGION_LABEL":"Market/Region",
              "COUNTRY_LABEL":"Country",
              "GRWTH_PLFRM_LABEL":"Growth Platform",
              "SERVICE_LINE_LABEL":"Service Line",
              "INDUSTRY_LABEL":"Industry",
              "PRACTICE_LABEL":"Practice",
              //"OPPORTUNITY_NUM_LABEL":"Opportunity Number",
              "CONTRACT_STATUS_LABEL":"Contract Status",
              "TCV_LABEL":"TCV $",
              "CQ_TO_PC_LKG_LABEL":"CQ to PC $",
              "WBS_STRT_DT_LABEL":"WBS Start Date",
              "WBS_END_DT_LABEL":"WBS End Date",
              "DELIVERY_STRT_DT_LABEL":"Delivery Start Date",
              "MOST_RCNT_CLAIM_DT_LABEL":"Most Recent Claim Date",
              "BRAND_PE_LABEL":"Brand PE",
              "BRAND_PM_LABEL":"Brand PM",
              "CMPLX_PRGM_MNGR_LABEL":"Complex Program Manager",
              "BRAND_DE_LABEL":"Brand DE",
              //"DMS_SCOPE_LABEL":"DMS Scope",
              "CPM_COMPL_LABEL":"CPM Compliance",
              "CPM_ASSGND_LABEL":"CPM Assigned",
              "CPM_EXCPTN_DT_LABEL":"CPM Exception Expiry",
              "CPM_EXCPTN_RSN_LABEL":"CPM Exception Reason",

              "data":[]
            };

            if (message.length > 0 ) {
              formatedJson.data.push({
                  "CNTRCT_NUM"  : message[0].CNTR_NUM,
                  "CNTRCT_KEY":message[0].CNTR_KEY,
                  "WBS_SHRT_DESC":message[0].WBS_SORT_DESC,
                  "CLIENT":message[0].IPPF_CUST,
                  "CLIENT_NUM":message[0].CLIENT_NUM,
                  "GEO":message[0].GEO,
                  "MARKET_REGION":message[0].MKT,
                  "COUNTRY":message[0].CTRY,
                  "GRWTH_PLFRM":message[0].GBS_GRWTH_PLTM,
                  "SERVICE_LINE":message[0].SVC_LN,
                  "INDUSTRY":message[0].INDUST,
                  "PRACTICE":message[0].PRACT,
                  //"OPPORTUNITY_NUM":message[0].OPP_NUM,
                  "CONTRACT_STATUS":message[0].CNTR_STAT,
                  "TCV": message[0].TCV_AMT,
                  "CQ_TO_PC_LKG":message[0].CQ_TO_PC_LKG_AMT,
                  "WBS_STRT_DT":message[0].WBS_START_DT,
                  "WBS_END_DT":message[0].WBS_END_DT,
                  "DELIVERY_STRT_DT":message[0].DELIVERY_STRT_DT,
                  "MOST_RCNT_CLAIM_DT":message[0].MOST_REC_CLAIM_DT,
                  "BRAND_PE":message[0].BRAND_PE,
                  "BRAND_PM":message[0].BRAND_PM,
                  "CMPLX_PRGM_MNGR":message[0].CMPLEX_PROGRAM_MNGR,
                  "BRAND_DE":message[0].BRAND_DE,
                  //"DMS_SCOPE":message[0].DMS_SCOPE,
                  "CPM_COMPL":message[0].CPM_COMP,
                  "CPM_ASSGND":message[0].CPM_ASSGND,
                  "CPM_EXCPTN_DT":message[0].CPM_EXCPTN_DT,
                  "CPM_EXCPTN_RSN":message[0].CPM_EXCPTN_RSN,
                  "SME_LINK":message[0].SME_LNK,
                  "IPPF_LINK":message[0].IPPF_URL,
              });
            }; // End if not empty
  
            } catch (e) {
              formatedJson = {"msg" : e.message}
            }

          cb(err, formatedJson);
        });
    };

    T2compcpmpopinfo.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompCPMPopInfo', type: 'object'}
    });

};
