'use strict';

module.exports = function(T1search) {
  T1search.processChild = function(req, filter, cb) {
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
              "WBS": message[i].WBS,
              "WORK_KEY":message[i].PROJ_KEY,
              "CONTRACT_KEY":message[i].CNTRCT_KEY,
              "WBS_TYPE": message[i].WBS_TYPE,
              "GEO_CD":message[i].GEO_CD,
              "STATUS": message[i].STATUS
            });
          }
        } else {
          formatedJson.DATA_MESSAGE = "This Work No or Contract is not valid or you do not have access to it";
        } //end if empty

} catch (e) {
    formatedJson = {"msg" : e.message}
  }

  cb(err, formatedJson);
});
};

  T1search.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                {arg: 'filter', type: 'object'}],
    returns: {arg: 't1Search', type: 'object'}
  });
};
