'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compcoscountperf) {

  T2compcoscountperf.processChild = function(req, filter, cb) {
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
              "YELLOW_BAR_COLOR"   : "#FDD600",
			        "ORANGE_BAR_COLOR"   : "#FF7832",
              "data": [
                  {
                    "label": "CoS Performance",
                    "busAttrData": []
                  }
                ]
              };

              message.forEach(function (element) {

                  jsonData.date = message[0].DATA_LOAD_DESC;

                  var CoSP = {
                    "name": "",
                    "abbr": "-",
                    "green_count": "",
                    "red_count": "",
                    "yellow_count": "",
                    "orange_count": "",
                    "green_perc": "",
                    "red_perc":"", 
                    "yellow_perc":"",
                    "orange_perc":""
                  };


                  CoSP.name = element.BUS_ATTR;
                  CoSP.abbr = element.BUS_ATTR;
				  
                  CoSP.green_count = element.GREEN_CNT;
                  CoSP.red_count = element.RED_CNT;
                  CoSP.yellow_count = element.YELLOW_CNT;
                  CoSP.orange_count = element.ORANGE_CNT;
				  
                  CoSP.green_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.GREEN_PERC)));
                  CoSP.red_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.RED_PERC)));
                  CoSP.yellow_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.YELLOW_PERC)));
                  CoSP.orange_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.ORANGE_PERC)));

                

                  jsonData.data[0].busAttrData.push(CoSP);
        
              }, this);
            } catch(e) {
              jsonData = {msg: e.message};
            }

            cb(err, jsonData);
        });
    };

    T2compcoscountperf.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompCOSCountPerf', type: 'object'}
    });

  };
