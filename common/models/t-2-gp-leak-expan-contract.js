'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(t2gpleakexpancontract) {
  t2gpleakexpancontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
    try {

        var formatedJson = {};
        
            formatedJson = {
              "DATA_LOAD_DATE":" ", 
              "contract_nbr_label": "Contract No.",
              "work_nbr_label": "Work No.",
              "geography_label": "Geography",
              "pc_revenue_label": "PC Revenue",
              "Status_label": "Status",
              "cq_to_pc_label": "CQ to PC",
              "fc_eac_to_pc_label": "FC EaC to PC",
              "itd_to_pc_label": "ItD to PC",
              "ytd_to_pc_label": "YtD to PC",
              "ap_to_pc_label": "AP to PC",
              "fc_eac_to_ap_label": "FC EaC to AP",
              "cq_to_ap_label": "CQ to AP",
              "3_mo_cost_over_run_label": "3 Mo. Cost Overrun",
              "detailed_view_label": "Detailed View",
              "DATA":[]
            };

            for (var i = 0; i < message.length; i++) {

              if (message[0].DATA_LOAD_DESC != null){
                formatedJson.DATA_LOAD_DATE = message[0].DATA_LOAD_DESC;
              };

              formatedJson.DATA.push({
                "CNTRCT_NUM":message[i].CNTRCT_NUM,
                "WORK_NUM": "All",
                "Status":message[i].STATUS,
                "GEOGRAPHY":message[i].BUS_ATTR,
                "PC_REV": (message[i].REV),
                "CQPC": (message[i].CQPC) ,
                "CQ_TO_PC_PCT":calcs.formatPercentage100(message[i].CQ_TO_PC_PCT) + '%',
                "FCPC": (message[i].FCPC),
                "FC_EAC_TO_PC_PCT":calcs.formatPercentage100(message[i].FC_EAC_TO_PC_PCT)+ '%',
                "ITDPC": (message[i].ITDPC),
                "ITD_TO_PC_PCT":calcs.formatPercentage100(message[i].ITD_TO_PC_PCT)+ '%',
                "YTDPC": (message[i].YTDPC),
                "YTD_TO_PC_PCT":calcs.formatPercentage100(message[i].YTD_TO_PC_PCT)+ '%',
                "APPC": (message[i].APPC),
                "AP_TO_PC_PCT":calcs.formatPercentage100(message[i].AP_TO_PC_PCT)+ '%',
                "FCAP": (message[i].FCAP),
                "FC_EAC_TO_AP_PCT":calcs.formatPercentage100(message[i].FC_EAC_AP_PCT)+ '%',
                "FC_EAC_TO_AP_TIER":message[i].FC_EAC_AP_TIER_NUM,

                /*
                "CQAP":   calcs.calcValue(message[i].CQAP),
                "CQ_TO_AP_PCT": calcs.formatPercentage100(message[i].CQ_TO_AP_PCT)+ '%',
                "CQ_TO_AP_TIER": message[i].CQ_TO_AP_TIER_NUM,
                */

               "CQAP": '--',
               "CQ_TO_AP_PCT": '--',
               "CQ_TO_AP_TIER": '--',

                "CSTOVRN": '--',
                "3_MO_COST_OV_RUN_PCT": '--',
				"IPPF_URL": message[i].IPPF_URL


/*                
                "CQAP": calcs.calcValue(message[i].CQAP) + 'M',
                "CQ_TO_AP_PCT":calcs.formatPercentage100(message[i].CQ_TO_AP_PCT)+ '%',
                "CSTOVRN": calcs.calcValue(message[i].CSTOVRN) + 'M',
                "3_MO_COST_OV_RUN_PCT": calcs.formatPercentage100(message[i].COST_OVER_PCT) + '%' 
*/                
              });
            };


      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  t2gpleakexpancontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2GPLeakExpanContract', type: 'object'}
  });
};
