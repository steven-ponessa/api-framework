'use strict';

module.exports = function(T1pmcontractListPHD) {
  T1pmcontractListPHD.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
      
    try {

          var formatedJson = {};
        
            if(message.length > 0) { //Avoid processing a empty result set
                formatedJson = {
              }

              formatedJson.data = [];
    
                for (var i = 0; i < message.length; i++) {

                  formatedJson.data.push({
                    "contract_nbr":message[i].CNTRCT_NUM,
                    "contract_key":message[i].CNTRCT_KEY,
                    "contract_name":message[i].CNTRCT_DESC,
                    "work_nbr":message[i].WORK_NBR,
                    "customer_nm":message[i].CUSTOMER,
                    "start_date":message[i].WBS_START_DT,
                    "end_date":message[i].WBS_END_DT,
                    "market":message[i].MARKET, 
                    "country":message[i].COUNTRY 
                  });
            };
        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T1pmcontractListPHD.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't1PMContractListPHD', type: 'object'}
  });
};

