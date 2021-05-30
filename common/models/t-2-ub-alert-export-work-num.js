'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2ubalertexportworknum) {
  T2ubalertexportworknum.processChild = function(req, filter, cb) {
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

          }

          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                // "total_crit":calcs.calcValue(message[i].TOTAL_CRIT),
                // "total_high":calcs.calcValue(message[i].TOTAL_HIGH),
                "client_nm":message[i].CLIENT_NM,
                "work_nbr":message[i].WORK_NUM,
                "ippf_url":message[i].IPPF_URL,
                "alert_type":message[i].ALERT_TYPE,
                "alert_reason":message[i].ALERT_REASON,
                "risk_amt":(message[i].RISK_AMT),
                "unbilled":(message[i].UNBILLED),
                "tcv":(message[i].TCV),
                "market":message[i].MKT_DESC,
                "sector":message[i].SECTOR_NM,
                "practice_nm":message[i].PRACTICE_NM, 
                "end_date":message[i].CLOSED_DT
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2ubalertexportworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2UBAlertExportWorkNum', type: 'object'}
  });
};

