'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2compnongdprtrendcontract) {
  T2compnongdprtrendcontract.processChild = function(req, filter, cb) {
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
        "NOT_IMPCT_DATA": [],
        "NO_LANG_DATA": []
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
            formatedJson.NOT_IMPCT_DATA.push({
              "id":i+1,
              "label":"Contracts Not Impacted by GDPR",
              "value":"NOT_IMPCT",
              "color": "#A1D800",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].NOT_IMPCT_BY_GDPR,
              "msac_rating": message[i].MSAC_RATING,
              "msac_color": msac_color
            });

            formatedJson.NO_LANG_DATA.push({
              "id":i+1,
              "value":"NO_LANG",
              "label":"Contracts Without Standard Language",
              "color": "#a6c8ff",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].NO_STND_LANG,
              "percent": calcs.formatPercentage100(message[i].NO_STND_LANG_PCT,1),
              "msac_rating": message[i].MSAC_RATING,
              "msac_color": msac_color
            });
          } else {
            formatedJson.NOT_IMPCT_DATA.push({
              "id":i+1,
              "label":"Contracts Not Impacted by GDPR",
              "value":"NOT_IMPCT",
              "color": "#A1D800",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].NOT_IMPCT_BY_GDPR
            });

            formatedJson.NO_LANG_DATA.push({
              "id":i+1,
              "value":"NO_LANG",
              "label":"Contracts Without Standard Language",
              "color": "#a6c8ff",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].NO_STND_LANG,
              "percent": calcs.formatPercentage100(message[i].NO_STND_LANG_PCT,1)
            });
          } // end if for msac is visible check

        } // end loop
      } else {
        formatedJson.DATA_MESSAGE = "No Data Available";
      } //end if empty

    cb(err, formatedJson);
});
};

T2compnongdprtrendcontract.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompNonGDPRTrendContract', type: 'object'}
  });

};
