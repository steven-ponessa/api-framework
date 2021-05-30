'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compnotasdgdprcountcontract) {

  T2compnotasdgdprcountcontract.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }

          try {

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
              "COLOR_LABEL" : "#00000",
              "DATA_LOAD_DATE" : dateValue,
              "data": [
                  {
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

                var data = {};
                if ( element.CATEGORY != 'Worldwide' ) {                
                    data.name = element.CATEGORY;
                    data.color = "#ffafd2";
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
                    data.color = "#ffafd2";
                    data.count = element.CNT;
                    data.date = element.CURR_ACCT_MO + ' ' + element.CURR_ACCT_YR;
                    data.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.PCT)));
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

    T2compnotasdgdprcountcontract.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompNotAsdGDPRCountContract', type: 'object'}
    });

  };
