'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2comppgcountcomp) {

    T2comppgcountcomp.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }

          try {

            var jsonData = {
              "SELECTED_LABEL" :"",
              "DATA_LOAD_DATE" :message[0].DATA_LOAD_DESC,
              "TOTAL_BAR_COLOR": "#D0DADA",
              "SELECTED_COLOR" : "#F4F6FB",
              "TARGET_COLOR"   : "#000000",
              "TARGET_LABEL"   : "Target",
              "TARGET_PCT"     : calcs.formatPercentage100(Number(message[0].TARGET_PCT)),
              "data": [
                  {
                    "label": "PG0 Compliance",
                    "color": "#AF6EE8",
                    "busAttrData": []
                  },
                  {
                    "label": "PG1-4 Compliance",
                    "color": "#00CFF4",
                    "busAttrData": []
                  },
                  {
                    "label": "R/O with actions created",
                    "color": "#FF71D4",
                    "busAttrData": []
                  },
                  {
                    "label": "R/O with no overdue actions",
                    "color": "#4178BE",
                    "busAttrData": []
                  }]
              };

              message.forEach(function (element) {

                  //jsonData.date = message[0].DATA_LOAD_DESC;

                  var pg0c = {
                    "name": "",
                    "abbr": "-",
                    "count": "",
                    "target_pct": "",
                    "percent": ""
                  };

                  var pg1c = {
                    "name": "",
                    "abbr": "-",
                    "count": "",
                    "target_pct": "",
                    "percent": ""
                  };

                  var roa = {
                    "name": "",
                    "abbr": "-",
                    "count": "",
                    "target_pct": "",
                    "percent": ""
                  };

                  var ronoa = {
                    "name": "",
                    "abbr": "-",
                    "count": "",
                    "target_pct": "",
                    "percent": ""
                  };

                  pg0c.name = element.BUS_ATTR;
                  pg0c.abbr = element.BUS_ATTR;
                  pg0c.count = element.TOTAL_PG_O_CMPL_COUNT;
                  pg0c.target_pct = calcs.formatPercentage100(Number(element.TARGET_PCT));
                  //pg0c.total_count = element.TOTAL_COUNT;
                  pg0c.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_O_COMPL_PERC)));

                  pg1c.name = element.BUS_ATTR;
                  pg1c.abbr = element.BUS_ATTR;
                  pg1c.count = element.TOTAL_PG_1_4_CMPL_COUNT;
                  pg1c.target_pct = calcs.formatPercentage100(Number(element.TARGET_PCT));
                  //pg1c.total_count = element.TOTAL_COUNT;
                  pg1c.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_1_4_COMPL_PERC)));

                  roa.name = element.BUS_ATTR;
                  roa.abbr = element.BUS_ATTR;
                  roa.count = element.PG_RO_AT_CNT;
                  roa.target_pct = calcs.formatPercentage100(Number(element.TARGET_PCT));
                  //roa.total_count = element.TOTAL_COUNT;
                  roa.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_RO_AT_PERC)));

                  ronoa.name = element.BUS_ATTR;
                  ronoa.abbr = element.BUS_ATTR;
                  ronoa.count = element.PG_RO_ATO_CNT;
                  ronoa.target_pct = calcs.formatPercentage100(Number(element.TARGET_PCT));
                  //ronoa.total_count = element.TOTAL_COUNT;
                  ronoa.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PG_RO_ATO_PERC)));

                  jsonData.data[0].busAttrData.push(pg0c);
                  jsonData.data[1].busAttrData.push(pg1c);
                  jsonData.data[2].busAttrData.push(roa);
                  jsonData.data[3].busAttrData.push(ronoa);
              }, this);
            } catch(e) {
              jsonData = {msg: e.message};
            }

            cb(err, jsonData);
        });
    };

    T2comppgcountcomp.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompPGCountComp', type: 'object'}
    });

  };
