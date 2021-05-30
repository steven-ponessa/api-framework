'use strict';

var calcs = require("./utils/tieredLeakageCalcs");


module.exports = function(T2businessleakageworkpopupdetail) {

    T2businessleakageworkpopupdetail.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }

          var formatedJson = {};
          try {
             formatedJson = [{
              "NUMBER":message[0].NUMBER,
              "TYPE":message[0].TYPE,
              "PROJECT_NAME": message[0].PROJECT_NAME,
              "CONTRACT_NUMBER":message[0].CONTRACT,
              "CONTRACT_NAME":message[0].CONTRACT_NAME,
              "CLIENT_NAME": message[0].CUSTOMER,
              "PARTNER_NAME": message[0].BRAND_PE,
              "COUNTRY": message[0].COUNTRY,
              "CONTRACT_SIGN_DATE": message[0].CONTRACT_SIGN_DATE,
              "APPR_PLAN_DATE": message[0].APPR_PLAN_DATE,
              "SECTOR": message[0].SECTOR,
              "FC_APPR_DATE": message[0].FC_APPR_DATE,
              "GROWTH_PLATFORM": message[0].GROWTH_PLATFORM,
              "TCV": calcs.calcValue(message[0].TCV),
              "PC_GP_PCT": calcs.calcX100(message[0].PC_GP_PCT),
              "FC_TO_PC_LKG_PCT": calcs.calcX100(message[0].FC_GP_PCT),
              "YTD_TO_PC_LKG_PCT": calcs.calcX100(message[0].YTD_ACT_GP_PCT),
              "ITD_TO_PC_LKG_PCT": calcs.calcX100(message[0].ITD_ACT_GP_PCT),
              "CQ_TO_PC_LKG_PCT": calcs.calcX100(message[0].CQ_ACT_GP_PCT),
              "PC_GP_VAL": calcs.calcValue(message[0].PC_GP),
              "PC_GP_PCT_CB": calcs.calcX100(message[0].PC_GP_PCT_CB),
              "PC_GP_CB_VAL": calcs.calcValue(message[0].PC_GP_CB),
              "FC_TO_PC_LKG_VAL": calcs.calcValue(message[0].FC_TO_PC_LKG),
              "YTD_TO_PC_LKG_VAL": calcs.calcValue(message[0].YTD_TO_PC_LKG),
              "ITD_TO_PC_LKG_VAL": calcs.calcValue(message[0].ITD_TO_PC_LKG),
              "CQ_TO_PC_LKG_VAL": calcs.calcValue(message[0].CQ_TO_PC_LKG),
              "IPPF_URL": message[0].IPPF_URL
            }];
          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2businessleakageworkpopupdetail.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2BusinessLeakageWorkPopupDetail', type: 'object'}
    });

};
