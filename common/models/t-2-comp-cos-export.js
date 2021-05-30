'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function (T2compcosexport) {
	T2compcosexport.processChild = function (req, filter, cb) {
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

						formatedJson.data.push({
							"CONTRACT [IPPF Link]": message[i].CON,
							"COUNTRY": message[i].COUNTRY,
							"GEO": message[i].GEO,
							"MARKET": message[i].MARKET,
							"IPPF_CUSTOMER": message[i].CUSTOMER,
							"WBS_SHORT_DESC": message[i].CNTRCT_DESC,
							"DELIVERY_START_DATE": message[i].DELI_START_DATE,
							"WBS_START_DATE": message[i].WBS_START_DT,
							"WBS_END_DATE": message[i].WBS_END_DT,
							"CONTRACT_SIGN_DATE": message[i].CONTRACT_SIGN_DATE,
							"WBS_IPPF_STATUS": message[i].CNTRCT_STATUS,
							"SERVICE_LINE": message[i].SERVICE_LINE,
							"PRACTICE": message[i].PRACTICE,
							"IPPF_SECTOR_GB": message[i].IPPF_SECTOR,
							"PE_NOTES_ID": message[i].BRAND_PE,
							"PM_NOTES_ID": message[i].BRAND_PM,
							"GBS_GROWTH_PLATFORM": message[i].GROWTH_PLATFORM,
							"TCV_USD": message[i].TCV,
							"IN_SCOPE": message[i].IN_SCOPE,
							"COMPLIANT": message[i].COMPLIANT,
							"RAG": message[i].OVERALL_COS,
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

	T2compcosexport.remoteMethod('processChild', {
		http: { path: '/', verb: 'get', status: 200 },
		accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
		{ arg: 'filter', type: 'object' }],
		returns: { arg: 't2CompCOSExport', type: 'object' }
	});
};

