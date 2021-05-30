'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2ubcountclient) {

    T2ubcountclient.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
      }
        var jsonData = {
          "UBAR_DATE":"",
          "data": [
          {
            "label": "1-30",
            "value": "BUCK_01",
            "color": "#AF6EE8",
            "busAttrData": []
          },
          {
            "label": "31-60",
            "value": "BUCK_02",
            "color": "#00CFF4",
            "busAttrData": []
          },
          {
            "label": "61-90",
            "value": "BUCK_03",
            "color": "#A2D603",
            "busAttrData": []
          },
          {
            "label": "91-120",
            "value": "BUCK_04",
            "color": "#FF5003",
            "busAttrData": []
          },
          {
            "label": "121-150",
            "value": "BUCK_05",
            "color": "#73942C",
            "busAttrData": []
          },
          {
            "label": "151-180",
            "value": "BUCK_06",
            "color": "#FFB400",
            "busAttrData": []
          },
          {
            "label": "181-210",
            "value": "BUCK_07",
            "color": "#FFDD3E",
            "busAttrData": []
          },
          {
            "label": "211-240",
            "value": "BUCK_08",
            "color": "#FC9D9A",
            "busAttrData": []
          },
          {
            "label": "241-270",
            "value": "BUCK_09",
            "color": "#E71D32",
            "busAttrData": []
          },
          {
            "label": "271-360",
            "value": "BUCK_10_11_12",
            "color": "#34D084",
            "busAttrData": []
          },
          {
            "label": ">360",
            "value": "BUCK_13",
            "color": "#DB2780",
            "busAttrData": []
          },
          {
            "label": "Total",
            "value": "UBAR_TOT",
            "color": "#1D364D",
            "busAttrData": []
          }]
        };

        try {
          if (message.length > 0 ) {
              jsonData.UBAR_DATE = message[0].DATA_LOAD_DESC,
          message.forEach(function (element) {
              jsonData.data[0].busAttrData.push({
                "name": element.BUSATTR,
                "count": element.A30_CNT,
                "amount": calcs.calcValue(Number(element.A30)),
                "percent": calcs.formatPercentage100(Number(element.A30_PCT))
              });

              jsonData.data[1].busAttrData.push({
                "name": element.BUSATTR,
                "count": element.A60_CNT,
                "amount": calcs.calcValue(Number(element.A60)),
                "percent": calcs.formatPercentage100(Number(element.A60_PCT))
              });

              jsonData.data[2].busAttrData.push({
                "name": element.BUSATTR,
                "count": element.A90_CNT,
                "amount": calcs.calcValue(Number(element.A90)),
                "percent": calcs.formatPercentage100(Number(element.A90_PCT))
              });

              jsonData.data[3].busAttrData.push({
                "name": element.BUSATTR,
                "count": element.A120_CNT,
                "amount": calcs.calcValue(Number(element.A120)),
                "percent": calcs.formatPercentage100(Number(element.A120_PCT))
              });

              jsonData.data[4].busAttrData.push({
                "name": element.BUSATTR,
                "count": element.A150_CNT,
                "amount": calcs.calcValue(Number(element.A150)),
                "percent": calcs.formatPercentage100(Number(element.A150_PCT))
              });              

              jsonData.data[5].busAttrData.push({
                "name": element.BUSATTR,
                "count": element.A180_CNT,
                "amount": calcs.calcValue(Number(element.A180)),
                "percent": calcs.formatPercentage100(Number(element.A180_PCT))
              });

              jsonData.data[6].busAttrData.push({
                "name": element.BUSATTR,
                "count": element.A210_CNT,
                "amount": calcs.calcValue(Number(element.A210)),
                "percent": calcs.formatPercentage100(Number(element.A210_PCT))
              });

              jsonData.data[7].busAttrData.push({
                "name": element.BUSATTR,
                "count": element.A240_CNT,
                "amount": calcs.calcValue(Number(element.A240)),
                "percent": calcs.formatPercentage100(Number(element.A240_PCT))
              });

              jsonData.data[8].busAttrData.push({
                "name": element.BUSATTR,
                "count": element.A270_CNT,
                "amount": calcs.calcValue(Number(element.A270)),
                "percent": calcs.formatPercentage100(Number(element.A270_PCT))
              });

              jsonData.data[9].busAttrData.push({
                "name": element.BUSATTR,
                "count": element.A360_CNT,
                "amount": calcs.calcValue(Number(element.A360)),
                "percent": calcs.formatPercentage100(Number(element.A360_PCT))
              });

              jsonData.data[10].busAttrData.push({
                "name": element.BUSATTR,
                "count": element.A361_CNT,
                "amount": calcs.calcValue(Number(element.A361)),
                "percent": calcs.formatPercentage100(Number(element.A361_PCT))
              });

              jsonData.data[11].busAttrData.push( {
                "name": element.BUSATTR,
                "count": element.UBTOTAL_CNT,
                "amount": calcs.calcValue(Number(element.UBTOTAL)),
                "percent": calcs.formatPercentage100(Number(element.UBTOTAL_PCT))
              });

          }, this);
          } // end if message exists
        } catch(e) {
          jsonData = {"msg": e.message};
        }

        cb(err, jsonData);
      });
  };

  T2ubcountclient.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2UBCountClient', type: 'object'}
  });

};
