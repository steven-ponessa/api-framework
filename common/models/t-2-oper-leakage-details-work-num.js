'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2operleakagedetailsworknum) {

    T2operleakagedetailsworknum.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message){
            if (err) {
							return cb(err, null);
					}
			var lkg_pct_label = "AP to PC %";
			var lkg_label = "AP to PC $";

			switch (req.query['metric']) {
				case "YTD_TO_PC":lkg_pct_label 		= "YTD EaC to PC %"; lkg_label = "YTD EaC to PC $"; break;
				case "PQ_TO_PC":lkg_pct_label 		= "PQ EaC to PC %";  lkg_label = "PQ EaC to PC $";  break;
				case "ITD_TO_PC":lkg_pct_label 		= "ITD EaC to PC %"; lkg_label = "ITD EaC to PC $"; break;
				case "FRCST_TO_PC":lkg_pct_label 	= "FC EaC to PC %";  lkg_label = "FC EaC to PC $";  break;
				case "CQ_TO_PC":lkg_pct_label 		= "CQ EaC to PC %";  lkg_label = "CQ EaC to PC $";  break;
				case "APRVD_TO_PC":lkg_pct_label 	= "AP EaC to PC %";  lkg_label = "AP EaC to PC $";  break;
				case "FRCST_TO_APRVD":lkg_pct_label = "FC EaC to AP %";  lkg_label = "FC EaC to AP $";  break;
			};

			var formatedJson = {};
			try {
				formatedJson ={
					"TIMEFRAME":dateUtils.formatQuarterYear(req.query['yrQtrKey']),
					"SELECTED_LABEL":(req.query['label']),
					"WORK_NUM_LABEL":"Work No.",
					"PRJCT_NM_LABEL":"Project",
					"CLNT_NM_LABEL":"Client",
					"SERVICE_LINE_LABEL":"Service",
					"TCV_LABEL":"TCV",
					"LEAK_PCT_LABEL":lkg_pct_label,
					"LEAK_LABEL":lkg_label,
					"DATA":[]
				  };
					for (var i = 0; i < message.length; i++) {
						formatedJson.DATA.push({
						  "WORK_NUM":message[i].WORK_NUM,
						  "PRJCT_NM":message[i].PRJCT_NM,
						  "CLNT_NM":message[i].CLNT_NM,
							"SERVICE_LINE":message[i].SERVICE_LINE,
							"TCV": calcs.calcValue(message[i].TCV),
						  "LEAK_PCT":calcs.calcX100(message[i].LEAK_PCT),
						  "LEAK":calcs.calcValue(message[i].LEAK)
						})
					  }

			} catch (e) {
				formatedJson = {"msg" : e.message}
			}
            cb(err, formatedJson);
          });
      };

      T2operleakagedetailsworknum.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't2OperLeakageDetailsWorkNum', type: 'object'}
      });

};
