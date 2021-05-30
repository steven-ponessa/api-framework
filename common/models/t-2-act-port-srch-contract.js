'use strict';

module.exports = function(T2actportsrchcontract) {
  T2actportsrchcontract.processChild = function(req, filter, cb) {
    this.process(req, filter, function(err, message){
      if (err) {
        return cb(err, null);
    }
    var dataMessage = '';
    var formatedJson = {
        "DATA_MESSAGE": dataMessage,
        "search_data": []
    }

    try {

      if (!message.length <= 0) {

        for (var i = 0; i < message.length; i++) {
          formatedJson.search_data.push({
              "CNTRCT_NUM": message[i].CNTRCT_NUM,
              "CNTRCT_KEY":message[i].CNTRCT_KEY,              
              "CNTRCT_DESC":message[i].CNTRCT_DESC,
              "CLIENT_NAME":message[i].CLIENT
            });
          }
        } else {
          formatedJson.DATA_MESSAGE = "This Contract is not valid or you do not have access to it";
        } //end if empty

} catch (e) {
    formatedJson = {"msg" : e.message}
  }

  cb(err, formatedJson);
});
};

T2actportsrchcontract.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                {arg: 'filter', type: 'object'}],
    returns: {arg: 't2ActPortSrchContract', type: 'object'}
  });
};
