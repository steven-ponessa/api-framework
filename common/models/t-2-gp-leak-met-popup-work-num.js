'use strict';

var calcs = require("./utils/tieredLeakageCalcs");


module.exports = function(T2gpleakmetpopupworknum) {

  T2gpleakmetpopupworknum.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }
          var formatedJson = {};
          try {
            formatedJson = {
              "WORK_NUM_LABEL":"Work No.",
              "DATA_LOAD_DATE_LABEL":"Updated on ",
              "PERCENT_LABEL":"%",
              "AMOUNT_LABEL":"$",
              "TIER_LABEL":"Tier",
              "AP_TO_PC_LABEL":"AP to PC",
              "CQ_TO_PC_LABEL":"CQ to PC",
              "ITD_TO_PC_LABEL":"ItD to PC",
              "YTD_TO_PC_LABEL":"YtD to PC",
              "FC_TO_PC_LABEL":"FC EaC to PC",
              "FC_TO_AP_LABEL":"FC EaC to AP",
              "CQ_TO_AP_LABEL":"CQ to AP",
              "COST_OVER_LABEL":"3 Mo. Cost Overrun",               
              "data":[],
            };
            if (message.length > 0 ) {
              formatedJson.data.push({
                "WORK_NUM": message[0].WORK_NUM,
                "DATA_LOAD_DATE": message[0].DATA_LOAD_DESC,
                "CONTRACT_KEY":message[0].CNTRCT_KEY,
                "WORK_KEY":message[0].PROJ_KEY,

                "AP_TO_PC": message[0].APPC,
                "AP_TO_PC_PCT": calcs.formatPercentage100(message[0].AP_TO_PC_PCT,1)+"%",
                "AP_TO_PC_TIER": '--' ,

                "CQ_TO_PC": message[0].CQPC,
                "CQ_TO_PC_PCT": calcs.formatPercentage100(message[0].CQ_TO_PC_PCT,1)+"%",
                "CQ_TO_PC_TIER": '--' ,

                "ITD_TO_PC": message[0].ITDPC,
                "ITD_TO_PC_PCT": calcs.formatPercentage100(message[0].ITD_TO_PC_PCT,1)+"%",
                "ITD_TO_PC_TIER": '--' ,                

                "YTD_TO_PC": message[0].YTDPC,
                "YTD_TO_PC_PCT": calcs.formatPercentage100(message[0].YTD_TO_PC_PCT,1)+"%",
                "YTD_TO_PC_TIER": '--' ,                

                "FC_TO_PC": message[0].FCPC,
                "FC_TO_PC_PCT": calcs.formatPercentage100(message[0].FC_EAC_TO_PC_PCT,1)+"%",
                "FC_TO_PC_TIER": '--' ,
              
                "FC_TO_AP": message[0].FCAP, 
                "FC_TO_AP_PCT": calcs.formatPercentage100(message[0].FC_EAC_AP_PCT,1)+"%",
                "FC_TO_AP_TIER": message[0].FC_EAC_AP_TIER_NUM,

                /*
                "CQ_TO_AP": message[0].CQAP,
                "CQ_TO_AP_PCT": calcs.formatPercentage100(message[0].CQ_TO_AP_PCT,1)+"%",
                "CQ_TO_AP_TIER": message[0].CQ_TO_AP_TIER_NUM,
                */

               "CQ_TO_AP": '--' ,
               "CQ_TO_AP_PCT": '--' ,
               "CQ_TO_AP_TIER": '--' ,                

                "COST_OVER": message[0].CSTOVRN,
                "COST_OVER_PCT": calcs.formatPercentage100(message[0].COST_OVER_PCT,1)+"%",
                "COST_OVER_TIER": message[0].COST_OVER_TIER_NUM,

                "IPPF_URL": message[0].IPPF_URL
            });
          }; // End if not empty
            } catch (e) {
              formatedJson = {"msg" : e.message}
            }

          cb(err, formatedJson);
        });
    };

    T2gpleakmetpopupworknum.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2GPLeakMetPopupWorkNum', type: 'object'}
    });

};
