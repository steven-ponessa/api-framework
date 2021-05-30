'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2planhealthexclusiondetailscontractall) {

  T2planhealthexclusiondetailscontractall.processChild = function (req, filter, cb) {
    this.process(req, filter, function (err, message) {
        //console.log("...Reformat message into JSON UI team is expecting here.");
        if (err) {
          return cb(err, null);
        }
        var valueDecimalPlace = 2;
        var percentDecimalPlace = 1;
        
        try {
          var formatedJson = {};

            formatedJson = {
              "TIMEFRAME":dateUtils.formatQuarterYear(req.query['yrMoKey']),
              "SELECTED_LABEL":(req.query['label']),
              "CNTRCT_NUM_LABEL":"Contract#",
              "PRJCT_NM_LABEL":"Project Name",
              "CLNT_NM_LABEL":"Client Name",
              "GP_PRECENT_LABEL":"GP Percent",
              "TCV_LABEL":"TCV",
              "DATA":[]
            };

            for (var i = 0; i < message.length; i++) {
              formatedJson.DATA.push({
                "CNTRCT_NUM":message[i].CNTRCT_NUM,
                "PRJCT_NM":message[i].PROJECT_NAME,
                "CLNT_NM":message[i].CLIENT_NAME,
                "GP_PRECENT":0.0,
                "TCV":calcs.calcValue(message[i].TCV_PLAN_RT_USD,valueDecimalPlace)
              })
              if(!message[i].PC_GP_PCT)
                formatedJson.DATA[i].GP_PRECENT = "0.0";
              else
                formatedJson.DATA[i].GP_PRECENT = calcs.formatPercentage100(parseFloat(message[i].PC_GP_PCT),percentDecimalPlace);
            }
        } catch (e) {
          formatedJson = {"msg" : e.message}
        }

        cb(err, formatedJson);
      });
  };

  T2planhealthexclusiondetailscontractall.remoteMethod('processChild', {
      http: { path: '/', verb: 'get', status: 200 },
      accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
      { arg: 'filter', type: 'object' }],
      returns: { arg: 't2planhealthexclusiondetailscontractall', type: 'object' }
  });

};
