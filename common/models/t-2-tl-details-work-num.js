
'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2tldetailsworknum) {

  T2tldetailsworknum.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message){
            if (err) {
              return cb(err, null);
          }
            var formatedJson = {};

              try {

                var label = "";
                
                switch (req.query['metric']) {
                /*
                  case "CQ_TO_AP":
                      label = "CQ to AP";
                      break;
                */
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
                  "WORKNUM_LABEL":"Work No.",
                  "CLNT_NM_LABEL":"Client Name",
                  "TCV_LABEL":"TCV",
                  "METRIC_LABEL":label,
                  "PLAN_LABEL":"Plan",
                  "ACTUAL_LABEL":"Actual",
                  "VARIANCE_LABEL":"Variance",
                  "TIER_LABEL":"Tier",
                  "DATA":[]
                  };


              if(message.length > 0) { //Avoid processing a empty result set

                  for (var i = 0; i < message.length; i++) {
                     formatedJson.DATA.push({
                      "WORK_NUM":message[i].PROJ_NUM,
                      "CLIENT":message[i].CUSTOMER,
                      "TCV":message[i].TCV, //OrderColumn
                      "PLAN":message[i].PLAN, //OrderColumn
                      "ACTUAL":message[i].ACT, //OrderColumn
                      "VARIANCE":message[i].VAR, //OrderColumn
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

      T2tldetailsworknum.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't2TLDetailsWorkNum', type: 'object'}
      });

};
