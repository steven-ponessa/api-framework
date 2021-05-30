'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2gpleaktrendmthmetworknum) {
  T2gpleaktrendmthmetworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        var precentDecimal = 1;

        var formatedJson = {};
        var ITD_COLOR = "#005D5D";
        var YTD_COLOR = "#FF832B";
        var FCPC_COLOR = "#F1C21B";
        var CQ_COLOR = "#0043CE";
        var AP_COLOR = "#A2191F";
        var FCAP_COLOR = "#3DDBD9";
        var CQAP_COLOR = "#4178BE";
        var CSTOVRN_COLOR = "#BE95FF";        

        try {
          formatedJson = {
            "TREND_MESSAGE" : "Historical data is calculated using current business rules; values may vary from previously published excel Actuals reports",
            "ITD_LABEL": "ItD to PC",
            "ITD_COLOR": ITD_COLOR,
            "YTD_LABEL": "YtD to PC",
            "YTD_COLOR": YTD_COLOR,
            "FCPC_LABEL": "FC EaC to PC",
            "FCPC_COLOR": FCPC_COLOR,
            "CQ_LABEL": "CQ to PC",
            "CQ_COLOR": CQ_COLOR,
            "AP_LABEL": "AP to PC",
            "AP_COLOR": AP_COLOR,
            "FCAP_LABEL": "FC EaC to AP",
            "FCAP_COLOR": FCAP_COLOR,
/*
            "CQAP_LABEL": "CQ to AP",
            "CQAP_COLOR": CQAP_COLOR,

            "CSTOVRN_LABEL": "3 Mo. Cost Overrun",
            "CSTOVRN_COLOR": CSTOVRN_COLOR,
            */
            "ITD": [],
            "YTD": [],
            "FCPC": [],
            "CQ": [],
            "AP": [],
            "FCAP": [],
			"CSTOVRN": []
/*,
            "CQAP": [],
*/           
            
            };

          for (var i = 0; i < message.length; i++) {

            var dateValue = '';
            if (message[i].DESC_2 == 'Latest refresh') {
              dateValue = 'Latest';
              } else {
                  dateValue = message[i].NEW_DATE;
            }; // end if Latest row

            formatedJson.ITD.push({
			        "id":i+1,
              "label": "ItD to PC",
              "color": ITD_COLOR,
              "value": "ITD_TO_PC",
              "refresh_date": message[i].DATA_LOAD_DATE,
              //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
              //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
              "date": dateValue,
              "date_label": message[i].DESC_2,
              "percent": calcs.formatPercentage100(message[i].ITD_TO_PC_PCT),
              "amount": calcs.calcValue(message[i].ITD_TO_PC_LKG)
            });

            formatedJson.YTD.push({
			        "id":i+1,
              "label": "YtD to PC",
              "color": YTD_COLOR,
              "value": "YTD_TO_PC",  
              "refresh_date": message[i].DATA_LOAD_DATE,
              //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
              //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
              "date": dateValue,
              "date_label": message[i].DESC_2,
              "percent": calcs.formatPercentage100(message[i].YTD_TO_PC_PCT),
              "amount": calcs.calcValue(message[i].YTD_TO_PC_LKG)
            });

            formatedJson.FCPC.push({
			        "id":i+1,
              "label": "FC EaC to PC",
              "color": FCPC_COLOR,
              "value": "FC_EAC_TO_PC", 
              "refresh_date": message[i].DATA_LOAD_DATE,
              //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
              //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
              "date": dateValue,
              "date_label": message[i].DESC_2,
              "percent": calcs.formatPercentage100(message[i].FC_TO_PC_PCT),
              "amount": calcs.calcValue(message[i].FRCST_TO_PC_LKG)
            });

            formatedJson.CQ.push({
			        "id":i+1,
              "label": "CQ to PC",
              "color": CQ_COLOR,
              "value": "CQ_TO_PC",
              "refresh_date": message[i].DATA_LOAD_DATE,
              //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
              //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
              "date": dateValue,
              "date_label": message[i].DESC_2,
              "percent": calcs.formatPercentage100(message[i].CQ_TO_PC_PCT),
              "amount": calcs.calcValue(message[i].CQ_TO_PC_LKG)
            });

            formatedJson.AP.push({
			        "id":i+1,
              "label": "AP to PC",
              "color": AP_COLOR,
              "value": "AP_TO_PC",
              "refresh_date": message[i].DATA_LOAD_DATE,
              //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
              //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
              "date": dateValue,
              "date_label": message[i].DESC_2,
              "percent": calcs.formatPercentage100(message[i].AP_TO_PC_PCT),
              "amount": calcs.calcValue(message[i].AP_TO_PC_LKG)
            });

            formatedJson.FCAP.push({
			        "id":i+1,
              "label": "FC EaC to AP",
              "color": FCAP_COLOR,
              "value": "FC_EAC_AP",
              "refresh_date": message[i].DATA_LOAD_DATE,
              //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
              //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
              "date": dateValue,
              "date_label": message[i].DESC_2,
              "percent": calcs.formatPercentage100(message[i].FC_TO_AP_PCT),
              "amount": calcs.calcValue(message[i].FC_TO_AP_LKG)
            });
/*
            formatedJson.CQAP.push({
			        "id":i+1,
              "label": "CQ to AP",
              "color": CQAP_COLOR,
              "value": "CQ_TO_AP",
              "refresh_date": message[i].DATA_LOAD_DATE,
              //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
              //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
              "date": dateValue,
              "percent": calcs.formatPercentage100(message[i].CQ_TO_AP_PCT),
              "amount": calcs.calcValue(message[i].CQ_TO_AP)
            });
*/
            formatedJson.CSTOVRN.push({
              "id":i+1,
              "label": "3 Mo. Cost Overrun",
              "color": CSTOVRN_COLOR,
              "value": "COST_OVER",
              "refresh_date": message[i].DATA_LOAD_DATE,
              //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
              //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
              "date": dateValue,
              "date_label": message[i].DESC_2,
              "percent": calcs.formatPercentage100(message[i].COST_OVER_PCT),
              "amount": calcs.calcValue(message[i].COST_OVER)
            });

       
          };
        } catch (e) {
          formatedJson = {"msg" : e.message}
        }

      cb(err, formatedJson);
  });
};

T2gpleaktrendmthmetworknum.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2GPLeakTrendMthMetWorkNum', type: 'object'}
  });

};
