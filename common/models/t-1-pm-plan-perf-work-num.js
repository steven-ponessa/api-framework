'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function (T1PMPlanPerfWorkNum) {
  T1PMPlanPerfWorkNum.processChild = function (req, filter, cb) {
    this.process(req, filter, function (err, message) {
      if (err) {
        return cb(err, null);
    }
      var formatedJson = {};

      try {
        formatedJson = {
          "DATA_LOAD_DATE":" ",
          "PC_LABEL": "PC",
          "PC_COLOR": "#1F85DB",
          "AP_LABEL": "AP",
          "AP_COLOR": "#FA4A85",
          "ITD_LABEL": "ItD",
          "ITD_COLOR": "#21C4D3",
          "FC_EAC_LABEL": "FC EaC",
          "FC_EAC_COLOR": "#FFB21C",
          "PC": [],
          "AP": [],
          "ITD": [],
          "FC_EAC": []
        }

        for (var i = 0; i < message.length; i++) {

          if (message[i].DATA_LOAD_DESC != null){
            formatedJson.DATA_LOAD_DATE = message[i].DATA_LOAD_DESC;
          }

          formatedJson.PC.push({
          "id":i+1,
          "label": "PC",
          "color": "#1F85DB",
          "value": "PC",
          "date": message[i].MTH_NUM,
          "actls_rev_amt": (message[i].PC_REVENUE_DOL),
          "actls_cost_amt": (message[i].PC_COST_DOL),
          "actls_gp_amt": (message[i].PC_REV_GP_DOL),
          "actls_gp_pct": calcs.formatPercentage100(message[i].PC_REV_GP_PER)
          });

          formatedJson.AP.push({
            "id":i+1,
            "label": "AP",
            "color": "#FA4A85",
            "value": "AP",            
            "date": message[i].MTH_NUM,
            "actls_rev_amt": (message[i].AP_REVENUE_DOL),
            "actls_cost_amt": (message[i].AP_COST_DOL),
            "actls_gp_amt": (message[i].AP_REV_GP_DOL),
            "actls_gp_pct": calcs.formatPercentage100(message[i].AP_REV_GP_PER)
          });

          formatedJson.ITD.push({
            "id":i+1,
            "label": "ItD",
            "color": "#21C4D3",
            "value": "ITD", 
            "date": message[i].MTH_NUM,
            "actls_rev_amt": (message[i].ITD_REVENUE_DOL),
            "actls_cost_amt": (message[i].ITD_COST_DOL),
            "actls_gp_amt": (message[i].ITD_REV_GP_DOL),
            "actls_gp_pct": calcs.formatPercentage100(message[i].ITD_REV_GP_PER)
          });

          formatedJson.FC_EAC.push({
            "id":i+1,  
            "label": "FC EaC",
            "color": "#FFB21C",
            "value": "FC_EAC",
            "date": message[i].MTH_NUM,
            "actls_rev_amt": (message[i].FC_EAC_REVENUE_DOL),
            "actls_cost_amt": (message[i].FC_EAC_COST_DOL),
            "actls_gp_amt": (message[i].FC_EAC_REV_GP_DOL),
            "actls_gp_pct": calcs.formatPercentage100(message[i].FC_EAC_REV_GP_PER)
          });


        };
      } catch (e) {
        formatedJson = { msg: e.message };
      }

      cb(err, formatedJson);
    });
  };

  T1PMPlanPerfWorkNum.remoteMethod('processChild', {
    http: { path: '/', verb: 'get', status: 200 },
    accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
    { arg: 'filter', type: 'object' }],
    returns: { arg: 't1PMPlanPerfWorkNum', type: 'object' }
  });

};
