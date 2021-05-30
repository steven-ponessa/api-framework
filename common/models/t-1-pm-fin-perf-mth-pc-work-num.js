'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T1PMFinPerfMthPCWorkNum) {
  T1PMFinPerfMthPCWorkNum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
	  var formatedJson = {};

      try {
        formatedJson = {
          "DATA_LOAD_DATE":" ", 
          "PLAN_GP_PER": " ",
          "PV_GP_PER": " ",  
          "REV_LABEL": "Rev.$",
          "REV_COLOR": "#83CC00",
          "ACT_FC_REV_LABEL": "Act + Fcast Rev.$",
          "ACT_FC_REV_COLOR": "#D9EFB2",
          "COST_LABEL": "Cost$",
          "COST_COLOR": "#607C85",
          "ACT_FC_COST_LABEL": "Act + Fcast Cost$",
          "ACT_FC_COST_COLOR": "#AFBDC2",
          "DATA": []
        }

        for (var i = 0; i < message.length; i++) {

          if (message[i].DATA_LOAD_DESC != null){
            formatedJson.DATA_LOAD_DATE = message[i].DATA_LOAD_DESC;
          }

          if (message[i].PLAN_GP_PER != null){
            formatedJson.PLAN_GP_PER = calcs.formatPercentage100(message[i].PLAN_GP_PER);
          }

          if (message[i].PV_GP_PER != null){
            formatedJson.PV_GP_PER = calcs.formatPercentage100(message[i].PV_GP_PER);
          }

          formatedJson.DATA.push({
			  
            "MTH_NM":message[i].MTH_NM,
            "REV_IN_DOL":(message[i].REV_IN_DOL),
            "COST_IN_DOL":(message[i].COST_IN_DOL),
            "GP_IN_DOL":(message[i].GP_IN_DOL),
            "GP_IN_PER":calcs.formatPercentage100(message[i].GP_IN_PER),
            "ACT_REV_IN_DOL":(message[i].ACT_REV_IN_DOL),
            "FCST_REV_IN_DOL":(message[i].FCST_REV_IN_DOL),
            "ACT_COST_IN_DOL":(message[i].ACT_COST_IN_DOL),
            "FCST_COST_IN_DOL":(message[i].FCST_COST_IN_DOL),
            "FCST_GP_IN_DOL":(message[i].FCST_GP_IN_DOL),
            "ACT_GP_IN_DOL":(message[i].ACT_GP_IN_DOL),
            "ACT_GP_IN_PER":calcs.formatPercentage100(message[i].ACT_GP_IN_PER),
            "FCST_GP_IN_PER":calcs.formatPercentage100(message[i].FCST_GP_IN_PER),
            "PROJ_NUM":message[i].PROJ_NUM,
            "CNTRCT_NUM": message[i].CNTRCT_NUM,
            "CUST_NM": message[i].CUST_NM,
            "PROJ_DESC":message[i].PROJ_DESC,
            "STRT_DT":message[i].STRT_DT,
            "END_DT":message[i].END_DT
          });




        };
      } catch (e) {
        formatedJson = { msg: e.message };
      }

      cb(err, formatedJson);
  });
};

  T1PMFinPerfMthPCWorkNum.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't1PMFinPerfMthPCWorkNum', type: 'object'}
  });

};
