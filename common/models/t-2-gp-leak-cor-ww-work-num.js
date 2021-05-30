'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2gpleakcorwwworknum) {
  T2gpleakcorwwworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
      }
      var formatedJson = {};
      try {
        formatedJson = {
          "data":[],
        };

        if (message.length > 0 ) {
          formatedJson.data.push({
            "WW_LKG_CNT": message[0].WW_LKG_CNT,
            "WW_LKG_AMT": calcs.calcValue(message[0].WW_LKG_AMT),
            "WW_LKG_PCT": calcs.formatPercentage100(message[0].WW_LKG_PCT,1)
        });

      }; // End if not empty
        } catch (e) {
          formatedJson = {"msg" : e.message}
        }

      cb(err, formatedJson);
    });
};

  T2gpleakcorwwworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2GPLeakCORWWWorkNum', type: 'object'}
  });
};
