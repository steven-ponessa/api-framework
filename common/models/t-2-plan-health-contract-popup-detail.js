'use strict';

var calcs = require("./utils/tieredLeakageCalcs");


module.exports = function(T2planhealthcontractpopupdetail) {

    T2planhealthcontractpopupdetail.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
            if (err) {
                return cb(err, null);
            }
          try {
                var formatedJson = {};
                if(message.length == 0) {
                    formatedJson = {};
                } else {
                    formatedJson = [{
                        "DATE":message[0].DATA_LOAD_DATE,
                        "NUMBER":message[0].NUMBER,
                        "CONTRACT_KEY":message[0].CNTRCT_KEY,                      
                        "TYPE":message[0].TYPE,
                        "CLIENT_NAME": message[0].CUSTOMER,
                        "CONTRACT_NAME": message[0].CONTRACT_NAME,
                        "CONTRACT_SIGN_DATE": message[0].CONTRACT_SIGN_DATE,
                        "PROJECT": message[0].PROJECT,
                        "BRAND_PE": message[0].BRAND_PE,
                        "COUNTRY": message[0].COUNTRY,
                        "SECTOR": message[0].SECTOR,
                        "SVC_LINE_NM": message[0].SVC_LINE_NM,
                        "GROWTH_PLATFORM": message[0].GROWTH_PLATFORM,
                        "PC_GP_PCT": calcs.formatPercentage100(Number(message[0].PC_GP_PCT)),
                        "PC_GP_AMT": (message[0].PC_GP_AMT),
                        "AP_GP_PCT": calcs.formatPercentage100(Number(message[0].AP_GP_PCT)),
                        "AP_GP_AMT": (message[0].AP_GP_AMT),
                        "EAC_GP_PCT": calcs.formatPercentage100(Number(message[0].EAC_GP_PCT)),
                        "EAC_GP_AMT": (message[0].EAC_GP_AMT),
                        "ACT_GP_PCT": calcs.formatPercentage100(Number(message[0].ACT_GP_PCT)),
                        "TCV": (message[0].TCV),
                        "IPPF_URL": message[0].IPPF_URL
                }]

            }
        } catch (e) {
            formatedJson = {"msg" : e.message}
        }
        
      cb(err, formatedJson);
    });
};

    T2planhealthcontractpopupdetail.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2PlanHealthContractPopupDetail', type: 'object'}
    });

};
