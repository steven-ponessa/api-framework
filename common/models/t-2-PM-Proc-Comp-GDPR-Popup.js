'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2pmproccompgdprpopup) {

    T2pmproccompgdprpopup.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }

          var formatedJson = {};

          try {
            formatedJson = {
              "CNTRCT_NAME_LABEL":"Contract Name",
              "PRTNR_NM_LABEL":"Partner Name",
              "CNTRCT_SIGN_DATE_LABEL":"Contract Sign Date",
              "GRWTH_PLTFRM_LABEL":"Growth Platform",
              "GB_SCTR_LABEL":"GB Sector",
              "TCV_LABEL":"TCV $",
              "PRC_CASE_GP_PCT_LABEL":"Price Case GP %",
              "APPRVD_PLN_GP_PCT_LABEL":"Approved Plan GP %",

              "GDPR_CLASSIF_LABEL":"GDPR Classification",
              "DPA_STATUS_LABEL":"DPA Status",
              "TOMS_IMPLMNTD_LABEL":"TOMs Implemented",
              "EUMC_STAT_LABEL":"EUMC Status",
              "CLAUSE_IN_CNTRCT_LABEL":"Clause in Contract",
              "CONFR_LTTR_SGND_LABEL":"Confirmation Letter Signed",

              "CLNT_NM_LABEL":"Client Name",
              "CNTRY_LABEL":"Country",
              "CNTRCT_END_DATE_LABEL":"Contract End Date",
              "SRVC_LINE_LABEL":"Service Line",
              "MRKT_LABEL":"Market",
              "BRND_PE_LABEL":"Brand PE",
              "PRC_CASE_GP_LABEL":"Price Case GP $",
              "APPRVD_PLN_GP_LABEL":"Approved Plan GP $",

              "GDPR_ACTNS_OVERALL_LABEL":"GDPR Actions Overall",
              "DPA_EXHBT_STATUS_LABEL":"DPA Exhibit Status",
              "SL_REVIEW_STATUS_LABEL":"SL Review Status",
              "SBPRCSSR_STATUS_LABEL":"Subprocessor Status",
              "LEGAL_LTTR_SGND_LABEL":"Legal Letter Signed",
              "ONE_WAY_LTTR_SND_LABEL":"One Way Letter Sent",

              "data":[]
            };
            if (message.length > 0 ) {
              formatedJson.data.push({
              "CNTRCT_NUM": message[0].CNTRCT_NUM,
              "CNTRCT_NAME": message[0].CNTRCT_NAME,
              "PRTNR_NM": message[0].PARTNER_NM,
              "CNTRCT_SIGN_DATE": message[0].CONTRACT_SIGN_DATE,
              "GRWTH_PLTFRM": message[0].GROWTH_PLATFORM,
              "GB_SCTR": message[0].SECTOR,
              "TCV": message[0].TCV,
              "PRC_CASE_GP_PCT": calcs.formatPercentage100(message[0].PC_GP_PCT),
              "APPRVD_PLN_GP_PCT": calcs.formatPercentage100(message[0].APRVD_GP_PCT),

              "GDPR_CLASSIF": message[0].GDPR_CLSFC,
              "DPA_STATUS": message[0].DPA_STAT,
              "TOMS_IMPLMNTD": message[0].TOMS_IMPL,
              "EUMC_STAT": message[0].EUMC_STAT,
              "CLAUSE_IN_CNTRCT": message[0].CLAUSE_IN_CNTR,
              "CONFR_LTTR_SGND": message[0].CONF_LETTER_SGN,

              "CLNT_NM": message[0].CLIENT_NM,
              "CNTRY": message[0].COUNTRY,
              "CNTRCT_END_DATE": message[0].END_DT,
              "SRVC_LINE": message[0].SERVICE_LINE,
              "MRKT": message[0].MARKET,
              "BRND_PE": message[0].BRAND_PE_NM,
              "PRC_CASE_GP": message[0].PC_GP,
              "APPRVD_PLN_GP": message[0].APRVD_GP_AMT,

              "GDPR_ACTNS_OVERALL": message[0].GDPR_OVRL,
              "DPA_EXHBT_STATUS": message[0].EXHIB_STAT,
              "SL_REVIEW_STATUS": message[0].SL_REVW_STAT,
              "SBPRCS_STATUS": message[0].SUBPRCS_STAT,
              "LEGAL_LTTR_SGND": message[0].LGL_LETTER_SGN,
              "ONE_WAY_LTTR_SND": message[0].ONE_WAY_LETTER_SNT,
              "IPPF_LINK": message[0].IPPF_URL
            });
          }; // End if not empty

          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2pmproccompgdprpopup.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2PMProcCompGDPRPopup', type: 'object'}
    });

};
