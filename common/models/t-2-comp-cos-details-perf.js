'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2compcosdetailsperf) {

    T2compcosdetailsperf.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message){
            if (err) {
                return cb(err, null);
            }

            try {

            var formatedJson = {
                //"SELECTED_LABEL": message[0].LABEL,
                "CNTRCT_NUM_LABEL":"Contract",
                "TCV_LABEL":"TCV",
                "CUSTOMER_NM_LABEL":"IPPF Customer",
                "PM_ID_LABEL":"PM ID",
                "SIGNED_DATE":"Signed Date",
                "ASSESMENT_DATE":"Assesment Date",

                "DATA":[]
            };

            for (var i = 0; i < message.length; i++) {
                formatedJson.DATA.push({
                    "COLOR": message[i].COLOR,
                    "STATUS": message[i].STATUS,
                    "CNTRCT_NUM": message[i].CON,
                    "TCV": calcs.calcValue(message[i].TCV),
                    "CUSTOMER_NM": message[i].CLNT_NM,
                    "PM_ID": message[i].PM_ID,
                    "SIGNED_DT": message[i].SIGNED_DT,
                    "ASSESSMENT_DT": message[i].ASSESSMENT_DT
                })
            }

        } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2compcosdetailsperf.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't2CompCOSDetailsPerf', type: 'object'}
      });

};
