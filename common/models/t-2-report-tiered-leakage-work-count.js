'use strict';
var util = require('util');
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2reporttieredleakageworkcount) {

    T2reporttieredleakageworkcount.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }
            var jsonData = {};

            try {
              jsonData.month = '';
              jsonData.year = '';
              jsonData.data = [];
              var qtrGpLeakage = [];
              var eacVTargetPlan = [];
              var costOverrun = [];

              var gpAccum = {};
              gpAccum.T0_GP_LKG_WORK_NUM_CNT = 0.0;
              gpAccum.T1_GP_LKG_WORK_NUM_CNT = 0.0;
              gpAccum.T2_GP_LKG_WORK_NUM_CNT = 0.0;
              gpAccum.T3_GP_LKG_WORK_NUM_CNT = 0.0;
              gpAccum.Tx_GP_LKG_WORK_NUM_CNT = 0.0;

              var eacAccum = {};
              eacAccum.T0_EAC_LKG_WORK_NUM_CNT = 0.0;
              eacAccum.T1_EAC_LKG_WORK_NUM_CNT = 0.0;
              eacAccum.T2_EAC_LKG_WORK_NUM_CNT = 0.0;
              eacAccum.T3_EAC_LKG_WORK_NUM_CNT= 0.0;
              eacAccum.Tx_EAC_LKG_WORK_NUM_CNT = 0.0;

              var corAccum = {};
              corAccum.T0_COST_OVERRUN_WORK_NUM_CNT = 0.0;
              corAccum.T1_COST_OVERRUN_WORK_NUM_CNT = 0.0;
              corAccum.T2_COST_OVERRUN_WORK_NUM_CNT = 0.0;
              corAccum.T3_COST_OVERRUN_WORK_NUM_CNT = 0.0;
              corAccum.Tx_COST_OVERRUN_WORK_NUM_CNT = 0.0;

              message.forEach(function (element, i) {
                  if (i == 0) {
                    jsonData.month = message[0].DATA_LOAD_DATE;
                    //jsonData.month = dateUtils.getMonthName(Number(message[0].ACCT_MO));
                    jsonData.year = message[0].ACCT_YR;
                  }

                  var gp = {label:"",
                  t0: {value: 0, status: ""},
                  t1: {value: 0, status: ""},
                  t2: {value: 0, status: ""},
                  t3: {value: 0, status: ""},
                  total: {value: 0, status: ""}};

                  var eac = {label:"",
                  t0: {value: 0, status: ""},
                  t1: {value: 0, status: ""},
                  t2: {value: 0, status: ""},
                  t3: {value: 0, status: ""},
                  total: {value: 0, status: ""}};

                  var cor = {label:"",
                  t0: {value: 0, status: ""},
                  t1: {value: 0, status: ""},
                  t2: {value: 0, status: ""},
                  t3: {value: 0, status: ""},
                  total: {value: 0, status: ""}};

                  //Current Quater GP
                  gp.label = element.LABEL;
                  gp.t0.value = element.T0_GP_LKG_WORK_NUM_CNT;
                  gp.t1.value = element.T1_GP_LKG_WORK_NUM_CNT;
                  gp.t2.value = element.T2_GP_LKG_WORK_NUM_CNT;
                  gp.t3.value = element.T3_GP_LKG_WORK_NUM_CNT;
                  gp.total.value = Number(element.T0_GP_LKG_WORK_NUM_CNT)
                    + Number(element.T1_GP_LKG_WORK_NUM_CNT)
                    + Number(element.T2_GP_LKG_WORK_NUM_CNT)
                    + Number(element.T3_GP_LKG_WORK_NUM_CNT);

                  gpAccum.T0_GP_LKG_WORK_NUM_CNT += Number(element.T0_GP_LKG_WORK_NUM_CNT);
                  gpAccum.T1_GP_LKG_WORK_NUM_CNT += Number(element.T1_GP_LKG_WORK_NUM_CNT);
                  gpAccum.T2_GP_LKG_WORK_NUM_CNT += Number(element.T2_GP_LKG_WORK_NUM_CNT);
                  gpAccum.T3_GP_LKG_WORK_NUM_CNT += Number(element.T3_GP_LKG_WORK_NUM_CNT);
                  gpAccum.Tx_GP_LKG_WORK_NUM_CNT += Number(element.T0_GP_LKG_WORK_NUM_CNT)
                    + Number(element.T1_GP_LKG_WORK_NUM_CNT)
                    + Number(element.T2_GP_LKG_WORK_NUM_CNT)
                    + Number(element.T3_GP_LKG_WORK_NUM_CNT);

                  var cqApRev = Number(element.T0_CQ_AP_REV)
                    + Number(element.T1_CQ_AP_REV)
                    + Number(element.T2_CQ_AP_REV)
                    + Number(element.T3_CQ_AP_REV);

                  gp.t0.status = calcs.getCountStatus(element.T0_GP_LKG_WORK_NUM_CNT,
                    element.PRI_T0_GP_LKG_WORK_NUM_CNT,
                    element.T0_CQ_GP_LKG,
                    cqApRev);
                  gp.t1.status = calcs.getCountStatus(element.T1_GP_LKG_WORK_NUM_CNT,
                    element.PRI_T1_GP_LKG_WORK_NUM_CNT,
                    element.T1_CQ_GP_LKG,
                    cqApRev);
                  gp.t2.status = calcs.getCountStatus(element.T2_GP_LKG_WORK_NUM_CNT,
                    element.PRI_T2_GP_LKG_WORK_NUM_CNT,
                    element.T2_CQ_GP_LKG,
                    cqApRev);
                  gp.t3.status = calcs.getCountStatus(element.T3_GP_LKG_WORK_NUM_CNT,
                    element.PRI_T3_GP_LKG_WORK_NUM_CNT,
                    element.T3_CQ_GP_LKG,
                    cqApRev);
                  gp.total.status = calcs.getCountStatus(
                      Number(element.T0_GP_LKG_WORK_NUM_CNT)
                          + Number(element.T1_GP_LKG_WORK_NUM_CNT)
                          + Number(element.T2_GP_LKG_WORK_NUM_CNT)
                          + Number(element.T3_GP_LKG_WORK_NUM_CNT)
                      , Number(element.PRI_T0_GP_LKG_WORK_NUM_CNT)
                          + Number(element.PRI_T1_GP_LKG_WORK_NUM_CNT)
                          + Number(element.PRI_T2_GP_LKG_WORK_NUM_CNT)
                          + Number(element.PRI_T3_GP_LKG_WORK_NUM_CNT)
                      , Number(element.T0_CQ_GP_LKG)
                          + Number(element.T1_CQ_GP_LKG)
                          + Number(element.T2_CQ_GP_LKG)
                          + Number(element.T3_CQ_GP_LKG)
                      , cqApRev);

                  qtrGpLeakage.push(gp);

                  //EAC Leakage
                  eac.label = element.LABEL;
                  eac.t0.value = element.T0_EAC_LKG_WORK_NUM_CNT;
                  eac.t1.value = element.T1_EAC_LKG_WORK_NUM_CNT;
                  eac.t2.value = element.T2_EAC_LKG_WORK_NUM_CNT;
                  eac.t3.value = element.T3_EAC_LKG_WORK_NUM_CNT;
                  eac.total.value = Number(element.T0_EAC_LKG_WORK_NUM_CNT)
                    + Number(element.T1_EAC_LKG_WORK_NUM_CNT)
                    + Number(element.T2_EAC_LKG_WORK_NUM_CNT)
                    + Number(element.T3_EAC_LKG_WORK_NUM_CNT);

                  eacAccum.T0_EAC_LKG_WORK_NUM_CNT += Number(element.T0_EAC_LKG_WORK_NUM_CNT);
                  eacAccum.T1_EAC_LKG_WORK_NUM_CNT += Number(element.T1_EAC_LKG_WORK_NUM_CNT);
                  eacAccum.T2_EAC_LKG_WORK_NUM_CNT += Number(element.T2_EAC_LKG_WORK_NUM_CNT);
                  eacAccum.T3_EAC_LKG_WORK_NUM_CNT += Number(element.T3_EAC_LKG_WORK_NUM_CNT);
                  eacAccum.Tx_EAC_LKG_WORK_NUM_CNT += Number(element.T0_EAC_LKG_WORK_NUM_CNT)
                    + Number(element.T1_EAC_LKG_WORK_NUM_CNT)
                    + Number(element.T2_EAC_LKG_WORK_NUM_CNT)
                    + Number(element.T3_EAC_LKG_WORK_NUM_CNT);

                  var tcvPlanRtUsd = Number(element.T0_TCV_PLAN_RT_USD)
                      + Number(element.T1_TCV_PLAN_RT_USD)
                      + Number(element.T2_TCV_PLAN_RT_USD)
                      + Number(element.T3_TCV_PLAN_RT_USD);

                  eac.t0.status = calcs.getCountStatus(element.T0_EAC_LKG_WORK_NUM_CNT,
                      element.PRI_T0_EAC_LKG_WORK_NUM_CNT,
                      element.T0_EAC_LKG,
                      tcvPlanRtUsd);
                  eac.t1.status = calcs.getCountStatus(element.T1_EAC_LKG_WORK_NUM_CNT,
                      element.PRI_T1_EAC_LKG_WORK_NUM_CNT,
                      element.T1_EAC_LKG,
                      tcvPlanRtUsd);
                  eac.t2.status = calcs.getCountStatus(element.T2_EAC_LKG_WORK_NUM_CNT,
                      element.PRI_T2_EAC_LKG_WORK_NUM_CNT,
                      element.T2_EAC_LKG,
                      tcvPlanRtUsd);
                  eac.t3.status = calcs.getCountStatus(element.T3_EAC_LKG_WORK_NUM_CNT,
                      element.PRI_T3_EAC_LKG_WORK_NUM_CNT,
                      element.T3_EAC_LKG,
                      tcvPlanRtUsd);
                  eac.total.status = calcs.getCountStatus(
                    Number(element.T0_EAC_LKG_WORK_NUM_CNT)
                      + Number(element.T1_EAC_LKG_WORK_NUM_CNT)
                      + Number(element.T2_EAC_LKG_WORK_NUM_CNT)
                      + Number(element.T3_EAC_LKG_WORK_NUM_CNT),
                    Number(element.PRI_T0_EAC_LKG_WORK_NUM_CNT)
                      + Number(element.PRI_T1_EAC_LKG_WORK_NUM_CNT)
                      + Number(element.PRI_T2_EAC_LKG_WORK_NUM_CNT)
                      + Number(element.PRI_T3_EAC_LKG_WORK_NUM_CNT),
                    Number(element.T0_EAC_LKG)
                      + Number(element.T1_EAC_LKG)
                      + Number(element.T2_EAC_LKG)
                      + Number(element.T3_EAC_LKG),
                    Number(element.T0_TCV_PLAN_RT_USD)
                      + Number(element.T1_TCV_PLAN_RT_USD)
                      + Number(element.T2_TCV_PLAN_RT_USD)
                      + Number(element.T3_TCV_PLAN_RT_USD));

                  eacVTargetPlan.push(eac);

                  //Cost Overrun
                  cor.label = element.LABEL;
                  cor.t0.value = element.T0_COST_OVERRUN_WORK_NUM_CNT;
                  cor.t1.value = element.T1_COST_OVERRUN_WORK_NUM_CNT;
                  cor.t2.value = element.T2_COST_OVERRUN_WORK_NUM_CNT;
                  cor.t3.value = element.T3_COST_OVERRUN_WORK_NUM_CNT;
                  cor.total.value = Number(element.T0_COST_OVERRUN_WORK_NUM_CNT)
                    + Number(element.T1_COST_OVERRUN_WORK_NUM_CNT)
                    + Number(element.T2_COST_OVERRUN_WORK_NUM_CNT)
                    + Number(element.T3_COST_OVERRUN_WORK_NUM_CNT);

                  corAccum.T0_COST_OVERRUN_WORK_NUM_CNT += Number(element.T0_COST_OVERRUN_WORK_NUM_CNT);
                  corAccum.T1_COST_OVERRUN_WORK_NUM_CNT += Number(element.T1_COST_OVERRUN_WORK_NUM_CNT);
                  corAccum.T2_COST_OVERRUN_WORK_NUM_CNT += Number(element.T2_COST_OVERRUN_WORK_NUM_CNT);
                  corAccum.T3_COST_OVERRUN_WORK_NUM_CNT += Number(element.T3_COST_OVERRUN_WORK_NUM_CNT);
                  corAccum.Tx_COST_OVERRUN_WORK_NUM_CNT += Number(element.T0_COST_OVERRUN_WORK_NUM_CNT)
                    + Number(element.T1_COST_OVERRUN_WORK_NUM_CNT)
                    + Number(element.T2_COST_OVERRUN_WORK_NUM_CNT)
                    + Number(element.T3_COST_OVERRUN_WORK_NUM_CNT);

                  var apLast3moCost = Number(element.T0_AP_LAST_3MO_COST)
                    + Number(element.T1_AP_LAST_3MO_COST)
                    + Number(element.T2_AP_LAST_3MO_COST)
                    + Number(element.T3_AP_LAST_3MO_COST);

                  cor.t0.status = calcs.getCountStatus(
                    element.T0_COST_OVERRUN_WORK_NUM_CNT,
                    element.PRI_T0_COST_OVERRUN_WORK_NUM_CNT,
                    element.T0_COST_OVERRUN,
                    apLast3moCost,
                    [-.1, -.2]);
                  cor.t1.status = calcs.getCountStatus(
                    element.T1_COST_OVERRUN_WORK_NUM_CNT,
                    element.PRI_T1_COST_OVERRUN_WORK_NUM_CNT,
                    element.T1_COST_OVERRUN,
                    apLast3moCost,
                    [-.1, -.2]);
                  cor.t2.status = calcs.getCountStatus(
                    element.T2_COST_OVERRUN_WORK_NUM_CNT,
                    element.PRI_T2_COST_OVERRUN_WORK_NUM_CNT,
                    element.T2_COST_OVERRUN,
                    apLast3moCost,
                    [-.1, -.2]);
                  cor.t3.status = calcs.getCountStatus(
                    element.T3_COST_OVERRUN_WORK_NUM_CNT,
                    element.PRI_T3_COST_OVERRUN_WORK_NUM_CNT,
                    element.T3_COST_OVERRUN,
                    apLast3moCost,
                    [-.1, -.2]);
                  cor.total.status = calcs.getCountStatus(
                    Number(element.T0_COST_OVERRUN_WORK_NUM_CNT)
                      + Number(element.T1_COST_OVERRUN_WORK_NUM_CNT)
                      + Number(element.T2_COST_OVERRUN_WORK_NUM_CNT)
                      + Number(element.T3_COST_OVERRUN_WORK_NUM_CNT),
                    Number(element.PRI_T0_COST_OVERRUN_WORK_NUM_CNT)
                      + Number(element.PRI_T1_COST_OVERRUN_WORK_NUM_CNT)
                      + Number(element.PRI_T2_COST_OVERRUN_WORK_NUM_CNT)
                      + Number(element.PRI_T3_COST_OVERRUN_WORK_NUM_CNT),
                    Number(element.T0_COST_OVERRUN)
                      + Number(element.T1_COST_OVERRUN)
                      + Number(element.T2_COST_OVERRUN)
                      + Number(element.T3_COST_OVERRUN),
                    apLast3moCost,
                    [-.1, -.2]);

                costOverrun.push(cor);

              }, this);

              var gpAccumTot = {
                  label: "Total",
                  t0: { value: gpAccum.T0_GP_LKG_WORK_NUM_CNT },
                  t1: { value: gpAccum.T1_GP_LKG_WORK_NUM_CNT },
                  t2: { value: gpAccum.T2_GP_LKG_WORK_NUM_CNT },
                  t3: { value: gpAccum.T3_GP_LKG_WORK_NUM_CNT },
                  total: { value: gpAccum.Tx_GP_LKG_WORK_NUM_CNT }
              };
              qtrGpLeakage.push(gpAccumTot);

              var eacAccumTot = {
                  label: "Total",
                  t0: { value: eacAccum.T0_EAC_LKG_WORK_NUM_CNT },
                  t1: { value: eacAccum.T1_EAC_LKG_WORK_NUM_CNT },
                  t2: { value: eacAccum.T2_EAC_LKG_WORK_NUM_CNT },
                  t3: { value: eacAccum.T3_EAC_LKG_WORK_NUM_CNT },
                  total: { value: eacAccum.Tx_EAC_LKG_WORK_NUM_CNT }
              };
              eacVTargetPlan.push(eacAccumTot);

              var corAccumTot = {
                  label: "Total",
                  t0: { value: corAccum.T0_COST_OVERRUN_WORK_NUM_CNT },
                  t1: { value: corAccum.T1_COST_OVERRUN_WORK_NUM_CNT },
                  t2: { value: corAccum.T2_COST_OVERRUN_WORK_NUM_CNT },
                  t3: { value: corAccum.T3_COST_OVERRUN_WORK_NUM_CNT },
                  total: { value: corAccum.Tx_COST_OVERRUN_WORK_NUM_CNT }
              };
              costOverrun.push(corAccumTot);

              jsonData.data.push({"qtrGpLeakage": qtrGpLeakage});
              jsonData.data.push({"eacVTargetPlan": eacVTargetPlan});
              jsonData.data.push({"costOverrun": costOverrun});
            } catch (e) {
              jsonData = {"msg" : e.message}
            }

            cb(err, jsonData);
        });
    };

    T2reporttieredleakageworkcount.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2ReportTieredLeakageWorkCount', type: 'object'}
    });

};
