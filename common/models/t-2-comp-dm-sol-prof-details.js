    'use strict';

    var calcs = require("./utils/tieredLeakageCalcs");
    var dateUtils = require("./utils/dateUtils");

    module.exports = function(T2compdmsolprofdetails) {

        T2compdmsolprofdetails.processChild = function(req, filter, cb) {
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
                    "DATA_MESSAGE": dataMessage,
                    "DATE":"",
                    "OPPTNY_NUM_LABEL": "Opportunity No.",
                    //"PRFL_MEASURED_LABEL": "Profile is required",
                    //"PRFL_SUBMTD_LABEL": "Profile is submitted",
                    "CLIENT_NAME_LABEL": "Client Name",
                    "PRACTICE_LABEL": "Practice",
                    "SLTN_EXC_APRVL_DT_LABEL": "Solution Excellence Approval Date",
                    "PROJECT_DESC_LABEL": "Project",
                    "SLTN_MNGR_LABEL": "Solution Manager",
                    "OPPTNY_OWNR_LABEL": "Opportunity Owner",
                    //"GROWTH_PLATFORM_LABEL": "Growth Platform",
                    //"SERVICE_LINE_LABEL": "Service Line",
                    //"GEOGRAPHY_LABEL": "Geography",
                    //"MARKET_LABEL": "Market",
                    //"COUNTRY_LABEL": "Country",
                    //"SECTOR_LABEL":  "Sector",
                    //"INDSTRY_LABEL": "Industry",
                    //"OPPTNY_STATUS_LABEL": "Opportunity Status",
                    //"COMPLEX_FLAG_LABEL": "Complex Flag",
                    "DATA":[]
                };

                if (!message.length <= 0) {
                    formatedJson.DATE = message[0].DATA_LOAD_DESC;
                    for (var i = 0; i < message.length; i++) {
                        formatedJson.DATA.push({
                            "OPPTNY_NUM": message[i].OPTY_ID,
                            //"PRFL_MEASURED": message[i].PRFL_MEASURED,
                            //"PRFL_SUBMTD": message[i].PRFL_SUBMTD,
                            "CLIENT_NAME": message[i].CLIENT,
                            "PRACTICE":message[i].PRACTICE_NM,
                            "SLTN_EXC_APRVL_DT": message[i].SLTN_EXC_APRVL_DT,
                            "PROJECT_DESC": message[i].PROJ_NAME,
                            "SLTN_MNGR":message[i].SLTN_MNGR,
                            "OPPTNY_OWNR":message[i].OPPTNY_OWNR,
                            //"GROWTH_PLATFORM": message[i].GRTH_PLFM_DESC,
                            //"SERVICE_LINE":message[i].SVC_LINE_NM,
                            //"GEOGRAPHY":message[i].GEO,
                            //"MARKET":message[i].MARKET,
                            //"COUNTRY":message[i].COUNTRY,
                            //"SECTOR": message[i].SCTR_GB_NM,
                            //"INDSTRY": message[i].INDSTRY_CMR_NM,
                            //"OPPTNY_STATUS":message[i].OPPTNY_STAT,
                            //"COMPLEX_FLAG":message[i].CMPLX_FLG
                        })
                    }
                    } else {
                    formatedJson.DATA_MESSAGE = "No Data Available";
                    } //end if empty
                } else {  // Compliant or Not Compliant path
                formatedJson = {
                    "DATA_MESSAGE": dataMessage,
                    "DATE":"",
                    "OPPTNY_NUM_LABEL": "Opportunity No.",
                    "CLIENT_NAME_LABEL": "Client Name",
                    "PROJECT_DESC_LABEL": "Project",
                    "NON_APRVD_DERIVATIONS_LABEL": "Un-approved Deviations",
                    "PRACTICE_LABEL": "Practice",
                    "SUB_PRACTICE_LABEL": "Sub Practice",
                    "METHOD_LABEL": "Method",	
                    "DATA":[]
                };

                if (!message.length <= 0) {

                    for (var i = 0; i < message.length; i++) {
                        formatedJson.DATE = message[0].DATA_LOAD_DESC;
                        formatedJson.DATA.push({
                            "OPPTNY_NUM": message[i].OPTY_ID,
                            "CLIENT_NAME": message[i].CLIENT, 
                            "PROJECT_DESC": message[i].PROJ_NAME,
                            "NON_APRVD_DERIVATIONS": message[i].NON_APRVD_DERIVATIONS==null?' ':message[i].NON_APRVD_DERIVATIONS,
                            "PRACTICE":message[i].PRACTICE_NM==null?' ':message[i].PRACTICE_NM,
                            "SUB_PRACTICE":message[i].SUB_PRACTICE==null?' ':message[i].SUB_PRACTICE,
                            "METHOD": message[i].METHOD==null?' ':message[i].METHOD
                        })
                    }
                } else {
                  formatedJson.DATA_MESSAGE = "No Data Available";
                } //end if empty
            }; // end type check, Submission vs Compliance

            } catch (e) {
                formatedJson = {"msg" : e.message}
              }

              cb(err, formatedJson);
            });
        };

        T2compdmsolprofdetails.remoteMethod('processChild', {
              http: {path: '/', verb: 'get', status: 200},
              accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                          {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompDMSolProfDetails', type: 'object'}
          });

    };
