'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(t1PMProcCompWorkNum) {
    t1PMProcCompWorkNum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
	  var formatedJson = {};

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
			
						"CONTRACT_KEY": message[i].CNTRCT_KEY,
						"WORK_KEY": message[i].PROJ_KEY,
						"FORCSTD_FLG": message[i].FORCSTD_FLG,	
						"SUBMTD_FLG": message[i].SUBMTD_FLG,
						"APPRVD_FLG": message[i].PPRVD_FLG,
						"SUBMITTEDBY_BRANDPM_COLOR": message[i].SUBMITTEDBYBRANDPMCOLOR, 
						"APPROVEDBY_BRANDPE_COLOR": message[i].APPROVEDBYBRANDPECOLOR

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


t1PMProcCompWorkNum.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't1PMProcCompWorkNum', type: 'object'}
  });

};
