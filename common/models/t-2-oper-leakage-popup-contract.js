'use strict';

var calcs = require("./utils/tieredLeakageCalcs");


module.exports = function(T2operleakagepopupcontract) {

    T2operleakagepopupcontract.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
            if (err) {
                return cb(err, null);
            }
            var formatedJson = {};

            try {
                formatedJson = [{
                    "NUMBER":message[0].NUMBER,
                    "TYPE":message[0].TYPE,
                    "CONTRACT_NAME": message[0].CONTRACT_NAME,
                    "BRAND_PE": message[0].BRAND_PE,
                    "CONTRACT_SIGN_DATE": message[0].CONTRACT_SIGN_DATE,
                    "SECTOR": message[0].SECTOR,
                    "GROWTH_PLATFORM": message[0].GROWTH_PLATFORM,
                    "CLIENT_NAME": message[0].CLIENT_NAME,
                    "COUNTRY": message[0].COUNTRY,
                    //"APPR_PLAN_DATE": message[0].APPR_PLAN_DATE,
                    "TCV": calcs.calcValue(message[0].TCV),
                    "PC_GP_PCT": calcs.calcX100(message[0].PC_GP_PCT),
                    "PC_GP": calcs.calcValue(message[0].PC_GP),
                    "PLN_TO_PC_LEAK_PCT": calcs.calcX100(message[0].PLN_TO_PC_LEAK_PCT),
                    "PLN_TO_PC_LEAK": calcs.calcValue(message[0].PLN_TO_PC_LEAK),
                    "FC_TO_AP_LEAK_PCT": calcs.calcX100(message[0].FC_TO_AP_LEAK_PCT),
                    "FC_TO_AP_LEAK": calcs.calcValue(message[0].FC_TO_AP_LEAK),
                    "IPPF_URL": message[0].IPPF_URL                
                  }];
            } catch (e) {
                formatedJson = {"msg" : e.message}
            }

          cb(err, formatedJson);
        });
    };

    T2operleakagepopupcontract.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2OperLeakagePopupContract', type: 'object'}
    });

};