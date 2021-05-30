'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdmdeldevstdexport) {
  T2compdmdeldevstdexport.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

    try {
        var formatedJson = {
          "DATE":" ",
          "Delivery_Option": ""
        };

        if(message.length == 0) { 
            formatedJson = {};
        } else {
            formatedJson = {

          }
          var metLabel = '';
          switch (req.query['metric']) { 
            case "UAPR":
              metLabel = "Delivery: Unapproved Deviations";
            break;
            default:
              metLabel = "Delivery: Approved Deviations";
            break;
          };
          formatedJson.Delivery_Option = metLabel;
          formatedJson.DATE = message[0].DATA_LOAD_DESC;
          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "CONTRACT_NUM [IPPF Link]":message[i].CNTRCT_NUM,
                "PRFL_MEASURED": message[i].PRFL_MEASURED,
                "CLIENT_NAME": message[i].CLIENT, 
                "PROJECT_DESC": message[i].PROJECT,
                "GROWTH_PLATFORM": message[i].GRTH_PLFM_DESC,
                "SERVICE_LINE":message[i].SVC_LINE_NM,
                "PRACTICE":message[i].PRACTICE,
                "SUB_PRACTICE":message[i].SUB_PRACTICE==null?' ':message[i].SUB_PRACTICE,
                "GEOGRAPHY":message[i].GEO,
                "MARKET":message[i].MARKET,
                "COUNTRY":message[i].CTRY_NM,
                "SECTOR": message[i].SCTR_GB_NM,
                "INDSTRY": message[i].INDSTRY_CMR_NM,
                "APRVD_DEV":message[i].DEV_APRVD==null?' ':message[i].DEV_APRVD,
                "METHOD":message[i].METHOD==null?' ':message[i].METHOD,	
                "STNDRD_TYPE": message[i].STANDARD_TYPE==null?' ':message[i].STANDARD_TYPE,
                "NOT_CMPLNT_CAT":message[i].NOT_COMPL_CAT==null?' ':message[i].NOT_COMPL_CAT, 
                "NOT_STNDRD_PMT":message[i].NOT_STNDRT_PMT==null?' ':message[i].NOT_STNDRT_PMT,
                "DEV_REASONS":message[i].DEV_REASON==null?' ':message[i].DEV_REASON,
                "ADD_DEV_REASON":message[i].NON_STNDRT_DEV_REASON==null?' ':message[i].NON_STNDRT_DEV_REASON,
                "APRVR_NM":message[i].APRVR_NM==null?' ':message[i].APRVR_NM,
                "CONTRACT_STRT_DT": message[i].CNTRCT_STRT_DT==null?' ':message[i].CNTRCT_STRT_DT,
                "CONTRACT_PM":message[i].CNTRCT_PM==null?' ':message[i].CNTRCT_PM, 
                "CONTRACT_PE":message[i].CNTRCT_PE==null?' ':message[i].CNTRCT_PE, 
                "LEAD_PARTNER":message[i].LEAD_PRTNR==null?' ':message[i].LEAD_PRTNR,
                "IPPF_URL": message[i].IPPF_URL
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2compdmdeldevstdexport.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2CompDMDelDevStdExport', type: 'object'}
  });
};
