'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compcostrendcomp) {
  T2compcostrendcomp.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

        var dataMessage = '';
        var target_value = '';
        var formatedJson = {
                "DATA_MESSAGE": dataMessage,
                "SELECTED_LABEL": " ",
                "TOTAL_COMPLIANCE_LABEL": "Total Compliance",
                "TOTAL_COMPLIANCE_COLOR": "#9F68AC",
                "CoSw12_COMPLIANCE_LABEL": "Completed CoS within 12 months",
                "CoSw12_COMPLIANCE_COLOR": "#3D70B2",
                "CoSg12_COMPLIANCE_LABEL": "Completed CoS greater than 12 months",
                "CoSg12_COMPLIANCE_COLOR": "#7CC7FF",
				        "TARGET_PCT": target_value,
                "TOTAL_COMPLIANCE": [],
                "CoSw12_COMPLIANCE": [],
                "CoSg12_COMPLIANCE": []
        }

        if (!message.length <= 0) {
          formatedJson.TARGET_PCT = calcs.formatPercentage100(Number(message[0].TARGET));;
          formatedJson.SELECTED_LABEL = req.query['label'];

          for (var i = 0; i < message.length; i++) {
            formatedJson.TOTAL_COMPLIANCE.push({
                "label": "Total Compliance",
                "color": "#9F68AC",
                "value": "TOTAL_COMPLIANCE",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].TOTAL_CMPLNT,
                "pct": calcs.formatPercentage100(message[i].TOTAL_COMPLIANCE_PERC,1)
              });
            formatedJson.CoSw12_COMPLIANCE.push({
                "label": "Completed CoS within 12 months",
                "color": "#3D70B2",
                "value": "CoSw12_COMPLIANCE",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].CMPL_IN_12_MTH,
                "pct": calcs.formatPercentage100(message[i].COS_IN_12_PERC,1)
              });
            formatedJson.CoSg12_COMPLIANCE.push({
                "label": "Completed CoS greater than 12 months",
                "color": "#7CC7FF",
                "value": "CoSg12_COMPLIANCE",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].CMPL_GREATER_12_MTH,
                "pct": calcs.formatPercentage100(message[i].COS_GREATER_THAN_12_PERC,1)
              });

          }
        } else {
          formatedJson.DATA_MESSAGE = "No Data Available";
        } 


      cb(err, formatedJson);
  });
};

T2compcostrendcomp.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompCOSTrendComp', type: 'object'}
  });

};
