'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdmdelprofexport) {
  T2compdmdelprofexport.processChild = function(req, filter, cb) {
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
            case "SUB":
              metLabel = "Delivery: Submitted";
            break;
            case "NSUB":
              metLabel = "Delivery: Not Submitted";
            break;
            case "COM":
              metLabel = "Delivery: Compliant";
            break;
            case "NCOM":
              metLabel = "Delivery: Non Compliant";
            break;
            default:
              metLabel = "Delivery: Submitted";
            break;
          };
          formatedJson.Delivery_Option = metLabel;
          formatedJson.DATE = message[0].QTR + " " + message[0].YEAR;
          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "CONTRACT_NUM [IPPF Link]":message[i].CNTRCT_NUM,
                "CLIENT_NAME": message[i].CLIENT, 
                "GEOGRAPHY":message[i].GEO,
                "MARKET":message[i].MARKET,
                "COUNTRY":message[i].CTRY_NM,
                "GROWTH_PLATFORM": message[i].GRTH_PLFM_DESC,
                "SERVICE_LINE":message[i].SVC_LINE_NM,
                "PRACTICE":message[i].PRACTICE_NM,
                "SECTOR": message[i].SCTR_GB_NM,
                "INDSTRY": message[i].INDSTRY_CMR_NM,
                "PRFL_MEASURED": message[i].PRFL_MEASURED,
                "PRFL_SUBMTD": message[i].PRFL_SUBMTD,
                "CONTRACT_STRT_DT": message[i].CNTRCT_STRT_DT,
                "CONTRACT_END_DT":message[i].CNTRCT_END_DT,          
                "CONTRACT_STATUS":message[i].CNTRCT_STATUS, 
                "COMPLEX_FLAG":message[i].CMPLX_FLG,
                "CONTRACT_PM":message[i].CNTRCT_PM,           
                "CONTRACT_PE":message[i].CNTRCT_PE, 
                "LEAD_PARTNER":message[i].LEAD_PRTNR,           
                "OPPTNY_NUM": message[i].OPPTNY_NUM,
                "PROJECT_DESC": message[i].PROJECT,
                "SUB_PRACTICE":message[i].SUB_PRACTICE==null?' ':message[i].SUB_PRACTICE,
                "PRFL_FULLY_CMPL":message[i].PRFL_FULLY_CMPL==null?' ':message[i].PRFL_FULLY_CMPL,
                "APRVD_DEV":message[i].APRVD_DEV==null?' ':message[i].APRVD_DEV,
                "NON_APRVD_DERIVATIONS":message[i].NON_APRVD_DERIVATIONS==null?' ':message[i].NON_APRVD_DERIVATIONS,
                "NOT_CMPLNT_CAT":message[i].NOT_CMPLNT_CAT==null?' ':message[i].NOT_CMPLNT_CAT,   
                "METHOD":message[i].METHOD==null?' ':message[i].METHOD,	
                "OTHER_METHODS":message[i].OTHER_METHODS==null?' ':message[i].OTHER_METHODS,	  
                "DEV_REASONS":message[i].DEV_REASONS==null?' ':message[i].DEV_REASONS,
                "MOSAIC_METHOD_USED":message[i].MOSAIC_METHOD_USED==null?' ':message[i].MOSAIC_METHOD_USED,	 
                "PROFILE_DUE_DT":message[i].PROFILE_DUE_DT==null?' ':message[i].PROFILE_DUE_DT,	  
                "PROFILE_CRETN_TMS":message[i].PROFILE_CRETN_TMS==null?' ':message[i].PROFILE_CRETN_TMS,
                "PROFILE_LAST_EDIT_TMS":message[i].PROFILE_LAST_EDIT_TMS==null?' ':message[i].PROFILE_LAST_EDIT_TMS,
                "PROFILE_ID":message[i].PROFILE_ID==null?' ':message[i].PROFILE_ID,
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

  T2compdmdelprofexport.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2CompDMDelProfExport', type: 'object'}
  });
};
