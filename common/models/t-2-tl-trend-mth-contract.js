'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function (T2tltrendmthcontract) {
  T2tltrendmthcontract.processChild = function (req, filter, cb) {
    this.process(req, filter, function (err, message) {
      if (err) {
        return cb(err, null);
    }
      var formatedJson = {};

      try {
        formatedJson = {
          "TREND_MESSAGE" : "Historical data is calculated using current business rules; values may vary from previously published excel Actuals reports",
          "CQ_LABEL": "CQ to AP",
          "CQ_COLOR": "#FE9D98",
          "FC_TO_AP_LABEL": "FC EaC to AP",
          "FC_TO_AP_COLOR": "#FC6227",
          "CQ": [],
          "FC_TO_AP": []
        }

        for (var i = 0; i < message.length; i++) {


          formatedJson.CQ.push({
			//"id":i+1,
            "label": "CQ to AP",
            "color": "#FE9D98",
            "value": "CQ_TO_AP",
            "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
            "percent": calcs.formatPercentage100(message[i].CQ_TO_AP_LKG_TIER_PCT),
            "count": message[i].CQ_TO_AP_LKG_CNT,
            "amount": calcs.calcValue(message[i].CQ_TO_AP_LKG)

          });


          formatedJson.FC_TO_AP.push({
			//"id":i+1,
            "label": "FC EaC to AP",
            "color": "#FC6227",
            "value": "FC_EAC_AP",
            "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
            "percent": calcs.formatPercentage100(message[i].FC_EAC_TO_AP_LKG_TIER_PCT),
            "count": message[i].FC_EAC_TO_AP_LKG_CNT,
            "amount": calcs.calcValue(message[i].FC_EAC_TO_AP_LKG)

          });

        };
      } catch (e) {
        formatedJson = { msg: e.message };
      }

      cb(err, formatedJson);
    });
  };

  T2tltrendmthcontract.remoteMethod('processChild', {
    http: { path: '/', verb: 'get', status: 200 },
    accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
    { arg: 'filter', type: 'object' }],
    returns: { arg: 't2TLTrendMthContract', type: 'object' }
  });

};
