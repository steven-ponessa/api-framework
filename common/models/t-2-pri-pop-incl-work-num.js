'use strict';
//var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2pripopinclworknum) {
  T2pripopinclworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
      var dateValue = '';
      var dataMsg = '';
      var formatedJson = {};

    try {
      formatedJson = {
        "DATA_MESSAGE": dataMsg,
        "WORK_NUM_LABEL":"Work No.",
        "DE_LABEL":"DE",
        "DE_LIST_LABEL":"DE List",
        "DE_LIST_DATE_LABEL":"DE List Load Date",
        "DCA_LABEL":"DCA",
        "data":[]
      };

        if(message.length > 0) { //Avoid processing a empty result set
          dataMsg = '';
          switch (message[0].LNCH_FLG) {
            case 0:
                dateValue =  message[0].DATA_LOAD_DESC; //Delivery model
                break;
            default:
                dateValue =  message[0].LNCH_DATE;  //Launch model
                break;
          };
          if( message[0].CIC_FLG == 1 ) { //process a CIC work number
              formatedJson = {
                "DATA_MESSAGE": dataMsg,
                "WORK_NUM_LABEL":"Work No.",
                "CIC_LABEL":"CIC",
                "CIC_PM_NAME_LABEL":"CIC - PM Name",
                "PAL_NAME_LABEL":"Practice Area Leader (PAL) Name",
                "SUB_PROJ_ID_LABEL":"Sub Project ID",
                "SUB_PROJ_NAME_LABEL":"Sub Project Name",
                "MASTER_PROJ_NAME_LABEL":"Master Project Name",
                "PROJ_ID_LABEL":"Project ID",
                "CIC_STATUS_LABEL":"CIC - Status",
                "CIC_DEL_RISK_IND_LABEL":"CIC - Delivery Risk Indicator",
                "CIC_REASONS_LABEL":"Reasons",
                "DE_LABEL":"DE",
                "DE_LIST_LABEL":"DE List",
                "DE_LIST_DATE_LABEL":"DE List Load Date",
                "DCA_LABEL":"DCA",
                "data":[]
              };

              formatedJson.data.push({
                    "PRI_DATE": dateValue,
                    "WORK_NUM": (message[0].WORK_NUM),
                    "WORK_KEY": (message[0].PROJ_KEY),
                    "WORK_DESC": (message[0].WORK_DESC),
                    "CNTRCT_NUM": (message[0].CNTRCT_NUM),
                    "CNTRCT_KEY": (message[0].CNTRCT_KEY),
                    "CIC": (message[0].CIC),
                    "CIC_PM_NAME": (message[0].CIC_PM_NM),
                    "PAL_NAME": (message[0].PAL_NM),
                    "SUB_PROJ_ID": (message[0].SUB_PROJ_ID),
                    "SUB_PROJ_NAME": (message[0].SUB_PROJ_NM),
                    "MASTER_PROJ_NAME": (message[0].MASTER_PROJ_NM),
                    "PROJ_ID": (message[0].PROJ_ID),
                    "CIC_STATUS": (message[0].CIC_STATUS),
                    "CIC_DEL_RISK_IND": (message[0].CIC_SCORE),
                    "CIC_DEL_RISK_IND_COLOR": (message[0].CIC_SCORE_COLOR),
                    "CIC_DEL_RISK_IND_TEXT": (message[0].CIC_SCORE_TEXT),
                    "CIC_REASONS": (message[0].REASONS),
                    "DE_LIST": (message[0].DE_LIST_FLG),
                    "DE_LIST_DATE": (message[0].DE_DATE),
                    "DCA": "https://b03zvi14860210.ahe.boulder.ibm.com/services/gbs/services-operations/so/authenticate#/",
                    "DCA_MSG": "To access the record in DCA you will need authority in DCA",
                    "IPPF_URL": (message[0].IPPF_URL)
                  });
                } else { // not a CIC row
                  formatedJson = {
                    "DATA_MESSAGE": 'No Data Available',
                    "WORK_NUM_LABEL":"Work No.",
/*                    "CIC_LABEL":"CIC",
                    "CIC_PM_NAME_LABEL":"CIC - PM Name",
                    "PAL_NAME_LABEL":"Practice Area Leader (PAL) Name",
                    "SUB_PROJ_ID_LABEL":"Sub Project ID",
                    "SUB_PROJ_NAME_LABEL":"Sub Project Name",
                    "MASTER_PROJ_NAME_LABEL":"Master Project Name",
                    "PROJ_ID_LABEL":"Project ID",
                    "CIC_STATUS_LABEL":"CIC - Status",
                    "CIC_DEL_RISK_IND_LABEL":"CIC - Delivery Risk Indicator",
                    "CIC_REASONS_LABEL":"Reasons",
*/
                    "DE_LABEL":"DE",
                    "DE_LIST_LABEL":"DE List",
                    "DE_LIST_DATE_LABEL":"DE List Load Date",
                    "DCA_LABEL":"DCA",
                    "data":[]
                  };
    
                  formatedJson.data.push({
                        "PRI_DATE": dateValue,
                        "WORK_NUM": (message[0].WORK_NUM),
                        "WORK_KEY": (message[0].PROJ_KEY),
                        "WORK_DESC": (message[0].WORK_DESC),
                        "CNTRCT_NUM": (message[0].CNTRCT_NUM),
                        "CNTRCT_KEY": (message[0].CNTRCT_KEY),
/*
                        "CIC": (message[0].CIC),
                        "CIC_PM_NAME": (message[0].CIC_PM_NM),
                        "PAL_NAME": (message[0].PAL_NM),
                        "SUB_PROJ_ID": (message[0].SUB_PROJ_ID),
                        "SUB_PROJ_NAME": (message[0].SUB_PROJ_NM),
                        "MASTER_PROJ_NAME": (message[0].MASTER_PROJ_NM),
                        "PROJ_ID": (message[0].PROJ_ID),
                        "CIC_STATUS": (message[0].CIC_STATUS),
                        "CIC_DEL_RISK_IND": (message[0].CIC_SCORE),
                        "CIC_DEL_RISK_IND_COLOR": (message[0].CIC_SCORE_COLOR),
                        "CIC_DEL_RISK_IND_TEXT": (message[0].CIC_SCORE_TEXT),
                        "CIC_REASONS": (message[0].REASONS),
*/
                        "DE_LIST": (message[0].DE_LIST_FLG),
                        "DE_LIST_DATE": (message[0].DE_DATE),
                        "DCA": "https://b03zvi14860210.ahe.boulder.ibm.com/services/gbs/services-operations/so/authenticate#/",
                        "DCA_MSG": "To access the record in DCA you will need authority in DCA",
                        "IPPF_URL": (message[0].IPPF_URL)
                      });
                } // end if not a CIC row
            } else {
              formatedJson.DATA_MESSAGE = 'No Data Available';
            }; // End if not empty

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2pripopinclworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriPopInclWorkNum', type: 'object'}
  });
};

