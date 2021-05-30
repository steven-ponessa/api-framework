'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2gpptrendmonthplan) {
    T2gpptrendmonthplan.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        var formatedJson = {
                "TREND_LABEL":"Trend",
                "SELECTED_LABEL":"",

                "FC_EAC_LABEL": "FC EaC %",
                "FC_EAC_COLOR": "#6EAD3E",

                "AP_LABEL": "AP %",
                "AP_COLOR": "#F5A623",

                "PC_LABEL": "PC %",
                "PC_COLOR": "#A9D0FF",

                "FC_EAC": [],
                "AP": [],
                "PC": []
        };

        if (message != null && !message.length < 1){

        var precentDecimal = 1;

        formatedJson.SELECTED_LABEL = req.query['label'];

          for (var i = 0; i < message.length; i++) {
            formatedJson.FC_EAC.push({
                "label":"FC EaC %",
                "date": message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
                "fc_eac_pct": calcs.formatPercentage100(message[i].EAC_FC_GP_PCT,precentDecimal),
                "ap_pct": calcs.formatPercentage100(message[i].AP_GP_PCT,precentDecimal),
                "pc_pct": calcs.formatPercentage100(message[i].PC_GP_PCT,precentDecimal)
              });
                formatedJson.AP.push({
                "label":"AP %",
                "date": message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
                "fc_eac_pct": calcs.formatPercentage100(message[i].EAC_FC_GP_PCT,precentDecimal),
                "ap_pct": calcs.formatPercentage100(message[i].AP_GP_PCT,precentDecimal),
                "pc_pct": calcs.formatPercentage100(message[i].PC_GP_PCT,precentDecimal)
              });
                formatedJson.PC.push({
                "label":"PC %",
                "date": message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
                "fc_eac_pct": calcs.formatPercentage100(message[i].EAC_FC_GP_PCT,precentDecimal),
                "ap_pct": calcs.formatPercentage100(message[i].AP_GP_PCT,precentDecimal),
                "pc_pct": calcs.formatPercentage100(message[i].PC_GP_PCT,precentDecimal)
              });
          }
        }

      cb(err, formatedJson);
  });
};

T2gpptrendmonthplan.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2gppTrendMonthPlan', type: 'object'}
  });

};
