'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2businessleakageexpansiondetailsworknumber) {

      T2businessleakageexpansiondetailsworknumber.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message){
            if (err) {
              return cb(err, null);
          }

            var formatedJson = {};

            try {
              if(message.length >= 0) { //Avoid processing a empty result set

                var pct_label = "FC EaC to PC %";
          			var gp_label = "FC EaC to PC $";
                var prev_qtr_gp_label = "";
                
          			switch (req.query['metric']) {
          				case "ITD":
                      pct_label = "ItD to PC %";
                      gp_label = "ItD to PC $";
          						break;
          				case "YTD":
                      pct_label = "YtD to PC %";
                      gp_label = "YtD to PC $";
    									break;
    							case "CQ":
                      pct_label = "CQ to PC %";
                      gp_label = "Current Quarter CQ to PC $";
                      prev_qtr_gp_label = "Prior Quarter CQ to PC $";
          						break;
          			};

          			formatedJson = {
          				"TIMEFRAME":dateUtils.formatQuarterYear(req.query['yrQtrKey']),
          				"SELECTED_LABEL":(req.query['label']),
          				//"METRICVAL":message[0].METRICVAL,
          				"WORK_NUM_LABEL":"Work No.",
                  //"PRJCT_NM_LABEL":"Project",
                  "PRJCT_NM_LABEL":"Description",
          				"CLNT_NM_LABEL":"Client",
          				"SERVICE_LINE_LABEL":"Service",
                  "TCV_LABEL":"TCV",
          				"GP_PCT_LABEL":pct_label,
          				"GP_LABEL":gp_label,
                  "PREV_QTR_GP_LABEL":prev_qtr_gp_label,
          				"DATA":[]
          			  };

                  for (var i = 0; i < message.length; i++) {
          					formatedJson.DATA.push({
          					  "WORK_NUM":message[i].WORK_NUM,
          					  "PRJCT_NM":message[i].PRJCT_NM,
          					  "CLNT_NM":message[i].CLNT_NM,
          					  "SERVICE_LINE":message[i].SERVICE_LINE,
                      "TCV":calcs.calcValue(message[i].TCV),
          					  "GP_PCT":calcs.calcX100(message[i].GP_PCT),
          					  "GP_VAL":calcs.calcValue(message[i].GP_VAL),
                      "PREV_QTR_GP_VAL":calcs.calcValue(message[i].PREV_GP_VAL)
          					})
        				  }
                }
              } catch(e) {
                formatedJson = {msg: e.message};
              }

              cb(err, formatedJson);
          });
      };

      T2businessleakageexpansiondetailsworknumber.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't2businessleakageexpansiondetailsworknumber', type: 'object'}
      });

};
