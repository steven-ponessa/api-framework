
'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2gpleakexportworknum) {
  T2gpleakexportworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

    try {

        var formatedJson = {};

        if(message.length == 0) { 
          formatedJson = {
          "DATA_MESSAGE": "No Data Available "
        };
      } else {

          var monthName = '';
          monthName = dateUtils.getMonthName(message[0].ACCT_MO);
    
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
    
/*          var signedValue = '';
            dateUtils.formatQuarterYear(message[0].YRQTRKEY);
            switch (message[0].YRQTRKEY) { 
              case "0001Q1":
                signedValue = "All";
                  break;
              default:
                signedValue = message[0].YRQTRKEY;
                  break;
            }; */
            var signedValue = dateUtils.formatQuarterYear(message[0].YRQTRKEY);
    
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

            formatedJson = {
            "Year":message[0].ACCT_YR,
            "Month":monthName,
            "Level":'Work Number',
            "Sort_Column":sortValue,
            "Contingency": contingencyValue,
            "Quarter_Signed_Date": signedValue,
            "Leakage_Value": leakValue,
            "NGP_Value": ngpValue
          };

          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "Account_Year":message[i].ACCT_YR,
                "Account_Month":message[i].ACCT_MO,
                "Contract_Number":message[i].CNTRCT_NUM,
                "Contract_Name":message[i].CNTRCT_DESC,
                "Project_Number":message[i].WORK_NUM,
                "Project_Name":message[i].PROJ_NM,
                "Client_Name":message[i].CUSTOMER,
                "Partner_Name":message[i].PARTNER_NM,
                "Geo_Description":message[i].GEO_DESC,
                "Market_Description":message[i].MKT_DESC,
                "Country":message[i].COUNTRY,
				"Growth_Platform":message[i].GROWTH_PLATFORM,
                "Service_Line":message[i].SERVICE_LINE,
                "practice_nm":message[i].PRACTICE_NM, 
                "Industry_Description": message[i].INDUSTRY_DESC,  
                "Sector_Description":message[i].SECTOR_DESC,
                "Status":message[i].STATUS,
                "Quarter_Sign_Date": message[i].QTR_VALUE,
                "Contract_Signed_Date":message[i].CNTRCT_SGND_DT,
                "Start_Date": message[i].START_DATE,
                "End_Date": message[i].END_DATE,
/*
                "Brand_PM": "",
*/								
                "AP_51_(PoC)": message[i].AP51,
                "Cluster_Name":message[i].CLUSTER_NAME,
				"Price_Case_Rev_$":message[i].PC_REV_AMT,
                "Price_Case_Cost_$":message[i].PC_PLAN_COST,
                "Price_Case_GP_$":message[i].PC_GP,
                "Price_Case_GP_%":calcs.calcX100(Number(message[i].PC_GP_PCT)),
                "Approved_Plan_Revenue_$":message[i].AP_REV,
                "Approved_Plan_Cost_$":message[i].AP_COST,
                "Approved_Plan_GP_$":message[i].AP_GP,
                "Approved_Plan_GP_%":calcs.calcX100(Number(message[i].AP_GP_PCT)),
                "Approved_Plan_Date":message[i].APRVD_PLN_DT,
                "Forecast_Revenue_$":message[i].EAC_REV,
                "Forecast_Cost_$":message[i].EAC_COST,
                "Forecast_GP_$":message[i].EAC_GP,
                "Forecast_GP_%":calcs.calcX100(Number(message[i].EAC_GP_PCT)),
                "Forecast_Approved_Date":message[i].FRCST_SBMT_DT,				
                "QTD_Actuals_Revenue_$":message[i].CQ_REV_ACT_AMT,
                "QTD_Actuals_Cost_$":message[i].CQ_COST_ACT_AMT,
                "QTD_Actuals_GP_$":message[i].CQ_GP_ACT_AMT,
                "QTD_Actuals_GP_%":calcs.calcX100(Number(message[i].CQ_GP_ACT_PCT)),
                "CQ_FC_+_Actuals_Revenue_$":message[i].CQ_REV_ACT_FC_AMT,
                "CQ_FC_+_Actuals_Cost_$":message[i].CQ_COST_ACT_FC_AMT,
                "CQ_FC_+_Actuals_GP_$":message[i].CQ_GP_ACT_FC_AMT,
                "CQ_FC_+_Actuals_GP_%":calcs.calcX100(Number(message[i].CQ_GP_ACT_FC_PCT)),
                "CQ_TO_PC_$":message[i].CQPC,
                "CQ_TO_PC_%":calcs.calcX100(Number(message[i].CQ_TO_PC_PCT)),
/*
                "PQ_TO_PC_$":"",
                "PQ_TO_PC_%":"",
                "CQ_TO_AP_$":"",
                "CQ_TO_AP_%":"",                
                "PQ_TO_AP_$":"",
                "PQ_TO_AP_%":"",
*/								
                "AP_TO_PC_$":message[i].APPC,
                "AP_TO_PC_%":calcs.calcX100(Number(message[i].AP_TO_PC_PCT)),				
                "FC_EAC_AP_$":message[i].FCAP,
                "FC_EAC_AP_%":calcs.calcX100(Number(message[i].FC_EAC_AP_PCT)),				
                "FC_EAC_TO_PC_$":message[i].FCPC,
                "FC_EAC_TO_PC_%":calcs.calcX100(Number(message[i].FC_EAC_TO_PC_PCT)),
                "ITD_Revenue_$":message[i].ITD_ACTLS_REV_AMT,
                "ITD_Cost_%":message[i].ITD_APRVD_COST_AMT,				
                "ITD_TO_PC_$":message[i].ITDPC,
                "ITD_TO_PC_%":calcs.calcX100(Number(message[i].ITD_TO_PC_PCT)),
                "YTD_Revenue_$":message[i].YTD_ACTLS_REV_AMT,
                "YTD_Cost_%":message[i].YTD_ACTLS_COST_AMT,							
                "YTD_TO_PC_$":message[i].YTDPC,
                "YTD_TO_PC_%":calcs.calcX100(Number(message[i].YTD_TO_PC_PCT)),  
                "3_Mo._Cost_Overrun_%": calcs.calcX100(Number(message[i].COST_LKG_PCT)),
                "3_Mo._Cost_Overrun_$":message[i].CSTOVRN,
				        "3_Mo._Cost_Overrun_Plan_$": message[i].COR_PLAN_AMT,
                "3_Mo._Cost_Overrun_Actual_$":message[i].COR_ACTUALS_AMT
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2gpleakexportworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2GPLeakExportWorkNum', type: 'object'}
  });
};

