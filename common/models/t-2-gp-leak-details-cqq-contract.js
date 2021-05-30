'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2gpleakdetailscqqcontract) {

    T2gpleakdetailscqqcontract.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message){
            if (err) {
              return cb(err, null);
          }
            var formatedJson = {};

            try {

                var qtr_val = '';
                var prev_q = '';
            
                if (!message.length <= 0) {
                    qtr_val = message[0].QTR;


                    var preqq = message[0].QTR.substring(1,2);
                    var prevYear = message[0].QTR.substring(3,7);
                    if( preqq == 1){
                      preqq = 4;
                      prevYear -= 1;
                      
                      prev_q = 'Q' + preqq + ' ' + prevYear + ' CQ to PC $';
                      //console.log('Q' + preqq + ' ' + prevYear + ' CQ to PC $');
                    }else{
                      preqq = preqq - 1;
                      
                      prev_q = 'Q' + preqq + ' ' + prevYear +  ' CQ to PC $';
                      //onsole.log('Q' + preqq + ' ' + prevYear +  ' CQ to PC $');
                      
  
                    };
                };

                formatedJson = {
                    "TIMEFRAME": qtr_val,
                    "SIGNED_DATE":dateUtils.formatQuarterYear(req.query['yrQtrKey']),
                    "SELECTED_LABEL":(req.query['label']),
                    //"METRICVAL":message[0].METRICVAL,
                    "CNTRCT_NUM_LABEL":"Contract No.",
                    //"PRJCT_NM_LABEL":"Project",
                    "PRJCT_NM_LABEL":"Description",
                    "CLNT_NM_LABEL":"Client Name",
                    "SERVICE_LINE_LABEL":"Service Line",
                    "TCV_LABEL":"TCV",
                    //"GP_PCT_LABEL":"CQ to PC %",
                    "GP_LABEL": qtr_val + " CQ to PC $",
                    "PREV_QTR_GP_LABEL": prev_q,
                    "DATA":[]
                  };

              if(message.length >= 0) { //Avoid processing an empty result set

                //formatedJson.TIMEFRAME = message[0].QTR;

                for (var i = 0; i < message.length; i++) {
                    formatedJson.DATA.push({
                      "CNTRCT_NUM":message[i].CNTRCT_NUM,
                      "PRJCT_NM":message[i].CNTRCT_NM,
                      "CLNT_NM":message[i].CLNT_NM,
                      "SERVICE_LINE":message[i].SERVICE_LINE,
                      "TCV":message[i].TCV,
                      "GP_VAL":message[i].GP_VAL,
                      "PREV_QTR_GP_VAL":calcs.removeMinusZero(message[i].PREV_GP_VAL)
                    })
                }
              }
            } catch(e) {
              formatedJson = {msg: e.message};
            }

            cb(err, formatedJson);
          });
      };

      T2gpleakdetailscqqcontract.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't2GPLeakDetailsCQQContract', type: 'object'}
      });

};