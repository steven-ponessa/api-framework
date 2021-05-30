'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2comppgtrend) {
    T2comppgtrend.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
        var dataMessage = '';
        var formatedJson = {
                "DATA_MESSAGE": dataMessage,
                "SELECTED_LABEL": " ",
                "PG0_COMPLIANCE_LABEL": "PG0 Compliance",
                "PG0_COMPLIANCE_COLOR": "#AF6EE8",
                "PG1_4_COMPLIANCE_LABEL": "PG1-4 Compliance",
                "PG1_4_COMPLIANCE_COLOR": "#00CFF4",
                "RO_WITH_ACTION_LABEL": "R/O with actions created",
                "RO_WITH_ACTION_COLOR": "#FF71D4",
                "RO_NO_OVERDUE_LABEL": "R/O with no overdue actions",
                "RO_NO_OVERDUE_COLOR": "#4178BE",
                "PG0_COMPLIANCE": [],
                "PG1_4_COMPLIANCE": [],
                "RO_WITH_ACTION": [],
                "RO_NO_OVERDUE": []
        }

        if (!message.length <= 0){

          formatedJson.SELECTED_LABEL = req.query['label'];

        var precentDecimal = 1;

          for (var i = 0; i < message.length; i++) {
            formatedJson.PG0_COMPLIANCE.push({
                "label": "PG0 Compliance",
                "value": "PG0_COMPLIANCE",
                "color": "#AF6EE8",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].PGOCOMPLIANCE,
                //"total_count": message[i].PG_O_TOTAL,
                "pct": calcs.formatPercentage100(message[i].PGOCOMPLIANCE_PCT,1)
              });
            formatedJson.PG1_4_COMPLIANCE.push({
                "label": "PG1-4 Compliance",
                "value": "PG1_4_COMPLIANCE",
                "color": "#00CFF4",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].PG_1_4_CMPLNCE,
                //"total_count": message[i].PG_1_4_TOTAL,
                "pct": calcs.formatPercentage100(message[i].PG_1_4_CMPLNCE_PCT,1)
              });
            formatedJson.RO_WITH_ACTION.push({
                "label": "R/O with actions created",
                "value": "RO_WITH_ACTION",
                "color": "#FF71D4",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].PG_ROAT,
                //"total_count": message[i].PG_ROAT_TOTAL,
                "pct": calcs.formatPercentage100(message[i].PG_ROAT_PCT,1)
              });
            formatedJson.RO_NO_OVERDUE.push({
                "label": "R/O with no overdue actions",
                "value": "RO_NO_OVERDUE",
                "color": "#4178BE",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].PG_ROATO,
                //"total_count": message[i].PG_ROATO_TOTAL,
                "pct": calcs.formatPercentage100(message[i].PG_ROATO_PCT,1)
              });
          }
        } else {
          formatedJson.DATA_MESSAGE = "No Data Available";
        } //end if empty


      cb(err, formatedJson);
  });
};

T2comppgtrend.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompPGTrendComp', type: 'object'}
  });

};
