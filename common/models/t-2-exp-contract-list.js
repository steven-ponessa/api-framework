'use strict';

module.exports = function(T2expcontractlist) {
    T2expcontractlist.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        var formatedJson = {
          "LABEL":" ",
          "CQ_TO_AP": [],
          //"FC_EAC_TO_AP": [],
          "COST_OVER": [],
          "FC_EAC_AP": [],
          "AP_TO_PC": [],
          "ITD_TO_PC": [],
          "YTD_TO_PC": [],
          "FC_EAC_TO_PC": [],
          "CQ_TO_PC": []
        };

        if (message != null && !message.length < 1){

          formatedJson.LABEL = req.query['label'];

          for (var i = 0; i < message.length; i++) {

            formatedJson.CQ_TO_AP.push({
              "CNTRCT_NUM": message[i].CQ_GP_LKG_CNTRCT_NUM,
              "CLNT_NM": message[i].CQ_GP_LKG_CUSTOMER_NM
            });
/*
            formatedJson.FC_EAC_TO_AP.push({
              "CNTRCT_NUM": message[i].FC_EAC_TO_AP_CNTRCT_NUM,
              "CLNT_NM": message[i].FC_EAC_TO_AP_CUSTOMER_NM
            });
*/
            formatedJson.COST_OVER.push({
              "CNTRCT_NUM": message[i].COST_OVER_CNTRCT_NUM,
              "CLNT_NM": message[i].COST_OVER_CUSTOMER_NM
            });

            formatedJson.FC_EAC_AP.push({
              "CNTRCT_NUM": message[i].FC_EAC_AP_CNTRCT_NUM,
              "CLNT_NM": message[i].FC_EAC_AP_CUSTOMER_NM
            });

            formatedJson.AP_TO_PC.push({
              "CNTRCT_NUM": message[i].AP_TO_PC_CNTRCT_NUM,
              "CLNT_NM": message[i].AP_TO_PC_CUSTOMER_NM
            });

            formatedJson.ITD_TO_PC.push({
              "CNTRCT_NUM": message[i].ITD_TO_PC_CNTRCT_NUM,
              "CLNT_NM": message[i].ITD_TO_PC_CUSTOMER_NM
            });

            formatedJson.YTD_TO_PC.push({
              "CNTRCT_NUM": message[i].YTD_TO_PC_CNTRCT_NUM,
              "CLNT_NM": message[i].YTD_TO_PC_CUSTOMER_NM
            });

            formatedJson.FC_EAC_TO_PC.push({
              "CNTRCT_NUM": message[i].FC_EAC_TO_PC_CNTRCT_NUM,
              "CLNT_NM": message[i].FC_EAC_TO_PC_CUSTOMER_NM
            });

            formatedJson.CQ_TO_PC.push({
              "CNTRCT_NUM": message[i].CQ_TO_PC_CNTRCT_NUM,
              "CLNT_NM": message[i].CQ_TO_PC_CUSTOMER_NM
            });

          }
        }

        cb(err, formatedJson);
    });
  };

  T2expcontractlist.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                {arg: 'filter', type: 'object'}],
                returns: {arg: 't2ExpContractList', type: 'object'}
    });

  };
