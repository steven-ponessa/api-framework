    'use strict';

    var calcs = require("./utils/tieredLeakageCalcs");
    var dateUtils = require("./utils/dateUtils");

    module.exports = function(T2compdmdelprofdetails) {

        T2compdmdelprofdetails.processChild = function(req, filter, cb) {
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
                    "CNTRCT_NUM_LABEL": "Contract No.",
                    //"PRFL_MEASURED_LABEL": "Profile is required",
                    //"PRFL_SUBMTD_LABEL": "Profile is submitted",
                    "CLIENT_NAME_LABEL": "Client Name",
                    //"GROWTH_PLATFORM_LABEL": "Growth Platform",
                    //"SERVICE_LINE_LABEL": "Service Line",
                    "PRACTICE_LABEL": "Practice",
                    //"GEOGRAPHY_LABEL": "Geography",
                    //"MARKET_LABEL": "Market",
                    //"COUNTRY_LABEL": "Country",
                    //"SECTOR_LABEL":  "Sector",
                    //"INDSTRY_LABEL": "Industry",
                    "CONTRACT_STRT_DT_LABEL": "Contract Start Date",
                    //"CONTRACT_END_DT_LABEL": "Contract End Date",
                    //"CONTRACT_STATUS_LABEL": "Contract Status",
                    //"COMPLEX_FLAG_LABEL": "Complex Flag",
                    "CONTRACT_PM_LABEL": "Contract PM",
                    "CONTRACT_PE_LABEL": "Contract PE",
                    "LEAD_PARTNER_LABEL": "Lead Partner",
                    "DATA":[]
                };

                if (!message.length <= 0) {

                    for (var i = 0; i < message.length; i++) {
                        formatedJson.DATE = message[0].DATA_LOAD_DESC;
                        formatedJson.DATA.push({
                            "CONTRACT_NUM":message[i].CNTRCT_NUM,
                            "ID": message[i].ID,
                            //"PRFL_MEASURED": message[i].PRFL_MEASURED,
                            //"PRFL_SUBMTD": message[i].PRFL_SUBMTD,
                            "CLIENT_NAME": message[i].CLIENT, 
                            //"GROWTH_PLATFORM": message[i].GRTH_PLFM_DESC,
                            //"SERVICE_LINE":message[i].SVC_LINE_NM,
                            "PRACTICE":message[i].PRACTICE_NM,
                            //"GEOGRAPHY":message[i].GEO,
                            //"MARKET":message[i].MARKET,
                            //"COUNTRY":message[i].COUNTRY,
                            //"SECTOR": message[i].SCTR_GB_NM,
                            //"INDSTRY": message[i].INDSTRY_CMR_NM,
                            "CONTRACT_STRT_DT": message[i].CNTRCT_STRT_DT,
                            //"CONTRACT_END_DT":message[i].CNTRCT_END_DT, 
                            //"CONTRACT_STATUS":message[i].CNTRCT_STATUS, 
                            //"COMPLEX_FLAG":message[i].CMPLX_FLG,
                            "CONTRACT_PM":message[i].CNTRCT_PM, 
                            "CONTRACT_PE":message[i].CNTRCT_PE, 
                            "LEAD_PARTNER":message[i].LEAD_PRTNR 
                        })
                    }
                } else {
                  formatedJson.DATA_MESSAGE = "No Data Available";
                } //end if empty
            } else {  // Compliant or Not Compliant path
                formatedJson = {
                    "DATA_MESSAGE": dataMessage,
                    "DATE":"",
                    "CNTRCT_NUM_LABEL": "Contract No.",
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
                            "CNTRCT_NUM":message[i].CNTRCT_NUM==null?' ':message[i].CNTRCT_NUM,
                            "ID":message[i].ID==null?' ':message[i].ID,
                            "CLIENT_NAME": message[i].CLIENT==null?' ':message[i].CLIENT, 
                            "PROJECT_DESC": message[i].PROJECT_NM==null?' ':message[i].PROJECT_NM,
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

        T2compdmdelprofdetails.remoteMethod('processChild', {
              http: {path: '/', verb: 'get', status: 200},
              accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                          {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompDMDelProfDetails', type: 'object'}
          });

    };
