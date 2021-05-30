'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2pripoptrendcontract) {
  T2pripoptrendcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
      try {

        var formatedJson = {};
      
          if(message.length > 0) { //Avoid processing a empty result set
              formatedJson = {
                "CNTRCT_NUM_LABEL":"Contract No",
                "CNTRCT_NAME_LABEL":"Contract Name",
                "CLIENT_NM_LABEL":"Client Name",
                "RISK_GP_DET_6_MOS_LABEL": "Risk of GP Deterioration over the next 6 months",
                "PROJ_DUR_LABEL": "Project Duration",
                "data": [],
                "dataTrend":[]
            }
            var b = 0;
            var dateHdr = '';
              // parse through trend data
              for (var i = 0; i < message.length; i++) {

                formatedJson.dataTrend.push({
                  "id":i+1,
                  "color": "#FF6441",
                  "value": "PRI",
                  "duration": message[i].DURATION,
                  "launch_flag": message[i].LAUNCH_FLAG,
                  "date": message[i].ACCT_YR + '/' + message[i].ACCT_MO + '/01',
                  "date_label": message[i].DATA_LOAD_DESC,
                  "plan_type":message[i].TRGT_PLAN,
                  "risk_value":calcs.formatAmount(message[i].OVERALL_RISK)
                  })
                }; // end for
                // return current values (last in list), for top section of popup
                b = (message.length - 1);

                switch (message[b].LAUNCH_FLAG) {
                  case "No":
                      dateHdr = message[b].DATE_LABEL==null?' ':'('+message[b].DATE_LABEL+')'; //Delivery model
                      break;
                  case "Yes":
                      dateHdr = ''; //Launch model
                      break;                    
                }; 

                formatedJson.data = {
                  "date_hdr": dateHdr,
                  "cntrct_num":message[b].CNTRCT_NUM,
                  "cntrct_key":(message[b].CNTRCT_KEY),
                  "cntrct_name":(message[b].CNTRCT_DESC), 
                  "client_nm":(message[b].CLIENT_NM),
                  // update sql and mapping
                  //"risk_gp_det_6_mos": message[b].TRGT_PLAN,
                  //"proj_dur": message[b].TRGT_PLAN, 
                  "risk_factors":JSON.parse(message[b].RISK_FACTORS),
                  "overall_risk":calcs.formatAmount(message[b].OVERALL_RISK),
                  "ippf_url":(message[b].IPPF_URL)
              //};
              }
          };
     

    } catch (e) {
      formatedJson = {"msg" : e.message}
    }

      cb(err, formatedJson);
    });
};

  T2pripoptrendcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriPopTrendContract', type: 'object'}
  });
};

