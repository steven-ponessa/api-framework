'use strict';
var util = require('util');
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

function getMtMColor(currQtrPct, prevQtrPct) {

  //Here I use the formatPercentage100() to ensure the comparison is doing exactly against the same numbers
  //showing for percentages in the UI. JS rounding seems to work slightly different form JS toFixed()
  //which is the method used to format the percentages, that's why the second was the choosen path
  var qtrPctDiff = Number(calcs.formatPercentage100(currQtrPct)) - Number(calcs.formatPercentage100(prevQtrPct))

  if (qtrPctDiff >= 0)
   return "#33AC2E";
  else
   return "#D63649";
}

module.exports = function(T1financialsummary) {

    T1financialsummary.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }

        var formatedJson = {};

        try {
          //console.log("message="+ util.inspect(message));
          if(message.length > 0) {

            var m = message[0];
            var date = message[0].DATA_LOAD_DATE;
            formatedJson.date = date;
            formatedJson.display_label = "$M";
            formatedJson.legend_label = "MtM";
            formatedJson.increase_label = "MtM Increase";
            formatedJson.increase_color = "#33AC2E";
            formatedJson.decrease_label = "MtM Decrease";
            formatedJson.decrease_color = "#D63649";
            formatedJson.flat_label = "Actuals";
            formatedJson.flat_color = "#0292FC";
            formatedJson.revenue_label = "Revenue";

            formatedJson.data = [
              {
              label: "Q" + m.PREV_QTR_NUM + " " + m.PREV_YR_NUM + " Actuals",
              //label: "Q3" + " " + m.PREV_YR_NUM + " Actuals",
                percent: calcs.formatPercentage100(m.PREV_Q_GP_PCT),
                value: (m.PREV_Q_GP),
                revenue: (m.PREV_Q_REV),
                color:"#0292FC"
              },
              {
              label:"Q" + m.CURR_QTR_NUM + " " + m.CURR_YR_NUM + " Actuals to Date",
              //label:"Q4" + " " + m.CURR_YR_NUM + " Actuals to Date",
                percent: calcs.formatPercentage100(m.CQ_TO_DATE_GP_PREC),
                value: (m.CQ_TO_DATE_GP),
                revenue: (m.CQ_TO_DATE_REV),
                color:"#0292FC"
              },
              {
              label:"Q" + m.CURR_QTR_NUM + " " + m.CURR_YR_NUM + " Actuals + Forecast",
              //label:"Q4" + " " + m.CURR_YR_NUM + " Actuals + Forecast",
                percent: calcs.formatPercentage100(m.CQ_PORT_GP_PREC),
                value: (m.CQ_PORT_GP),
                revenue: (m.CQ_PORT_REV),
                color: getMtMColor(m.CQ_PORT_GP_PREC, m.CQ_PORT_GP_PCT)
              },
              {
                //label:"YtD " + m.ACCT_YR + " Actuals",
                label:"YtD " + m.CURR_YR_NUM + " Actuals",            
                percent: calcs.formatPercentage100(m.YTD_PORT_GP_PREC),
                value: (m.YTD_PORT_GP),
                revenue: (m.YTD_PORT_REV),
                color:"#0292FC"
              },
               {label:"ItD",
                percent: calcs.formatPercentage100(m.ITD_PORT_GP_PREC),
           		  value: (m.ITD_PORT_GP),
           		  revenue: (m.ITD_PORT_REV),
           		  color:"#0292FC",
                forecast:{
                  label:"FC EaC",
                  percent: calcs.formatPercentage100(m.FORECAST_EAC_GP_PREC),
                  color: getMtMColor(m.FORECAST_EAC_GP_PREC, m.FORECAST_EAC_GP_PCT)
                },
                approved:{
                  label:"AP",
                  percent: calcs.formatPercentage100(m.APPROVED_PLAN_GP_PRE),
                  color: getMtMColor(m.APPROVED_PLAN_GP_PRE, m.APPROVED_PLAN_GP_PCT)
                },
                priceCase:{
                  label:"PC",
                  percent: calcs.formatPercentage100(m.PRICE_CASE_GP_PREC),
                  color: getMtMColor(m.PRICE_CASE_GP_PREC, m.PRICE_CASE_GP_PCT)
                }
              }
            ];
          }
        } catch(e) {
          formatedJson = {msg: e.message};
        }

        cb(err, formatedJson);

      });
    };

    T1financialsummary.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't1FinancialSummary', type: 'object'}
    });

};
