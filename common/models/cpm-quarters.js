'use strict';

module.exports = function (cpmquarters) {

    cpmquarters.processChild = function (req, filter, cb) {
        this.process(req, filter, function (err, message) {
            if (err) {
                return cb(err, null);
            }
            try {
                var jsonData = [];
                var i=0;
                //var key = 'CURRENT'; 
                message.forEach(function (element) {
                    //if (i>0) {
                    //    key = element.VALUE;
                    //}
                    var menuItem = {
                        "VALUE": element.VALUE,
                        "LABEL": element.LABEL
                    };
                    i++;

                    jsonData.push(menuItem);

                }, this);

            } catch (e) {
                jsonData = { "msg": e.message };
            }
            cb(err, jsonData);
        });
    };

    cpmquarters.remoteMethod('processChild', {
        http: { path: '/', verb: 'get', status: 200 },
        accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
        { arg: 'filter', type: 'object' }],
        returns: { arg: 'cpmQuarters', type: 'object' }
    });

};