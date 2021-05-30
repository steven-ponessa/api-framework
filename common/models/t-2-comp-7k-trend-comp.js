'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2comp7ktrendcomp) {
  T2comp7ktrendcomp.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

        var dataMessage = '';
        var target_value = '';
        var formatedJson = {
            "DATA_MESSAGE": dataMessage,
            "SELECTED_LABEL": " ",
            "SEVEN_KEYS_COLOR":"#AF6EE8",
            "TARGET_PCT" : target_value,
            "SEVEN_KEYS": []
        }

        if (!message.length <= 0) {

          formatedJson.TARGET_PCT = calcs.formatPercentage100(Number(message[0].TARGET));
          formatedJson.SELECTED_LABEL = req.query['label'];

          for (var i = 0; i < message.length; i++) {
            formatedJson.SEVEN_KEYS.push({
                "label": "7 Keys",
                "value": "seven_keys",
                "color":"#AF6EE8",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].SEVEN_KEYS,
                "target_pct": calcs.formatPercentage100(Number(message[i].TARGET)),
                //"total_count": message[i].PG_O_TOTAL,
                "pct": calcs.formatPercentage100(message[i].SEVENKEYSPCT,1)
              });
            }
          } else {
            formatedJson.DATA_MESSAGE = "No Data Available";
          } //end if empty
  
        cb(err, formatedJson);
    });
  };

T2comp7ktrendcomp.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2Comp7KTrendComp', type: 'object'}
  });

};
