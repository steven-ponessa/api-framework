'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(t1PMPRIWorkNum) {
    t1PMPRIWorkNum.processChild = function(req, filter, cb) {
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

						if (message[i].DATA_LOAD_DESC != null){
							formatedJson.DATA_LOAD_DATE = message[i].DATA_LOAD_DESC;
						 }	

						formatedJson.DATA.push({

								"WORK_NUM":(message[i].WORK_NUM),
								"PROJ_KEY":(message[i].PROJ_KEY),
								"CNTRCT_KEY":(message[i].CNTRCT_KEY),
								"TRGT_PLAN":(message[i].TRGT_PLAN),
								"LNCH_FLG":(message[i].LNCH_FLG),
								"LNCH_DATE":(message[i].LNCH_DATE),
								"RISK_FACTORS":JSON.parse(message[i].RISK_FACTORS),
								"IPPF_URL":(message[i].IPPF_URL)

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


t1PMPRIWorkNum.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't1PMPRIWorkNum', type: 'object'}
  });

};
