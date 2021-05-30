'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2compcpmpopview) {
  T2compcpmpopview.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

      var formatedJson = {};
    try {
      formatedJson = {
        "CNTRCT_NUM_LABEL":"Contract No",
        "COMPL_METRIC_STATUS_LABEL":"Compliance metric status",
        "SEVEN_KEYS_LABEL":"7 Keys",
        "PHASE_GATE_0_LABEL":"Phase Gate 0",
        "PHASE_GATE_1_4_LABEL":"Phase Gate 1-4",
        "COS_LABEL":"CoS",
        "CPM_LABEL":"CPM",
        "DELIVERY_STRT_LABEL":"Delivery Start",

        "IPPF_STATUS_LABEL":"IPPF assessment status",
        "SEVEN_KEYS_RESULT_LABEL":"7 Keys Result",
        "PHASE_GATE_0_RESULT_LABEL":"PG 0 Result",
        "PHASE_GATE_1_RESULT_LABEL":"PG 1 Result",
        "PHASE_GATE_2_RESULT_LABEL":"PG 2 Result", 
        "PHASE_GATE_3_RESULT_LABEL":"PG 3 Result", 
        "PHASE_GATE_4_RESULT_LABEL":"PG 4 Result", 
        "COS_RESULT_LABEL":"CoS Result",

        "data":[]
      };

      if (message.length > 0 ) {
        formatedJson.data.push({
            "CNTRCT_NUM"  : message[0].CNTR_NUM,
            "CNTRCT_KEY":message[0].CNTR_KEY,
            "SEVEN_KEYS":message[0].SEV_KEYS,
            "PHASE_GATE_0":message[0].PG_0_COMP,
            "PHASE_GATE_1_4":message[0].PG_1_4_COMP,
            "COS":message[0].COS_COMP,
            "CPM":message[0].CPM_COMP,
            "DELIVERY_STRT":message[0].DELIVERY_START_COMP,

            "SEVEN_KEYS_RESULT":message[0].SEV_KEYS_RESULT,
            "SEVEN_KEYS_RESULT_COLOR":message[0].SEV_KEYS_RESULT_COLOR,
            "PHASE_GATE_0_RESULT":message[0].PG_0_RESULT,
            "PHASE_GATE_0_RESULT_COLOR":message[0].PG_0_RESULT_COLOR,
            "PHASE_GATE_1_RESULT":message[0].PG_1_RESULT,
            "PHASE_GATE_1_RESULT_COLOR":message[0].PG_1_RESULT_COLOR,
            "PHASE_GATE_2_RESULT":message[0].PG_2_RESULT,
            "PHASE_GATE_2_RESULT_COLOR":message[0].PG_2_RESULT_COLOR,
            "PHASE_GATE_3_RESULT":message[0].PG_3_RESULT,
            "PHASE_GATE_3_RESULT_COLOR":message[0].PG_3_RESULT_COLOR,
            "PHASE_GATE_4_RESULT":message[0].PG_4_RESULT,
            "PHASE_GATE_4_RESULT_COLOR":message[0].PG_4_RESULT_COLOR,
            "COS_RESULT":message[0].COS_RESULT,
            "COS_RESULT_COLOR":message[0].COS_RESULT_COLOR
        });
      }; // End if not empty

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

    cb(err, formatedJson);
  });
};

T2compcpmpopview.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompCPMPopView', type: 'object'}
  });

};
