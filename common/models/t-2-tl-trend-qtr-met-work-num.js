'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2tltrendqtrmetworknum) {
  T2tltrendqtrmetworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
       var formatedJson = {};
        
        try {
          formatedJson = {
/*
            "ITD_LABEL":"ItD to PC",
            "ITD_COLOR":"#00CFF4",
            "YTD_LABEL":"YtD to PC",
            "YTD_COLOR":"#A2D603", 
*/
            "CQ_LABEL":"CQ to PC",
            "CQ_COLOR":"#FC9D9A",
            //"ITD": [],
            //"YTD": [],
            "CQ": []
            }

            for (var i = 0; i < message.length; i++) {
/*
              formatedJson.ITD.push({
				        "id":i+1,
                "label": "ItD to PC",
                "color": "#00CFF4",
                "value": "ITD_TO_PC",
                "date": message[i].QTR_KEY_CD.slice(4, 6) + ' ' + message[i].QTR_KEY_CD.slice(0, 4),
                "percent": calcs.formatPercentage100(message[i].ITD_TO_PC_PCT),
                "amount": calcs.calcValue(message[i].ITD_TO_PC_LKG)
				
				});

              formatedJson.YTD.push({
				        "id":i+1,
                "label": "YtD to PC",
                "color": "#A2D603",
                "value": "YTD_TO_PC",  
                "date": message[i].QTR_KEY_CD.slice(4, 6) + ' ' + message[i].QTR_KEY_CD.slice(0, 4),
                "percent": calcs.formatPercentage100(message[i].YTD_TO_PC_PCT),
                "amount": calcs.calcValue(message[i].YTD_TO_PC_LKG)
				
				});
*/
              if (message[i].QTR_KEY_CD != '2018Q2') {
                  formatedJson.CQ.push({
                    "id":i+1,
                    "label": "CQ to PC",
                    "color": "#FC9D9A",
                    "value": "CQ_TO_PC",
                    "date": message[i].QTR_KEY_CD.slice(4, 6) + ' ' + message[i].QTR_KEY_CD.slice(0, 4),
                    "percent": calcs.formatPercentage100(message[i].CQ_TO_PC_PCT),
                    "amount": calcs.calcValue(message[i].CQ_TO_PC_LKG)
                    });
              }; //end if not 2018Q2, temp fix

            };
          } catch (e) {
            formatedJson = {msg: e.message};
          }

    cb(err, formatedJson);
  });
};

T2tltrendqtrmetworknum.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2TLTrendQtrMetWorkNum', type: 'object'}
  });

};
