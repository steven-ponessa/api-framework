'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2businessleakageexpansionworknum) {
  T2businessleakageexpansionworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
      }

        try {
            var jsonData = {
              "data": [
              {
                "label": "ItD to PC",
                "value": "ITD_TO_PC",
                "color": "#00CFF4",
                "busAttrData": []
              },
              {
                "label": "YtD to PC",
                "value": "YTD_TO_PC",
                "color": "#A2D603",
                "busAttrData": []
              },
              {
                "label": "FC EaC to PC",
                "value": "FC_EAC_TO_PC",
                "color": "#FFDD3E",
                "busAttrData": []
              },
              {
                "label": "CQ to PC",
                "value": "CQ_TO_PC",
                "color": "#FC9D9A",
                "busAttrData": []
              }]
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
                  "countStatus": "",
                  "amount": "",
                  "amountStatus": "",
                  "percent": "",
                  "percentStatus": "",
                  "prevQtr": {
                    "count": "",
                    "amount": "",
                    "percent": ""
                  }
                };

                itd.name = element.BUS_ATTR;
                itd.count = element.ITD_WORKNUM_CNT;
                itd.amount = calcs.calcValue(Number(element.ITD_TO_PC_LKG));
                itd.percent = calcs.calcPercent(Number(element.ITD_TO_PC_LKG), Number(element.ITD_ACT_REV));

                ytd.name = element.BUS_ATTR;
                ytd.count = element.YTD_WORKNUM_CNT;
                ytd.amount = calcs.calcValue(Number(element.YTD_TO_PC_LKG));
                ytd.percent = calcs.calcPercent(Number(element.YTD_TO_PC_LKG), Number(element.YTD_ACT_REV));

                fc.name = element.BUS_ATTR;
                fc.count = element.FC_WORKNUM_CNT;
                fc.amount = calcs.calcValue(Number(element.FC_TO_PC_LKG));
                fc.percent = calcs.calcPercent(Number(element.FC_TO_PC_LKG), Number(element.PC_PLN_REV));
                
                cq.name = element.BUS_ATTR;
                cq.count = element.CQ_WORKNUM_CNT;
                cq.amount = calcs.calcValue(Number(element.CQ_TO_PC_LKG));
                cq.percent = calcs.calcPercent(Number(element.CQ_TO_PC_LKG), Number(element.CQ_ACT_REV));

                cq.countStatus = calcs.getStatus2(Number(element.PQ_CNTRCT_CNT), Number(element.CQ_CNTRCT_CNT));
                cq.amountStatus = calcs.getStatus2(Number(element.CQ_TO_PC_LKG), Number(element.PQ_TO_PC_LKG));
                cq.percentStatus = calcs.getStatusPct(Number(element.CQ_TO_PC_LKG), Number(element.CQ_REV), Number(element.PQ_TO_PC_LKG), Number(element.PQ_ACT_REV_AC));

                cq.prevQtr.count = element.PQ_WORKNUM_CNT;
                cq.prevQtr.amount = calcs.calcValue(Number(element.PQ_TO_PC_LKG));
                cq.prevQtr.percent = calcs.calcPercent(Number(element.PQ_TO_PC_LKG), Number(element.PQ_ACT_REV_AC));

                jsonData.data[0].busAttrData.push(itd);
                jsonData.data[1].busAttrData.push(ytd);
                jsonData.data[2].busAttrData.push(fc);
                jsonData.data[3].busAttrData.push(cq);

            }, this);
          } catch(e) {
            jsonData = {msg: e.message};
          }

          cb(err, jsonData);
      });
  };

  T2businessleakageexpansionworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2BusinessLeakageExpansionWorkNum', type: 'object'}
  });
};
