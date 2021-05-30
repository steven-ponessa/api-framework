'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2pmmultiselect) {

    T2pmmultiselect.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }

          var formatedJson = {};

          try {
            formatedJson = {
              "WORK_KEY_LABEL":"Work Key",
              "data":[]
            };
            if (message.length > 0 ) {
              formatedJson.data.push({
              "WORK_KEY": message[0].PROJ_KEY
            });
          }; // End if not empty

          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    T2pmmultiselect.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2PMMultiSelect', type: 'object'}
    });

};
