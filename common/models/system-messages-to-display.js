'use strict';

module.exports = function(Systemmessagestodisplay) {
  Systemmessagestodisplay.processChild = function(req, filter, cb) {
    this.process(req, filter, function(err, message){
      if (err) {
        return cb(err, null);
      }
          
      var formatedJson;

      try {
        formatedJson = {
          "msgToDisplay": message[0].MSG_TO_DISPLAY
        };

        if(formatedJson.msgToDisplay === 'true') {
          formatedJson.messages = [];

          message.forEach(function (element) {
            formatedJson.messages.push({
              "msg": element.MSG
            })
          }, this);
        }
      } catch(e) {
         formatedJson = {msg: e.message};
      }

      cb(err, formatedJson);
    });
  };

  Systemmessagestodisplay.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 'systemMessagesToDisplay', type: 'object'}
  });
};
