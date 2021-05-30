'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdmsoldevstdpopoppty) {

  T2compdmsoldevstdpopoppty.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }

        try {
          var metricVal = "";
          switch (req.query['metric']) {
              case 'NAPR':
                metricVal = "APR";            
                  break;
              default:
                metricVal = "APR";
          };           
          var dataMessage = '';
          var formatedJson = {};

          if ( metricVal == 'APR' ) {
            formatedJson = {
              "DATA_MESSAGE": dataMessage,
              "OPPTY_NUM_LABEL":"Opportunity No",
              "PROFILE_MSR_LABEL":"Profile is Measured",
              "CLIENT_NAME_LABEL":"Client Name",
              "PROJ_NAME_LABEL":"Project Name",
              "GRWTH_PLFRM_LABEL":"Growth Platform",
              "SERVICE_LINE_LABEL":"Service Line",
              "PRACTICE_LABEL":"Practice",
              "SUB_PRACTICE_LABEL":"Sub Practice",
              "GEO_LABEL":"Geography",
              "MARKET_REGION_LABEL":"Market",
              "COUNTRY_LABEL":"Country",
              "SECTOR_LABEL":"Sector",
              "INDUSTRY_LABEL":"Industry",
              "DEV_APPROVED_LABEL": "Deviation Approved?",
              "METHOD_LABEL": "Method",
              "DEV_TYPE_LABEL": "Type of Deviation",
              "NON_COMP_CAT_LABEL": "Non-Compliant Category",
              "NON_STD_USED_LABEL": "Non-Standard PM&T Used",
              "DEV_REASON_LABEL": "Deviation Reason",
              "ADD_DEV_REASON_LABEL": "Additional Deviation Reason",
              "APPROVER_LABEL": "Approver",
              "SOL_EXCEL_APPR_DATE_LABEL":"Solution Excellence Approval Date",
              "SOL_MANAGER_LABEL":"Solution Manager",
              "OPPTY_OWNER_LABEL":"Opportunity Owner",

              "data":[]
              };

              if (!message.length <= 0) {
                formatedJson.data.push({
                  "OPPTY_NUM": message[0].OPPTNY_NUM,
                  "OPPTY_KEY": message[0].OPPTNY_KEY,
                  "PROFILE_MSR": message[0].PRFL_MEASURED,
                  "CLIENT_NAME": message[0].CLIENT,
                  "PROJ_NAME": message[0].PROJECT,              
                  "GRWTH_PLFRM": message[0].GRTH_PLFM_DESC,
                  "SERVICE_LINE": message[0].SVC_LINE_NM,
                  "PRACTICE": message[0].PRACTICE_NM,
                  "SUB_PRACTICE": message[0].SUB_PRACTICE,
                  "GEO": message[0].GEO,
                  "MARKET_REGION": message[0].MARKET,
                  "COUNTRY": message[0].CTRY_NM,
                  "SECTOR": message[0].SCTR_GB_NM,
                  "INDUSTRY": message[0].INDSTRY_CMR_NM,
                  "DEV_APPROVED":  message[0].DEV_APRVD,
                  "METHOD": message[0].METHOD,
                  "DEV_TYPE": message[0].DEV_TYPE,
                  "NON_COMP_CAT": message[0].NOT_COMPL_CAT,
                  "NON_STD_USED": message[0].NOT_STNDRT_PMT,
                  "DEV_REASON": message[0].DEV_REASON, 
                  "ADD_DEV_REASON": message[0].NON_STNDRT_DEV_REASON,
                  "APPROVER": message[0].APRVR_NM,
                  "OPPTY_STATUS": message[0].OPPTNY_STAT,
                  "SOL_EXCEL_APPR_DATE": message[0].SLTN_EXC_APRVL_DT,
                  "SOL_MANAGER": message[0].SLTN_MNGR,
                  "OPPTY_OWNER": message[0].OPPTNY_OWNR
                });
              } else {
                formatedJson.DATA_MESSAGE = "No Data Available";
              }; //end if empty

            }; // end popup type check, Compliance vs Deviations

          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2compdmsoldevstdpopoppty.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompDMSolDevStdPopOppty', type: 'object'}
    });

};
