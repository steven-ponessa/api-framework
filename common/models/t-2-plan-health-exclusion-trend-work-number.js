'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2planhealthexclusiontrendworknumber) {
  T2planhealthexclusiontrendworknumber.processChild = function (req, filter, cb) {
    this.process(req, filter, function (err, message) {
        //console.log("...Reformat message into JSON UI team is expecting here.");
        if (err) {
          return cb(err, null);
      }
        var formatedJson = {};  
      try {
        formatedJson = {
          "DROPD_EXCLSN_LABEL":"Dropped Exclusion",
          "DROPD_EXCLSN_COLOR":"#FCCF0A",
          "NEW_EXCLSN_LABEL":"New Exclusion",
          "NEW_EXCLSN_COLOR":"#FC380A;",
          "EXISTG_EXCLSN_LABEL":"Existing Exclusion",
          "EXISTG_EXCLSN_COLOR":"#590017",
          "DROPD_EXCLSN":[],          
          "NEW_EXCLSN":[],
          "EXISTG_EXCLSN":[]
        }

        for (var i = 0; i < message.length; i++) {


          formatedJson.DROPD_EXCLSN.push({
            "id":i+1,
            "label": "Dropped Exclusion",
            "color": "#FCCF0A",
            "value": "drop",
            "date": message[i].CURR_ACCT_YR + "/" + message[i].CURR_ACCT_MO + "/" + "01",
            "percent": calcs.calcX100(message[i].DROP_EXCLSN_PCT),
            "count": message[i].DROP_EXCLSN_WORK_NUM,
            "amount": calcs.calcValue(Number(message[i].DROP_EXCLSN_REV_AMT))
            });

          formatedJson.NEW_EXCLSN.push({
              "id":i+1,
              "label": "New Exclusion",
              "color": "#FC380A",
              "value": "new",
              "date": message[i].CURR_ACCT_YR + "/" + message[i].CURR_ACCT_MO + "/" + "01",
              "percent": calcs.calcX100(message[i].NEW_EXCLSN_PCT),
              "count": message[i].NEW_EXCLSN_WORK_NUM,
              "amount": calcs.calcValue(Number(message[i].NEW_EXCLSN_REV_AMT))
              });

            formatedJson.EXISTG_EXCLSN.push({
              "id":i+1,
              "label": "Existing Exclusion",
              "color": "#590017",
              "value": "existing",
              "date": message[i].CURR_ACCT_YR + "/" + message[i].CURR_ACCT_MO + "/" + "01",
              "percent": calcs.calcX100(message[i].EXISTG_EXCLSN_PCT),
              "count": message[i].EXISTG_EXCLSN_WORK_NUM,
              "amount": calcs.calcValue(Number(message[i].EXISTG_EXCLSN_REV_AMT))
              });
        };
      } catch (e) {
        formatedJson = { msg: e.message };
      }

      cb(err, formatedJson);
  });
};

  T2planhealthexclusiontrendworknumber.remoteMethod('processChild', {
      http: { path: '/', verb: 'get', status: 200 },
      accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
      { arg: 'filter', type: 'object' }],
      returns: { arg: 't2planhealthexclusiontrendworknumber', type: 'object' }
  });
};
