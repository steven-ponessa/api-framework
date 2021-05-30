'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdmpopcontract) {

  T2compdmpopcontract.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }

          try {
            var metricVal = "";
            switch (req.query['metric']) {
                case 'COM':
                  metricVal = "COM";
                    break;
                case 'NCOM':
                  metricVal = "COM";            
                    break;
                case 'NSUB':
                  metricVal = "SUB";            
                    break;
                default:
                  metricVal = "SUB";
            }; 

            var dataMessage = '';
            var formatedJson = {};

            if ( metricVal == 'SUB' ) {
              formatedJson = {
              //Delivery Submitted / Not Submitted fields, common between both
              "DATA_MESSAGE": dataMessage,
              "CNTRCT_NUM_LABEL":"Contract No",
              "PROFILE_MSR_LABEL":"Profile is Measured",
              "PROFILE_SUB_LABEL":"Profile is Submitted",
              "CLIENT_NAME_LABEL":"Client Name",
              "GEO_LABEL":"Geography",
              "MARKET_REGION_LABEL":"Market",              
              "GRWTH_PLFRM_LABEL":"Growth Platform",
              "SERVICE_LINE_LABEL":"Service Line",
              "PRACTICE_LABEL":"Practice",
              "COUNTRY_LABEL":"Country",
              "SECTOR_LABEL":"Sector",
              "INDUSTRY_LABEL":"Industry",
              "CNTRCT_START_DATE_LABEL":"Contract Start Date",
              "CNTRCT_END_DATE_LABEL":"Contract End Date",
              "CNTRCT_STATUS_LABEL":"Contract Status",
              "COMPLEX_FLAG_LABEL":"Complex Flag",
              "CNTRCT_PM_LABEL":"Contract Project Manager",
              "CNTRCT_PE_LABEL":"Contract PE",
              "LEAD_PARTNER_LABEL":"Lead Partner",

              "data":[]
              };

                if (!message.length <= 0) {
                  formatedJson.data.push({
                    "CNTRCT_NUM": message[0].CNTRCT_NUM,
                    "CNTRCT_KEY":message[0].CNTRCT_KEY,
                    "ID": message[0].ID,
                    "PROFILE_MSR": message[0].PRFL_MEASURED,
                    "PROFILE_SUB": message[0].PRFL_SUBMTD,
                    "CLIENT_NAME": message[0].CLIENT,
                    "GEO": message[0].GEO,
                    "MARKET_REGION": message[0].MARKET,
                    "GRWTH_PLFRM": message[0].GRTH_PLFM_DESC,
                    "SERVICE_LINE": message[0].SVC_LINE_NM,
                    "PRACTICE": message[0].PRACTICE_NM,
                    "COUNTRY": message[0].CTRY_NM,
                    "SECTOR": message[0].SCTR_GB_NM,
                    "INDUSTRY": message[0].INDSTRY_CMR_NM,
                    "CNTRCT_START_DATE": message[0].CNTRCT_STRT_DT==null?' ':message[0].CNTRCT_STRT_DT,
                    "CNTRCT_END_DATE": message[0].CNTRCT_END_DT,
                    "CNTRCT_STATUS": message[0].CNTRCT_STATUS==null?' ':message[0].CNTRCT_STATUS,
                    "COMPLEX_FLAG": message[0].CMPLX_FLG==null?' ':message[0].CMPLX_FLG,
                    "CNTRCT_PM": message[0].CNTRCT_PM,
                    "CNTRCT_PE": message[0].CNTRCT_PE,
                    "LEAD_PARTNER": message[0].LEAD_PRTNR,
                    "IPFF_URL": message[0].IPPF_URL
                  });
                } else {
                  formatedJson.DATA_MESSAGE = "No Data Available";
                } //end if empty

            } else {
              formatedJson = {
                //Delivery Submitted / Not Submitted fields, common between both
                "DATA_MESSAGE": dataMessage,
                "CNTRCT_NUM_LABEL":"Contract No",
                "PROFILE_MSR_LABEL":"Profile is Measured",
                "PROFILE_SUB_LABEL":"Profile is Submitted",
                "CLIENT_NAME_LABEL":"Client Name",
                "GEO_LABEL":"Geography",
                "MARKET_REGION_LABEL":"Market",              
                "GRWTH_PLFRM_LABEL":"Growth Platform",
                "SERVICE_LINE_LABEL":"Service Line",
                "PRACTICE_LABEL":"Practice",
                "COUNTRY_LABEL":"Country",
                "SECTOR_LABEL":"Sector",
                "INDUSTRY_LABEL":"Industry",
                "CNTRCT_START_DATE_LABEL":"Contract Start Date",
                "CNTRCT_END_DATE_LABEL":"Contract End Date",
                "CNTRCT_STATUS_LABEL":"Contract Status",
                "COMPLEX_FLAG_LABEL":"Complex Flag",
                "CNTRCT_PM_LABEL":"Contract Project Manager",
                "CNTRCT_PE_LABEL":"Contract PE",
                "LEAD_PARTNER_LABEL":"Lead Partner",
  
                //Delivery Compliant / Non Compliant fields
                "OPPTY_NUM_LABEL":"Opportunity Number",
                "PROJ_NAME_LABEL":"Project Name",
                "SUB_PRACTICE_LABEL":"Sub Practice",
                "FULLY_COMPLIANT_LABEL": "Profile Fully Compliant (no deviations)",
                "APP_DEVIATIONS_LABEL": "Approved Deviations #",
                "UNAPP_DEVIATIONS_LABEL": "Unapproved Deviations #",
                "NON_COMP_CAT_LABEL": "Non-Compliant Categories",
                "METHOD_LABEL": "Method",
                "OTHER_METHOD_LABEL": "Other Methods",
                "DEV_REASON_LABEL": "Deviation Reason for Method",
                "MOSIAC_METHOD_LABEL": "Mosiac Method Used?",
  
                "data":[]
                };

                if (!message.length <= 0) {
                  formatedJson.data.push({
                    "CNTRCT_NUM": message[0].CNTRCT_NUM,
                    "CNTRCT_KEY":message[0].CNTRCT_KEY,
                    "ID": message[0].ID,
                    "PROFILE_MSR": message[0].PRFL_MEASURED,
                    "PROFILE_SUB": message[0].PRFL_SUBMTD,
                    "CLIENT_NAME": message[0].CLIENT,
                    "GEO": message[0].GEO,
                    "MARKET_REGION": message[0].MARKET,
                    "GRWTH_PLFRM": message[0].GRTH_PLFM_DESC,
                    "SERVICE_LINE": message[0].SVC_LINE_NM,
                    "PRACTICE": message[0].PRACTICE_NM,
                    "COUNTRY": message[0].CTRY_NM,
                    "SECTOR": message[0].SCTR_GB_NM,
                    "INDUSTRY": message[0].INDSTRY_CMR_NM,
                    "CNTRCT_START_DATE": message[0].CNTRCT_STRT_DT,
                    "CNTRCT_END_DATE": message[0].CNTRCT_END_DT,
                    "CNTRCT_STATUS": message[0].CNTRCT_STATUS,
                    "COMPLEX_FLAG": message[0].CMPLX_FLG,
                    "CNTRCT_PM": message[0].CNTRCT_PM,
                    "CNTRCT_PE": message[0].CNTRCT_PE,
                    "LEAD_PARTNER": message[0].LEAD_PRTNR,
                    "OPPTY_NUM": message[0].OPPTNY_NUM==null?' ':message[0].OPPTNY_NUM,
                    "PROJ_NAME": message[0].PROJECT_NM==null?' ':message[0].PROJECT_NM,
                    "SUB_PRACTICE": message[0].SUB_PRACTICE==null?' ':message[0].SUB_PRACTICE,
                    "FULLY_COMPLIANT": message[0].PRFL_FULLY_CMPL==null?' ':message[0].PRFL_FULLY_CMPL,
                    "APP_DEVIATIONS": message[0].APRVD_DEV==null?' ':message[0].APRVD_DEV,
                    "UNAPP_DEVIATIONS": message[0].NON_APRVD_DERIVATIONS==null?' ':message[0].NON_APRVD_DERIVATIONS,
                    "NON_COMP_CAT": message[0].NOT_CMPLNT_CAT==null?' ':message[0].NOT_CMPLNT_CAT,
                    "METHOD": message[0].METHOD==null?' ':message[0].METHOD,
                    "OTHER_METHOD": message[0].OTHER_METHODS==null?' ':message[0].OTHER_METHODS,
                    "DEV_REASON": message[0].DEV_REASONS==null?' ':message[0].DEV_REASONS,
                    "MOSIAC_METHOD": message[0].MOSAIC_METHOD_USED==null?' ':message[0].MOSAIC_METHOD_USED,
                    "IPFF_URL": message[0].IPPF_URL
                  });
                } else {
                  formatedJson.DATA_MESSAGE = "No Data Available";
                } //end if empty

              }; // end popup type check, Submission vs Compliance

          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2compdmpopcontract.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompDMPopContract', type: 'object'}
    });

};
