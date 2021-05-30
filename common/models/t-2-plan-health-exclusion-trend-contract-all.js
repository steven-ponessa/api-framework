'use strict';

var dateUtils = require("./utils/dateUtils");

module.exports = function(T2planhealthexclusiontrendcontractall) {
    T2planhealthexclusiontrendcontractall.processChild = function (req, filter, cb) {
        this.process(req, filter, function (err, message) {
            //console.log("...Reformat message into JSON UI team is expecting here.");
            if (err) {
              return cb(err, null);
          }
            var formatedJson = {
              "DROPD_EXCLSN_LABEL":"Dropped Exclusion",
              "DROPD_EXCLSN_COLOR":"#FFE9D6",
              "NEW_EXCLSN_LABEL":"New Exclusion",
              "NEW_EXCLSN_COLOR":"#FF9E36;",
              "EXISTG_EXCLSN_LABEL":"Existing Exclusion",
              "EXISTG_EXCLSN_COLOR":"#F5D24C",
              "DATA":[]
            }
    
            for (var i = 0; i < message.length-1; i++) {
              formatedJson.DATA.push({
                "MO":dateUtils.getMonthAbb(message[i].ACCT_MO),
                "YR":message[i].ACCT_YR,
                "DROPD_EXCLSN":message[i].DROPD_EXCLSN_CNTRCT_NUM,
                "NEW_EXCLSN":message[i].NEW_EXCLSN_CNTRCT_NUM,
                "EXISTG_EXCLSN":message[i].EXISTG_EXCLSN_CNTRCT_NUM
              })
            }
    
            cb(err, formatedJson);
          });
      };
    
      T2planhealthexclusiontrendcontractall.remoteMethod('processChild', {
          http: { path: '/', verb: 'get', status: 200 },
          accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
          { arg: 'filter', type: 'object' }],
          returns: { arg: 't2planhealthexclusiontrendcontractall', type: 'object' }
      });
    };