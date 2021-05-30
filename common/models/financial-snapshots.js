'use strict';

module.exports = function(Financialsnapshots) {

    Financialsnapshots.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
            if (err) {
                return cb(err, null);
            }
            cb(err, message);
        });
    };

    Financialsnapshots.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 'Financialsnapshots', type: 'object'}
    });

};