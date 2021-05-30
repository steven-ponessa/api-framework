'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2ubexportcontract) {
    T2ubexportcontract.processChild = function(req, filter, cb) {
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
              "Year":message[0].YR_NUM,
              "Month":message[0].MTH_NUM
          }

          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "client_nm":message[i].CLIENT_NM,
                "contract_nbr":message[i].CNTRCT_NUM,
                "end_date":message[i].CLOSED_DT,
                "market":message[i].MKT_DESC,
                "sector":message[i].SECTOR_NM,
                "practice_nm":message[i].PRACTICE_NM, 
                "unbilled":message[i].UNBILLED,
                "poc_ind":message[i].POC_IND,
                "A1_30":message[i].A30,
                "A31_60":message[i].A60,
                "A61_90":message[i].A90,
                "A91_120":message[i].A120,
				        "A121_150":message[i].A150,
                "A151_180":message[i].A180,
				        "A181_210":message[i].A210,
				        "A211_240":message[i].A240,
                "A241_270":message[i].A270,
                "A271_360":message[i].A360,
                "A361":message[i].A361
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2ubexportcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2UBExportContract', type: 'object'}
  });
};

