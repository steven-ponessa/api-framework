
'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2tlexportworknum) {
  T2tlexportworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        var sortValue = '';
        switch (req.metric) { 
          /*
          case "CQ_TO_AP":
            sortValue = "CQ_TO_AP";
              break;
            */
          case "FC_EAC_AP":
            sortValue = "FC_EAC_AP";
              break;
          case "COST_OVER":
            sortValue = "COST_OVER";
              break;
        };


    try {

        var formatedJson = {};

        if(message.length == 0) { 
            formatedJson = {};
        } else {
            formatedJson = {
            "Year":req.yrMoKey,
            "Sort_Column":sortValue,
          };

          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "Contract_Number":message[i].CONTRACT_NUMBER,
                "Contract_Name":message[i].CONTRACT_DESC,                
                "Project_Number":message[i].WORK_NUMBER,
                "Project_Name":message[i].WORK_DESC,
                "Geo_Description":message[i].GEO,
                "Market_Description":message[i].MARKET,
                "Country":message[i].COUNTRY,
                "Sector_Description":message[i].SECTOR,
                "Growth_Platform":message[i].GROWTH_PLATFORM,
                "Service_Line":message[i].SERVICE_LINE,
                "Industry_Description": message[i].INDUSTRY_DESC,
                "Partner_Name":message[i].PARTNER_NM,
                "practice_nm":message[i].PRACTICE_NM,                
                "Cluster_Name":message[i].CLUSTER_NAME,
                "Client_Name":message[i].CUSTOMER,
                "TCV_$":message[i].TCV,
                "Contract_Signed_Date":message[i].CONTRACT_SIGN_DATE,
                "Year": message[i].CURR_ACCT_YR,
                "Month": message[i].CURR_ACCT_MO,
                "Status":message[i].STATUS,
                "Price_Case_Rev_$":message[i].PC_PLAN_REV,
                "Price_Case_Cost_$":message[i].PC_PLAN_COST,
                "Price_Case_GP_$":message[i].PC_GP,
                "Price_Case_GP_%":calcs.calcX100(Number(message[i].PC_GP_PCT)),
                "Forecast_Revenue_$":message[i].EAC_REV,
                "Forecast_Cost_$":message[i].EAC_COST,
                "Forecast_GP_$":message[i].EAC_GP,
                "Forecast_GP_%":calcs.calcX100(Number(message[i].EAC_ACTLS_GP_PCT)),
                "Approved_Plan_Revenue_$":message[i].AP_REV,
                "Approved_Plan_Cost_$":message[i].AP_COST,
                "Approved_Plan_GP_$":message[i].AP_GP,
                "Approved_Plan_GP_%":calcs.calcX100(Number(message[i].AP_PCT)),
                "ITD_Actual_Revenue_$":message[i].ITD_ACT_REV,
                "ITD_Actual_Cost_$":message[i].ITD_ACT_COST,
                "ITD_Actual_GP_$":message[i].ITD_ACT_GP,
                "ITD_Actual_GP_%":calcs.calcX100(Number(message[i].ITD_ACT_GP_PCT)),
                "Current_Quarter_GP_$":message[i].CQ_GP_LKG,
                "Current_Quarter_GP_%":(Number(message[i].CQ_GP_LKG_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].CQ_GP_LKG_PCT)),
                "Current_Quarter_GP_Tier_Numbe":message[i].TIER_GP_LKG_NUM,
                "3_Mo._Cost_Overrun_%":(Number(message[i].COST_OVERRUN_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].COST_OVERRUN_PCT)),
                "3_Mo._Cost_Overrun_$":message[i].COST_OVERRUN,
                "3_Mo._Cost_Overrun_Tier_Number":message[i].TIER_COST_OVERRUN_NUM,
                "EAC_LGK_$":message[i].EAC_LKG,
                "EAC_LGK_%":(Number(message[i].EAC_LKG_PCT) > 0.0) ? "0.0" : calcs.calcX100(Number(message[i].EAC_LKG_PCT)),
                "EAC_LGK_Tier_Numbe":message[i].TIER_EAC_LKG_NUM,
                "ITD_TO_PC_$":message[i].ITD_TO_PC_LKG,
                "ITD_TO_PC_%":calcs.calcX100(Number(message[i].ITD_TO_PC_PCT)),
                "FC_EAC_TO_PC_$":message[i].FC_TO_PC_LKG,
                "FC_EAC_TO_PC_%":calcs.calcX100(Number(message[i].FC_TO_PC_PCT)),
                "YTD_TO_PC_$":message[i].YTD_TO_PC_LKG,
                "YTD_TO_PC_%":calcs.calcX100(Number(message[i].YTD_TO_PC_PCT)),
                "FC_EAC_AP_$":message[i].FC_TO_AP_LKG,
                "FC_EAC_AP_%":calcs.calcX100(Number(message[i].FC_TO_AP_PCT)),
                "AP_TO_PC_$":message[i].AP_TO_PC_LKG,
                "AP_TO_PC_%":calcs.calcX100(Number(message[i].AP_TO_PC_PCT))
                //these not in sql
/*              "Start_Date": message[i].START_DATE,
                "End_Date": message[i].END_DATE,
                "Approved_Plan_Date":message[i].APRVD_PLN_DT,
                "Forecast_Approved_Date":message[i].FRCST_SBMT_DT */
       
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2tlexportworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2TLExportWorkNum', type: 'object'}
  });
};

