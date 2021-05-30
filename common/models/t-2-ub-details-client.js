'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2ubdetailsclient) {
    T2ubdetailsclient.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
            return cb(err, null);
        }
    try {

        var value_label = "";
        var ub_label = "Total Unbilled";

        switch (req.query['metric']) {
            case "BUCK_01":
                value_label = "1 - 30";
                ub_label = "Unbilled";
                break;
            case "BUCK_02":
                value_label = "31 - 60";
                ub_label = "Unbilled";
                break;
            case "BUCK_03":
                value_label = "61 - 90";
                ub_label = "Unbilled";
                break;
            case "BUCK_04":
                value_label = "91 - 120";
                ub_label = "Unbilled";
                break;
            case "BUCK_05":
                value_label = "121 - 150";
                ub_label = "Unbilled";
                break;
            case "BUCK_06":
                value_label = "151 - 180";
                ub_label = "Unbilled";
                break;
            case "BUCK_07":
                value_label = "181 - 210";
                ub_label = "Unbilled";
                break;
            case "BUCK_08":
                value_label = "211 - 240";
                ub_label = "Unbilled";
                break;
            case "BUCK_09":
                value_label = "241 - 270";
                ub_label = "Unbilled";
                break;
            case "BUCK_10_11_12":
                value_label = "271 - 360";
                ub_label = "Unbilled";
                break;
            case "BUCK_13":
                value_label = "> 360";
                ub_label = "Unbilled";
                break;

        };

        var formatedJson = {};

        if(message.length > 0) { //Avoid processing a empty result set
            formatedJson = {
            "Year":message[0].YR_NUM,
            "Month":message[0].MTH_NUM,
            "CLIENT_LABEL":"Client Name",
            "MARKET_LABEL":"Market/Region",
            "SECTOR_LABEL":"Sector",
            "UNBILLED_LABEL":ub_label,
            "VALUE_LABEL":value_label          
          }

          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "client_nm":message[i].CLIENT_NM,
                "market_region":message[i].MKT_DESC,
                "sector":message[i].SECTOR_NM,
                "unbilled":calcs.calcValue(message[i].UNBILLED),
                "value":calcs.calcValue(message[i].AGING_VALUE)
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2ubdetailsclient.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2UBDetailsClient', type: 'object'}
  });
};

