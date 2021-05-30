'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2tldetailscontract) {

    T2tldetailscontract.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message){
            if (err) {
              return cb(err, null);
          }
            var formatedJson = {};

            try {

                var label = "";
                
                switch (req.query['metric']) {
                  case "CQ_TO_AP":
                      label = "CQ to AP";
                      break;
                  case "FC_EAC_AP":
                      label = "FC EaC to AP";
                      break;
                  case "COST_OVER":
                      label = "3 Mo. Cost Overrun";
                      break;
              
               };
                
                
               formatedJson = {
                        "TIMEFRAME":req.query['yrMoKey'],
                        "SELECTED_LABEL":(req.query['label']),
                        "CONTRACT_LABEL":"Contract No.",
                        "CLNT_NM_LABEL":"Client Name",
                        "TCV_LABEL":"TCV",
                        "METRIC_LABEL":label,
                        "DATA":[]
                        };

              if(message.length >= 0) { //Avoid processing an empty result set

                for (var i = 0; i < message.length; i++) {
                  formatedJson.DATA.push({
                   "CONTRACT_NUM":message[i].CNTRCT_NUM,
                   "CLIENT":message[i].CUSTOMER,
                   "TCV":message[i].TCV,
                   "PLAN":message[i].PLAN_AMT,
                   "ACTUAL":message[i].ACTUAL_AMT,
                   "VARIANCE":message[i].VARIANCE_DIFF,
                   "VARIANCE_PCT":calcs.formatPercentage100(message[i].VARIANCE_PCT,1),
                   "TIER": message[i].TIER_NUM
                   })
                 }
              }
            } catch(e) {
              formatedJson = {msg: e.message};
            }

            cb(err, formatedJson);
          });
      };

      T2tldetailscontract.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't2TLDetailsContract', type: 'object'}
      });

};