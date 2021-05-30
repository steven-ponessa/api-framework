'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compippftrend) {
  T2compippftrend.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

        var dataMessage = '';
        var formatedJson = {
                "DATA_MESSAGE": dataMessage,
                "SELECTED_LABEL": " ",
                "ACTIVE_PORTFOLIO_LABEL": "Total Active Work No.",
                "ACTIVE_PORTFOLIO_COLOR": "#00CFF4",
                "IPPF_REQ_LABEL": "IPPF Required",
                "IPPF_REQ_COLOR": "#FC9D9A",
                "FORECASTED_IPPF_LABEL": "Forecasted in IPPF",
                "FORECASTED_IPPF_COLOR": "#FFB400",
                "SUBMITTED_FC_BRAND_PM_LABEL": "Submitted FC Brand PM",
                "SUBMITTED_FC_BRAND_PM_COLOR": "#34D084",
				        "APPROVED_FC_BRAND_PE_LABEL": "Approved FC Brand PE",
                "APPROVED_FC_BRAND_PE_COLOR": "#FF3CA0",
                "ACTIVE_PORTFOLIO": [],
                "IPPF_REQ": [],
                "FORECASTED_IPPF": [],
                "SUBMITTED_FC_BRAND_PM": [],
				        "APPROVED_FC_BRAND_PE": []
        }

        if (!message.length <= 0){

          formatedJson.SELECTED_LABEL = req.query['label'];

        var precentDecimal = 1;

          for (var i = 0; i < message.length; i++) {
            formatedJson.ACTIVE_PORTFOLIO.push({
                "label": "Total Active Work No.",
                "value": "ACTIVE_PORTFOLIO",
                "color": "#00CFF4",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].ACTIVE_COUNT,
                "currency_value": calcs.calcValue(message[i].ACTIVE_VALUE)

              });
            formatedJson.IPPF_REQ.push({
                "label": "IPPF Required",
                "value": "IPPF_REQ",
                "color": "#FC9D9A",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].REQ_COUNT,
                "currency_value": calcs.calcValue(message[i].REQ_VALUE),
                "pct": calcs.formatPercentage100(message[i].REQ_PERC,1)
              });
            formatedJson.FORECASTED_IPPF.push({
                "label": "Forecasted in IPPF",
                "value": "FORECASTED_IPPF",
                "color": "#FFB400",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].FCST_COUNT,
				        "currency_value": calcs.calcValue(message[i].FCST_VALUE),
                "pct": calcs.formatPercentage100(message[i].FCST_PERC,1)
              });
            formatedJson.SUBMITTED_FC_BRAND_PM.push({
                "label": "Submitted FC Brand PM",
                "value": "SUBMITTED_FC_BRAND_PM",
                "color": "#34D084",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].PM_COUNT,
				        "currency_value": calcs.calcValue(message[i].PM_VALUE),
                "pct": calcs.formatPercentage100(message[i].PM_PERC,1)
              });
			  
			formatedJson.APPROVED_FC_BRAND_PE.push({
                "label": "Approved FC Brand PE",
                "value": "APPROVED_FC_BRAND_PE",
                "color": "#FF3CA0",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].PE_COUNT,
				        "currency_value": calcs.calcValue(message[i].PE_VALUE),
                "pct": calcs.formatPercentage100(message[i].PE_PERC,1)
              });
          }
        } else {
          formatedJson.DATA_MESSAGE = "No Data Available";
        } //end if empty


      cb(err, formatedJson);
  });
};

  T2compippftrend.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompIPPFTrend', type: 'object'}
  });

};
