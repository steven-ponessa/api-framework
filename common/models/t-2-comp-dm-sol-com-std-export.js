'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdmsolcomstdexport) {
  T2compdmsolcomstdexport.processChild = function(req, filter, cb) {
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
            case "COM":
              metLabel = "Solutioning Compliant";
            break;
            case "NCOM":
              metLabel = "Solutioning Non Compliant";
            break;
            default:
              metLabel = "Solutioning Compliant";
            break;
          };
          formatedJson.Delivery_Option = metLabel;
          formatedJson.DATE = message[0].DATA_LOAD_DESC;
          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "OPPTNY_NUM":message[i].OPPTNY_NUM,
                "PRFL_MEASURED": message[i].PRFL_MEASURED,
                "PRFL_SUBMTD": message[i].PRFL_SUBMTD,
                "CLIENT_NAME": message[i].CLIENT, 
                "PROJECT_DESC": message[i].PROJECT,
                "GROWTH_PLATFORM": message[i].GRTH_PLFM_DESC,
                "SERVICE_LINE":message[i].SVC_LINE_NM,
                "PRACTICE":message[i].PRACTICE_NM,
                "SUB_PRACTICE":message[i].SUB_PRACTICE==null?' ':message[i].SUB_PRACTICE,
                "GEOGRAPHY":message[i].GEO,
                "MARKET":message[i].MARKET,
                "COUNTRY":message[i].CTRY_NM,
                "SECTOR": message[i].SCTR_GB_NM,
                "INDSTRY": message[i].INDSTRY_CMR_NM,
                "PRFL_FULLY_CMPL":message[i].PRFL_FULLY_CMPL==null?' ':message[i].PRFL_FULLY_CMPL,
                "APRVD_DEV":message[i].APRVD_DEV==null?' ':message[i].APRVD_DEV,
                "NON_APRVD_DERIVATIONS":message[i].NON_APRVD_DERIVATIONS==null?' ':message[i].NON_APRVD_DERIVATIONS,
                "NOT_CMPLNT_CAT":message[i].NOT_COMPLNT_CAT==null?' ':message[i].NOT_COMPLNT_CAT, 
                "METHOD":message[i].METHOD==null?' ':message[i].METHOD,	
                "OTHER_METHODS":message[i].OTHER_METHODS==null?' ':message[i].OTHER_METHODS,	
                "DEV_REASONS":message[i].DEV_REASONS==null?' ':message[i].DEV_REASONS,
                "COMPLEX_FLAG":message[i].CMPLX_FLG==null?' ':message[i].CMPLX_FLG,
                "MOSAIC_METHOD_USED":message[i].MOSAIC_METHOD_USED==null?' ':message[i].MOSAIC_METHOD_USED,	
                "OPPTNY_STAT": message[i].OPPTNY_STAT==null?' ':message[i].OPPTNY_STAT,
                "SLTN_EXC_APRVL_DT":message[i].SLTN_EXC_APRVL_DT==null?' ':message[i].SLTN_EXC_APRVL_DT,          
                "SLTN_MNGR":message[i].SLTN_MNGR==null?' ':message[i].SLTN_MNGR, 
                "OPPTNY_OWNR":message[i].OPPTNY_OWNR==null?' ':message[i].OPPTNY_OWNR,            
                "PROFILE_DUE_DT":message[i].PROFILE_DUE_DT==null?' ':message[i].PROFILE_DUE_DT,
                "PROFILE_CRETN_TMS":message[i].PROFILE_CRETN_TMS==null?' ':message[i].PROFILE_CRETN_TMS,
                "PROFILE_LAST_EDIT_TMS":message[i].PROFILE_LAST_EDIT_TMS==null?' ':message[i].PROFILE_LAST_EDIT_TMS,
                "PROFILE_ID":message[i].PROFILE_ID==null?' ':message[i].PROFILE_ID
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2compdmsolcomstdexport.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2CompDMSolComStdExport', type: 'object'}
  });
};
