'use strict';

module.exports = function(T2actportsrchworknum) {
  T2actportsrchworknum.processChild = function(req, filter, cb) {
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
            // Need to update SQL for this work nbr search
            //"WORK_NUM": message[i].WORK_NUM,
            //"WORK_KEY":message[i].WORK_KEY,              
            //"WORK_DESC":message[i].WORK_DESC,         
            "CNTRCT_NUM": message[i].CNTRCT_NUM,
            "CNTRCT_KEY":message[i].CNTRCT_KEY,              
            "CNTRCT_DESC":message[i].CNTRCT_DESC,
            "CLIENT_NAME":message[i].CLIENT
            });
          }
        } else {
          formatedJson.DATA_MESSAGE = "This Work Number is not valid or you do not have access to it";
        } //end if empty

} catch (e) {
    formatedJson = {"msg" : e.message}
  }

  cb(err, formatedJson);
});
};

T2actportsrchworknum.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                {arg: 'filter', type: 'object'}],
    returns: {arg: 't2ActPortSrchWorkNum', type: 'object'}
  });
};
