'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2priplancontract) {
  T2priplancontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
    try {

          var formatedJson = {};
        
          if (!message.length <= 0) { //Avoid processing a empty result set
                formatedJson = {
              }

              var pc_flag = "No";
              var ap_flag = "No";
              var me_flag = "No";
    
              for (var i = 0; i < message.length; i++) {

          			switch (message[i].TRGT_PLAN) {
          				case "PC":
                      pc_flag = "Yes";
          						break;
          				case "APRVD":
                      ap_flag = "Yes";
          						break;
          				case "Medium":
                      me_flag = "Yes";
          						break;
          			};
              } // end for

              formatedJson = {
                "cntrct_nbr":message[0].CNTRCT_NUM,
                "PC_plan_flag":pc_flag,
                "APRVD_plan_flag":ap_flag,
                "Medium_plan_flag":me_flag
              };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2priplancontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriPlanContract', type: 'object'}
  });
};

