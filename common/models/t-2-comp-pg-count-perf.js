'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2comppgcountperf) {

  T2comppgcountperf.processChild = function(req, filter, cb) {
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
                    "label": "PG0 Performance",
                    "busAttrData": []
                  },
                  {
                    "label": "PG1-4 Performance",
                    "busAttrData": []
                  },
                  {
                    "label": "PG1 Performance",
                    "busAttrData": []
                  },
                  {
                    "label": "PG2 Performance",
                    "busAttrData": []
                  },
                  {
                    "label": "PG3 Performance",
                    "busAttrData": []
                  },
                  {
                    "label": "PG4 Performance",
                    "busAttrData": []
                  }
                ]
              };

              message.forEach(function (element) {

                  jsonData.date = message[0].DATA_LOAD_DESC;

                  var pg0c = {
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

                  var pg1_4c = {
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

                  var pg1c = {
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

                  var pg2c = {
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
                  var pg3c = {
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
                  var pg4c = {
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

                  pg0c.name = element.BUS_ATTR;
                  pg0c.abbr = element.BUS_ATTR;
				  
                  pg0c.green_count = element.PG_0_GREEN_CNT;
                  pg0c.red_count = element.PG_0_RED_CNT;
                  pg0c.yellow_count = element.PG_0_YELLOW_CNT;
                  pg0c.orange_count = element.PG_0_ORANGE_CNT;
				  
                  pg0c.green_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_0_GREEN_PERC)));
                  pg0c.red_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_0_RED_PERC)));
                  pg0c.yellow_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_0_YELLOW_PERC)));
                  pg0c.orange_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_0_ORANGE_PERC)));

                  pg1_4c.name = element.BUS_ATTR;
                  pg1_4c.abbr = element.BUS_ATTR;
				  
                  pg1_4c.green_count = element.PG_1_4_GREEN_CNT;
                  pg1_4c.red_count = element.PG_1_4_RED_CNT;
                  pg1_4c.yellow_count = element.PG_1_4_YELLOW_CNT;
                  pg1_4c.orange_count = element.PG_1_4_ORANGE_CNT;

                  pg1_4c.green_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_1_4_GREEN_PERC)));
                  pg1_4c.red_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_1_4_RED_PERC)));
                  pg1_4c.yellow_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_1_4_YELLOW_PERC)));
                  pg1_4c.orange_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_1_4_ORANGE_PERC)));

                  pg1c.name = element.BUS_ATTR;
                  pg1c.abbr = element.BUS_ATTR;
				  
                  pg1c.green_count = element.PG_1_GREEN_CNT;
                  pg1c.red_count = element.PG_1_RED_CNT;
                  pg1c.yellow_count = element.PG_1_YELLOW_CNT;
                  pg1c.orange_count = element.PG_1_ORANGE_CNT;

                  pg1c.green_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_1_GREEN_PERC)));
                  pg1c.red_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_1_RED_PERC)));
                  pg1c.yellow_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_1_YELLOW_PERC)));
                  pg1c.orange_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_1_ORANGE_PERC)));

                  pg2c.name = element.BUS_ATTR;
                  pg2c.abbr = element.BUS_ATTR;
				  
                  pg2c.green_count = element.PG_2_GREEN_CNT;
                  pg2c.red_count = element.PG_2_RED_CNT;
                  pg2c.yellow_count = element.PG_2_YELLOW_CNT;
                  pg2c.orange_count = element.PG_2_ORANGE_CNT;

                  pg2c.green_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_2_GREEN_PERC)));
                  pg2c.red_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_2_RED_PERC)));
                  pg2c.yellow_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_2_YELLOW_PERC)));
                  pg2c.orange_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_2_ORANGE_PERC)));

                  pg3c.name = element.BUS_ATTR;
                  pg3c.abbr = element.BUS_ATTR;
				  
                  pg3c.green_count = element.PG_3_GREEN_CNT;
                  pg3c.red_count = element.PG_3_RED_CNT;
                  pg3c.yellow_count = element.PG_3_YELLOW_CNT;
                  pg3c.orange_count = element.PG_3_ORANGE_CNT;

                  pg3c.green_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_3_GREEN_PERC)));
                  pg3c.red_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_3_RED_PERC)));
                  pg3c.yellow_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_3_YELLOW_PERC)));
                  pg3c.orange_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_3_ORANGE_PERC)));

                  pg4c.name = element.BUS_ATTR;
                  pg4c.abbr = element.BUS_ATTR;
				  
                  pg4c.green_count = element.PG_4_GREEN_CNT;
                  pg4c.red_count = element.PG_4_RED_CNT;
                  pg4c.yellow_count = element.PG_4_YELLOW_CNT;
                  pg4c.orange_count = element.PG_4_ORANGE_CNT;

                  pg4c.green_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_4_GREEN_PERC)));
                  pg4c.red_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_4_RED_PERC)));
                  pg4c.yellow_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_4_YELLOW_PERC)));
                  pg4c.orange_perc = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_4_ORANGE_PERC)));

                  jsonData.data[0].busAttrData.push(pg0c);
                  jsonData.data[1].busAttrData.push(pg1_4c);
                  jsonData.data[2].busAttrData.push(pg1c);
                  jsonData.data[3].busAttrData.push(pg2c);
                  jsonData.data[4].busAttrData.push(pg3c);
                  jsonData.data[5].busAttrData.push(pg4c);
              }, this);
            } catch(e) {
              jsonData = {msg: e.message};
            }

            cb(err, jsonData);
        });
    };

    T2comppgcountperf.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompPGCountPerf', type: 'object'}
    });

  };
