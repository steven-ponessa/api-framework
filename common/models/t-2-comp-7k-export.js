'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2comp7kexport) {
		T2comp7kexport.processChild = function(req, filter, cb) {
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

              if (message[i].EXCEPT_DATE == null) {
                var dateValue = ' ';
              } else {
                dateValue = message[i].EXCEPT_DATE;
              }

              formatedJson.data.push({
                "WBS_ID [IPPF Link]":message[i].WBS_ID,
                "BRAND":message[i].BRAND,
                "COUNTRY":message[i].COUNTRY,
                "GEO":message[i].GEO,
                "MARKET":message[i].MARKET,
                "BRANCH":message[i].BRANCH,
                "SERVICE_LINE":message[i].SERVICE_LINE,
                "PRACTICE": message[i].PRACTICE,
                "IPPF_SECTOR": message[i].IPPF_SECTOR,
                "IPPF_INDUSTRY": message[i].IPPF_INDUSTRY,
                "IPPF_CUSTOMER": message[i].IPPF_CUSTOMER,
                "WBS_SHORT_DESC":message[i].WBS_SHORT_DESC,	
                "BRAND_PM_GENERAL_REMARK":message[i].BRAND_PM_GENERAL_REMARK,
                "WBS_IPPF_STATUS": message[i].WBS_IPPF_STATUS,
                "DELI_START_DATE": message[i].DELI_START_DATE,
                "WBS_START_DT": message[i].WBS_START_DT,
                "WBS_END_DT":message[i].WBS_END_DT,
                "CONTRACT_SIGN_DATE":message[i].CONTRACT_SIGN_DATE,
                "CONTRACT_END_DATE":message[i].CONTRACT_END_DATE,
                "COMPLEX_PROGRM":message[i].COMPLEX_PROGRM,
                "GROWTH_PLATFORM": message[i].GROWTH_PLATFORM,
                "GBS_DMS_SCOPE":message[i].GBS_DMS_SCOPE,
                "TCV":message[i].TCV,
                "OVERAL_7KEYS":message[i].OVERAL_7KEYS,
                "MONTH_7KEYS":message[i].MONTH_7KEYS,
                "SET_NAME_7KEYS":message[i].SET_NAME_7KEYS,
                "STAKE_HOLDER_7KEY":message[i].STAKE_HOLDER_7KEY,
                "BUSINESS_BENEFETS_7KEY":message[i].BUSINESS_BENEFETS_7KEY,
                "SCOPE_7KEY":message[i].SCOPE_7KEY,
                "RISK_7KEY":message[i].RISK_7KEY,
                "WORK_SCHEDULE_7KEY":message[i].WORK_SCHEDULE_7KEY,
                "TEAM7KEY":message[i].TEAM7KEY,
                "DELI_ORGA_7KEY":message[i].DELI_ORGA_7KEY,
                "BRAND_PM_SUBMSSION":message[i].BRAND_PM_SUBMSSION,
                "BRAND_PE_APPROVAL":message[i].BRAND_PE_APPROVAL,
                "BRAND_PM_COMMENT":message[i].BRAND_PM_COMMENT,
                "BRAND_PE_COMMENT":message[i].BRAND_PE_COMMENT,
                "DELI_EXCELLENCE":message[i].DELI_EXCELLENCE,
                "IPPF_URL": message[i].PHD_URL
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2comp7kexport.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2Comp7KExport', type: 'object'}
  });
};

