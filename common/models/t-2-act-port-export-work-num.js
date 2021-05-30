'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2actportexportworknum) {
  T2actportexportworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

    try {

        var formatedJson = {
        };

          if(message.length == 0) { 
            formatedJson = {};
          } else {
            formatedJson = {
              "DATA_LOAD_DATE":message[0].DATA_LOAD_DESC,
              "PROJ_INFO_CNTRCT_NUM_HDR":"Contract Number",
              "PROJ_INFO_COMPLETION_PERC_HDR":"Completion %",
              "PROJ_INFO_PM_NOTES_ID_HDR":"Project Manager",
              "PROJ_INFO_PRTNR_NM_HDR":"Partner",
              "PROJ_INFO_DE_LIST_FLG_HDR":"DE List",
              "PROJ_INFO_POC_IND_HDR":"PoC",
              "PROJ_INFO_CLIENT_HDR":"Client Name",
              "PROJ_INFO_CONTRACT_NAME_HDR":"Contract Name",
              "PROJ_CMPLX_FLG_HDR":"Complex Flag",
              "ORG_GEO_HDR": "Geo",
              "ORG_MARKET_HDR": "Market/Region",
              "ORG_COUNTRY_HDR": "Country",
              "ORG_GROWTH_PLATFORM_HDR": "Growth Platform",
              "ORG_SERVICE_LINE_HDR":"Service Line",
              "ORG_PRACTICE_HDR":"Practice",
              "ORG_SECTOR_HDR":"Sector",
              "ORG_INDUSTRY_HDR":"Industry",               
              "TCV_HDR":"TCV $",
              "CPLX_MET_OVERALL_7K_HDR": "7 Keys Compliance",
              "CPLX_MET_CPM_CMPLNCE_HDR":"CPM Compliance",
              "CPLX_MET_OVRL_COS_HDR": "CoS Result",
              "CPLX_MET_COS_CMPLNCE_HDR":"CoS Compliance",
              "CPLX_MET_PG_O_CMPLNCE_HDR":"PG0 Compliance",
              "CPLX_MET_PG_1_4_CMPLNCE_HDR":"PG1-4 Compliance",               
              "CPLX_MET_PG_0_VALUE_HDR":"PG0 Result",
              "CPLX_MET_PG_1_VALUE_HDR":"PG1 Result",
              "CPLX_MET_PG_2_VALUE_HDR":"PG2 Result",
              "CPLX_MET_PG_3_VALUE_HDR":"PG3 Result",
              "CPLX_MET_PG_4_VALUE_HDR":"PG4 Result",
              "CPLX_MET_OVERALL_7K_RESULT_HDR": "7 Keys Result",
              "CPLX_MET_DELIVERY_START_HDR":"Delivery Start",              
              "LEAK_MET_ITD_TO_PC_LKG_HDR":"ItD to PC $",
              "LEAK_MET_YTD_TO_PC_LKG_HDR":"YtD to PC $",
              "LEAK_MET_CQ_TO_PC_LKG_AMT_HDR":"CQ to PC $", 
              "UBAR_UB_OV_60_HDR":"UBAR > 90 days",
              "GPP_MET_CQ_GP_AMT_HDR":"CQ GP $",
              "GPP_MET_CQ_GP_PCT_HDR":"CQ GP %",
              "GPP_MET_FC_EAC_GP_PCT_HDR":"FC EaC %",
              "GPP_MET_APRVD_PLAN_GP_PCT_HDR":"Approved Plan GP %",
              "GPP_MET_CQ_REV_AMT_HDR":"CQ Revenue",
              "GPP_MET_REV_INCR_QTQ_AMT_HDR":"Revenue Increase", 
              "GPP_MET_ITD_GP_PCT_HDR":"ItD GP %",	
              "GPP_MET_PC_GP_PCT_HDR":"Price Case GP %"
            } 

          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "CNTRCT_NUM":message[i].CNTRCT_NUM,
                "COMPLETION_%":calcs.calcX100(message[i].COMPLETION_PERC),
                "PROJ_MNGR":message[i].PM_NOTES_NM,
                "PRTNR":message[i].PRTNR_NM,
                "DE_LIST":message[i].DE_LIST_FLG,
                "POC_IND":message[i].POC_IND,
                "CLIENT_NM":message[i].CLIENT,
                "CONTRACT_NAME":message[i].CONTRACT_NAME,
                "CMPLX_FLG":message[i].CMPLX_FLG,
                "GEOGRAPHY": message[i].GEO,
                "MARKET": message[i].MARKET,
                "COUNTRY": message[i].COUNTRY,
                "GROWTH_PLATFORM": message[i].GROWTH_PLATFORM,
                "SERVICE_LINE":message[i].SERVICE_LINE,
                "PRACTICE":message[i].PRACTICE_NM,
                "SECTOR":message[i].SECTOR,
                "INDUSTRY":message[i].INDSTRY_CMR_NM,                
                "TCV_$":message[i].TCV,
                "7_KEYS": message[i].OVERALL_7K_LABEL,
                "CPM_CMPLNCE":message[i].CPM_COMP_LABEL,  
                "COS_RESULT": message[i].OVERALL_COS_LABEL,
                "COS_CMPLNCE":message[i].COS_COMP_LABEL,    
                "PG0_CMPLNCE":message[i].PG_O_CMPLNCE_VAL_LABEL,         
                "PG1_4_CMPLNCE":message[i].PG_1_4_CMPLNCE_VAL_LABEL,
                "PG0_RESULT":message[i].PG_0_STAT_FLG_VAL,
                "PG1_RESULT": message[i].PG_1_STAT_FLG_VAL,
                "PG2_RESULT":message[i].PG_2_STAT_FLG_VAL,
                "PG3_RESULT":message[i].PG_3_STAT_FLG_VAL, 
                "PG4_RESULT":message[i].PG_4_STAT_FLG_VAL,
                "OVERALL_7K_RESULT": message[i].OVERALL_7K_RESULT,
                "DELIVERY_START":message[i].DELIVERY_START_VAL,                
                "ITD_TO_PC_LKG_$":message[i].ITD_TO_PC_LKG,
                "YTD_TO_PC_LKG_$":message[i].YTD_TO_PC_LKG,
                "CQ_TO_PC_LKG_$":message[i].CQ_TO_PC_LKG_AMT, 
                "UBAR>90_DAYS":message[i].UB_OV_90, 
                "CQ_GP_$":message[i].CQ_ACTLS_GP_AC_PV_AMT,
                "CQ_GP_%": calcs.calcX100(message[i].CQ_ACTLS_GP_AC_PV_PCT),
                "FC_EAC_GP_%":calcs.calcX100(message[i].FC_GP_PCT),	
                "APRVD_PLAN_GP_%":calcs.calcX100(message[i].APRVD_GP_PCT), 
                "CQ_REV_$":message[i].CQ_ACTLS_REV_AC_AMT, 
                "REV_INCR_QTQ_$":message[i].REV_INCR_QTQ_AMT, 	
                "ITD_GP_%":calcs.calcX100(message[i].ITD_ACTLS_GP_PCT),	
                "PC_GP_%":calcs.calcX100(message[i].PC_ACTLS_GP_AC_PCT)              
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2actportexportworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2ActPortExportWorkNum', type: 'object'}
  });
};

