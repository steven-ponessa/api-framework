'use strict';

var dateUtils = require("./utils/dateUtils");

module.exports = function(T1planhealthview) {

      T1planhealthview.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message){
            if (err) {
              return cb(err, null);
          }

    try {
            var jsonData = {};
            var date = '';
            var prevMonth = '';
            var currMonth = '';

            if(message.length == 0) { 
              jsonData = {};
            } else {
              date = message[0].DATA_LOAD_DATE;
              if (!(null == message[0].LAST_MO_PREV_QTR)) {
                  prevMonth = (dateUtils.getMonthName(message[0].LAST_MO_PREV_QTR)).substr(0,3).toUpperCase();
              };
              if (!(null == message[0].CURR_MO)) {
                  currMonth = (dateUtils.getMonthName(message[0].CURR_MO)).substr(0,3).toUpperCase();
              };

            jsonData = {
              "date": date, 
              "metric_label": "Count",
              "pr_legend_label": "Prior to Q" + (message[0].PREV_QTR_NUM), 
              "pr_color": "#BCC8C8",
              "curr_legend_label": "Prior to Q" + message[0].QTR_NUM, 
              "curr_color": "#5A6464",
              "additions_label": "Additions",
              "additions_color": "#4A97F8",
              "data": [
                {
                  "label": "Price Case Exclusion",
                  "pr_time_label": prevMonth, 
                  "pr_time_value": message[0].PCE_LAST_MO_PREV_QTR_ADD_PRI_PREV_QTR, 
                  "pr_additions_value": message[0].PCE_LAST_MO_PREV_QTR_ADD, 
                  "curr_time_label": currMonth, 
                  "curr_time_value": message[0].PCE_CURR_QTR_ADD_PRI_CURR_QTR, 
                  "curr_additions_value": message[0].PCE_CURR_QTR_ADD 
                },
                {
                  "label": "Approved Plan Exclusion",
                  "pr_time_label": prevMonth, 
                  "pr_time_value": message[0].APE_LAST_MO_PREV_QTR_ADD_PRI_PREV_QTR, 
                  "pr_additions_value": message[0].APE_LAST_MO_PREV_QTR_ADD, 
                  "curr_time_label": currMonth, 
                  "curr_time_value": message[0].APE_CURR_QTR_ADD_PRI_CURR_QTR, 
                  "curr_additions_value": message[0].APE_CURR_QTR_ADD 
                },
                {
                  "label": "Forecast Exclusion",
                  "pr_time_label": prevMonth, 
                  "pr_time_value": message[0].FE_LAST_MO_PREV_QTR_ADD_PRI_PREV_QTR, 
                  "pr_additions_value": message[0].FE_LAST_MO_PREV_QTR_ADD, 
                  "curr_time_label": currMonth, 
                  "curr_time_value": message[0].FE_CURR_QTR_ADD_PRI_CURR_QTR, 
                  "curr_additions_value": message[0].FE_CURR_QTR_ADD 
                },
                {
                  "label": "Total Exclusion",
                  "pr_time_label": prevMonth, 
                  "pr_time_value": message[0].TOTAL_LAST_MO_PREV_QTR_ADD_PRI_PREV_QTR, 
                  "pr_additions_value": message[0].TOTAL_LAST_MO_PREV_QTR_ADD, 
                  "curr_time_label": currMonth, 
                  "curr_time_value": message[0].TOTAL_CURR_QTR_ADD_PRI_CURR_QTR, 
                  "curr_additions_value": message[0].TOTAL_CURR_QTR_ADD 
                }
              ]
            };
          }; // end if not empty
          } catch(e) {
            jsonData = {msg: e.message};
          }
            cb(err, jsonData);
          });
      };

      T1planhealthview.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't1PlanHealthView', type: 'object'}
      });

};
