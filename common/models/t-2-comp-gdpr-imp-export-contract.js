'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function (t2compgdprimpexportcontract) {
	t2compgdprimpexportcontract.processChild = function (req, filter, cb) {
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
						//"DATA_LOAD_DESC" : message[0].DATA_LOAD_DESC,
						"data": []
					}

					for (var i = 0; i < message.length; i++) {

						formatedJson.data.push({
							"CONTRACT [IPPF Link]": message[i].WBS_ID,
							"BRAND": message[i].BRAND,
							"COUNTRY": message[i].COUNTRY,
							"GEO": message[i].GEO,
							"MARKET": message[i].MARKET,
							"SERVICE_LINE": message[i].SERVICE_LINE,
							"SECTOR_OVER_CD": message[i].SECTOR_OVER_CD,
							"SECTOR_OVER": message[i].SECTOR_OVER,
							"SECTOR_LCL": message[i].SECTOR_LCL,
							"INDSR_SND": message[i].INDSR_SND,
							"INDSR_LCL": message[i].INDSR_LCL,
							"CUST_NUMB": message[i].CUST_NUMB,
							"CUST_NM": message[i].CUST_NM,
							"PRACTICE": message[i].PRACTICE,
							"WBS_DESC": message[i].WBS_DESC,
							"GLB_BUYING_GRP": message[i].GLB_BUYING_GRP,
							"SYS_CNTRCT_NUM": message[i].SYS_CNTRCT_NUM,
							"LEG_CNTRCT_NUM": message[i].LEG_CNTRCT_NUM,
							"IPPF_STATUS": message[i].IPPF_STATUS,
							"CNTRCT_STAT_CD": message[i].CNTRCT_STAT_CD,
							"WBS_START_DATE": message[i].WBS_START_DT,
							"WBS_END_DATE": message[i].WBS_END_DT,
							"CNTRCT_SIGN_DATE": message[i].CNTRCT_SIGN_DATE,
							"CNTRCT_END_DT": message[i].CNTRCT_END_DT,
							"TRBLD_PROJ_IND": message[i].TRBLD_PROJ_IND,
							"GROWTH_PLATFORM": message[i].GROWTH_PLATFORM,
							"TCV": message[i].TCV,
							"PLN_GP_PCT": message[i].PLN_GP_PCT,
							"PLN_GP_AMT": message[i].PLN_GP_AMT,
							"RISK_CONSULT": message[i].RISK_CONSULT,
							"QA_PRTNR": message[i].QA_PRTNR,
							"OPP_NUM": message[i].OPP_NUM,
							"GDPR_IMPC_FLG_FROM_OPP": message[i].GDPR_IMPC_FLG_FROM_OPP,
							"PROC_IND": message[i].PROC_IND,
							"MANDAT_ASSMNT_FLG": message[i].MANDAT_ASSMNT_FLG,
							"EXTMP_GDPR": message[i].EXTMP_GDPR,
							"IN_SCP_GDPR": message[i].IN_SCP_GDPR,
							"GDPR_ASSMNT_CMPL_STAT": message[i].GDPR_ASSMNT_CMPL_STAT,
							"GDPR_CLSFCN_DLVR_STR": message[i].GDPR_CLSFCN_DLVR_STR,
							"DLVR_STR_DT": message[i].DLVR_STR_DT,
							"DLVR_STR_EXPCT_CMPLT_DT": message[i].DLVR_STR_EXPCT_CMPLT_DT,
							"DLVR_STR_STAT": message[i].DLVR_STR_STAT,
							"GDPR_CLSF_CM": message[i].GDPR_CLSF_CM,
							"MST_REC_GDPR_CLSF": message[i].MST_REC_GDPR_CLSF,
							"BRND_PM_SUBM": message[i].BRND_PM_SUBM,
							"BRND_PE_APPR": message[i].BRND_PE_APPR,
							"Q_PERS_INF": message[i].Q_PERS_INF,
							"Q_ACCESS_STRTD": message[i].Q_ACCESS_STRTD,
							"Q_ACTL_STRT_DT": message[i].Q_ACTL_STRT_DT,
							"Q_PLN_STRT_DT": message[i].Q_PLN_STRT_DT,
							"Q_STFF_AUGMENT": message[i].Q_STFF_AUGMENT,
							"Q_PCRS": message[i].Q_PCRS,
							"B_TOMS_SLCTD_STAT": message[i].B_TOMS_SLCTD_STAT,
							"B_SL_REVW_DT": message[i].B_SL_REVW_DT,
							"B_SL_REVW_NM": message[i].B_SL_REVW_NM,
							"B_SL_REVW_STAT": message[i].B_SL_REVW_STAT,
							"B_DPA_STAT": message[i].B_DPA_STAT,
							"B_EXHIB_STAT": message[i].B_EXHIB_STAT,
							"B_TOMS_IMPL_STAT": message[i].B_TOMS_IMPL_STAT,
							"B_SUBPROC_AGRMT_APPLICBL": message[i].B_SUBPROC_AGRMT_APPLICBL,
							"B_SUBPROC_AGRMT_STAT": message[i].B_SUBPROC_AGRMT_STAT,
							"B_EUMC_APPLICBL": message[i].B_EUMC_APPLICBL,
							"B_EUMC_STAT": message[i].B_EUMC_STAT,
							"C_PROJ_TRN_STAT": message[i].B_PROJ_TRN_STAT,
							"C_PLN_STAT": message[i].C_PLN_STAT,
							"GDPR_ACT_OVER_RSLT": message[i].GDPR_ACT_OVER_RSLT,
							"PCR_STATMNT": message[i].PCR_STATMNT,
							"EVIDNC_STORED": message[i].EVIDNC_STORED,
							"LST_SVD_DT": message[i].LST_SVD_DT,
							"CMPLTD_BY": message[i].CMPLTD_BY,
							"PM_NOTES_ID": message[i].PM_NOTES_ID,
							"PE_NOTES_ID": message[i].PE_NOTES_ID,
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

	t2compgdprimpexportcontract.remoteMethod('processChild', {
		http: { path: '/', verb: 'get', status: 200 },
		accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
		{ arg: 'filter', type: 'object' }],
		returns: { arg: 't2CompGDPRImpExportContract', type: 'object' }
	});
};

