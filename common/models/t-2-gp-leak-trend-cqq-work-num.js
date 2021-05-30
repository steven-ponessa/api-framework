'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2gpleaktrendcqqworknum) {
  T2gpleaktrendcqqworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

        var formatedJson = {
          "TREND_MESSAGE" : "Historical data is calculated using current business rules; values may vary from previously published excel Actuals reports",
          "CQ_to_PC_LABEL": "CQ to PC",
          "CQ_to_PC_COLOR": "#0043CE",
          "CQ_to_PC": []
        }

        if (!message.length <= 0){
          var j = message.length-1;

          for (var i = 0; i < message.length; i++) {
            formatedJson.CQ_to_PC.push({
                "id":i+1,
                "label": "CQ to PC",
                "color": "#0043CE",
                "cqQtrKey": message[i].YR_MO_KEY,
                "date": message[i].YR_MO_KEY.slice(4, 6) + ' ' + message[i].YR_MO_KEY.slice(0, 4),
                "date_label": message[i].DESC_2,           
                "count": message[i].CQ_WORKNUM_CNT,
                "amount": calcs.calcValue(message[i].CQ_TO_PC_LKG),
                "percent": calcs.formatPercentage100(message[i].CQ_TO_PC_PCT,1)
              });

          }
          formatedJson.DATE = message[j].DATA_LOAD_DESC; //this will be compliance Data_Load_Date
        }

      cb(err, formatedJson);
  });
};

  T2gpleaktrendcqqworknum.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2GPLeakTrendCQQWorkNum', type: 'object'}
  });

};
