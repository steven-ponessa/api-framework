'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compgdprimptrendcontract) {
  T2compgdprimptrendcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

      var dataMessage = '';
      var dateValue = '';
      var formatedJson = {
        "DATA_MESSAGE": dataMessage,
        "date": dateValue,
        "SELECTED_LABEL": " ",
        "IMPCT_BY_GDPR_DATA": [],
        "DPA_NOT_SGND_DATA": [],
        "EXHBT_NOT_SGND_DATA": [],
        "SL_NOT_CMPL_DATA": [],
        "TOM_NOT_IMPL_DATA": [],
        "FULL_NOT_ACH_DATA": [],
        "EUMC_DATA": [],
        "SUB_DATA": [],
      }

      if (!message.length <= 0) {
        formatedJson.date = message[0].DATA_LOAD_DATE;
        formatedJson.SELECTED_LABEL = req.query['label'];

      //var precentDecimal = 1;

        for (var i = 0; i < message.length; i++) {

          var msac_color = '';
          switch (message[i].MSAC_RATING) {
            case "sat":
              msac_color = "#70AC45";
            break;
            case "unsat":
              msac_color = "#FA514C";
            break;
            case "marg":
              msac_color = "#FCCF0A";
            break;
            default:
              msac_color = "#E7E6E6";
            break;
          };

          // only return MSAC rating when message[i].IS_MSAC_VISIBLE is set to 1
          if ( message[i].IS_MSAC_VISIBLE == 1 ) {
            formatedJson.IMPCT_BY_GDPR_DATA.push({
              "id":i+1,
              "label": "GDPR Impacted Contracts",
              "value": "IMPCT_BY_GDPR",
              "color": "#6929c4",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].GDPR_IMPCT,
              "msac_rating": message[i].MSAC_RATING,
              "msac_color": msac_color
            });
            formatedJson.DPA_NOT_SGND_DATA.push({
              "id":i+1,
              "label": "DPA Not Signed",
              "value": "DPA_NOT_SGND",
              "color": "#0043ce",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].DPA_NOT_SGND,
              "percent": calcs.formatPercentage100(message[i].DPA_NOT_SGND_PCT),
              "msac_rating": message[i].MSAC_RATING,
              "msac_color": msac_color
            });
            formatedJson.EXHBT_NOT_SGND_DATA.push({
              "id":i+1,
              "label": "DPA Exhibit Not Signed",
              "value": "EXHBT_NOT_SGND",
              "color": "#005d5d",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].DPA_EXHBT_NOT_SGND,
              "percent": calcs.formatPercentage100(message[i].DPA_EXHBT_NOT_SGND_PCT),
              "msac_rating": message[i].MSAC_RATING,
              "msac_color": msac_color
            });
            formatedJson.SL_NOT_CMPL_DATA.push({
              "id":i+1,
              "label": "TOMs SL Review Not Completed",
              "value": "SL_NOT_CMPL",
              "color": "#FF832B",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].TOM_SL_REVIEW_NOT_CMP,
              "percent": calcs.formatPercentage100(message[i].TOM_SL_REVIEW_NOT_CMP_PCT),
              "msac_rating": message[i].MSAC_RATING,
              "msac_color": msac_color
            });
            formatedJson.TOM_NOT_IMPL_DATA.push({
              "id":i+1,
              "label": "TOMs Not Implemented",
              "value": "TOM_NOT_IMPL",
              "color": "#a2191f",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].TOM_NOT_IMPLM,
              "percent": calcs.formatPercentage100(message[i].TOM_NOT_IMPLM_PCT),
              "msac_rating": message[i].MSAC_RATING,
              "msac_color": msac_color
            });
            formatedJson.FULL_NOT_ACH_DATA.push({
              "id":i+1,
              "label": "Full GDPR Readiness Not Achieved",
              "value": "FULL_NOT_ACH",
              "color": "#F1C21B",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].FULL_GDPR_READINESS_NOT_ACHV,
              "percent": calcs.formatPercentage100(message[i].FULL_GDPR_READINESS_NOT_ACHV_PCT),
              "msac_rating": message[i].MSAC_RATING,
              "msac_color": msac_color
            });
            formatedJson.EUMC_DATA.push({
              "id":i+1,
              "label": "EUMC",
              "value": "EUMC",
              "color": "#6fdc8c",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].EUMC,
              "percent": calcs.formatPercentage100(message[i].EUMC_PCT),
              "msac_rating": message[i].MSAC_RATING,
              "msac_color": msac_color
            });
            formatedJson.SUB_DATA.push({
              "id":i+1,
              "label": "Subprocessor",
              "value": "SUB",
              "color": "#3ddbd9",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].SUBPROC,
              "percent": calcs.formatPercentage100(message[i].SUBPROC_PCT),
              "msac_rating": message[i].MSAC_RATING,
              "msac_color": msac_color
            });
          }  else {
            formatedJson.IMPCT_BY_GDPR_DATA.push({
              "id":i+1,
              "label": "GDPR Impacted Contracts",
              "value": "IMPCT_BY_GDPR",
              "color": "#6929c4",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].GDPR_IMPCT
            });
            formatedJson.DPA_NOT_SGND_DATA.push({
              "id":i+1,
              "label": "DPA Not Signed",
              "value": "DPA_NOT_SGND",
              "color": "#0043ce",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].DPA_NOT_SGND,
              "percent": calcs.formatPercentage100(message[i].DPA_NOT_SGND_PCT)
            });
            formatedJson.EXHBT_NOT_SGND_DATA.push({
              "id":i+1,
              "label": "DPA Exhibit Not Signed",
              "value": "EXHBT_NOT_SGND",
              "color": "#005d5d",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].DPA_EXHBT_NOT_SGND,
              "percent": calcs.formatPercentage100(message[i].DPA_EXHBT_NOT_SGND_PCT)
            });
            formatedJson.SL_NOT_CMPL_DATA.push({
              "id":i+1,
              "label": "TOMs SL Review Not Completed",
              "value": "SL_NOT_CMPL",
              "color": "#FF832B",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].TOM_SL_REVIEW_NOT_CMP,
              "percent": calcs.formatPercentage100(message[i].TOM_SL_REVIEW_NOT_CMP_PCT)
            });
            formatedJson.TOM_NOT_IMPL_DATA.push({
              "id":i+1,
              "label": "TOMs Not Implemented",
              "value": "TOM_NOT_IMPL",
              "color": "#a2191f",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].TOM_NOT_IMPLM,
              "percent": calcs.formatPercentage100(message[i].TOM_NOT_IMPLM_PCT)
            });
            formatedJson.FULL_NOT_ACH_DATA.push({
              "id":i+1,
              "label": "Full GDPR Readiness Not Achieved",
              "value": "FULL_NOT_ACH",
              "color": "#F1C21B",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].FULL_GDPR_READINESS_NOT_ACHV,
              "percent": calcs.formatPercentage100(message[i].FULL_GDPR_READINESS_NOT_ACHV_PCT)
            });
            formatedJson.EUMC_DATA.push({
              "id":i+1,
              "label": "EUMC",
              "value": "EUMC",
              "color": "#6fdc8c",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].EUMC,
              "percent": calcs.formatPercentage100(message[i].EUMC_PCT)
            });
            formatedJson.SUB_DATA.push({
              "id":i+1,
              "label": "Subprocessor",
              "value": "SUB",
              "color": "#3ddbd9",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].SUBPROC,
              "percent": calcs.formatPercentage100(message[i].SUBPROC_PCT)
            });
          } // end if for msac is visible check

        } // end loop
      } else {
        formatedJson.DATA_MESSAGE = "No Data Available";
      } //end if empty

    cb(err, formatedJson);
});
};

T2compgdprimptrendcontract.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompGDPRImpTrendContract', type: 'object'}
  });

};
