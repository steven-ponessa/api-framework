'use strict';

module.exports = function(Getresourcebygrowthplatform) {
    /*
     * Beginning of API Boilerplate
     */
    Getresourcebygrowthplatform.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
            if (err) {
                return cb(err, null);
            }
        
            //Reformat JSON message if necessary

            cb(err, message);
      });
    };

    Getresourcebygrowthplatform.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
        returns: {arg: 'Getresourcebygrowthplatform', type: 'object'}
    });
    /*
     * End of API Boilerplate
     */

};
