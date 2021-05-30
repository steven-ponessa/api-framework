'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compgdprimpcountcontract) {

  T2compgdprimpcountcontract.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }

          try {
            var color = '';
            var value = '';
              switch (req.query['metric']) {
                case "IMPCT_BY_GDPR":
                  color = "#6929c4";
                  value = "GDPR Impacted Contracts";
                break;
                case "DPA_NOT_SGND":
                  color = "#0043ce";
                  value = "DPA Not Signed";
                break;
                case "EXHBT_NOT_SGND":
                  color = "#005d5d";
                  value = "DPA Exhibit Not Signed";
                break;
                case "SL_NOT_CMPL":
                  color = "#FF832B";
                  value = "TOMs SL Review Not Completed";
                break;
                case "TOM_NOT_IMPL":
                  color = "#a2191f";
                  value = "TOMs Not Implemented";
                break;
                case "FULL_NOT_ACH":
                  color = "#F1C21B";
                  value = "Full GDPR Readiness Not Achieved";
                break;
                case "EUMC":
                  color = "#6fdc8c";
                  value = "EUMC";
                break;
                case "SUB":
                  color = "#3ddbd9";
                  value = "Subprocessor";
                break;
                }
            var dateValue = '';
            var show_ww = 0;

            if (!message.length <= 0) {
              dateValue =  message[0].DATA_LOAD_DESC;

              // might need to check if empty
              if (( req.query['busAttr'] == 'GEO_DESC' ) || ( req.query['busAttr'] == 'GROWTH_PLATFORM_DESC' )) {
                  show_ww = 1;
              } else {
                  show_ww = 0;
              };

            };

            var jsonData = {
              "SELECTED_LABEL" :"",
              "COLOR" : color,
              "VALUE": value,
              "DATA_LOAD_DATE" :dateValue,
              "data": [
                  {
                    "busAttrData": []
                  }]
              };

              message.forEach(function (element) {

                var data = {};
                var msac_color = '';
                  switch (element.MSAC_RATING) {
                    case "sat":
                      msac_color = "#70AC45";
                    break;
                    case "unsat":
                      msac_color = "#FA514C";
                    break;
                    case "marg":
                      msac_color = "#FCCF0A";
                    break;
                    default:
                      msac_color = "#E7E6E6";
                    break;
                  };

                if ( element.CATEGORY != 'Worldwide' ) {

                data.name = element.CATEGORY;
                data.count = element.CNT;
                data.date = element.CURR_ACCT_MO + ' ' + element.CURR_ACCT_YR;
                data.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PCT)));
				if (element.IS_MSAC_VISIBLE == 1) {
					data.msac_rating = element.MSAC_RATING;
					data.msac_color = msac_color;
				}
                jsonData.data[0].busAttrData.push(data);
              } else { 
                if ( ( element.CATEGORY == 'Worldwide' ) && ( show_ww == 1 ) ) {
                  data.name = element.CATEGORY;
                  data.count = element.CNT;
                  data.date = element.CURR_ACCT_MO + ' ' + element.CURR_ACCT_YR;
                  data.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PCT)));
                  jsonData.data[0].busAttrData.push(data);
                } 
              } 
            }, this);
            } catch(e) {
              jsonData = {msg: e.message};
            }

            cb(err, jsonData);
        });
    };

    T2compgdprimpcountcontract.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompGDPRImpCountContract', type: 'object'}
    });

  };
