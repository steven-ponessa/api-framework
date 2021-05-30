'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2planhealthworknumexport) {
  T2planhealthworknumexport.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
    try {

        var formatedJson = {};
        var monthName = '';
        var signedValue = '';
        switch (message[0].YRQTRKEY) { 
          case "0000Q1":
            signedValue = "All";
              break;
          default:
            signedValue = message[0].YRQTRKEY;
              break;
        };
/*
        switch (message[0].ACCT_MO) { //use month name not number
          case "01":
              monthName = "January";
              break;
          case "02":
              monthName = "February";
              break;
          case "03":
              monthName = "March";
              break;
          case "04":
              monthName = "April";
              break;
          case "05":
              monthName = "May";
              break;
          case "06":
              monthName = "June";
              break;
          case "07":
              monthName = "July";
              break;
          case "08":
              monthName = "August";
              break;
          case "09":
              monthName = "September";
              break;
          case "10":
              monthName = "October";
              break;
          case "11":
              monthName = "November";
              break;
          case "12":
              monthName = "December";
              break;
        }; */

        monthName = dateUtils.getMonthName(message[0].ACCT_MO);        

        if(message.length == 0) { 
            formatedJson = {};
        } else {
            formatedJson = {
            //"Date":message[0].DATA_LOAD_DATE,
            "Year":message[0].ACCT_YR,
            "Month":monthName,
            "Quarter_Signed_Date": signedValue,
            "Sort Column":message[0].SORT_KEY,
            "Sort Direction":message[0].SORT_DIRECTION
          }

          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "Account_Month":message[i].ACCT_MO,
                "Account_Year":message[i].ACCT_YR,
                "Contract_Number":message[i].CNTRCT_NUM,
                "Project_Number":message[i].WORK_NUM,
                "Project_Name":message[i].PROJ_NAME,
                "Contract_Name":message[i].CNTRCT_NAME,
                "Client_Name":message[i].CLIENT_NAME,
                "Partner_Name":message[i].PARTNER_NAME,
                "Geo_Description":message[i].GEO_DESC,
                "Market_Description": message[i].MKT_DESC,
                "Country":message[i].COUNTRY,
                "Contract_Signed_Date":message[i].CNTRCT_SGND_DT,
                "Growth_Platform":message[i].GROWTH_PLATFORM,
                "Sector_Description":message[i].SECTOR_NM,
                "Industry_Description":message[i].INDUSTRY_DESC,
                "Service_Line":message[i].SERVICE_LINE,
                "practice_nm":message[i].PRACTICE_NM, 
                "Cluster_Name":message[i].CLUSTER_NAME,
                "Approved_Plan_Date":message[i].APRV_PLN_DT,
                "Forecast_Date": message[i].FCAST_DATE,
                "TCV_$":message[i].TCV,
                "Status":message[i].STATUS_ABBR,
                "Quarter_Signed_Date": signedValue,
                "Price_Case_Revenue_$":message[i].PC_REV_AMT,
                "Price_Case_Cost_$":message[i].PC_COST_AMT,
                "Price_Case_GP_%":message[i].PC_GP_PCT,
                "Price_Case_GP_$":message[i].PC_GP_AMT,
                "EAC_Actuals_Revenue_$":message[i].EAC_ACTLS_REV_AMT,
                "EAC_Actuals_Cost_$":message[i].EAC_ACTLS_COST_AMT,
                "EAC_Actuals_GP_%":message[i].EAC_ACTLS_GP_PCT,
                "EAC_Actuals_GP_$":message[i].EAC_ACTLS_GP_AMT,
                "Approved_Plan_Revenue_$":message[i].APRVD_REV_AMT,
                "Approved_Plan_Cost_$":message[i].APRVD_COST_AMT,
                "Approved_Plan_GP_%":message[i].APRVD_GP_PCT,
                "Approved_Plan_GP_$":message[i].APRVD_GP_AMT,
                "ITD_Actuals_Revenue_$":message[i].ITD_ACTLS_REV_AMT,
                "ITD_Actuals_Cost_$":message[i].ITD_ACTLS_COST_AMT,
                "ITD_Actuals_GP_$":message[i].ITD_ACTLS_GP_AMT,
                "ITD_Actuals_GP_%":message[i].ITD_ACTLS_GP_PCT
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2planhealthworknumexport.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PlanHealthWorkNumExport', type: 'object'}
  });
};