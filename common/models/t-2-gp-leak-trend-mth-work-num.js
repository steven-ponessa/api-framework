'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2gpleaktrendmthworknum) {
  T2gpleaktrendmthworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
	  var formatedJson = {};

      try {
        formatedJson = {
          "TREND_MESSAGE" : "Historical data is calculated using current business rules; values may vary from previously published excel Actuals reports",
          "ITD_LABEL": "ItD to PC",
          "ITD_COLOR": "#005D5D",
          "YTD_LABEL": "YtD to PC",
          "YTD_COLOR": "#FF832B",
          "FRCST_TO_PC_LABEL": "FC EaC to PC",
          "FRCST_TO_PC_COLOR": "#F1C21B",
          //"CQ_LABEL": "CQ to PC",
          //"CQ_COLOR": "#0043CE",
          "AP_LABEL": "AP to PC",
          "AP_COLOR": "#A2191F",
          "FC_TO_AP_LABEL": "FC EaC to AP",
          "FC_TO_AP_COLOR": "#3DDBD9",
          "ITD": [],
          "YTD": [],
          "FRCST_TO_PC": [],
          //"CQ": [],
          "AP": [],
          "FC_TO_AP": []
        }

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
            "color": "#005D5D",
            "value": "ITD_TO_PC",
            "refresh_date": message[i].DATA_LOAD_DATE,
            //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
            //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
            "date": dateValue,
            "yrMoKey": message[i].YR_MO_KEY,
            "date_label": message[i].DESC_2,
            "percent": calcs.formatPercentage100(message[i].ITD_TO_PC_PCT),
            "count": message[i].ITD_WORKNUM_CNT,
            "amount": calcs.calcValue(message[i].ITD_TO_PC_LKG)
          });

          formatedJson.YTD.push({
            "id":i+1,
            "label": "YtD to PC",
            "color": "#FF832B",
            "value": "YTD_TO_PC",  
            "refresh_date": message[i].DATA_LOAD_DATE,
            //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
            //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
            "date": dateValue,
            "yrMoKey": message[i].YR_MO_KEY,
            "date_label": message[i].DESC_2,
            "percent": calcs.formatPercentage100(message[i].YTD_TO_PC_PCT),
            "count": message[i].YTD_WORKNUM_CNT,
            "amount": calcs.calcValue(message[i].YTD_TO_PC_LKG)

          });

          formatedJson.FRCST_TO_PC.push({
            "id":i+1,
            "label": "FC EaC to PC",
            "color": "#F1C21B",
            "value": "FC_EAC_TO_PC", 
            "refresh_date": message[i].DATA_LOAD_DATE,
            //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
            //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
            "date": dateValue,
            "yrMoKey": message[i].YR_MO_KEY,
            "date_label": message[i].DESC_2,
            "percent": calcs.formatPercentage100(message[i].FC_TO_PC_PCT),
            "count": message[i].FC_WORKNUM_CNT,
            "amount": calcs.calcValue(message[i].FRCST_TO_PC_LKG)

          });

/*           formatedJson.CQ.push({
            "id":i+1,
            "label": "CQ to PC",
            "color": "#0043CE",
            "value": "CQ_TO_PC",
            "refresh_date": message[i].DATA_LOAD_DATE,
            //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
            //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
            "date": dateValue,
            "yrMoKey": message[i].YR_MO_KEY,
            "date_label": message[i].DESC_2,
            "percent": calcs.formatPercentage100(message[i].CQ_TO_PC_PCT),
            "count": message[i].CQ_WORKNUM_CNT,
            "amount": message[i].CQ_TO_PC_LKG

          }); */

          formatedJson.AP.push({
            "id":i+1,
            "label": "AP to PC",
            "color": "#A2191F",
            "value": "AP_TO_PC",
            "refresh_date": message[i].DATA_LOAD_DATE,
            //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
            //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
            "date": dateValue,
            "yrMoKey": message[i].YR_MO_KEY,
            "date_label": message[i].DESC_2,
            "percent": calcs.formatPercentage100(message[i].AP_TO_PC_PCT),
            "count": message[i].AP_WORKNUM_CNT,
            "amount": calcs.calcValue(message[i].AP_TO_PC_LKG)

          });

          formatedJson.FC_TO_AP.push({
            "id":i+1,
            "label": "FC EaC to AP",
            "color": "#3DDBD9",
            "value": "FC_EAC_AP",
            "refresh_date": message[i].DATA_LOAD_DATE,
            //"date": message[i].DATA_LOAD_DATE.substr(2, 10),
            //"date": message[i].DATA_LOAD_DATE.substr(6, 4) + '/' + message[i].DATA_LOAD_DATE.substr(3, 2) + '/01',
            "date": dateValue,
            "yrMoKey": message[i].YR_MO_KEY,
            "date_label": message[i].DESC_2,
            "percent": calcs.formatPercentage100(message[i].FC_TO_AP_PCT),
            "count": message[i].FAC_WORKNUM_CNT,
            "amount": calcs.calcValue(message[i].FC_TO_AP_LKG)

          });

        };
      } catch (e) {
        formatedJson = { msg: e.message };
      }

      cb(err, formatedJson);
  });
};

  T2gpleaktrendmthworknum.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2GPLeakTrendMthWorkNum', type: 'object'}
  });

};
