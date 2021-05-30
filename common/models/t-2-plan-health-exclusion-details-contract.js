'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2planhealthexclusiondetailscontract) {

  T2planhealthexclusiondetailscontract.processChild = function (req, filter, cb) {
    this.process(req, filter, function (err, message) {
        //console.log("...Reformat message into JSON UI team is expecting here.");
        if (err) {
          return cb(err, null);
      }
      
        var formatedJson = {};

        try {
          formatedJson = {
            "TIMEFRAME":dateUtils.formatQuarterYear(req.query['yrQtrKey']),
            "SELECTED_LABEL":(req.query['label']),
            "CNTRCT_NUM_LABEL":"Contract",
            "PRJCT_NM_LABEL":"Description",
            "CLNT_NM_LABEL":"Client",
            "GP_PRECENT_LABEL":"GP %",
            "TCV_LABEL":"TCV",
            "DATA":[]
          };
          for (var i = 0; i < message.length; i++) {
            formatedJson.DATA.push({
              "CNTRCT_NUM":message[i].CNTRCT_NUM,
              "PRJCT_NM":message[i].PROJECT_NAME,
              "CLNT_NM":message[i].CLIENT_NAME,
              "GP_PRECENT":calcs.formatPercentage100(Number(message[i].GPP)),
              "TCV":calcs.calcValue(message[i].TCV)
            })
          }

/*           for (var i = 0; i < message.length; i++) {
            formatedJson.DATA.push({
              "CNTRCT_NUM":message[i].CNTRCT_NUM,
              "PRJCT_NM":message[i].PROJECT_NAME,
              "CLNT_NM":message[i].CLIENT_NAME,
              "GP_PRECENT":0.0,
              "TCV":calcs.calcValue(message[i].TCV,valueDecimalPlace)
            })
            if(!message[i].PC_GP_PCT)
              formatedJson.DATA[i].GP_PRECENT = "0.0";
            else
              formatedJson.DATA[i].GP_PRECENT = calcs.formatPercentage100(parseFloat(message[i].GPP),percentDecimalPlace);
          } */
        } catch (e) {
          formatedJson = {msg: e.message};
        }

        cb(err, formatedJson);
      });
  };

  T2planhealthexclusiondetailscontract.remoteMethod('processChild', {
      http: { path: '/', verb: 'get', status: 200 },
      accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
      { arg: 'filter', type: 'object' }],
      returns: { arg: 't2planhealthexclusiondetailscontract', type: 'object' }
  });

};
