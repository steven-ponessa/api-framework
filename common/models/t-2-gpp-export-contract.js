'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2gppexportcontract) {
    T2gppexportcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        try {

          var formatedJson = {};
  
          if(message.length == 0) {
            formatedJson = {};
          } else {
            formatedJson = {
              "DATA":[]
            };
              for (var i = 0; i < message.length; i++) {
                  formatedJson.DATA.push({
                    "CNTRCT_NUM":message[i].CNTRCT_NUM,
                    "CLNT_NM":message[i].CLIENT_NM,
                    "MONTHLY_REV": message[i].REV,
                    "MONTHLY_GP":message[i].GP,
                    "MONTHLY_GP_PCT":calcs.calcX100(message[i].GP_PCT),
                    "MONTHLY_FC_EAC_PCT":calcs.calcX100(message[i].MONTHLY_FC_EAC_PCT),
                    "MONTHLY_AP_PCT":calcs.calcX100(message[i].MONTHLY_AP_PCT),
                    "MONTHLY_PC_PCT":calcs.calcX100(message[i].MONTHLY_PC_PCT),
                    "QUARTERLY_REV": message[i].QTR_REV,
                    "QUARTERLY_GP":message[i].QTR_GP,
                    "QUARTERLY_GP_PCT":calcs.calcX100(message[i].QTR_GP_PCT),
                    "QTD_REV": message[i].QTD_REV,
                    "QTD_GP":message[i].QTD_GP,
                    "QTD_GP_PCT":calcs.calcX100(message[i].QTD_GP_PCT),
                    "ITD_REV": message[i].ITD_REV,
                    "ITD_GP":message[i].ITD_GP,
                    "ITD_GP_PCT":calcs.calcX100(message[i].ITD_GP_PCT)
                  })
                }
        }
  
        } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2gppexportcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2gppExportContract', type: 'object'}
  });
};
