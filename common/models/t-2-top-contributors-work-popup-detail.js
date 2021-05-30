'use strict';

var calcs = require("./utils/tieredLeakageCalcs");


module.exports = function(T2topcontributorsworkpopupdetail) {

    T2topcontributorsworkpopupdetail.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
            if (err) {
                return cb(err, null);
            }
          var formatedJson = {};

          try {
            var formatedJson = [{
                "NUMBER":message[0].NUMBER,
                "TYPE":message[0].TYPE,
                "CONTRACT":message[0].CONTRACT,
                "STATUS":message[0].STATUS,
                "SERVICE_LINE": message[0].SERVICE_LINE,
                "GROWTH_PLATFORM": message[0].GROWTH_PLATFORM,
                "SECTOR": message[0].SECTOR,
                "CUSTOMER": message[0].CUSTOMER,
                "PROJECT": message[0].PROJECT,
                "BRAND_PE": message[0].BRAND_PE,
                "START_DATE": message[0].START_DATE,
                "END_DATE": message[0].END_DATE,
                "APPR_PLAN_DATE": message[0].APPR_PLAN_DATE,
                "GEOGRAPHY": message[0].GEOGRAPHY,
                "REGION": message[0].REGION,
                "COUNTRY": message[0].COUNTRY,
                "QTD_GP_LEAKAGE": calcs.calcValue(message[0].QTD_GP_LEAKAGE),
                "QTD_GP_LEAKAGE_STATUS": calcs.getColorStatus(message[0].QTD_GP_LEAKAGE),
                "EAC_TO_PLAN": calcs.calcX100(message[0].EAC_TO_PLAN),
                "EAC_TO_PLAN_STATUS": calcs.getColorStatus(message[0].EAC_TO_PLAN),
                "TCV": calcs.calcValue(message[0].TCV),
                "PLAN": calcs.calcValue(message[0].PLAN),
                "ACTUAL": calcs.calcValue(message[0].ACTUAL),
                "VARIANCE_PERCENTAGE": calcs.calcX100(message[0].VARIANCE_PERCENTAGE),
                "VARIANCE_PERCENTAGE_STATUS": calcs.getColorStatus(message[0].VARIANCE_PERCENTAGE),
                "VARIANCE": calcs.calcValue(message[0].VARIANCE),
                "IPPF_URL": message[0].IPPF_URL              
            }];
          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2topcontributorsworkpopupdetail.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2TopContributorsWorkPopupDetail', type: 'object'}
    });

};
