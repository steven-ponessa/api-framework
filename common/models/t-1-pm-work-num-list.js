'use strict';

module.exports = function(T1pmworknumList) {
  T1pmworknumList.processChild = function(req, filter, cb) {
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
              // added All row for user to be able to select contract only for PM 
              formatedJson.data.push({
                "contract_nbr":message[0].CONTRACT_NUM,
                "contract_key":message[0].CNTRCT_KEY,
                "work_nbr":'All',
                "work_key":'--',
                "customer_nm":'--',
                "project_name":'--',
                "contract_type":'--',
                "work_start_date":'--',
                "work_end_date":'--'
              });

                for (var i = 0; i < message.length; i++) {

                  formatedJson.data.push({
                    "contract_nbr":message[i].CONTRACT_NUM,
                    "contract_key":message[i].CNTRCT_KEY,
                    "work_nbr":message[i].WORK_NUM,
                    "work_key":message[i].PROJ_KEY,
                    "customer_nm":message[i].CUSTOMER,
                    "project_name":message[i].WORK_NAME,
                    "contract_type":message[i].CONTRACT_TYPE,
                    "work_start_date":message[i].WBS_START_DT,
                    "work_end_date":message[i].WBS_END_DT,
                    "market":message[i].MARKET, 
                    "country":message[i].COUNTRY,
                    "poc":message[i].AP51,
                    "nbr_days": message[i].NBR_DAYS,
                    "launch_flag": message[i].LAUNCH_FLG,
                    "launch_text": message[i].LAUNCH_TEXT
                  });
            };
        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T1pmworknumList.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't1PMWorkNumList', type: 'object'}
  });
};

