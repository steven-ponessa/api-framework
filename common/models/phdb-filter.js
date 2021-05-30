'use strict';

module.exports = function(Phdbfilter) {

    Phdbfilter.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
            //console.log("...Reformat message into JSON UI team is expecting here.");
            if (err) {
                return cb(err, null);
            }
            cb(err, message);
        });
    };

    Phdbfilter.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 'phdbFilter', type: 'object'}
    });

};
