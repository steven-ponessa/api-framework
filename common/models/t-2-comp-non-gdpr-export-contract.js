'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function (T2compnongdprexportcontract) {
	T2compnongdprexportcontract.processChild = function (req, filter, cb) {
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
							//"DATA_LOAD_DESC":message[i].DATA_LOAD_DESC,
							"WBS_ID [IPPF Link]":message[i].WBS_ID,
                			"BRAND":message[i].BRAND,
                			"COUNTRY":message[i].COUNTRY,
                			"MARKET":message[i].MARKET,
                			"SERVICE_LINE":message[i].SERVICE_LINE,
                			"SECTOR_OVER_CD": message[i].SECTOR_OVER_CD,    
							"SECTOR_OVER": message[i].SECTOR_OVER,    
							"INDSR_SND": message[i].INDSR_SND,          
							"CUST_NUMB" :message[i].CUST_NUMB,
							"CUST_NM": message[i].CUST_NM,
							"PRACTICE": message[i].PRACTICE,
							"WBS_DESC": message[i].WBS_DESC,
							"GLB_BUYING_GRP": message[i].GLB_BUYING_GRP,
							"SYS_CNTRCT_NUM": message[i].SYS_CNTRCT_NUM,
							"LEG_CNTRCT_NUM": message[i].LEG_CNTRCT_NUM,
							"IPPF_STATUS": message[i].IPPF_STATUS,
							"CNTRCT_STAT_CD": message[i].CNTRCT_STAT_CD,
							"WBS_STRT_DATE": message[i].WBS_STRT_DATE,
							"WBS_END_DT":message[i].WBS_END_DT,
							"CNTRCT_SIGN_DATE":message[i].CNTRCT_SIGN_DATE,
							"CNTRCT_END_DT":message[i].CNTRCT_END_DT,
							"GROWTH_PLATFORM": message[i].GROWTH_PLATFORM,
							"TCV": calcs.calcValue(message[i].TCV),
							"PLAN_GP_PCT": message[i].PLN_GP_PCT ,
							"PLAN_GP_AMT": message[i].PLN_GP_AMT ,
							"OPP_NUM": message[i].OPP_NUM ,
							"PROC_IND": message[i].PROC_IND ,
							"EXTMP_GDPR": message[i].EXTMP_GDPR ,
							"IN_SCP_GDPR": message[i].IN_SCP_GDPR ,
							"GDPR_CLSF_CM": message[i].GDPR_CLSF_CM ,
							"MST_REC_GDPR_CLSF": message[i].MST_REC_GDPR_CLSF ,
							"A_CLAS_IN_CNTRCT": message[i].A_CLAS_IN_CNTRCT ,
							"A_LGL_LETTER_SGN": message[i].A_LGL_LETTER_SGN ,
							"A_CONF_LETTER_SGN": message[i].A_CONF_LETTER_SGN ,
							"A_ONE_WAY_LETTER_SNT": message[i].A_ONE_WAY_LETTER_SNT ,
							"A_NO_PI_ACS_STAT": message[i].A_NO_PI_ACS_STAT ,
							"A_SL_REVW_STAT": message[i].A_SL_REVW_STAT ,
							"GDPR_ACT_OVER_RSLT": message[i].GDPR_ACT_OVER_RSLT ,
                			"PM_NOTES_ID":message[i].PM_NOTES_ID,           
							"PE_NOTES_ID":message[i].PE_NOTES_ID,
                			"IPPF_URL": message[i].IPPF_URL
						});
					};

				};  // end if no data

			} catch (e) {
				formatedJson = { "msg": e.message }
			}

			cb(err, formatedJson);
		});
	};

	T2compnongdprexportcontract.remoteMethod('processChild', {
		http: { path: '/', verb: 'get', status: 200 },
		accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
		{ arg: 'filter', type: 'object' }],
		returns: { arg: 't2CompNonGDPRExportContract', type: 'object' }
	});
};

