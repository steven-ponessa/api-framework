'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function (T2comppgexport) {
	T2comppgexport.processChild = function (req, filter, cb) {
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

					formatedJson.data = [];

					for (var i = 0; i < message.length; i++) {

						if (message[i].EXCEPT_DATE == null) {
							var dateValue = ' ';
						} else {
							dateValue = message[i].EXCEPT_DATE;
						}

						formatedJson.data.push({
							"WBS_ID [IPPF Link]": message[i].CNTRCT_NUM,
							"BRAND": message[i].BRAND,
							"COUNTRY": message[i].COUNTRY,
							"GEO": message[i].GEOGRAPHY,
							"MARKET": message[i].MKT_DESC,
							"IPPF_CUSTOMER": message[i].CLNT_NM,
							"WBS_SHORT_DESC": message[i].PRJCT_NM,
							"DELI_START_DATE": message[i].DELI_START_DATE,
							"WBS_START_DATE": message[i].WBS_START_DT,
							"WBS_END_DATE": message[i].APPR_PLAN_DATE,
							"CONTRACT_SIGN_DATE": message[i].CONTRACT_SIGN_DATE,
							"WBS_IPPF_STATUS": message[i].STATUS,
							"SERVICE_LINE": message[i].SERVICE_LINE,
							"PRACTICE": message[i].PRACTICE,
							"SECTOR": message[i].SECTOR,
							"PE_NOTES_ID": message[i].BRAND_PE,
							"PM_NOTES_ID": message[i].BRAND_PM,
							"GBS_GROWTH_PLATFORM": message[i].GROWTH_PLATFORM,
							"TCV_USD": message[i].TCV,
							"PG0_ASSESSED": message[i].PG_O_ASSESSED,
							"PG0_CMPLNCE": message[i].PG_O_CMPLNCE,
							"PG0_RED_ORANGE_RES": message[i].PG_0_RO_RES,
							"PG0_RED_ORANGE_ACTION": message[i].PG_0_RO_AT,
							"PG0_RED_ORANGE_ACTION_OVERDUE": message[i].PG_0_RO_ATO, 
							"PG1_4_ASSESSED": message[i].PG_1_4_ASSESSED, 
							"PG1_4_CMPLNCE": message[i].PG_1_4_CMPLNCE,
							"PG1_4_RED_ORANGE_RES": message[i].PG_1_4_RO_RES,  
							"PG1_4_RED_ORANGE_ACTION": message[i].PG_1_4_RO_AT, 
							"PG1_4_RED_ORANGE_ACTION_OVERDUE": message[i].PG_1_4_RO_ATO,
							"IPPF_URL": message[i].PHD_URL
						});
					};

				};  // end if no data

			} catch (e) {
				formatedJson = { "msg": e.message }
			}

			cb(err, formatedJson);
		});
	};

	T2comppgexport.remoteMethod('processChild', {
		http: { path: '/', verb: 'get', status: 200 },
		accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
		{ arg: 'filter', type: 'object' }],
		returns: { arg: 't2CompPGExport', type: 'object' }
	});
};

