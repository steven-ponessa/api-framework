'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2gppdetailsitdfinworknum) {
  T2gppdetailsitdfinworknum.processChild = function(req, filter, cb) {
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
            "Load Date":message[0].DATA_LOAD_DATE,
            //"Order Column":message[0].ORDER_KEY,
            //"Order Direction":message[0].ORDER_DIRECTION, 

            "CNTRCT_NUM_LABEL":"Work No.",
            "CLNT_NM_LABEL":"Client Name",
            "REV_LABEL":"Revenue $",
            "GP_LABEL":"GP $",
            "GP_PCT_LABEL":"GP %",
            "FC_EAC_PCT_LABEL":"FC EaC %",
            "AP_PCT_LABEL":"AP %",
            "PC_PCT_LABEL":"PC %",
            "DATA":[]
          };
            for (var i = 0; i < message.length; i++) {
                formatedJson.DATA.push({
                  "WORK_NUM":message[i].WORK_NUM,
                  "CLNT_NM":message[i].CLIENT_NM,
                  "REV": calcs.calcValue(message[i].REV),
                  "GP":calcs.calcValue(message[i].GP),
                  "GP_PCT":calcs.calcX100(message[i].GP_PCT),
                  "FC_EAC_PCT":calcs.calcX100(message[i].FC_EAC_PCT),
                  "AP_PCT":calcs.calcX100(message[i].AP_PCT),
                  "PC_PCT":calcs.calcX100(message[i].PC_PCT),
                  "IPPF_URL": message[i].IPPF_URL
                })
              }
      }

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2gppdetailsitdfinworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2gppDetailsITDFinWorkNum', type: 'object'}
  });
};


