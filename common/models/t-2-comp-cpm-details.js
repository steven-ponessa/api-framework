    'use strict';

    //var calcs = require("./utils/tieredLeakageCalcs");
    var dateUtils = require("./utils/dateUtils");

    module.exports = function(T2compcpmdetails) {

        T2compcpmdetails.processChild = function(req, filter, cb) {
              this.process(req, filter, function(err, message){
                if (err) {
                    return cb(err, null);
                }
                var metricLabel = "CQ to PC $";
                switch (req.query['metric']) {
                    case 'APREX':
                        metricLabel = "Expiry Date";
                        break;
                    case 'CPMA':
                        metricLabel = "CQ to PC $";            
                        break;
                    default:
                        metricLabel = "CQ to PC $";
                };                
                var formatedJson = {
                    "TIMEFRAME":"",
                    "CNTRCT_NUM_HDR":"Contract No.",
                    "PRJCT_NM_HDR":"Description",
                    "CLNT_NM_HDR":"Client",
                    "SVC_LN_HDR": "Service Line",
                    "TCV_HDR":"TCV $",
                    "CQ_PC_AMT_HDR":"CQ to PC $",
                    "EXPIRY_DATE_HDR": "Expiry Date",
                    //"METRIC_HDR":metricLabel, 
                    "WBS_START_DT_HDR": "WBS Start Date",
                    "WBS_END_DT_HDR": "WBS End Date",
                    "DMS_SCOPE_HDR": "DMS Scope",

                    //Customized table header options
                    "CLNT_NUM_HDR": "Client Number",
                    "GEO_HDR": "Geography",
                    "MKT_HDR": "Market / Region",
                    "CTRY_HDR": "Country",
                    "GBS_GRWTH_PLTM_HDR": "Growth Platform",
                    "PRACT_HDR": "Practice",
                    "INDUST_HDR": "Industry",
                    "OPP_NUM_HDR": "Opportunity Number",
                    "CNTR_STAT_HDR": "Contract Status",
                    "RECENT_CLAIM_DT_HDR": "Most Recent Claim Date",
                    "DEL_STRT_DT_HDR": "Delivery Start Date",
                    "BRAND_PE_HDR": "Brand PE",
                    "BRAND_DE_HDR": "Brand DE",
                    "BRAND_PM_HDR": "Brand PM",
                    "CMPLEX_PROGRAM_MNGR_HDR": "Complex Program Manager",
                    "CPM_COMP_HDR": "CPM Compliance",
                    "CPM_ASSGND_HDR": "CPM Assigned",
                    "CPM_EXCPTN_RSN_HDR": "CPM Exception Reason",
                    "CPM_EXCPTN_DT_HDR": "CPM Exception Expiry",

                    "DATA":[]
                };              

                formatedJson.TIMEFRAME = dateUtils.formatQuarterYear(req.query['yrQtrKey']);

                for (var i = 0; i < message.length; i++) {
                    formatedJson.DATA.push({
                        "CNTRCT_NUM": message[i].CNTR_NUM,
                        "PRJCT_NM": message[i].WBS_SORT_DESC,
                        "CLNT_NM": message[i].CLIENT,
                        "SVC_LN": message[i].SVC_LN,
                        "TCV": message[i].TCV_AMT,
                        "CQ_PC_AMT": message[i].CQ_TO_PC_LKG_AMT,
                        "EXPIRY_DATE": message[i].EXPIRY_DATE,
                        //"EXPIRY_DATE": message[i].CPM_EXCPTN_DT
                        "WBS_START_DT": message[i].WBS_START_DT,
                        "WBS_END_DT": message[i].WBS_END_DT,
                        "DMS_SCOPE": message[i].DMS_SCOPE,

                        // Customized table options
                        "CLNT_NUM": message[i].CLIENT_NUM,
                        "GEO": message[i].GEO,
                        "MKT": message[i].MKT,
                        "CTRY": message[i].CTRY,
                        "GBS_GRWTH_PLTM": message[i].GBS_GRWTH_PLTM,
                        "PRACT": message[i].PRACT,
                        "INDUST": message[i].INDUST,
                        "OPP_NUM": message[i].OPP_NUM,
                        "CNTR_STAT": message[i].CNTR_STAT,
                        "RECENT_CLAIM_DT": message[i].MOST_REC_CLAIM_DT==null?' ':message[i].MOST_REC_CLAIM_DT,
                        "DEL_STRT_DT": message[i].DELIVERY_STRT_DT==null?' ':message[i].DELIVERY_STRT_DT,
                        "BRAND_PE": message[i].BRAND_PE,
                        "BRAND_DE": message[i].BRAND_DE,
                        "BRAND_PM": message[i].BRAND_PM,
                        "CMPLEX_PROGRAM_MNGR": message[i].CMPLEX_PROGRAM_MNGR,
                        "CPM_COMP": message[i].CPM_COMP,
                        "CPM_ASSGND": message[i].CPM_ASSGND,
                        "CPM_EXCPTN_RSN": message[i].CPM_EXCPTN_RSN,
                        "CPM_EXCPTN_DT": message[i].CPM_EXCPTN_DT
                    })
                }

                cb(err, formatedJson);
              });
          };

          T2compcpmdetails.remoteMethod('processChild', {
              http: {path: '/', verb: 'get', status: 200},
              accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                          {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompCPMDetails', type: 'object'}
          });

    };
