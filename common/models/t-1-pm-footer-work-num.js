'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T1PMFooterWorkNum) {
  T1PMFooterWorkNum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
	  var formatedJson = {};

			try {
					formatedJson = {
						"RED": "#E71D32",
						"GREEN": "#33AC2E",
						"BLUE": "#007AFF",
						"DATA": []
					}

					for (var i = 0; i < message.length; i++) {

						formatedJson.DATA.push({
					
							"CONTRACT_NBR":message[i].CNTRCT_NUM,
							"CONTRACT_KEY":message[i].CNTRCT_KEY,
							"WORK_NBR":message[i].PROJ_NUM,
							"WORK_KEY":message[i].PROJ_KEY,
							"CURRENT_PROJ_GP_PCT": calcs.formatPercentage100(message[i].GP_PCT), 
							"PC_GP_PCT": calcs.formatPercentage100(message[i].PC_GP_PCT), 
							"EAC_ACTLS_GP_PCT": calcs.formatPercentage100(message[i].EAC_GP_PCT),
							"GP_COMP": calcs.formatPercentage100(message[i].GP_COMP),
							"EAC_COMP": calcs.formatPercentage100(message[i].EAC_COMP),		
							"PC_GP_AMT": (message[i].GP_COMP),
							"TOTAL_UBAR": message[i].TOTAL_UBAR,
							"RISK_REV": message[i].RISK_REV,
							"RISK_REV_COLOR": message[i].RISK_REV_COLOR,
							"POC": message[i].POC

						});


				};
			} catch (e) {
				formatedJson = {
					msg: e.message
				};
			}

			cb(err, formatedJson);
		});
};


  T1PMFooterWorkNum.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't1PMFooterWorkNum', type: 'object'}
  });

};
