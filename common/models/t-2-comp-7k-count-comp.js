'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2comp7kcountcomp) {

    T2comp7kcountcomp.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }

          try {

            var target_value = '';
            
            if (!message.length <= 0) {
              target_value = calcs.formatPercentage100(Number(message[0].TARGET_PCT));
            }

            var jsonData = {
              "SELECTED_LABEL" :"",
              "DATA_LOAD_DATE" :message[0].DATA_LOAD_DESC,
              "SELECTED_COLOR" : "#F4F6FB",
              "TARGET_COLOR"   : "#000000",
              "TARGET_LABEL"   : "Target",
              "TARGET_PCT"     : target_value,
              "data": [
                  {
                    "label": "7 Keys",
                    "color": "#AF6EE8",
                    "busAttrData": []
                  }]
              };

              message.forEach(function (element) {

                  var sevenk = {
                    "name": "",
                    "abbr": "-",
                    "count": "",
                    "target_pct": "",
                    "percent": ""
                  };

                  sevenk.name = element.BUS_ATTR;
                  sevenk.abbr = element.BUS_ATTR;
                  sevenk.count = element.TOTAL_SEVEN_KEYS;
                  sevenk.target_pct = calcs.formatPercentage100(Number(element.TARGET_PCT));
                  sevenk.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.SEVEN_KEYS_PERC)));
                  jsonData.data[0].busAttrData.push(sevenk);
              }, this);
            } catch(e) {
              jsonData = {msg: e.message};
            }

            cb(err, jsonData);
        });
    };

    T2comp7kcountcomp.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2Comp7KCountComp', type: 'object'}
    });

  };
