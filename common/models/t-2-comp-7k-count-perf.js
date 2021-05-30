'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2comp7kcountperf) {

  T2comp7kcountperf.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }

          try {

            var jsonData = {
              "SELECTED_LABEL" :"",
              "DATA_LOAD_DATE" :message[0].DATA_LOAD_DESC,
              "GREEN_BAR_COLOR": "#8CD211",
              "RED_BAR_COLOR" : "#E71D32",
			        "ORANGE_BAR_COLOR"   : "#FF7832",
              "SELECTED_COLOR" : "#F4F6FB",
              "TOTAL_BAR_COLOR": "#D0DADA",
              "data": [
                  {
                    "label": "7 Keys",
                    "busAttrData": []
                  }
                ]
              };

              message.forEach(function (element) {

                  var sevenk = {
                    "name": "",
                    "abbr": "-",
                    "green_count": "",
                    "orange_count": "",
                    "red_count": "",
                    "green_perc": "",
                    "orange_perc":"",
                    "red_perc":""
                  };

                  sevenk.name = element.BUS_ATTR;
                  sevenk.abbr = element.BUS_ATTR;

                  sevenk.green_count = element.GREEN_CNT;
                  sevenk.orange_count = element.ORANGE_CNT;
                  sevenk.red_count = element.RED_CNT;
				  
                  sevenk.green_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.GREEN_PERC)));
                  sevenk.orange_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.ORANGE_PERC)));
                  sevenk.red_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.RED_PERC)));

                  jsonData.data[0].busAttrData.push(sevenk);

              }, this);
            } catch(e) {
              jsonData = {msg: e.message};
            }

            cb(err, jsonData);
        });
    };

    T2comp7kcountperf.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2Comp7KCountPerf', type: 'object'}
    });

  };
