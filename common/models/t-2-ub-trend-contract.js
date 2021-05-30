'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2ubtrendcontract) {
  T2ubtrendcontract.processChild = function(req, filter, cb) {
    this.process(req, filter, function(err, message){
      if (err) {
        return cb(err, null);
    }
      var formatedJson = {
              "A30_LABEL": "1-30",
              "A30_COLOR": "#AF6EE8",
              "A60_LABEL": "31-60",
              "A60_COLOR": "#00CFF4",
              "A90_LABEL": "61-90",
              "A90_COLOR": "#A2D603",
              "A120_LABEL": "91-120",
              "A120_COLOR": "#FF5003",
              "A150_LABEL": "121-150",
              "A150_COLOR": "#73942C",
              "A180_LABEL": "151-180",
              "A180_COLOR": "#FFB400",
              "A210_LABEL": "181-210",
              "A210_COLOR": "#FFDD3E",
              "A240_LABEL": "211-240",
              "A240_COLOR": "#FC9D9A",
              "A270_LABEL": "241-270",
              "A270_COLOR": "#E71D32",
              "A360_LABEL": "271-360",
              "A360_COLOR": "#34D084",
              "A361_LABEL": ">360",
              "A361_COLOR": "#DB2780",
              "TOTAL_LABEL": "Total",
              "TOTAL_COLOR": "#1D364D",
              "a30": [],
              "a60": [],
              "a90": [],
              "a120": [],
              "a150": [],
              "a180": [],
              "a210": [],
              "a240": [],
              "a270": [],
              "a360": [],
              "a361": [],
              "Total": []
      }

      try {
        if(message.length > 0) { //Avoid processing a empty result set

          for (var i = 0; i < message.length; i++) {
            formatedJson.a30.push({
                "label": "1-30",
                "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
                "count": message[i].A30_CNT,
                "amount": calcs.calcValue(message[i].A30),
                "pct": calcs.formatPercentage100(Number(message[i].A30_PCT))
              });
            formatedJson.a60.push({
              "label": "31-60",
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "count": message[i].A60_CNT,
              "amount": calcs.calcValue(message[i].A60),
              "pct": calcs.formatPercentage100(Number(message[i].A60_PCT))
            });
            formatedJson.a90.push({
              "label": "61-90",
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "count": message[i].A90_CNT,
              "amount": calcs.calcValue(message[i].A90),
              "pct": calcs.formatPercentage100(Number(message[i].A90_PCT))
            });
            formatedJson.a120.push({
              "label": "91-120",
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "count": message[i].A120_CNT,
              "amount": calcs.calcValue(message[i].A120),
              "pct": calcs.formatPercentage100(Number(message[i].A120_PCT))
            });
            formatedJson.a150.push({
              "label": "121-150",
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "count": message[i].A150_CNT,
              "amount": calcs.calcValue(message[i].A150),
              "pct": calcs.formatPercentage100(Number(message[i].A150_PCT))
            });
            formatedJson.a180.push({
              "label": "151-180",
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "count": message[i].A180_CNT,
              "amount": calcs.calcValue(message[i].A180),
              "pct": calcs.formatPercentage100(Number(message[i].A180_PCT))
            });
            formatedJson.a210.push({
              "label": "181-210",
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "count": message[i].A210_CNT,
              "amount": calcs.calcValue(message[i].A210),
              "pct": calcs.formatPercentage100(Number(message[i].A210_PCT))
            });
            formatedJson.a240.push({
              "label": "211-240",
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "count": message[i].A240_CNT,
              "amount": calcs.calcValue(message[i].A240),
              "pct": calcs.formatPercentage100(Number(message[i].A240_PCT))
            });
            formatedJson.a270.push({
              "label": "241-270",
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "count": message[i].A270_CNT,
              "amount": calcs.calcValue(message[i].A270),
              "pct": calcs.formatPercentage100(Number(message[i].A270_PCT))
            });
            formatedJson.a360.push({
              "label": "271-360",
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "count": message[i].A360_CNT,
              "amount": calcs.calcValue(message[i].A360),
              "pct": calcs.formatPercentage100(Number(message[i].A360_PCT))
            });
            formatedJson.a361.push({
              "label": ">360",
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "count": message[i].A361_CNT,
              "amount": calcs.calcValue(message[i].A361),
              "pct": calcs.formatPercentage100(Number(message[i].A361_PCT))
            });
            formatedJson.Total.push({
              "label": "Total",
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "count": message[i].UBTOTAL_CNT,
              "amount": calcs.calcValue(message[i].UBTOTAL),
              "pct": calcs.formatPercentage100(Number(message[i].UBTOTAL_PCT))
            });
          }
        }
      } catch(e) {
        formatedJson = {"msg": e.message};
      }

      cb(err, formatedJson);
  });
};

T2ubtrendcontract.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2UBTrendContract', type: 'object'}
  });
};
