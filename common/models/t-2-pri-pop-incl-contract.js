'use strict';
//var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2pripopinclcontract) {
  T2pripopinclcontract.processChild = function(req, filter, cb) {
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
              for (var i = 0; i < message.length; i++) {

                  formatedJson.data.push({
                        "PRI_DATE": dateValue,
                        "WORK_NUM": (message[i].WORK_NUM),
                        "WORK_KEY": (message[i].PROJ_KEY),
                        "WORK_DESC": (message[i].WORK_DESC),
                        "CNTRCT_NUM": (message[i].CNTRCT_NUM),
                        "CNTRCT_KEY": (message[i].CNTRCT_KEY),
                        "CIC": (message[i].CIC),
                        "CIC_PM_NAME": (message[i].CIC_PM_NM),
                        "PAL_NAME": (message[i].PAL_NM),
                        "SUB_PROJ_ID": (message[i].SUB_PROJ_ID),
                        "SUB_PROJ_NAME": (message[i].SUB_PROJ_NM),
                        "MASTER_PROJ_NAME": (message[i].MASTER_PROJ_NM),
                        "PROJ_ID": (message[i].PROJ_ID),
                        "CIC_STATUS": (message[i].CIC_STATUS),
                        "CIC_DEL_RISK_IND": (message[i].CIC_SCORE),
                        "CIC_DEL_RISK_IND_COLOR": (message[i].CIC_SCORE_COLOR),
                        "CIC_DEL_RISK_IND_TEXT": (message[i].CIC_SCORE_TEXT),
                        "CIC_REASONS": (message[i].REASONS),
                        "IPPF_URL": (message[i].IPPF_URL)
                      });
                } // end loop
              } else {
                formatedJson.DATA_MESSAGE = 'No Data Available';
              }; // End if not empty

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2pripopinclcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriPopInclContract', type: 'object'}
  });
};

