'use strict';

module.exports = function(phdfilterlogger) {

  phdfilterlogger.processChild = function(req, filter, cb) {
    this.process(req, filter, function(err, message){
      if (err) {
      return cb(err, null);
      }
      cb(err, message);
    });
  };

  phdfilterlogger.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 'phdFilterLogger', type: 'object'}
  });
};
