'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compnongdprcountcontract) {

  T2compnongdprcountcontract.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }

          try {

            var color = '';
            var value = '';
            var target_value = '';
            var show_ww = 0;
              switch (req.query['metric']) {
                case "NOT_IMPCT":
                  color = "#A1D800";
                  value = "Contracts Not Impacted by GDPR";
                break;
                case "NO_LANG":
                  color = "#a6c8ff";
                  value = "Contracts Without Standard Language";
                break;
                }
            var dateValue = '';
            
            if (!message.length <= 0) {
              target_value = calcs.formatPercentage100(Number(message[0].TARGET_PCT));
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
              "DATA_LOAD_DATE" : dateValue,
              "COLOR" : color,
              "VALUE": value,
              "data": [
                  {
                    "label": "Non GDPR",
                    "busAttrData": []
                  }]
              };

              message.forEach(function (element) {

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

                  var NGDPR_DT = {};
                  if ( element.CATEGORY != 'Worldwide' ) {
                      NGDPR_DT.name = element.CATEGORY;
                      NGDPR_DT.count = element.CNT;
                      NGDPR_DT.date = element.CURR_ACCT_MO + ' ' + element.CURR_ACCT_YR;
                      NGDPR_DT.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PCT)));
					  if (element.IS_MSAC_VISIBLE == 1) {
						NGDPR_DT.msac_rating = element.MSAC_RATING;
						NGDPR_DT.msac_color = msac_color;
					  }                     
                      jsonData.data[0].busAttrData.push(NGDPR_DT);
                  } else { 
                    if ( ( element.CATEGORY == 'Worldwide' ) && ( show_ww == 1 ) ) {
                      NGDPR_DT.name = element.CATEGORY;
                      NGDPR_DT.count = element.CNT;
                      NGDPR_DT.date = element.CURR_ACCT_MO + ' ' + element.CURR_ACCT_YR;
                      NGDPR_DT.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PCT)));
                      jsonData.data[0].busAttrData.push(NGDPR_DT);
                    } 
                  } 
                }, this);
            } catch(e) {
              jsonData = {msg: e.message};
            }

            cb(err, jsonData);
        });
    };

    T2compnongdprcountcontract.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompNonGDPRCountContract', type: 'object'}
    });

  };
