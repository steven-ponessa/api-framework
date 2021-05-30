'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compdscount) {

  T2compdscount.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
          }

          try {
            var jsonData = {
              "Data_Message" :"No Data Available"
            };
            var target_value = '';
            
            if (!message.length <= 0) {
              target_value = calcs.formatPercentage100(Number(message[0].TARGET_PCT));

// color will be #24A148 for Compliance or #DA1E28 for Non Compliance, #33B1FF for 14 Day Wait period

              var compColor = '';
              var metricLabel = '';
              switch (message[0].COMPL) { 
                case 1:
                  compColor = "#DA1E28";
                  metricLabel = "Non Compliant";
                  break;
                case -1:
                  compColor = "#33B1FF";
                  metricLabel = "14 Day Wait Period";
                  break;
                default:
                  compColor = "#24A148";
                  metricLabel = "Compliant";
                  break;
              };

            jsonData = {
              "Data_Message" :" ",
              "DATA_LOAD_DATE" :message[0].DATA_LOAD_DESC,
              "SELECTED_COLOR" : "#F4F6FB",
              "TARGET_COLOR"   : "#000000",
              "TARGET_LABEL"   : "Target",
              "TARGET_PCT"     : target_value,
              //"WW_LABEL"       : "Worldwide",
              //"WW_PCT"         : "-",
              //"WW_COUNT"       : "-",
              "data": [
                  {
                    "label": "Delivery Start",
                    "metricLabel": metricLabel,
                    "color": compColor,
                    "busAttrData": []
                  }]
              };

              var show_ww = 0;
              // might need to check if empty
              if (( req.query['busAttr'] == 'GEO_DESC' ) || ( req.query['busAttr'] == 'GROWTH_PLATFORM_DESC' )) {
                  show_ww = 1;
              } else {
                  show_ww = 0;
              };

              for (var i = 0; i < message.length; i++) {

                var ds = {
                  "name": "",
                  "compl_count": "",
                  "non_compl_count": "",
                  "total_count": "",
                  "target_pct": "",
                  "compl_percent": "",
                  "non_compl_percent": ""
                };

                if ( message[i].BUS_ATTR != 'Worldwide' ) {
                  ds.name = message[i].BUS_ATTR;
                  ds.compl_count = message[i].COMPLIANT_CNT;
                  ds.non_compl_count = message[i].NONCOMPLIANT_CNT;
                  ds.total_count = message[i].COMBINED_CNT;
                  ds.target_pct = calcs.formatPercentage100(Number(message[i].TARGET_PCT));
                  ds.compl_percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(message[i].COMP_DELIVERY_START_PERC)));
                  ds.non_compl_percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(message[i].NONCOMP_DELIVERY_START_PERC)));
                  jsonData.data[0].busAttrData.push(ds);
                } else { 
                  if ( ( message[i].BUS_ATTR == 'Worldwide' ) && ( show_ww == 1 ) ) {
                    ds.name = message[i].BUS_ATTR;
                    ds.compl_count = message[i].COMPLIANT_CNT;
                    ds.non_compl_count = message[i].NONCOMPLIANT_CNT;
                    ds.total_count = message[i].COMBINED_CNT;
                    ds.target_pct = calcs.formatPercentage100(Number(message[i].TARGET_PCT));
                    ds.compl_percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(message[i].COMP_DELIVERY_START_PERC)));
                    ds.non_compl_percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(message[i].NONCOMP_DELIVERY_START_PERC)));
                    jsonData.data[0].busAttrData.push(ds);
                  };
                };
              }; //end loop
            } //end if message not empty
            } catch(e) {
              jsonData = {msg: e.message};
            }

            cb(err, jsonData);
        });
    };

    T2compdscount.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompDSCount', type: 'object'}
    });

  };
