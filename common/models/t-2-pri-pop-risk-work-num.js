'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2pripopriskworknum) {
  T2pripopriskworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
    try {

          var formatedJson = {};
        
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
              
              formatedJson.data = [];
    
                for (var i = 0; i < message.length; i++) {
                  risk_value = JSON.parse(message[i].RISK_FACTORS);

                  formatedJson.data.push({
                    "date_hdr": dateHdr,
                    "work_nbr":message[i].WORK_NUM,
                    "work_key":(message[i].PROJ_KEY),
                    "work_desc":(message[i].WORK_DESC), 
                    "client_nm":(message[i].CLIENT_NM),
                    "contract_key":(message[i].CNTRCT_KEY),
                    "plan_type": message[i].TRGT_PLAN,
                    //"overall_risk":message[i].OVERALL_RISK,
                    //"gp_pct":calcs.calcX100(message[i].GP_PCT),
                    //"gp_amt":message[i].GP_AMT,
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

  T2pripopriskworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriPopRiskWorkNum', type: 'object'}
  });
};

