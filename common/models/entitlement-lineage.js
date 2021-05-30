'use strict';

module.exports = function(Entitlementlineage) {

    Entitlementlineage.processChild = function(req, filter, cb) {
        this.process(req, filter, function (err, message) {
            if (err) {
                return cb(err, null);
            }

            try {
                //Modify the returned JSON
                var Entitlement = {};

                var entitlements = [];

                message.forEach(function (element) {
                    Entitlement.role = element.ROLE;
                    switch (element.ROLE) {
                        case 'WW':                            
                            entitlements = [{"valueId" : "World Wide", "parentId": ""}];
                            console.log("in WW switch statement");
                            break;
                        case 'GEO':
                            entitlements.push({"valueId" : element.VALUE_ID, "parentId": element.PARENT_DESC});
                            break;
                        case 'MKT':
                            entitlements.push({"valueId" : element.VALUE_ID, "parentId": element.PARENT_DESC});
                            break;
                        default:
                            console.log("Unknown ROLE_ID=" + element.ROLE + ".");
                    }
                }, this);
                Entitlement.entitlements = entitlements;

                cb(err, Entitlement);
            } catch (err) {
                // Handle the error here.
                var error = new Error();
                error.status = 450;
                error.message = err.message;
                error.code = err.code;
               // logger.error('Failed retrieving service: %s', error.message);
                return cb(error, null);
            }
        });
    };
    
    Entitlementlineage.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 'Entitlement', type: 'object'}
    });


};
