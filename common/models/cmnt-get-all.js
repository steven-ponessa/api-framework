'use strict';

module.exports = function(cmntgetall) {

    cmntgetall.processChild = function(req, filter, cb) {
        this.process(req, filter, function (err, message) {
            if (err) {
                return cb(err, null);
            }
            var dataMessage = "No Data Available";
            var formatedJson = {
                "DATA_MESSAGE":dataMessage,
                "data":[]
            };
            var dt = [];
            var reply = [];

            if (!message.length <= 0) {
                dataMessage = "";
                formatedJson.DATA_MESSAGE = dataMessage;
      
                try {
                    
                    for (var i = 0; i < message.length; i++) {
                    
                        if(message[i].REPLY_ID == 0){
                            dt.push({
                                "ID": message[i].ID,
                                "COMMENT_ID": message[i].COMMENT_ID,
                                "REPLY_ID": message[i].REPLY_ID,
                                "CNTRCT_KEY": message[i].CNTRCT_KEY,
                                "PROJ_KEY": message[i].PROJ_KEY,
                                "METRIC_KEY": message[i].METRIC_KEY,
                                "METRIC_SHORT_DESC": message[i].METRIC_SHORT_DESC,
                                "COMMENT_TITLE": message[i].COMMENT_TITLE,
                                "COMMENT": message[i].COMMENT,
                                "INET_ID": message[i].INET_ID,
                                "MODIFIED_ON": message[i].MODIFIED_ON,
                                "ARCHIVE_STATUS": message[i].ARCHIVE_STATUS,
                                "CRTN_TMS": message[i].CRTN_TMS,
                                "TTL_MODIFIED_ON": message[i].TTL_MODIFIED_ON,
                                "TEXT_MODIFIED_ON": message[i].TEXT_MODIFIED_ON,
								"IS_TTL_EDITED": message[i].IS_TTL_EDITED,
                                "IS_EDITED": message[i].IS_EDITED,
                                "CRTN_LBL": message[i].CRTN_LBL,
                                "TTL_MODIFIED_ON_LBL": message[i].TTL_MODIFIED_ON_LBL,
                                "TEXT_MODIFIED_ON_LBL": message[i].TEXT_MODIFIED_ON_LBL,
                                "IS_NEW_LBL_FLG": message[i].IS_NEW_LBL_FLG,
                                "reply":[]
                                })
                                
                            }else{
                                reply.push( {
                                    "ID": message[i].ID,
                                    "COMMENT_ID": message[i].COMMENT_ID,
                                    "REPLY_ID": message[i].REPLY_ID,
                                    "CNTRCT_KEY": message[i].CNTRCT_KEY,
                                    "PROJ_KEY": message[i].PROJ_KEY,
                                    "METRIC_KEY": message[i].METRIC_KEY,
                                    "METRIC_SHORT_DESC": message[i].METRIC_SHORT_DESC,
                                    "COMMENT_TITLE": message[i].COMMENT_TITLE,
                                    "COMMENT": message[i].COMMENT,
                                    "INET_ID": message[i].INET_ID,
                                    "MODIFIED_ON": message[i].MODIFIED_ON,
                                    "ARCHIVE_STATUS": message[i].ARCHIVE_STATUS,
                                    "CRTN_TMS": message[i].CRTN_TMS,
                                    "TTL_MODIFIED_ON": message[i].TTL_MODIFIED_ON,
                                    "TEXT_MODIFIED_ON": message[i].TEXT_MODIFIED_ON,
									"IS_TTL_EDITED": message[i].IS_TTL_EDITED,
                                    "IS_EDITED": message[i].IS_EDITED,
                                    "CRTN_LBL": message[i].CRTN_LBL,
                                    "TTL_MODIFIED_ON_LBL": message[i].TTL_MODIFIED_ON_LBL,
                                    "TEXT_MODIFIED_ON_LBL": message[i].TEXT_MODIFIED_ON_LBL,
                                    "IS_NEW_LBL_FLG": message[i].IS_NEW_LBL_FLG,
                                    })   
                            };
                                
                    } // end for loop 

                    for(var i in dt){
                        //console.log('reviewing: ' + dt[i].COMMENT_ID);
                        for(var j in reply){
                            if(reply[j].COMMENT_ID == dt[i].COMMENT_ID){
                                //console.log('there is a reply for: '+dt[i].COMMENT_ID);
                                dt[i].reply.push(reply[j]);
                            }
                        }
                        
                    }
                    formatedJson.data = dt;

                } catch(e) {
                        formatedJson = {msg: e.message};
                    }
            }; //end of empty result check
      
            cb(err, formatedJson);
          });
        };

    cmntgetall.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 'cmntGetAll', type: 'object'}
    });

};