'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2pripopriskcontract) {
  T2pripopriskcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
    try {

          var formatedJson = {
            "CNTRCT_NUM_LABEL":"Contract No",
            "CNTRCT_NAME_LABEL":"Contract Name",
            "CLIENT_NM_LABEL":"Client Name",
            "RISK_GP_DET_LABEL": "Risk of GP Deterioration over the next 6 months",
            //"PROJ_DUR_LABEL": "Project Duration",
            "data":[]
          };
        
          if (!message.length <= 0) { //Avoid processing a empty result set

              var risk_value;
              var dateValue = '';
              var dateHdr = '';
              switch (message[0].LNCH_FLG) {
                case 0:
                    dateValue =  message[0].DATA_LOAD_DESC; //Delivery model
                    dateHdr = message[0].DATE_LABEL==null?' ':'('+message[0].DATE_LABEL+')';
                    break;
                default:
                    dateValue =  message[0].LNCH_DATE;  //Launch model
                    dateHdr = '';
                    break;                    
              }; 
              
              formatedJson.pri_date = dateValue;
    
                for (var i = 0; i < message.length; i++) {
                  risk_value = JSON.parse(message[i].RISK_FACTORS);

                  formatedJson.data.push({
                    "date_hdr": dateHdr,
                    "cntrct_num":message[i].CNTRCT_NUM,
                    "cntrct_key":(message[i].CNTRCT_KEY),
                    "cntrct_name":(message[i].CNTRCT_DESC), 
                    "client_nm":(message[i].CLIENT_NM),
                    "plan_type": message[i].TRGT_PLAN,
                    // update sql and mapping
                    "risk_gp_det": message[i].OVERALL_RISK,
                    //"proj_dur": message[i].TRGT_PLAN,

                    "ippf_url":message[i].IPPF_URL,
                    "risk_factors":risk_value
                  });
            };
        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2pripopriskcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriPopRiskContract', type: 'object'}
  });
};

