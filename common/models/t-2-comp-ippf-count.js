'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compippfcount) {

    T2compippfcount.processChild = function(req, filter, cb) {
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
              // "TARGET_COLOR"   : "#000000",
              // "TARGET_LABEL"   : "Target",
              // "TARGET_PCT"     : calcs.formatPercentage100(Number(message[0].TARGET_PCT)),
              "data": [
                  {
                    "label": "Total Active Work No.",
                    "color": "#00CFF4",
                    "busAttrData": []
                  },
                  {
                    "label": "IPPF Required",
                    "color": "#FC9D9A",
                    "busAttrData": []
                  },
                  {
                    "label": "Forecasted in IPPF",
                    "color": "#FFB400",
                    "busAttrData": []
                  },
                  {
                    "label": "Submitted FC Brand PM",
                    "color": "#34D084",
                    "busAttrData": []
                  },
                  {
                    "label": "Approved FC Brand PE",
                    "color": "#FF3CA0",
                    "busAttrData": []
                  }]
              };

              message.forEach(function (element) {

                  var act = {
                    "name": "",
                    "abbr": "-",
                    "count": "",
                    "value": ""
                  };

                  var req = {
                    "name": "",
                    "abbr": "-",
                    "count": "",
                    "percent": ""
                  };

                  var fcst = {
                    "name": "",
                    "abbr": "-",
                    "count": "",
                    "percent": ""
                  };

                  var pm = {
                    "name": "",
                    "abbr": "-",
                    "count": "",
                    "percent": ""
                  };

                  var pe = {
                    "name": "",
                    "abbr": "-",
                    "count": "",
                    "percent": ""
                  };

                  act.name = element.BUS_ATTR;
                  act.abbr = element.BUS_ATTR;
                  act.count = element.ACTIVE_COUNT;
                  //act.value = element.ACTIVE_VALUE;
                  act.value = calcs.calcValue(element.ACTIVE_VALUE);
                  //calcs.calcValue(element.TCV),
                  //act.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.ACT_PERC)));

                  req.name = element.BUS_ATTR;
                  req.abbr = element.BUS_ATTR;
                  req.count = element.REQ_COUNT;
                  //req.value = element.REQ_VALUE;
                  req.value = calcs.calcValue(element.REQ_VALUE);
                  req.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.REQ_PERC)));

                  fcst.name = element.BUS_ATTR;
                  fcst.abbr = element.BUS_ATTR;
                  fcst.count = element.FCST_COUNT;
                  //fcst.value = element.FCST_VALUE;
                  fcst.value = calcs.calcValue(element.FRSCT_VALUE);
                  fcst.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.FCST_PERC)));

                  pm.name = element.BUS_ATTR;
                  pm.abbr = element.BUS_ATTR;
                  pm.count = element.PM_COUNT;
                  //pm.value = element.PM_VALUE;
                  pm.value = calcs.calcValue(element.PM_VALUE);
                  pm.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PM_PERC)));

                  pe.name = element.BUS_ATTR;
                  pe.abbr = element.BUS_ATTR;
                  pe.count = element.PE_COUNT;
                  //pe.value = element.PE_VALUE;
                  pe.value = calcs.calcValue(element.PE_VALUE);
                  pe.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PE_PERC)));

                  jsonData.data[0].busAttrData.push(act);
                  jsonData.data[1].busAttrData.push(req);
                  jsonData.data[2].busAttrData.push(fcst);
                  jsonData.data[3].busAttrData.push(pm);
                  jsonData.data[4].busAttrData.push(pe);
              }, this);
            } catch(e) {
              jsonData = {msg: e.message};
            }

            cb(err, jsonData);
        });
    };

    T2compippfcount.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompIPPFCount', type: 'object'}
    });

  };
