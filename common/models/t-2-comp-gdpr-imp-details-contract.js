    'use strict';

    var calcs = require("./utils/tieredLeakageCalcs");
    var dateUtils = require("./utils/dateUtils");

    module.exports = function(T2compgdprimpdetailscontract) {

        T2compgdprimpdetailscontract.processChild = function(req, filter, cb) {
              this.process(req, filter, function(err, message){
                if (err) {
                    return cb(err, null);
                }

                try {
                    var color = '';
                    var value = '';
					var type = req.query['type'];
					
                    switch (req.query['metric']) {
                      case "IMPCT_BY_GDPR":				  
                        color = "#6929C4";
                        value = "GDPR Impacted Contracts";
                      break;
                      case "DPA":
						if (type == 'NEGATIVE') {
							color = "#0043CE";
							value = "DPA Not Signed";                
						} else {
							color = "#4589FF";
							value = "DPA Signed"; 
						}						  
                      break;
                      case "DPA_EXHBT":
						if (type == 'NEGATIVE') {
							color = "#005D5D";
							value = "DPA Exhibit Not Signed";                
						} else {
							color = "#088DBA";
							value = "DPA Exhibit Signed"; 
						}
                      break;
                      case "TOMS_SL_REVW":
						if (type == 'NEGATIVE') {
							color = "#FF832B";
							value = "TOMs SL Review Not Completed";                
						} else {
							color = "#8A3800";
							value = "TOMs SL Review Completed"; 
						}
                      break;
                      case "TOMS":
						if (type == 'NEGATIVE') {
							color = "#TOMs Not Implemented";
							value = "TOMs Not Implemented";                
						} else {
							color = "#FA4D56";
							value = "TOMs Implemented"; 
						}
                      break;
                      case "FULL_GDPR_RDNS":
						if (type == 'NEGATIVE') {
							color = "#F1C21B";
							value = "Full GDPR Readiness Not Achieved";                
						} else {
							color = "#8E6A00";
							value = "Full GDPR Readiness Achieved"; 
						}
                      break;
                      case "EUMC":
						if (type == 'NEGATIVE') {
							color = "#6FDC8C";
							value = "EUMC Not Complete";                
						} else {
							color = "#198038";
							value = "EUMC Complete"; 
						}
                      break;
                      case "SUBPROC":
						if (type == 'NEGATIVE') {
							color = "#3DDBD9";
							value = "Subprocessor Not Complete";                
						} else {
							color = "#82CFFF";
							value = "Subprocessor Complete"; 
						}
                      break;
                      }
                var formatedJson = {};
                 
                formatedJson = {
                    "COLOR" : color,
                    "VALUE": value,
                    "CNTRCT_NUM_HDR":"Contract No.",
                    "CUSTOMER_NM_HDR":"Client Name",
                    "START_DT_HDR":"Start Date",
                    "END_DT_HDR":"End Date",
                    "BRAND_PE_HDR":"Brand PE",
                    "GDPR_ACTN_OVRL_HDR":"GDPR Actions Overall",
                    "MOST_RCNT_GDPR_CLSFC_HDR":"Current Month GDPR Classification",
                    "CURR_MTH_CLSFC_HDR":"Most Recent GDPR Classification",
                    "GEO_HDR": "Geography",
                    "MARKET_HDR": "Market/Region",
                    "COUNTRY_HDR": "Country",
                    "GROWTH_PLATFORM_HDR": "Growth Platform",
                    "SERVICE_LINE_HDR":"Service Line",
                    "PRACTICE_HDR":"Practice",
                    "SECTOR_HDR":"Sector",
                    "INDUSTRY_HDR":"Industry",
                    "CONTRACT_NAME_HDR":"Contract Name",
                    "CONTRACT_SGND_DT_HDR":"Contract Sign Date",
                    "CONTRACT_END_DT_HDR":"Contract End Date",
                    "PARTNER_NAME_HDR":"Partner Name",
                    "TCV_HDR":"TCV $",
                    "PC_GP_AMT_HDR":"Price Case GP $",
                    "PC_GP_PCT_HDR":"Price Case GP %",
                    "APRVD_PLAN_GP_AMT_HDR":"Approved Plan GP $",
                    "APRVD_PLAN_GP_PCT_HDR":"Approved Plan GP %",
                    "DPA_STATUS_HDR":"DPA Status",
                    "DPA_EXHBT_STATUS_HDR":"DPA Exhibit Status",
                    "TOMS_IMPLMNTD_HDR":"TOMs Implemented",
                    "SL_REVIEW_STATUS_HDR":"SL Review Status",
                    "EUMC_STAT_HDR":"EUMC Status",
                    "SBPRCSSR_STATUS_HDR":"Subprocessor Status",
                    "CLAUSE_IN_CNTRCT_HDR":"Clause in Contract",
                    "LEGAL_LTTR_SGND_HDR":"Legal Letter Signed",
                    "CONFR_LTTR_SGND_HDR":"Confirmation Letter Signed",
                    "ONE_WAY_LTTR_SND_HDR":"One Way Letter Sent",
                    "DATA":[]
                };
            
                for (var i = 0; i < message.length; i++) {
                    formatedJson.DATA.push({
                        //"COLOR": message[i].COLOR,
                    "CNTRCT_NUM": message[i].CNTRCT_NUM,
                    "CUSTOMER_NM": message[i].CLNT_NM,
                    "START_DT": message[i].STRT_DT,
                    "END_DT": message[i].END_DT,
                    "BRAND_PE": message[i].BRAND_PE,
                    "GDPR_ACTN_OVRL": message[i].GDPR_ACTN_OVRL,
                    "MOST_RCNT_GDPR_CLSFC": message[i].MOST_RCNT_GDPR_CLSFC,
                    "CURR_MTH_CLSFC": message[i].CURR_MTH_CLSFC,
                    "GEO": message[i].GEO,
                    "MARKET": message[i].MARKET,
                    "COUNTRY": message[i].COUNTRY,
                    "GROWTH_PLATFORM": message[i].GROWTH_PLATFORM,
                    "SERVICE_LINE": message[i].SERVICE_LINE,
                    "PRACTICE": message[i].PRACTICE,
                    "SECTOR": message[i].SECTOR_OVER,
                    "INDUSTRY": message[i].INDSR_SND,
                    "CONTRACT_NAME": message[i].CNTRCT_NAME,
                    "CONTRACT_SGND_DT": message[i].CNTRCT_SIGN_DATE,
                    "CONTRACT_END_DT": message[i].CNTRCT_END_DT,
                    "PARTNER_NAME": message[i].PARTNER_NAME,
                    "TCV": message[i].TCV,
                    "PC_GP_AMT": message[i].PC_GP_AMT,
                    "PC_GP_PCT": message[i].PC_GP_PCT,
                    "APRVD_PLAN_GP_AMT": message[i].AP_GP_AMT,
                    "APRVD_PLAN_GP_PCT": message[i].AP_GP_PCT,
                    "DPA_STATUS": message[i].DPA_STAT,
                    "DPA_EXHBT_STATUS": message[i].EXHIB_STAT,
                    "TOMS_IMPLMNTD": message[i].TOMS_IMPL,
                    "SL_REVIEW_STATUS": message[i].SL_REVW_STAT,
                    "EUMC_STAT": message[i].EUMC_STAT,
                    "SBPRCSSR_STATUS": message[i].SUBPRCS_STAT,
                    "CLAUSE_IN_CNTRCT": message[i].CLAUSE_IN_CNTR,
                    "LEGAL_LTTR_SGND": message[i].LGL_LETTER_SGN,
                    "CONFR_LTTR_SGND": message[i].CONF_LETTER_SGN,
                    "ONE_WAY_LTTR_SND": message[i].ONE_WAY_LETTER_SNT
                    })
                }

            } catch (e) {
                formatedJson = {"msg" : e.message}
              }

              cb(err, formatedJson);
            });
        };

        T2compgdprimpdetailscontract.remoteMethod('processChild', {
              http: {path: '/', verb: 'get', status: 200},
              accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                          {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompGDPRImpDetailsContract', type: 'object'}
          });

    };
