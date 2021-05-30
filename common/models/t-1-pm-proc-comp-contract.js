'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(t1PMProcCompContract) {
    t1PMProcCompContract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
			try {

				var dataMessage = "No data available";
				var formatedJson = {
					"DATA_MESSAGE":dataMessage,
					"DATA_LOAD_DATE": "",
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

					if (message[i].DATA_LOAD_DESC != null){
						formatedJson.DATA_LOAD_DATE = message[i].DATA_LOAD_DESC;
						}	

					formatedJson.DATA.push({
			
						"CONTRACT_KEY":message[i].CNTRCT_KEY,
						"CONTRACT_NUM":message[i].CNTRCT_NUM,
						"SEVEN_KEYS_COMPLIANCE": message[i].OVRL_SEVENKEYS,
						"SEVEN_KEYS_COLOR": message[i].SEVEN_KEYS_COLOR,
						"PHASEGATE_0_COMPLIANCE": message[i].PHASEGATE_0_COMPLIANCE,
						"PHASEGATE_0_COMPLIANCE_VAL": message[i].PHASEGATE_0_COMPLIANCE_VAL,
						"PHASEGATE_0_COLOR": message[i].PHASEGATE_0_COLOR,
						"PHASEGATE_1_4_COMPLIANCE": message[i].PHASEGATE_1_4_COMPLIANCE,
						"PHASEGATE_1_4_COMPLIANCE_VAL": message[i].PHASEGATE_1_4_COMPLIANCE_VAL,
						"PHASEGATE_1_4_COLOR": message[i].PHASEGATE_1_4_COLOR,
						"GDPR_COMPLIANCE_STATUS": message[i].GDPR_COMPLIANCE_STATUS,
						"COS_ASSESSMENT_STATUS": message[i].COS_ASSESSMENT_STATUS,
						"COS_ASSESSMENT_STATUS_COLOR": message[i].COS_ASSESSMENT_STATUS_COLOR
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


t1PMProcCompContract.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't1PMProcCompContract', type: 'object'}
  });

};
