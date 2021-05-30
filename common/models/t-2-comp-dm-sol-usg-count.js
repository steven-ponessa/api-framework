'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdmsolusgcount) {

  T2compdmsolusgcount.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
          }

          try {

            //var target_value = '';
            var dateValue = '';
            var dataMessage = '';
            var metColor = '';
            var metLabel = '';

            if (!message.length <= 0) {
              //target_value = calcs.formatPercentage100(Number(message[0].TARGET_PCT));
              dateValue =  message[0].DATA_LOAD_DESC;

              switch (req.query['metric']) { 
                case "COM":
                  metColor = "#26D181";
                  metLabel = "Solutioning: Compliant";
                break;
                case "NCOM":
                  metColor = "#4D5358";
                  metLabel = "Solutioning: Non Compliant";
                break;
                case "APR":
                  metColor = "#26D181";
                  metLabel = "Solutioning: Approved Deviations";
                break;
                case "UAPR":
                  metColor = "#4D5358";
                  metLabel = "Solutioning: Unapproved Deviations";
                break;
                default:
                  metColor = "#26D181";
                  metLabel = "Solutioning: Compliant";
                break;
              };
            } else {
              dataMessage = "No Data Available";
            }; //end if empty

            var jsonData = {
              "DATA_MESSAGE": dataMessage,
              "DATA_LOAD_DATE" :dateValue,
              //"SELECTED_COLOR" : "#F4F6FB",
              //"TARGET_COLOR"   : "#000000",
              //"TARGET_LABEL"   : "Target",
              //"TARGET_PCT"     : target_value,
              "data": [
                  {
                    "label": metLabel,
                    "color": metColor,
                    "busAttrData": []
                  }]
              };

              //var show_ww = 0;
              // might need to check if empty
/*               if (( req.query['busAttr'] == 'GEO_DESC' ) || ( req.query['busAttr'] == 'GROWTH_PLATFORM_DESC' )) {
                  show_ww = 1;
              } else {
                  show_ww = 0;
              }; */

              for (var i = 0; i < message.length; i++) {

                var dm = {
                  "name": "",
                  "count": "",
                  "total_count": "",
                  "date": "",
                  //"target_pct": "",
                  "percent": ""
                };

                //if ( message[i].BUS_ATTR != 'Worldwide' ) {
                  dm.name = message[i].BUSATTR;
                  dm.count = message[i].VALUES;
                  dm.total_count = message[i].TOTAL_COUNT;
                  dm.date = message[i].QTRVAL;
                  //dm.date = "Q" + message[i].CURR_ACCT_MO + " " + message[i].CURR_ACCT_YR;
                  //ds.target_pct = calcs.formatPercentage100(Number(message[i].TARGET_PCT));
                  dm.percent = calcs.formatPercentage(Number(message[i].PERCENT));
                  jsonData.data[0].busAttrData.push(dm);
                // } else { 
                //   if ( ( message[i].BUS_ATTR == 'Worldwide' ) && ( show_ww == 1 ) ) {
                //     dm.name = message[i].BUS_ATTR;
                //     dm.count = message[i].VALUES;
                //     dm.total_count = message[i].TOTAL_COUNT;
                //     dm.target_pct = calcs.formatPercentage100(Number(message[i].TARGET_PCT));
                //     dm.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(message[i].PERCENT)));
                //     jsonData.data[0].busAttrData.push(dm);
                //   };
                // };
              }; //end loop
            } catch(e) {
              jsonData = {msg: e.message};
            }

            cb(err, jsonData);
        });
    };

    T2compdmsolusgcount.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompDMSolUsgCount', type: 'object'}
    });

  };
