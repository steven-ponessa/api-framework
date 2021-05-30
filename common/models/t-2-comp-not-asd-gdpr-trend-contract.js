'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2compnotasdgdprtrendcontract) {
  T2compnotasdgdprtrendcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

      var dataMessage = '';
      var formatedJson = {
        "DATA_MESSAGE": dataMessage,
        "SELECTED_LABEL": " ",
        "NOASSN_DATA": []
      }

      if (!message.length <= 0){

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
              //msac_text = "#161616";
            break;
            default:
              msac_color = "#E7E6E6";
            break;
          };
          // only return MSAC rating when message[i].IS_MSAC_VISIBLE is set to 1
          if ( message[i].IS_MSAC_VISIBLE == 1 ) {
            formatedJson.NOASSN_DATA.push({
              "id":i+1,
              "value":"NOASSN",
              "label":"Active Contracts Not Assessed for GDPR",
              "color": "#ffafd2",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "msac_rating": message[i].MSAC_RATING,
              "msac_color": msac_color,
              "count": message[i].NOT_ASSESSED,
              "percent": calcs.formatPercentage100(message[i].NOT_ASSESSED_PCT,1)
            });
          } else {
            formatedJson.NOASSN_DATA.push({
              "id":i+1,
              "value":"NOASSN",
              "label":"Active Contracts Not Assessed for GDPR",
              "color": "#ffafd2",
              "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].NOT_ASSESSED,
              "percent": calcs.formatPercentage100(message[i].NOT_ASSESSED_PCT,1)
            });
          } // end if for msac is visible check 
        } // end loop
      } else {
        formatedJson.DATA_MESSAGE = "No Data Available";
      } //end if empty

    cb(err, formatedJson);
});
};

T2compnotasdgdprtrendcontract.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompNotAsdGDPRTrendContract', type: 'object'}
  });

};
