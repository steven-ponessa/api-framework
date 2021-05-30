'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function (T2reporttieredleakagepercentage) {

    T2reporttieredleakagepercentage.processChild = function (req, filter, cb) {
        this.process(req, filter, function (err, message) {
          if (err) {
            return cb(err, null);
        }
try {
            var jsonData = {};
            jsonData.month = '';
            jsonData.year = '';
            jsonData.data = [];
            var qtrGpLeakage = [];
            var eacVTargetPlan = [];
            var costOverrun = [];

            var gpAccum = {};
            gpAccum.T0_CQ_GP_LKG = 0.0;
            gpAccum.T1_CQ_GP_LKG = 0.0;
            gpAccum.T2_CQ_GP_LKG = 0.0;
            gpAccum.T3_CQ_GP_LKG = 0.0;
            gpAccum.Tx_CQ_GP_LKG = 0.0;
            gpAccum.T0_CQ_AP_REV = 0.0;
            gpAccum.T1_CQ_AP_REV = 0.0;
            gpAccum.T2_CQ_AP_REV = 0.0;
            gpAccum.T3_CQ_AP_REV = 0.0;
            gpAccum.Tx_CQ_AP_REV = 0.0;

            var eacAccum = {};
            eacAccum.T0_EAC_LKG = 0.0;
            eacAccum.T1_EAC_LKG = 0.0;
            eacAccum.T2_EAC_LKG = 0.0;
            eacAccum.T3_EAC_LKG = 0.0;
            eacAccum.Tx_EAC_LKG = 0.0;
            eacAccum.T0_TCV_PLAN_RT_USD = 0.0;
            eacAccum.T1_TCV_PLAN_RT_USD = 0.0;
            eacAccum.T2_TCV_PLAN_RT_USD = 0.0;
            eacAccum.T3_TCV_PLAN_RT_USD = 0.0;
            eacAccum.Tx_TCV_PLAN_RT_USD = 0.0;

            var corAccum = {};
            corAccum.T0_COST_OVERRUN = 0.0;
            corAccum.T1_COST_OVERRUN = 0.0;
            corAccum.T2_COST_OVERRUN = 0.0;
            corAccum.T3_COST_OVERRUN = 0.0;
            corAccum.Tx_COST_OVERRUN = 0.0;
            corAccum.T0_AP_LAST_3MO_COST = 0.0;
            corAccum.T1_AP_LAST_3MO_COST = 0.0;
            corAccum.T2_AP_LAST_3MO_COST = 0.0;
            corAccum.T3_AP_LAST_3MO_COST = 0.0;
            corAccum.Tx_AP_LAST_3MO_COST = 0.0;

            message.forEach(function (element, i) {
                if (i == 0) {
                  jsonData.month = message[0].DATA_LOAD_DATE;
                  //jsonData.month = dateUtils.getMonthName(Number(message[0].ACCT_MO));
                  jsonData.year = message[0].ACCT_YR;
                }

                var gp = {
                    label: "",
                    t0: { value: 0, status: "" },
                    t1: { value: 0, status: "" },
                    t2: { value: 0, status: "" },
                    t3: { value: 0, status: "" },
                    total: { value: 0, status: "" }
                };

                var eac = {
                    label: "",
                    t0: { value: 0, status: "" },
                    t1: { value: 0, status: "" },
                    t2: { value: 0, status: "" },
                    t3: { value: 0, status: "" },
                    total: { value: 0, status: "" }
                };

                var cor = {
                    label: "",
                    t0: { value: 0, status: "" },
                    t1: { value: 0, status: "" },
                    t2: { value: 0, status: "" },
                    t3: { value: 0, status: "" },
                    total: { value: 0, status: "" }
                };

                gp.label = element.LABEL;

                var cqApRev = Number(element.T0_CQ_AP_REV)
                  + Number(element.T1_CQ_AP_REV)
                  + Number(element.T2_CQ_AP_REV)
                  + Number(element.T3_CQ_AP_REV);

                gp.t0.value = calcs.calcPercent(element.T0_CQ_GP_LKG,
                  cqApRev);
                gp.t1.value = calcs.calcPercent(element.T1_CQ_GP_LKG,
                  cqApRev);
                gp.t2.value = calcs.calcPercent(element.T2_CQ_GP_LKG,
                  cqApRev);
                gp.t3.value = calcs.calcPercent(element.T3_CQ_GP_LKG,
                  cqApRev);
                gp.total.value = calcs.calcPercent(Number(element.T0_CQ_GP_LKG)
                    + Number(element.T1_CQ_GP_LKG)
                    + Number(element.T2_CQ_GP_LKG)
                    + Number(element.T3_CQ_GP_LKG)
                  , cqApRev);

                gpAccum.T0_CQ_GP_LKG += Number(element.T0_CQ_GP_LKG);
                gpAccum.T1_CQ_GP_LKG += Number(element.T1_CQ_GP_LKG);
                gpAccum.T2_CQ_GP_LKG += Number(element.T2_CQ_GP_LKG);
                gpAccum.T3_CQ_GP_LKG += Number(element.T3_CQ_GP_LKG);
                gpAccum.Tx_CQ_GP_LKG += Number(element.T0_CQ_GP_LKG)
                  + Number(element.T1_CQ_GP_LKG)
                  + Number(element.T2_CQ_GP_LKG)
                  + Number(element.T3_CQ_GP_LKG);
                gpAccum.T0_CQ_AP_REV += cqApRev;
                gpAccum.T1_CQ_AP_REV += cqApRev;
                gpAccum.T2_CQ_AP_REV += cqApRev;
                gpAccum.T3_CQ_AP_REV += cqApRev;
                gpAccum.Tx_CQ_AP_REV += cqApRev;


                var priCqApRev = Number(element.PRI_T0_CQ_AP_REV)
                  + Number(element.PRI_T1_CQ_AP_REV)
                  + Number(element.PRI_T2_CQ_AP_REV)
                  + Number(element.PRI_T3_CQ_AP_REV);
                gp.t0.status = calcs.getStatus(element.PRI_T0_CQ_GP_LKG,
                  priCqApRev,
                  element.T0_CQ_GP_LKG,
                  cqApRev);
                gp.t1.status = calcs.getStatus(element.PRI_T1_CQ_GP_LKG,
                  priCqApRev,
                  element.T1_CQ_GP_LKG,
                  cqApRev);
                gp.t2.status = calcs.getStatus(element.PRI_T2_CQ_GP_LKG,
                  priCqApRev,
                  element.T2_CQ_GP_LKG,
                  cqApRev);
                gp.t3.status = calcs.getStatus(element.PRI_T3_CQ_GP_LKG,
                  priCqApRev,
                  element.T3_CQ_GP_LKG,
                  cqApRev);
                gp.total.status = calcs.getStatus(Number(element.PRI_T0_CQ_GP_LKG)
                    + Number(element.PRI_T1_CQ_GP_LKG)
                    + Number(element.PRI_T2_CQ_GP_LKG)
                    + Number(element.PRI_T3_CQ_GP_LKG)
                  , priCqApRev
                  , Number(element.T0_CQ_GP_LKG)
                    + Number(element.T1_CQ_GP_LKG)
                    + Number(element.T2_CQ_GP_LKG)
                    + Number(element.T3_CQ_GP_LKG)
                  , cqApRev);
                qtrGpLeakage.push(gp);

                eac.label = element.LABEL;

                var tcvPlanRtUsd = Number(element.T0_TCV_PLAN_RT_USD)
                  + Number(element.T1_TCV_PLAN_RT_USD)
                  + Number(element.T2_TCV_PLAN_RT_USD)
                  + Number(element.T3_TCV_PLAN_RT_USD)

                eac.t0.value = calcs.calcPercent(element.T0_EAC_LKG,
                  tcvPlanRtUsd);
                eac.t1.value = calcs.calcPercent(element.T1_EAC_LKG,
                  tcvPlanRtUsd);
                eac.t2.value = calcs.calcPercent(element.T2_EAC_LKG,
                  tcvPlanRtUsd);
                eac.t3.value = calcs.calcPercent(element.T3_EAC_LKG,
                  tcvPlanRtUsd);
                eac.total.value = calcs.calcPercent(Number(element.T0_EAC_LKG)
                    + Number(element.T1_EAC_LKG)
                    + Number(element.T2_EAC_LKG)
                    + Number(element.T3_EAC_LKG)
                  , tcvPlanRtUsd);

                eacAccum.T0_EAC_LKG += Number(element.T0_EAC_LKG);
                eacAccum.T1_EAC_LKG += Number(element.T1_EAC_LKG);
                eacAccum.T2_EAC_LKG += Number(element.T2_EAC_LKG);
                eacAccum.T3_EAC_LKG += Number(element.T3_EAC_LKG);
                eacAccum.Tx_EAC_LKG += Number(element.T0_EAC_LKG)
                  + Number(element.T1_EAC_LKG)
                  + Number(element.T2_EAC_LKG)
                  + Number(element.T3_EAC_LKG);
                eacAccum.T0_TCV_PLAN_RT_USD += tcvPlanRtUsd;
                eacAccum.T1_TCV_PLAN_RT_USD += tcvPlanRtUsd;
                eacAccum.T2_TCV_PLAN_RT_USD += tcvPlanRtUsd;
                eacAccum.T3_TCV_PLAN_RT_USD += tcvPlanRtUsd;
                eacAccum.Tx_TCV_PLAN_RT_USD += tcvPlanRtUsd;

                var priTcvPlanRtUsd = Number(element.PRI_T0_TCV_PLAN_RT_USD)
                  + Number(element.PRI_T1_TCV_PLAN_RT_USD)
                  + Number(element.PRI_T2_TCV_PLAN_RT_USD)
                  + Number(element.PRI_T3_TCV_PLAN_RT_USD)

                eac.t0.status = calcs.getStatus(element.PRI_T0_EAC_LKG,
                  priTcvPlanRtUsd,
                  element.T0_EAC_LKG,
                  tcvPlanRtUsd);
                eac.t1.status = calcs.getStatus(element.PRI_T1_EAC_LKG,
                  priTcvPlanRtUsd,
                  element.T1_EAC_LKG,
                  tcvPlanRtUsd);
                eac.t2.status = calcs.getStatus(element.PRI_T2_EAC_LKG,
                  priTcvPlanRtUsd,
                  element.T2_EAC_LKG,
                  tcvPlanRtUsd);
                eac.t3.status = calcs.getStatus(element.PRI_T3_EAC_LKG,
                  priTcvPlanRtUsd,
                  element.T3_EAC_LKG,
                  tcvPlanRtUsd);
                eac.total.status = calcs.getStatus(Number(element.PRI_T0_EAC_LKG)
                    + Number(element.PRI_T1_EAC_LKG)
                    + Number(element.PRI_T2_EAC_LKG)
                    + Number(element.PRI_T3_EAC_LKG)
                  , priTcvPlanRtUsd
                  , Number(element.T0_EAC_LKG)
                    + Number(element.T1_EAC_LKG)
                    + Number(element.T2_EAC_LKG)
                    + Number(element.T3_EAC_LKG)
                  , tcvPlanRtUsd);
                eacVTargetPlan.push(eac);

                cor.label = element.LABEL;

                var apLast3moCost = Number(element.T0_AP_LAST_3MO_COST)
                  + Number(element.T1_AP_LAST_3MO_COST)
                  + Number(element.T2_AP_LAST_3MO_COST)
                  + Number(element.T3_AP_LAST_3MO_COST)

                cor.t0.value = calcs.calcPercent(element.T0_COST_OVERRUN,
                  apLast3moCost);
                cor.t1.value = calcs.calcPercent(element.T1_COST_OVERRUN,
                  apLast3moCost);
                cor.t2.value = calcs.calcPercent(element.T2_COST_OVERRUN,
                  apLast3moCost);
                cor.t3.value = calcs.calcPercent(element.T3_COST_OVERRUN,
                  apLast3moCost);
                cor.total.value = calcs.calcPercent(Number(element.T0_COST_OVERRUN)
                    + Number(element.T1_COST_OVERRUN)
                    + Number(element.T2_COST_OVERRUN)
                    + Number(element.T3_COST_OVERRUN)
                  , apLast3moCost);

                corAccum.T0_COST_OVERRUN += Number(element.T0_COST_OVERRUN);
                corAccum.T1_COST_OVERRUN += Number(element.T1_COST_OVERRUN);
                corAccum.T2_COST_OVERRUN += Number(element.T2_COST_OVERRUN);
                corAccum.T3_COST_OVERRUN += Number(element.T3_COST_OVERRUN);
                corAccum.Tx_COST_OVERRUN += Number(element.T0_COST_OVERRUN)
                  + Number(element.T1_COST_OVERRUN)
                  + Number(element.T2_COST_OVERRUN)
                  + Number(element.T3_COST_OVERRUN);
                corAccum.T0_AP_LAST_3MO_COST += apLast3moCost;
                corAccum.T1_AP_LAST_3MO_COST += apLast3moCost;
                corAccum.T2_AP_LAST_3MO_COST += apLast3moCost;
                corAccum.T3_AP_LAST_3MO_COST += apLast3moCost;
                corAccum.Tx_AP_LAST_3MO_COST += apLast3moCost;

                var priApLast3moCost = Number(element.PRI_T0_AP_LAST_3MO_COST)
                  + Number(element.PRI_T1_AP_LAST_3MO_COST)
                  + Number(element.PRI_T2_AP_LAST_3MO_COST)
                  + Number(element.PRI_T3_AP_LAST_3MO_COST)

                cor.t0.status = calcs.getStatus(element.PRI_T0_COST_OVERRUN,
                  priApLast3moCost,
                  element.T0_COST_OVERRUN,
                  apLast3moCost,
                  [-.1, -.2]);
                cor.t1.status = calcs.getStatus(element.PRI_T1_COST_OVERRUN,
                  priApLast3moCost,
                  element.T1_COST_OVERRUN,
                  apLast3moCost,
                  [-.1, -.2]);
                cor.t2.status = calcs.getStatus(element.PRI_T2_COST_OVERRUN,
                  priApLast3moCost,
                  element.T2_COST_OVERRUN,
                  apLast3moCost,
                  [-.1, -.2]);
                cor.t3.status = calcs.getStatus(element.PRI_T3_COST_OVERRUN,
                  priApLast3moCost,
                  element.T3_COST_OVERRUN,
                  apLast3moCost,
                  [-.1, -.2]);
                cor.total.status = calcs.getStatus(Number(element.PRI_T0_COST_OVERRUN)
                    + Number(element.PRI_T1_COST_OVERRUN)
                    + Number(element.PRI_T2_COST_OVERRUN)
                    + Number(element.PRI_T3_COST_OVERRUN)
                  , priApLast3moCost
                  , Number(element.T0_COST_OVERRUN)
                    + Number(element.T1_COST_OVERRUN)
                    + Number(element.T2_COST_OVERRUN)
                    + Number(element.T3_COST_OVERRUN)
                  , apLast3moCost
                  , [-.1, -.2]);

                costOverrun.push(cor);

            }, this);

            var gpAccumStruc = {
                label: "Total",
                t0: { value: calcs.calcPercent(gpAccum.T0_CQ_GP_LKG, gpAccum.T0_CQ_AP_REV) },
                t1: { value: calcs.calcPercent(gpAccum.T1_CQ_GP_LKG, gpAccum.T1_CQ_AP_REV) },
                t2: { value: calcs.calcPercent(gpAccum.T2_CQ_GP_LKG, gpAccum.T2_CQ_AP_REV) },
                t3: { value: calcs.calcPercent(gpAccum.T3_CQ_GP_LKG, gpAccum.T3_CQ_AP_REV) },
                total: { value: calcs.calcPercent(gpAccum.Tx_CQ_GP_LKG, gpAccum.Tx_CQ_AP_REV) }
            };
            qtrGpLeakage.push(gpAccumStruc);

            var eacAccumStruc = {
                label: "Total",
                t0: { value: calcs.calcPercent(eacAccum.T0_EAC_LKG, eacAccum.T0_TCV_PLAN_RT_USD) },
                t1: { value: calcs.calcPercent(eacAccum.T1_EAC_LKG, eacAccum.T1_TCV_PLAN_RT_USD) },
                t2: { value: calcs.calcPercent(eacAccum.T2_EAC_LKG, eacAccum.T2_TCV_PLAN_RT_USD) },
                t3: { value: calcs.calcPercent(eacAccum.T3_EAC_LKG, eacAccum.T3_TCV_PLAN_RT_USD) },
                total: { value: calcs.calcPercent(eacAccum.Tx_EAC_LKG, eacAccum.Tx_TCV_PLAN_RT_USD) }
            };
            eacVTargetPlan.push(eacAccumStruc);

            var corAccumStruc = {
                label: "Total",
                t0: { value: calcs.calcPercent(corAccum.T0_COST_OVERRUN, corAccum.T0_AP_LAST_3MO_COST) },
                t1: { value: calcs.calcPercent(corAccum.T1_COST_OVERRUN, corAccum.T1_AP_LAST_3MO_COST) },
                t2: { value: calcs.calcPercent(corAccum.T2_COST_OVERRUN, corAccum.T2_AP_LAST_3MO_COST) },
                t3: { value: calcs.calcPercent(corAccum.T3_COST_OVERRUN, corAccum.T3_AP_LAST_3MO_COST) },
                total: { value: calcs.calcPercent(corAccum.Tx_COST_OVERRUN, corAccum.Tx_AP_LAST_3MO_COST) }
            };
            costOverrun.push(corAccumStruc);

            jsonData.data.push({ "qtrGpLeakage": qtrGpLeakage });
            jsonData.data.push({ "eacVTargetPlan": eacVTargetPlan });
            jsonData.data.push({ "costOverrun": costOverrun });
} catch(e) {
  jsonData = {"msg": e.message}
}
            cb(err, jsonData);
        });
    };

    T2reporttieredleakagepercentage.remoteMethod('processChild', {
        http: { path: '/', verb: 'get', status: 200 },
        accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
        { arg: 'filter', type: 'object' }],
        returns: { arg: 't2ReportTieredLeakagePercentage', type: 'object' }
    });

};
