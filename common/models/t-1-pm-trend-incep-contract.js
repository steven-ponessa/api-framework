'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T1PMTrendIncepContract) {
  T1PMTrendIncepContract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
	  var formatedJson = {
			"DATA_LOAD_DATE":" "			
		};

			try {
					formatedJson = {
						"DATA": []
					}

					for (var i = 0; i < message.length; i++) {

						if (message[i].DATA_LOAD_DESC != null){
							formatedJson.DATA_LOAD_DATE = message[i].DATA_LOAD_DESC;
						}

						formatedJson.DATA.push({

						"MTH_NM": message[i].MTH_NM,
						"PC_REV_AMT": message[i].PRICE_CASE_REVENUE_DOL, 
						"PC_COST_AMT": message[i].PRICE_CASE_COST_DOL, 
						"PC_GP_AMT": message[i].PRICE_CASE_GP_DOL, 
						"PC_GP_PCT": calcs.formatPercentage100(message[i].PRICE_CASE_GP_PER), 
						"APRVD_REV_AMT": message[i].APPROVED_PLAN_REVENUE_DOL, 
						"APRVD_COST_AMT": message[i].APPROVED_PLAN_COST_DOL, 
						"APRVD_GP_AMT": message[i].APPROVED_PLAN_REV_GP_DOL, 
						"APRVD_GP_PCT": calcs.formatPercentage100(message[i].APPROVED_PLAN_REV_GP_PER), 
						"EAC_ACTLS_REV_AMT": message[i].FORECAST_REVENUE_DOL, 
						"EAC_ACTLS_COST_AMT": message[i].FORECAST_COST_DOL, 
						"EAC_ACTLS_GP_AMT": message[i].FORECAST_GP_DOL, 
						"EAC_ACTLS_GP_PCT": calcs.formatPercentage100(message[i].FORECAST_GP_PER)

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


  T1PMTrendIncepContract.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't1PMTrendIncepContract', type: 'object'}
  });

};
