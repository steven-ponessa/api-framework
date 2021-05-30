'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2tlexportcontract) {
  T2tlexportcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

      var monthName = '';
      monthName = dateUtils.getMonthName(message[0].ACCT_MO);
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

        var sortValue = '';
        switch (message[0].SORT_KEY) { 
          case "CQPC":
            sortValue = "CQ_TO_PC";
              break;
          case "FCPC":
            sortValue = "FC_EAC_TO_PC";
              break;
          case "ITDPC":
            sortValue = "ITD_TO_PC";
              break;
          case "YTDPC":
            sortValue = "YTD_TO_PC";
              break;
          case "APPC":
            sortValue = "AP_TO_PC";
              break;
          case "FCAP":
            sortValue = "FC_EAC_TO_AP";
              break;
          case "CQAP":
            sortValue = "CQ_TO_AP";
              break;
          case "CSTOVRN":
            sortValue = "3_MO_COST_OVERRUN";
              break;
        };

        var signedValue = '';
        switch (message[0].YRQTRKEY) { 
          case "0000Q1":
            signedValue = "All";
              break;
          default:
            signedValue = message[0].YRQTRKEY;
              break;
        };

        var contingencyValue = '';
        switch (message[0].CONTINGENCY) { 
          case "_W_CNTGCY":
            contingencyValue = "With Contingency";
              break;
          default:
            contingencyValue = "Without Contingency";
              break;
        };

        var ngpValue = '';
        switch (message[0].NGP) { 
          case "INGP":
            ngpValue = "Include NGP";
              break;
          default:
            ngpValue = "Excludes NGP";
              break;
        };

        var leakValue = '';
        switch (message[0].LEAK) { 
          case "GRS":
            leakValue = "Gross Leakage";
              break;
          default:
          leakValue = "Net Leakage";
              break;
        };

    try {

        var formatedJson = {};

        if(message.length == 0) { 
            formatedJson = {};
        } else {
            formatedJson = {
              "Year":message[0].ACCT_YR,
              "Month":monthName,
              "Sort_Column":sortValue,
              "Contingency": contingencyValue,
              "Quarter_Signed_Date": signedValue,
              "Leakage_Value": leakValue,
              "NGP_Value": ngpValue
          }

          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "Contract_Number":message[i].CNTRCT_NUM,
                "Contract_Name":message[i].CNTRCT_DESC,
                "Client_Name":message[i].CUSTOMER,
                "Partner_Name":message[i].PARTNER_NM,
                "Geo_Description":message[i].GEO_DESC,
                "Market_Description":message[i].MKT_DESC,
                "Country":message[i].COUNTRY,
                "Sector_Description":message[i].SECTOR_DESC,
                "Industry_Description": message[i].INDUSTRY_DESC,
                "Growth_Platform":message[i].GROWTH_PLATFORM,
                "Service_Line":message[i].SERVICE_LINE,
                "Revenue": message[i].REVENUE,
                "Contract_Signed_Date":message[i].CNTRCT_SGND_DT,
                //"Cluster_Name":message[i].CLUSTER_NAME,
                "Start_Date": message[i].START_DATE,
                "End_Date": message[i].END_DATE,
                "Status":message[i].STATUS,
                "TCV_$":message[i].TCV,
                "Quarter_Sign_Date": message[i].QTR_VALUE,
                "Account_Year":message[i].ACCT_YR,
                "Account_Month":message[i].ACCT_MO,
                "Price_Case_GP_%":calcs.calcX100(Number(message[i].PC_GP_PCT)),
                "Price_Case_GP_$":message[i].PC_GP,
                "Price_Case_Cost_$":message[i].PC_PLAN_COST,
                "Forecast_Revenue_$":message[i].FC_REV,
                "Forecast_Cost_$":message[i].FC_COST,
                "Forecast_GP_$":message[i].FC_GP,
                "Forecast_GP_%":calcs.calcX100(Number(message[i].FC_GP_PCT)),
                "Approved_Plan_Revenue_$":message[i].AP_REV,
                "Approved_Plan_Cost_$":message[i].AP_COST,
                "Approved_Plan_GP_$":message[i].AP_GP,
                "Approved_Plan_GP_%":calcs.calcX100(Number(message[i].AP_GP_PCT)),
                "ITD_Actual_Revenue_$":message[i].ITD_ACT_REV,
                "ITD_Actual_Cost_$":message[i].ITD_ACT_COST,
                "ITD_Actual_GP_$":message[i].ITD_ACT_GP,
                "ITD_Actual_GP_%":calcs.calcX100(Number(message[i].ITD_ACT_GP_PCT)),
                "Current_Quarter_GP_$":message[i].CQ_GP,
                "Current_Quarter_GP_%":(Number(message[i].CQ_GP_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].CQ_GP_PCT)),
                "Tier_Number":message[i].TIER_GP_LKG_NUM,
                "CQ_TO_PC_$":message[i].CQPC,
                "CQ_TO_PC_%":calcs.calcX100(Number(message[i].CQ_TO_PC_PCT)),
                "FC_EAC_TO_PC_$":message[i].FCPC,
                "FC_EAC_TO_PC_%":calcs.calcX100(Number(message[i].FC_EAC_TO_PC_PCT)),
                "ITD_TO_PC_$":message[i].ITDPC,
                "ITD_TO_PC_%":calcs.calcX100(Number(message[i].ITD_TO_PC_PCT)),
                "YTD_TO_PC_$":message[i].YTDPC,
                "YTD_TO_PC_%":calcs.calcX100(Number(message[i].YTD_TO_PC_PCT)),
                "AP_TO_PC_$":message[i].APPC,
                "AP_TO_PC_%":calcs.calcX100(Number(message[i].AP_TO_PC_PCT)),
                "FC_EAC_TO_AP_$":message[i].FCAP,
                "FC_EAC_TO_AP_%":calcs.calcX100(Number(message[i].FC_EAC_AP_PCT))
/*                ,
                "CQ_TO_AP_$":message[i].CQAP,
                "CQ_TO_AP_%":(Number(message[i].CQ_TO_AP_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].CQ_TO_AP_PCT)),
                "3_Mo._Cost_Overrun_Tier_Number":message[i].TIER_COST_OVER_NUM,
                "3_Mo._Cost_Overrun_%":(Number(message[i].COST_OVER_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].COST_OVER_PCT)),
                "3_Mo._Cost_Overrun_$":message[i].CSTOVRN
*/
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2tlexportcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2TLExportContract', type: 'object'}
  });
};
