'use strict';
var util = require('util');
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T1compscorecard) {

    T1compscorecard.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }
        
          var formatedJson = {};
          if(message.length > 0) { //Avoid processing an empty result set

            var date = message[0].DATA_LOAD_DATE;
            var valueDecimalPlace = 2;
            var percentDecimalPlace = 1;
            var increaseColor = "#33AC2E";    // green
            var decreaseColor = "#D63649";    // red
            var flatColor = "#9B9B9B";        // grey

            formatedJson.date = date;
            formatedJson.legend_label = "MtM pts";
            formatedJson.increase_label = "MtM Increase";
            formatedJson.increase_color = increaseColor;
            formatedJson.decrease_label = "MtM Decrease";
            formatedJson.decrease_color = decreaseColor;
            formatedJson.flat_label = "MtM Flat";
            formatedJson.flat_color = flatColor;
            formatedJson.data = [];

            //console.log("message="+ util.inspect(message));


            for (var i = 0; i < message.length; i++) {

              var color = "";
              if(message[i].MTM_PT_CHANGE < 0){
                color = decreaseColor;
              }
              else if(message[i].MTM_PT_CHANGE == 0){
                color = flatColor;
              }
              else{
                color = increaseColor;
              }


              formatedJson.data.push(
                {
                  "label": message[i].MSURMT_FULL_DESC,
                  "percent": calcs.formatPercentage100(message[i].CURR_COMPLIANCE_PCT, 3),
                  //"value": message[i].CURR_COMP_CNT,
                  "MSURMT_CODE": message[i].MSURMT_CD,
                  "MtM": message[i].MTM_PT_CHANGE,
                  "color": color
                }
              )
            }
          }

          cb(err, formatedJson);
      });
    };


    T1compscorecard.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't1CompScorecard', type: 'object'}
    });

};
