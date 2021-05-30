'use strict';

    var calcs = require("./utils/tieredLeakageCalcs");

    module.exports = function(T2expcount) {

        T2expcount.processChild = function(req, filter, cb) {
          this.process(req, filter, function(err, message) {
            if (err) {
              return cb(err, null);
          }
            try {
                var jsonData = {
                  "data": [
                  {
                    "label": "ItD to PC",
                    "value":"ITD_TO_PC",
                    "color": "#00CFF4",
                    "busAttrData": []
                  },
                  {
                    "label": "YtD to PC",
                    "value":"YTD_TO_PC",
                    "color": "#A2D603",
                    "busAttrData": []
                  },
                  {
                    "label": "FC EaC to PC",
                    "value":"FC_EAC_TO_PC",
                    "color": "#FFDD3E",
                    "busAttrData": []
                  },
                  {
                    "label": "CQ to PC",
                    "value":"CQ_TO_PC",
                    "color": "#FC9D9A",
                    "busAttrData": []
                  },
                  {
                    "label": "AP to PC",
                    "value":"AP_TO_PC",
                    "color": "#34D084",
                    "busAttrData": []
                  },
                  {
                    "label": "FC EaC to AP",
                    "value":"FC_EAC_AP",
                    "color": "#C6D0DC",
                    "busAttrData": []
                  },
                  {
                    "label": "3 Mo. Cost Overrun",
                    "value":"COST_OVER",
                    "color": "#CFA6FC",
                    "busAttrData": []
                  },
                  {
                    "label": "CQ to AP",
                    "value":"CQ_TO_AP",
                    "color": "#97CFF6",
                    "busAttrData": []
                  }
                  /*,
                  {
                    "label": "FC EaC to AP",
                    "value":"FC_EAC_TO_AP",
                    "color": "#FFB400",
                    "busAttrData": []
                  }*/
                ]
                };

                message.forEach(function (element) {
                    var itd = {
                      "name": "",
                      "count": "",
                      "amount": "",
                      "percent": ""
                    };

                    var ytd = {
                      "name": "",
                      "count": "",
                      "amount": "",
                      "percent": ""
                    };

                    var fc = {
                      "name": "",
                      "count": "",
                      "amount": "",
                      "percent": ""
                    };

                    var cq = {
                      "name": "",
                      "count": "",
                      "amount": "",
                      "percent": ""
                    };

                    var ap = {
                        "name": "",
                        "count": "",
                        "amount": "",
                        "percent": ""
                    };

                    var eac = {
                        "name": "",
                        "count": "",
                        "amount": "",
                        "percent": ""
                    };

                    var mo = {
                        "name": "",
                        "count": "",
                        "amount": "",
                        "percent": ""
                    };

                    var cqap = {
                        "name": "",
                        "count": "",
                        "amount": "",
                        "percent": ""
                    };

                    itd.name = element.BUS_ATTR;
                    itd.count = element.ITD_CNTRCT_CNT;
                    itd.amount = calcs.calcValue(Number(element.ITD_TO_PC_LKG));
                    itd.percent = calcs.formatPercentage100(Number(element.ITD_TO_PC_LKG_PCT));

                    ytd.name = element.BUS_ATTR;
                    ytd.count = element.YTD_CNTRCT_CNT;
                    ytd.amount = calcs.calcValue(Number(element.YTD_TO_PC_LKG));
                    ytd.percent = calcs.formatPercentage100(Number(element.YTD_TO_PC_LKG_PCT));

                    fc.name = element.BUS_ATTR;
                    fc.count = element.FC_CNTRCT_CNT;
                    fc.amount = calcs.calcValue(Number(element.FC_TO_PC_LKG));
                    fc.percent = calcs.formatPercentage100(Number(element.FC_TO_PC_LKG_PCT));

                    cq.name = element.BUS_ATTR;
                    cq.count = element.CQ_CNTRCT_CNT;
                    cq.amount = calcs.calcValue(Number(element.CQ_TO_PC_LKG));
                    cq.percent = calcs.formatPercentage100(Number(element.CQ_TO_PC_LKG_PCT));

                    ap.name = element.BUS_ATTR;
                    ap.count = element.AP_PC_CNTRCT_CNT;
                    ap.amount = calcs.calcValue(Number(element.AP_TO_PC_LKG));
                    ap.percent = calcs.formatPercentage100(Number(element.AP_TO_PC_LKG_PCT));

                    eac.name = element.BUS_ATTR;
                    eac.count = element.FC_AP_CNTRCT_CNT;
                    eac.amount = calcs.calcValue(Number(element.FC_TO_AP_LKG));
                    eac.percent = calcs.formatPercentage100(Number(element.FC_TO_AP_LKG_PCT));

                    mo.name = element.BUS_ATTR;
                    mo.count = element.CO_3MO_CNTRCT_CNT;
                    mo.amount = calcs.calcValue(Number(element.COST_OVERRUN));
                    mo.percent = calcs.formatPercentage100(Number(element.COST_OVERRUN_PCT));

                    cqap.name = element.BUS_ATTR;
                    cqap.count = element.CQ_AP_CNTRCT_CNT;
                    cqap.amount = calcs.calcValue(Number(element.CQ_TO_AP));
                    cqap.percent = calcs.formatPercentage100(element.CQ_TO_AP_PCT);

                    jsonData.data[0].busAttrData.push(itd);
                    jsonData.data[1].busAttrData.push(ytd);
                    jsonData.data[2].busAttrData.push(fc);
                    jsonData.data[3].busAttrData.push(cq);

                    jsonData.data[4].busAttrData.push(ap);
                    jsonData.data[5].busAttrData.push(eac);
                    jsonData.data[6].busAttrData.push(mo);
                    jsonData.data[7].busAttrData.push(cqap);

                }, this);
              } catch(e) {
                jsonData = {msg: e.message};
              }

              cb(err, jsonData);
          });
      };

      T2expcount.remoteMethod('processChild', {
          http: {path: '/', verb: 'get', status: 200},
          accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                      {arg: 'filter', type: 'object'}],
          returns: {arg: 't2ExpCount', type: 'object'}
      });

    };
