'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdmsolcomstdpopoppty) {

  T2compdmsolcomstdpopoppty.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }

        try {
          var metricVal = "";
          switch (req.query['metric']) {
              case 'NCOM':
                metricVal = "COM";            
                  break;
              default:
                metricVal = "COM";
          };           
          var dataMessage = '';
          var formatedJson = {};

          if ( metricVal == 'COM' ) {
            formatedJson = {
              //Solutioning Compliance / Non Compliance fields, common between both
              "DATA_MESSAGE": dataMessage,
              "OPPTY_NUM_LABEL":"Opportunity No",
              "PROFILE_MSR_LABEL":"Profile is Measured",
              "PROFILE_SUB_LABEL":"Profile is Submitted",
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
              "FULLY_COMPLIANT_LABEL": "Profile Fully Compliant (no deviations)",
              "APP_DEVIATIONS_LABEL": "Approved Deviations #",
              "UNAPP_DEVIATIONS_LABEL": "Unapproved Deviations #",
              "NON_COMP_CAT_LABEL": "Non-Compliant Categories",
              "METHOD_LABEL": "Method",
              "OTHER_METHOD_LABEL": "Other Methods",
              "DEV_REASON_LABEL": "Deviation Reason for Method",
              "COMPLEX_FLAG_LABEL":"Complex Flag",
              "MOSIAC_METHOD_LABEL": "Mosiac Method Used?",
              "OPPTY_STATUS_LABEL":"Opportunity Status",
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
                  "PROFILE_SUB": message[0].PRFL_SUBMTD,
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
                  "FULLY_COMPLIANT": message[0].PRFL_FULLY_CMPL,
                  "APP_DEVIATIONS": message[0].APRVD_DEV,
                  "UNAPP_DEVIATIONS": message[0].NON_APRVD_DERIVATIONS,
                  "NON_COMP_CAT": message[0].NOT_CMPLNT_CAT,
                  "METHOD": message[0].METHOD,
                  "OTHER_METHOD": message[0].OTHER_METHODS,
                  "DEV_REASON": message[0].DEV_REASONS,
                  "COMPLEX_FLAG": message[0].CMPLX_FLG,
                  "MOSIAC_METHOD": message[0].MOSAIC_METHOD_USED,
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

    T2compdmsolcomstdpopoppty.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompDMSolComStdPopOppty', type: 'object'}
    });

};
