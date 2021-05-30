'use strict';

module.exports = function(gppsnapshots) {

    gppsnapshots.processChild = function(req, filter, cb) {
        this.process(req, filter, function (err, message) {
            if (err) {
                return cb(err, null);
            }
            cb(err, message);
        });
    };

    gppsnapshots.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 'gppSnapshots', type: 'object'}
    });

};