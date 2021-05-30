'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2gpleakexportcqmcontract) {
  T2gpleakexportcqmcontract.processChild = function(req, filter, cb) {
    this.process(req, filter, function(err, message){
      if (err) {
        return cb(err, null);
    }

/*    var signedValue = '';
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

  try {

      var formatedJson = {};

      if(message.length == 0) { 
          formatedJson = {};
      } else {
          formatedJson = {
            "Date":message[0].DATA_LOAD_DESC,
            "Level":'Contract',
            "Sort_Column": "CQ_TO_PC",
            "Contingency": contingencyValue,
            "Quarter_Signed_Date": signedValue,
            "Leakage_Value": leakValue,
            "NGP_Value": ngpValue
        }

        formatedJson.data = [];

          for (var i = 0; i < message.length; i++) {

            formatedJson.data.push({
              "Contract_Number":message[i].CONTRACT_NUMBER,
              "Contract_Name":message[i].CONTRACT_NAME,
              "Client_Name":message[i].CLIENT_NAME,
              "Partner_Name":message[i].PARTNER_NAME,
              "Geo_Description":message[i].GEO,
              "Market_Description":message[i].MARKET,
              "Country":message[i].COUNTRY,
              "Sector_Description":message[i].SECTOR,
              "Industry_Description": message[i].INDUSTRY,
              "Growth_Platform":message[i].GROWTH_PLATFORM,
              "Service_Line":message[i].SERVICE_LINE,
              "Contract_Signed_Date":message[i].CONTRACT_SIGN_DATE,
              "Start_Date": message[i].START_DATE,
              "End_Date": message[i].END_DATE,
              "Status":message[i].STATUS,
              "TCV_$":message[i].TOTAL_CNTRCT_TCV_AMT,
              "AP51":message[i].AP51,
              "Price_Case_Rev_$":message[i].PC_REV_AMT,
              "Price_Case_Cost_$":message[i].PC_COST_AMT,
              "Price_Case_GP_%":calcs.calcX100(Number(message[i].PC_GP_PCT)),
              "Price_Case_GP_$":message[i].PC_GP_AMT,
              "CQ_Rev_Act_$":message[i].CQ_REV_ACT_AMT,
              "CQ_Cost_Act_$":message[i].CQ_COST_ACT_AMT,
              "CQ_Act_GP_$":message[i].CQ_GP_ACT_AMT,                
              "CQ_Act_GP_%":calcs.calcX100(Number(message[i].CQ_GP_ACT_PCT)),
              "CQ_Forecast_+_Actuals_Revenue_$":message[i].CQ_REV_ACT_FC_AMT,
              "CQ_Forecast_+_Actuals_Cost_$":message[i].CQ_COST_ACT_FC_AMT,
              "CQ_Forecast_+_Actuals_GP_$":message[i].CQ_GP_ACT_FC_AMT,
              "CQ_Forecast_+_Actuals_GP_%":calcs.calcX100(Number(message[i].CQ_GP_ACT_FC_PCT)),
              "CQ_TO_PC_$":message[i].CQ_TO_PC_LKG_AMT,
              "CQ_TO_PC_%":calcs.calcX100(Number(message[i].CQ_TO_PC_LKG_PCT)),
              "PR_QTR_CQ_TO_PC_$":message[i].PQ_TO_PC_LKG_AMT,
              "CQ_TO_AP_$":message[i].CQ_TO_AP_LKG_AMT,
              "CQ_TO_AP_%":calcs.calcX100(Number(message[i].CQ_TO_AP_LKG_PCT)),
              "PR_QTR_CQ_TO_AP_$":message[i].PQ_TO_AP_LKG_AMT,
              "PR_QTR_CQ_TO_AP_%":calcs.calcX100(Number(message[i].PQ_TO_AP_LKG_PCT))
           });
          };

      };  // end if no data

    } catch (e) {
      formatedJson = {"msg" : e.message}
    }

      cb(err, formatedJson);
    });
};

  T2gpleakexportcqmcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2GPLeakExportCQMContract', type: 'object'}
  });
};
