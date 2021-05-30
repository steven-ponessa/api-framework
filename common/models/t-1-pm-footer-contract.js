'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T1PMFooterContract) {
  T1PMFooterContract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
	  var formatedJson = {};

			try {
				var dataMessage = "No data available";
				var formatedJson = {
					"DATA_MESSAGE":dataMessage,
					"RED": "#E71D32",
					"GREEN": "#5AA700",
					"BLUE": "#007AFF",
					"DATA": []
				};
				if (!message.length <= 0) {
					dataMessage = "";
					formatedJson.DATA_MESSAGE = dataMessage;
				}
					for (var i = 0; i < message.length; i++) {

						formatedJson.DATA.push({

							"CONTRACT_NBR":message[i].CNTRCT_NUM,
							"CONTRACT_KEY":message[i].CNTRCT_KEY,
							"CURRENT_PROJ_GP_PCT": calcs.formatPercentage100(message[i].GP_PCT), 
							"PC_GP_PCT": calcs.formatPercentage100(message[i].PC_GP_PCT), 
							"EAC_ACTLS_GP_PCT": calcs.formatPercentage100(message[i].EAC_GP_PCT),
							"GP_COMP": calcs.formatPercentage100(message[i].GP_COMP),
							"EAC_COMP": calcs.formatPercentage100(message[i].EAC_COMP),					
							"PC_GP_AMT": (message[i].GP_COMP),
							"TOTAL_UBAR": message[i].TOTAL_UBAR,
							"RISK_REV": message[i].RISK_REV,
							"RISK_REV_COLOR": message[i].RISK_REV_COLOR,
							"SEVENKEYS": message[i].SEVEN_KEYS,
							"SEVENKEYS_COLOR": message[i].SEVEN_KEYS_COLOR

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


  T1PMFooterContract.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't1PMFooterContract', type: 'object'}
  });

};
