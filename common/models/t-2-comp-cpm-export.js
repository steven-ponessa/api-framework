'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function (T2compcpmexport) {
	T2compcpmexport.processChild = function (req, filter, cb) {
		this.process(req, filter, function (err, message) {
            if (err) {
                return cb(err, null);
            }

			try {
				var formatedJson = {};
				if (message.length == 0) {
					formatedJson = {};
				} else {
					formatedJson = {

					}
					function getMonthYear(YYYYDD) {
						if (YYYYDD === undefined) {
							YYYYDD = 0;
						} else {
							var year = YYYYDD.substring(0, 4);
							var month = YYYYDD.substring(4, 6);
							let month_year = new Date(year, month - 1);
							const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
							let formatted_date = months[month_year.getMonth()] + " " + month_year.getFullYear()
							return formatted_date;
						}
						return undefined;
					}

					var METRIC;
					switch (req.query['metric']) {
						case 'CPMA':
							METRIC = "CPM Assigned";
							break;
						case 'CPME':
							METRIC = "CPM + Exceptions";
							break;
						case 'APREX':
							METRIC = "Approved Exceptions";
							break;
						default:
							METRIC = "CPM Assigned";
					}
					var cpmaLabel;
					switch (req.query['assgn']) {
					case 'NASND':
						cpmaLabel = "CPM Assigned - Not Assigned";
						break;
					case 'ASND':
						cpmaLabel = "CPM Assigned - Assigned";
						break;
					default:
						cpmaLabel = "CPM Assigned - Assigned";
					}
					var cpmeLabel;
					switch (req.query['compl']) {
					case 'NONCOMP':
						cpmeLabel = "CPM + Exceptions - Non Compliant";
						break;
					case 'COMP':
						cpmeLabel = "CPM + Exceptions - Compliant";
						break;
						default:
						cpmeLabel = "CPM + Exceptions - Compliant";
					}

					var SERVICE_NAME;
					switch (req.query['busAttr']) {
						case 'GEO_DESC':
							SERVICE_NAME = "Geography";
							break;
						case 'MKT_DESC':
							SERVICE_NAME = "Market / Region";
							break;
						case 'CTRY_DESC':
							SERVICE_NAME = "Country";
							break;
						case 'GROWTH_PLATFORM_DESC':
							SERVICE_NAME = "Growth Platform";
							break;
						case 'SVC_LINE_DESC':
							SERVICE_NAME = "Service Line";
							break;
						case 'SECTOR_DESC':
							SERVICE_NAME = "Sector";
							break;
						case 'INDUSTRY_DESC':
							SERVICE_NAME = "Industry";
							break;
						default:
							SERVICE_NAME = undefined;
					}

					var formatedJson = {
						"SNAPSHOT_DATE": getMonthYear(req.query['yrMoKey']),
						"CONTRACT_SIGNED_QTR": dateUtils.formatQuarterYear(req.query['yrQtrKey']),
						"SERVICE_NAME": SERVICE_NAME,
						"METRIC": METRIC,
						"ASSGN": cpmaLabel,
						"COMPL": cpmeLabel,
						"data": []
					};

/* 					formatedJson.SERVICE_NAME = SERVICE_NAME;
					formatedJson.METRIC = METRIC;
					formatedJson.ASSGN = cpmaLabel;
					formatedJson.COMPL = cpmeLabel; */


					for (var i = 0; i < message.length; i++) {

						if (message[i].EXPIRY_DATE == null) {
							var dateValue = ' ';
						} else {
							dateValue = message[i].EXPIRY_DATE;
						}

						formatedJson.data.push({
							"WBS_ID [IPPF Link]":message[i].CNTRCT_NUM,
							"IPPF_URL":message[i].IPPF_URL,
							"WBS_Short_Desc":message[i].PRJCT_NM,
							"IPPF_Customer":message[i].CLNT_NM,
							"Service_Line":message[i].SERVICE_LINE,
							"WBS_Start_Date":message[i].WBS_START_DT,
							"WBS_End_Date":message[i].WBS_END_DT,
							"TCV_usd":message[i].TCV,
							"CQ_PC_AMT":message[i].LEAK,
							"Expiry_Date": message[i].EXPIRY_DATE,
							"DMS_SCOPE": message[i].DMS_SCOPE,
							"Client_Num": message[i].CLIENT_NUM,
							"Geography": message[i].GEOGRAPHY,
							"Market": message[i].IMT,
							"Country": message[i].COUNTRY,
							"Growth_Platform": message[i].GROWTH_PLATFORM,
							"Practice": message[i].PRACTICE_NM,
							"Sector": message[i].SECTOR,
							"Industry": message[i].INDUSTRY,
							"Oppty_Num": message[i].OPP_NUM,
							"Contract_Status": message[i].CNTR_STAT,
							"Recent_Claim_Date":message[i].MOST_REC_CLAIM_DT==null?' ':message[i].MOST_REC_CLAIM_DT,
							"Delivery_Start_Date":message[i].DEL_START_DT==null?' ':message[i].DEL_START_DT,
							"BRAND_PE": message[i].PE_NOTES_ID,
							"BRAND_DE": message[i].BRAND_DE,
							"BRAND_PM": message[i].PM_NOTES_ID,
							"Complex_Program_Manager": message[i].CMPLEX_PROGRAM_MNGR,
							"CPM_Compliance": message[i].CPM_COMP,
							"CPM_Assigned": message[i].CPM_ASSIGNED,
							"CPM_Exception_Date":dateValue,
							"CPM_Exception_Reason":message[i].CPM_REASON
						});
					};

				}; // end if no data

			} catch (e) {
				formatedJson = {
					"msg": e.message
				}
			}

			cb(err, formatedJson);
		});
	};

	
	T2compcpmexport.remoteMethod('processChild', {
              http: {path: '/', verb: 'get', status: 200},
              accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                          {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompCPMExport', type: 'object'}
    });
};