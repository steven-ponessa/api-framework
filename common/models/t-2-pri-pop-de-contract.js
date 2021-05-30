'use strict';
//var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2pripopdecontract) {
  T2pripopdecontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
      var dateValue = '';
      var dataMsg = '';
      var formatedJson = {};
    try {
          formatedJson = {
            "DATA_MESSAGE": dataMsg,
            "WORK_NUM_LABEL":"Work No.",
            "DE_LABEL":"DE",
            "DE_LIST_LABEL":"DE List",
            "DE_LIST_DATE_LABEL":"DE List Load Date",
            "DCA_LABEL":"DCA",
            "data":[]
          };

            if(message.length > 0) { //Avoid processing a empty result set
                dataMsg = '';
                switch (message[0].LNCH_FLG) {
                  case 0:
                      dateValue =  message[0].DATA_LOAD_DESC; //Delivery model
                      break;
                  default:
                      dateValue =  message[0].LNCH_DATE;  //Launch model
                      break;
              };
              for (var i = 0; i < message.length; i++) {

                  formatedJson.data.push({
                        "PRI_DATE": dateValue,
                        "CNTRCT_NUM": (message[i].CNTRCT_NUM),
                        "CNTRCT_KEY": (message[i].CNTRCT_KEY),
                        "DE_LIST": (message[i].DE_LIST_FLG),
                        "DE_LIST_DATE": (message[i].DE_DATE),
                        // CR coming to only show DCA when flag set to Yes
                        "DCA": "https://b03zvi14860210.ahe.boulder.ibm.com/services/gbs/services-operations/so/authenticate#/",
                        "DCA_MSG": "To access the record in DCA you will need authority in DCA",
                        "IPPF_URL": (message[i].IPPF_URL)
                      });
                } // end loop
              } else {
                formatedJson.DATA_MESSAGE = 'No Data Available';
              }; // End if not empty

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2pripopdecontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriPopDEContract', type: 'object'}
  });
};

