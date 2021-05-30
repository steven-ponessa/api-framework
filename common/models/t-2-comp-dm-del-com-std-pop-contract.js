'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdmdelcomstdpopcontract) {

  T2compdmdelcomstdpopcontract.processChild = function(req, filter, cb) {
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
              //Delivery Compliance / Non Compliance fields, common between both
              "DATA_MESSAGE": dataMessage,
              "DATE":"",
              "CNTRCT_NUM_LABEL":"Contract No",
              "PROFILE_MSR_LABEL":"Profile is Measured",
              "PROFILE_SUB_LABEL":"Profile is Submitted",
              "OPPTY_NUM_LABEL":"Opportunity Number",
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
              "CNTRCT_START_DATE_LABEL":"Contract Start Date",
              "CNTRCT_END_DATE_LABEL":"Contract End Date",
              "CNTRCT_STATUS_LABEL":"Contract Status",
              "CNTRCT_PM_LABEL":"Contract Project Manager",
              "CNTRCT_PE_LABEL":"Contract PE",
              "LEAD_PARTNER_LABEL":"Lead Partner",

              "data":[]
              };

                if (!message.length <= 0) { 
                  formatedJson.DATE = message[0].DATA_LOAD_DESC;
                  formatedJson.data.push({
                    "CNTRCT_NUM": message[0].CNTRCT_NUM,
                    "CNTRCT_KEY":message[0].CNTRCT_KEY,
                    "PROFILE_MSR": message[0].PRFL_MEASURED,
                    "PROFILE_SUB": message[0].PRFL_SUBMTD,
                    "OPPTY_NUM": message[0].OPPTNY_NUM,
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
                    "CNTRCT_START_DATE": message[0].CNTRCT_STRT_DT,
                    "CNTRCT_END_DATE": message[0].CNTRCT_END_DT,
                    "CNTRCT_STATUS": message[0].CNTRCT_STATUS,
                    "CNTRCT_PM": message[0].CNTRCT_PM,
                    "CNTRCT_PE": message[0].CNTRCT_PE,
                    "LEAD_PARTNER": message[0].LEAD_PRTNR,
                    "IPFF_URL": message[0].IPPF_URL
                  });
                } else {
                  formatedJson.DATA_MESSAGE = "No Data Available";
                } //end if empty

              }; // end popup type check

          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2compdmdelcomstdpopcontract.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompDMDelComStdPopContract', type: 'object'}
    });

};
