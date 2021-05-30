'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2gpleakcordetailsmthworknum) {

  T2gpleakcordetailsmthworknum.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message){
            if (err) {
              return cb(err, null);
          }
            var formatedJson = {};

              try {

                var pct_label = "";
                var gp_label = "";
                var prev_qtr_gp_label = "";
                
                switch (req.query['metric']) {
                  case "CQ_TO_PC":
                      pct_label = "CQ to PC %";
                      gp_label = "Current Quarter CQ to PC $";
                      prev_qtr_gp_label = "Prior Quarter CQ to PC $";
                      break;
                  case "ITD_TO_PC":
                      pct_label = "ItD to PC %";
                      gp_label = "ItD to PC $";
                      prev_qtr_gp_label = "";
                      break;
                  case "YTD_TO_PC":
                      pct_label = "YtD to PC %";
                      gp_label = "YtD to PC $";
                      prev_qtr_gp_label = "";
                      break;
                  case "FC_EAC_TO_PC":
                      pct_label = "FC EaC to PC %";
                      gp_label = "FC EaC to PC $";
                      prev_qtr_gp_label = "";
                      break;
                  case "AP_TO_PC":
                      pct_label = "AP to PC %";
                      gp_label = "AP to PC $";
                      prev_qtr_gp_label = "";
                      break;
                  case "FC_EAC_AP":
                      pct_label = "FC EaC to AP %";
                      gp_label = "FC EaC to AP $";
                      prev_qtr_gp_label = "";
                      break;
                  
                };
                


          			formatedJson = {
          				"TIMEFRAME":dateUtils.formatQuarterYear(req.query['yrQtrKey']),
          				"WORK_NUM_LABEL":"Work No.",
                  "PRJCT_NM_LABEL":"Description",
          				"CLNT_NM_LABEL":"Client Name",
                  "TCV_LABEL":"TCV $",
          				"PLAN_AMT_LABEL":"Plan $",
          				"ACT_AMT_LABEL":"Actual $",
                  "VAR_PCT_LABEL":"Variance %",
                  "VAR_AMT_LABEL":"Variance $",
          				"DATA":[]
          			  };


              if(message.length >= 0) { //Avoid processing a empty result set

                  for (var i = 0; i < message.length; i++) {
          					formatedJson.DATA.push({
                      "WORK_NUM":message[i].WORK_NUM,
					  "CNTRCT_NUM":message[i].CNTRCT_NUM,
                      "PRJCT_NM":message[i].PRJCT_NM,
          					  "CLNT_NM":message[i].CLNT_NM,
                      "TCV":message[i].TCV,
          					  "PLAN_AMT":message[i].PLAN_AMT,
          					  "ACT_AMT":message[i].ACT_AMT,
          					  "VAR_PCT":calcs.calcX100(message[i].VARIANCE_PCT),
          					  "VAR_AMT":message[i].VARIANCE_AMT

          					})
        				  }
                }
              } catch(e) {
                formatedJson = {msg: e.message};
              }

              cb(err, formatedJson);
          });
      };

      T2gpleakcordetailsmthworknum.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't2GPLeakCORDetailsMthWorkNum', type: 'object'}
      });

};
