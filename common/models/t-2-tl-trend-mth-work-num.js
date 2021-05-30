'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function (T2tltrendmthworknum) {
  T2tltrendmthworknum.processChild = function (req, filter, cb) {
    this.process(req, filter, function (err, message) {
      if (err) {
        return cb(err, null);
    }
      var formatedJson = {};

      try {
        formatedJson = {
          "TREND_MESSAGE" : "Historical data is calculated using current business rules; values may vary from previously published excel Actuals reports",
          /*
          "CQ_LABEL": "CQ to AP",
          "CQ_COLOR": "#FE9D98",
          */
          "FC_TO_AP_LABEL": "FC EaC to AP",
          "FC_TO_AP_COLOR": "#FC6227",
          "COST_OVER_LABEL": "3 Mo. Cost Overrun",
          "COST_OVER_COLOR": "#26D181",

          /*
          "CQ": [],
          */
          "FC_TO_AP": [],
          "COST_OVER": []
        }

        for (var i = 0; i < message.length; i++) {

/*
          formatedJson.CQ.push({
			      "id":i+1,
            "label": "CQ to AP",
            "color": "#FE9D98",
            "value": "CQ_TO_AP",
			"refresh_date": message[i].data_load_date,
            "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
            "yrMoKey": message[i].YR_MO_KEY,
            "date_label": message[i].DESC_2,
            "percent": calcs.formatPercentage100(message[i].CQ_TO_AP_LKG_TIER_PCT),
            "count": message[i].CQ_TO_AP_LKG_CNT,
            "amount": message[i].CQ_TO_AP_LKG

          });
*/

          formatedJson.FC_TO_AP.push({
			      "id":i+1,
            "label": "FC EaC to AP",
            "color": "#FC6227",
            "value": "FC_EAC_AP",
			"refresh_date": message[i].data_load_date,
            "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
            "yrMoKey": message[i].YR_MO_KEY,
            "date_label": message[i].DESC_2,
            "percent": calcs.formatPercentage100(message[i].FC_EAC_TO_AP_LKG_TIER_PCT),
            "count": message[i].FC_EAC_TO_AP_LKG_CNT,
            "amount": calcs.calcValue(message[i].FC_EAC_TO_AP_LKG)

          });
		  
          formatedJson.COST_OVER.push({
            "id":i+1,
            "label": "3 Mo. Cost Overrun",
            "color": "#26D181",
            "value": "COST_OVER",
			"refresh_date": message[i].data_load_date,
            "date": message[i].CURR_ACCT_YR + '/' + message[i].CURR_ACCT_MO + '/01',
            "yrMoKey": message[i].YR_MO_KEY,
            "date_label": message[i].DESC_2,
            "percent": Math.abs(calcs.formatPercentage100(message[i].COST_OVERRUN_TIER_PCT)),
            "count": message[i].COST_OVERRUN_CNT,
            "amount": Math.abs(calcs.calcValue(message[i].COST_OVERRUN))
          });

        };
      } catch (e) {
        formatedJson = { msg: e.message };
      }

      cb(err, formatedJson);
    });
  };

  T2tltrendmthworknum.remoteMethod('processChild', {
    http: { path: '/', verb: 'get', status: 200 },
    accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
    { arg: 'filter', type: 'object' }],
    returns: { arg: 't2TLTrendMthWorkNum', type: 'object' }
  });

};
