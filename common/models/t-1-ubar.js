'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T1ubar) {

    T1ubar.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
            return cb(err, null);
        }

        var jsonData = {};

        if(message.length > 0) { //Avoid processing a empty result set
            jsonData = {
                "title": "UBAR",
                //"title": "UBAR / AR",            
                "date": "DD MMM YYYY",
                "ubar_label": "UBAR",
                "ubar_color": "#00B4A0",
                //"ar_label": "AR",
                //"ar_color": "#FF7832",
                "total_ubar_label": "Total UBAR",
                //"total_ar_label": "Total AR",

                "total_ubar_value": "0.00",
                //"total_ar_value": "0.00",

                "data": [
                    {
                        "range": "1-30",
                        "ubar": "0.00"
                        //"ar": "0.00"
                    },
                    {
                        "range": "31-60",
                        "ubar": "0.00"
                        //"ar": "0.00"
                    },
                    {
                        "range": "61-90",
                        "ubar": "0.00"
                        //"ar": "0.00"
                    },
                    {
                        "range": "91-120",
                        "ubar": "0.00"
                        //"ar": "0.00"
                    },
                    {
                        "range": "121-180",
                        "ubar": "0.00"
                        //"ar": "0.00"
                    },
                    {
                        "range": "181-270",
                        "ubar": "0.00"
                        //"ar": "0.00"
                    },
                    {
                        "range": "271-360",
                        "ubar": "0.00"
                        //"ar": "0.00"
                    },
                    {
                        "range": ">=361",
                        "ubar": "0.00"
                        //"ar": "0.00"
                    }
                ]
                };
                jsonData.total_ubar_value = (Number(message[0].TOTAL));
                jsonData.date = message[0].LOAD_DATE;
                jsonData.data[0].ubar = (Number(message[0].A30));
                //jsonData.data[0].ar = calcs.formatAmount(Number(message[0].A30AR));
                jsonData.data[1].ubar = (Number(message[0].A60));
                //jsonData.data[1].ar = calcs.formatAmount(Number(message[0].A60AR));
                jsonData.data[2].ubar = (Number(message[0].A90));
                //jsonData.data[2].ar = calcs.formatAmount(Number(message[0].A90AR));
                jsonData.data[3].ubar = (Number(message[0].A120));
                //jsonData.data[3].ar = calcs.formatAmount(Number(message[0].A120AR));
                jsonData.data[4].ubar = (Number(message[0].A180));
                //jsonData.data[4].ar = calcs.formatAmount(Number(message[0].A180AR));
                jsonData.data[5].ubar = (Number(message[0].A270));
                //jsonData.data[5].ar = calcs.formatAmount(Number(message[0].A270AR));
                jsonData.data[6].ubar = (Number(message[0].A360));
                //jsonData.data[6].ar = calcs.formatAmount(Number(message[0].A360AR));
                jsonData.data[7].ubar = (Number(message[0].A361));
                //jsonData.data[7].ar = calcs.formatAmount(Number(message[0].A361AR));

            };
          cb(err, jsonData);
      });
  };

  T1ubar.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't1UBAR', type: 'object'}
  });

};
