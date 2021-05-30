'use strict';

module.exports = function(Getbrandtest) {
    Getbrandtest.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
            if (err) {
                return cb(err, null);
            }
        
            //Reformat JSON message if necessary

            cb(err, message);
      });
    };

    Getbrandtest.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
        returns: {arg: 'Getbrandtest', type: 'object'}
    });


};
