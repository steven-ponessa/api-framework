'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdsexport) {
  T2compdsexport.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

    try {
        var complValue = '';
        var formatedJson = {
          "Date":" ",
          "Metric": ""
        };

        if(message.length == 0) { 
            formatedJson = {};
        } else {
            formatedJson = {

          }
					//switch (req.query['compl']) { 
          switch (message[0].COMPL) { 
            case 1:
              complValue = "Delivery Start Non Compliant";
              break;
            case -1:
              complValue = "14 Day Wait Period";
              break;
            default:
              complValue = "Delivery Start Compliant";
              break;
          };

          formatedJson.Metric = complValue;
          formatedJson.Date = message[0].DATA_LOAD_DESC;
          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "WBS_ID [IPPF Link]":message[i].WBS_ID,
                "IPPF_DS_URL": message[i].IPPF_DS_URL,
                "BRAND":message[i].BRAND,
                "COUNTRY":message[i].COUNTRY,
                "GEOGRAPHY":message[i].GEO,
                "MARKET":message[i].MARKET,
                "SERVICE_LINE":message[i].SERVICE_LINE,
                "IPPF_SECTOR_(brand)": message[i].IPPF_SECTOR_BRAND, 
                "IPPF_SECTOR_(S&D)": message[i].IPPF_SECTOR_SD, 
                "IPPF_SECTOR_(GB_Overlay)_code": message[i].IPPF_SECTOR_GB_OVERLAYCODE,    
                "IPPF_SECTOR_(GB_Overay)": message[i].IPPF_SECTOR_GB_OVERLAY,        
                "IPPF_SECTOR_(local)": message[i].IPPF_SECTOR_LOCAL, 
                "PM_Notes_ID":message[i].PM_NOTESID,           
                "Client_Name": message[i].CLIENT_NAME,
                "WBS_IPPF_STATUS": message[i].WBS_IPPFSTATUS,
                "DELIVERY_START_DATE": message[i].DELIVERY_STARTDATE,
                "WBS_START_DT": message[i].WBS_STARTDATE,
                "WBS_END_DT":message[i].WBS_ENDDATE,
                "CONTRACT_SIGN_DATE":message[i].CONTRACT_SIGNDATE,
                "CONTRACT_END_DATE":message[i].CONTRACT_ENDDATE,
                "GROWTH_PLATFORM": message[i].GBS_GROWTH_PLATFORM,
                "TCV": message[i].TCV,
                "Process_Indicator":message[i].PROCESS_INDICATOR, 
                "BRAND_PM_SUBMSSION":message[i].BRAND_PM_SUBMISSION,
                "BRAND_PE_APPROVAL":message[i].BRAND_PE_APPROVAL,
                "BRAND_PM_Notes_ID_Submission":message[i].BRAND_PM_NOTESID_SUBMISSION,   
                "PE_Notes_ID":message[i].BRAND_PE_NOTESID,           
                "DE_Notes_ID":message[i].BRAND_DE_NOTESID,           
                "GBS_DMS_SCOPE":message[i].GBS_DMS_SCOPE, 
                "PRACTICE": message[i].PRACTICE,
                "WBS_SHORT_DESC":message[i].WBS_SHORT_DESCRIPTION,	
                "CONTRACT_STATUS_CODE":message[i].CONTRACT_STATUSCODE,	  
                "DELIVERY_START_PROCESS_COMPLETION":message[i].DELIVERY_START_PROCESS_COMPLETION,
                "DELIVERY_START_STATUS":message[i].DELIVERY_START_STATUS,	  
                "DELIVERY_START_SUBMITTER":message[i].DELIVERY_START_SUBMITTER,	 
                "DELIVERY_START_APPROVER":message[i].DELIVERY_START_APPROVER,	  
                "BRAND_PM_COMMENT":message[i].BRAND_PM_COMMENT,
                "BRAND_PE_COMMENT":message[i].BRAND_PE_COMMENT,
                "DELIVERY_EXCELLENCE":message[i].DELIVERY_EXCELLENCE,
                "SYSTEM_CONTRACT_NBR": message[i].SYSTEM_CONTRACT_NUMBER,         
                "DAYS_OVERDUE": message[i].NUMBEROFDAYS_OVERDUE, 
                "DELIVERY_START_OVERDUE_CAT":message[i].DELIVERY_START_OVERDUE_CATEGORY,	  
                "IPPF_INDUSTRY_S&D": message[i].IPPF_INDUSTRY_SD, 
                "IPPF_INDUSTRY_local": message[i].IPPF_INDUSTRY_LOCAL, 
                "IPPF_CUSTOMER_NBR": message[i].IPPF_CUSTOMER_NUMBER, 
                "GBS_CPM_REQUIRED": message[i].GBS_CPM_REQUIRED, 
                "PLAN_GP_PCT": message[i].PLAN_GP_PCT 
                
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2compdsexport.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2CompDSExport', type: 'object'}
  });
};
