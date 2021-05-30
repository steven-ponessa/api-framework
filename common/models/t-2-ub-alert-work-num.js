'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2ubalertworknum) {
  T2ubalertworknum.processChild = function(req, filter, cb) {
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
            // "Year":message[0].YR_NUM,
            // "Month":message[0].MTH_NUM
            "CRITICAL_LABEL": "Critical",
            "CRITICAL_COLOR": "#E71D32",
            "HIGH_LABEL": "High",
            "HIGH_COLOR": "#FF7832",
            "MEDIUM_LABEL": "Medium",
            "MEDIUM_COLOR": "#FDD600",
            "BELOW_CLIP_LABEL": "Below Clip Level",
            "BELOW_CLIP_COLOR": "#E7E6E6",
            "ALERT_DATE":message[0].DATA_LOAD_DATE,
            "TOTAL_CRITICAL":calcs.calcValue(message[0].TOTAL_CRIT),
            "TOTAL_HIGH":calcs.calcValue(message[0].TOTAL_HIGH),
          }

          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "row_color":message[i].ROW_COLOR,
                "client_nm":message[i].CLIENT_NM,
                "work_nbr":message[i].WORK_NUM,
                "ippf_url":message[i].IPPF_URL,
                "alert_type":message[i].ALERT_TYPE,
                "alert_reason":message[i].ALERT_REASON,
                "risk_amt":calcs.calcValue(message[i].RISK_AMT),
                "unbilled":calcs.calcValue(message[i].UNBILLED),
                "tcv":calcs.calcValue(message[i].TCV),
                "market":message[i].MKT_DESC,
                "sector":message[i].SECTOR_NM,
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

  T2ubalertworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2UBAlertWorkNum', type: 'object'}
  });
};

