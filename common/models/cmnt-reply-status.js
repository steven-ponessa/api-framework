'use strict';

module.exports = function(cmntreplystatus) {

    cmntreplystatus.processChild = function(req, filter, cb) {
        this.process(req, filter, function (err, message) {
            if (err) {
                return cb(err, null);
            }
            cb(err, message);
        });
    };

    cmntreplystatus.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 'cmntReplyStatus', type: 'object'}
    });

};