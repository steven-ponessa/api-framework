'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2actportdetailsworknum) {
  T2actportdetailsworknum.processChild = function(req, filter, cb) {
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
              "ADD_MESSAGE":"Select rows in the table to build your own Custom Portfolio view. When rows are selected, click the ‘Add’ button. Your Custom portfolio view can be displayed by selecting the ‘Custom portfolio view’ toggle switch.",
/*               "PROJ_INFO_CLIENT_DEFAULT":"Yes",
              "PROJ_INFO_CONTRACT_NAME_DEFAULT":"Yes",
              "ORG_SERVICE_LINE_DEFAULT":"Yes",
              "TCV_DEFAULT":"Yes",
              "CPLX_MET_OVERALL_7K_DEFAULT": "Yes",
              "CPLX_MET_PG_O_CMPLNCE_DEFAULT":"Yes",
              "LEAK_MET_ITD_TO_PC_LKG_DEFAULT":"Yes",
              "UBAR_UB_OV_60_DEFAULT":"Yes",
              "GPP_MET_CQ_GP_AMT_DEFAULT":"Yes", */

              "PROJ_INFO_CNTRCT_NUM_HDR":"Contract Number",
              "PROJ_INFO_COMPLETION_PERC_HDR":"Completion %",
              "PROJ_INFO_PM_NOTES_ID_HDR":"Project Manager",
              "PROJ_INFO_PRTNR_NM_HDR":"Partner",
              //"PROJ_INFO_CPM_NOTES_ID_HDR": "Complex Manager", 
              "PROJ_INFO_DE_LIST_FLG_HDR":"DE List",
              "PROJ_INFO_POC_IND_HDR":"PoC",
              "PROJ_INFO_CLIENT_HDR":"Client Name",
              "PROJ_INFO_CONTRACT_NAME_HDR":"Contract Name",
              "PROJ_CMPLX_FLG_HDR":"Complex Flag",
              "ORG_GEO_HDR": "Geography",
              "ORG_MARKET_HDR": "Market/Region",
              "ORG_COUNTRY_HDR": "Country",
              "ORG_GROWTH_PLATFORM_HDR": "Growth Platform",
              "ORG_SERVICE_LINE_HDR":"Service Line",
              //"ORG_PRACTICE_HDR":"Practice",
              "ORG_SECTOR_HDR":"Sector",
              "ORG_INDUSTRY_HDR":"Industry",               
              "TCV_HDR":"TCV $",
              "CPLX_MET_OVERALL_7K_HDR": "7 Keys Compliance",
              "CPLX_MET_OVERALL_7K_RESULT_HDR": "7 Keys Result",
              //"CPLX_MET_CPM_ASSGND_HDR": "CPM Assigned",
              "CPLX_MET_CPM_CMPLNCE_HDR":"CPM Compliance",
              //"CPLX_MET_COS_CMPLT_CNT_HDR": "CoS Compliance Count",
              "CPLX_MET_OVRL_COS_HDR": "CoS Result",
              "CPLX_MET_COS_CMPLNCE_HDR":"CoS Compliance",
              "CPLX_MET_PG_O_CMPLNCE_HDR":"PG0 Compliance",
              "CPLX_MET_PG_1_4_CMPLNCE_HDR":"PG1-4 Compliance",               
              "CPLX_MET_PG_0_VALUE_HDR":"PG0 Result",
              "CPLX_MET_PG_1_VALUE_HDR":"PG1 Result",
              "CPLX_MET_PG_2_VALUE_HDR":"PG2 Result",
              "CPLX_MET_PG_3_VALUE_HDR":"PG3 Result",
              "CPLX_MET_PG_4_VALUE_HDR":"PG4 Result",
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
              //"GPP_MET_YTD_GP_PCT_HDR":"YtD GP %",	
              "GPP_MET_PC_GP_PCT_HDR":"Price Case GP %",
              "COMMENTS_HDR":"Comments"
            } 

          formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
                "CNTRCT_KEY":message[i].CNTRCT_KEY,
                "PROJ_INFO_CNTRCT_NUM":message[i].CNTRCT_NUM,
                "PROJ_INFO_COMPLETION_PERC":calcs.calcX100(message[i].COMPLETION_PERC),
                "PROJ_INFO_PM_NOTES_ID":message[i].PM_NOTES_NM,
                "PROJ_INFO_PRTNR_NM":message[i].PRTNR_NM,
                //"PROJ_INFO_CPM_NOTES_ID": message[i].CPM_NOTES_ID, 
                "PROJ_INFO_DE_LIST_FLG":message[i].DE_LIST_FLG,
                "PROJ_INFO_POC_IND":message[i].POC_IND,
                "PROJ_INFO_CLIENT":message[i].CLIENT,
                "PROJ_INFO_CONTRACT_NAME":message[i].CONTRACT_NAME,
                "PROJ_CMPLX_FLG":message[i].CMPLX_FLG,
                //"CUSTOMER": message[i].CUSTOMER, 
                "ORG_GEO": message[i].GEO,
                "ORG_MARKET": message[i].MARKET,
                "ORG_COUNTRY": message[i].COUNTRY,
                "ORG_GROWTH_PLATFORM": message[i].GROWTH_PLATFORM,
                "ORG_SERVICE_LINE":message[i].SERVICE_LINE,
                //"ORG_PRACTICE":message[i].PRACTICE_NM,
                "ORG_SECTOR":message[i].SECTOR,
                "ORG_INDUSTRY":message[i].INDSTRY_CMR_NM,                
                "TCV":message[i].TCV,
                "CPLX_MET_OVERALL_7K": message[i].OVERALL_7K,
                "CPLX_MET_OVERALL_7K_COLOR": message[i].OVERALL_7K_COLOR,
                "CPLX_MET_OVERALL_7K_LABEL": message[i].OVERALL_7K_LABEL,
                "CPLX_MET_OVERALL_7K_RESULT": message[i].OVERALL_7K_RESULT,
                "CPLX_MET_OVERALL_7K_RESULT_COLOR": message[i].OVERALL_7K_RESULT_COLOR,
                //"CPLX_MET_CPM_ASSGND": message[i].CPM_ASSGND,
                "CPLX_MET_CPM_CMPLNCE":message[i].CPM_COMP,
                "CPLX_MET_CPM_CMPLNCE_COLOR":message[i].CPM_COMP_COLOR, 
                "CPLX_MET_CPM_CMPLNCE_LABEL":message[i].CPM_COMP_LABEL,  
                //"CPLX_MET_COS_CMPLT_CNT": message[i].COS_CMPLT_CNT,
                "CPLX_MET_OVRL_COS": message[i].OVERALL_COS,
                "CPLX_MET_OVRL_COS_COLOR": message[i].OVERALL_COS_COLOR,
                "CPLX_MET_OVRL_COS_LABEL": message[i].OVERALL_COS_LABEL,
                "CPLX_MET_COS_CMPLNCE":message[i].COS_COMP,
                "CPLX_MET_COS_CMPLNCE_COLOR":message[i].COS_COMP_COLOR, 
                "CPLX_MET_COS_CMPLNCE_LABEL":message[i].COS_COMP_LABEL,                
                "CPLX_MET_PG_O_CMPLNCE":message[i].PG_O_CMPLNCE_VAL,
                "CPLX_MET_PG_O_CMPLNCE_COLOR":message[i].PG_O_CMPLNCE_COLOR, 
                "CPLX_MET_PG_O_CMPLNCE_LABEL":message[i].PG_O_CMPLNCE_VAL_LABEL,                               
                "CPLX_MET_PG_1_4_CMPLNCE":message[i].PG_1_4_CMPLNCE_VAL,                
                "CPLX_MET_PG_1_4_CMPLNCE_COLOR":message[i].PG_1_4_CMPLNCE_COLOR,
                "CPLX_MET_PG_1_4_CMPLNCE_LABEL":message[i].PG_1_4_CMPLNCE_VAL_LABEL,
                "CPLX_MET_PG_0_VALUE":message[i].PG_0_STAT_FLG_VAL,
                "CPLX_MET_PG_0_COLOR":message[i].PG_0_STAT_FLG_COLOR,
                //"CPLX_MET_PG_0_DATE":message[i].PG_0_STAT_FLG_DATE,
                "CPLX_MET_PG_1_VALUE": message[i].PG_1_STAT_FLG_VAL,
                "CPLX_MET_PG_1_COLOR":message[i].PG_1_STAT_FLG_COLOR,
                //"CPLX_MET_PG_1_DATE":message[i].PG_1_STAT_FLG_DATE,
                "CPLX_MET_PG_2_VALUE":message[i].PG_2_STAT_FLG_VAL,
                "CPLX_MET_PG_2_COLOR":message[i].PG_2_STAT_FLG_COLOR,
                //"CPLX_MET_PG_2_DATE":message[i].PG_2_STAT_FLG_DATE,
                "CPLX_MET_PG_3_VALUE":message[i].PG_3_STAT_FLG_VAL, 
                "CPLX_MET_PG_3_COLOR":message[i].PG_3_STAT_FLG_COLOR,
                //"CPLX_MET_PG_3_DATE":message[i].PG_3_STAT_FLG_DATE,
                "CPLX_MET_PG_4_VALUE":message[i].PG_4_STAT_FLG_VAL,
                "CPLX_MET_PG_4_COLOR":message[i].PG_4_STAT_FLG_COLOR,
                //"CPLX_MET_PG_4_DATE":message[i].PG_4_STAT_FLG_DATE,
                "CPLX_MET_DELIVERY_START":message[i].DELIVERY_START_VAL,
                "CPLX_MET_DELIVERY_START_LABEL":message[i].DELIVERY_START_LABEL,
                "CPLX_MET_DELIVERY_START_COLOR":message[i].DELIVERY_START_COLOR,
                "LEAK_MET_ITD_TO_PC_LKG":message[i].ITD_TO_PC_LKG,
                "LEAK_MET_YTD_TO_PC_LKG":message[i].YTD_TO_PC_LKG,
                "LEAK_MET_CQ_TO_PC_LKG_AMT":message[i].CQ_TO_PC_LKG_AMT, 
                "UBAR_UB_OV_60":message[i].UB_OV_90, 
                "UBAR_UB_OV_60_COLOR":message[i].UB_OV_90_COLOR,
                "GPP_MET_CQ_GP_AMT":message[i].CQ_ACTLS_GP_AC_PV_AMT,
                "GPP_MET_CQ_GP_PCT": calcs.calcX100(message[i].CQ_ACTLS_GP_AC_PV_PCT),
                "GPP_MET_FC_EAC_GP_PCT":calcs.calcX100(message[i].FC_GP_PCT),	
                "GPP_MET_APRVD_PLAN_GP_PCT":calcs.calcX100(message[i].APRVD_GP_PCT), 
                "GPP_MET_CQ_REV_AMT":message[i].CQ_ACTLS_REV_AC_AMT, 
                "GPP_MET_REV_INCR_QTQ_AMT":message[i].REV_INCR_QTQ_AMT, 
                //"GPP_MET_QTQ_REV_AMT":message[i].REV_INCR_QTQ_AMT,	
                "GPP_MET_ITD_GP_PCT":calcs.calcX100(message[i].ITD_ACTLS_GP_PCT),	
                //"GPP_MET_YTD_GP_PCT":calcs.calcX100(message[i].YTD_ACTLS_GP_PCT), 
                "GPP_MET_PC_GP_PCT":calcs.calcX100(message[i].PC_ACTLS_GP_AC_PCT),
                "COMMENTS":message[i].CMNT_CNT
                //"POC_IND": message[i].POC_IND                
              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2actportdetailsworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2ActPortDetailsWorkNum', type: 'object'}
  });
};

