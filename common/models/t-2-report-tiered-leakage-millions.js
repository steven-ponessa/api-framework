'use strict';
var util = require('util');
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function (T2reporttieredleakagemillions) {

    T2reporttieredleakagemillions.processChild = function (req, filter, cb) {
        this.process(req, filter, function (err, message) {
          if (err) {
            return cb(err, null);
        }
try {
            var jsonData = {};
            //jsonData.month = dateUtils.getMonthName(Number(message[0].ACCT_MO));
            jsonData.month =message[0].DATA_LOAD_DATE;
            jsonData.year = message[0].ACCT_YR;
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

            var eacAccum = {};
            eacAccum.T0_EAC_LKG = 0.0;
            eacAccum.T1_EAC_LKG = 0.0;
            eacAccum.T2_EAC_LKG = 0.0;
            eacAccum.T3_EAC_LKG = 0.0;
            eacAccum.Tx_EAC_LKG = 0.0;

            var corAccum = {};
            corAccum.T0_COST_OVERRUN = 0.0;
            corAccum.T1_COST_OVERRUN = 0.0;
            corAccum.T2_COST_OVERRUN = 0.0;
            corAccum.T3_COST_OVERRUN = 0.0;
            corAccum.Tx_COST_OVERRUN = 0.0;

            message.forEach(function (element) {
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
                gp.t0.value = calcs.calcValue(element.T0_CQ_GP_LKG);
                gp.t1.value = calcs.calcValue(element.T1_CQ_GP_LKG);
                gp.t2.value = calcs.calcValue(element.T2_CQ_GP_LKG);
                gp.t3.value = calcs.calcValue(element.T3_CQ_GP_LKG);
                // gp.total.value = calcs.calcValue(Number(element.T0_CQ_GP_LKG)
                //   + Number(element.T1_CQ_GP_LKG)
                //   + Number(element.T2_CQ_GP_LKG)
                //   + Number(element.T3_CQ_GP_LKG));
                gp.total.value = calcs.formatAmount(Number(gp.t0.value) + Number(gp.t1.value) + Number(gp.t2.value) + Number(gp.t3.value));


                gpAccum.T0_CQ_GP_LKG = calcs.formatAmount(Number(gpAccum.T0_CQ_GP_LKG) + Number(gp.t0.value)); //Number(element.T0_CQ_GP_LKG);
                gpAccum.T1_CQ_GP_LKG = calcs.formatAmount(Number(gpAccum.T1_CQ_GP_LKG) + Number(gp.t1.value)); //Number(element.T1_CQ_GP_LKG);
                gpAccum.T2_CQ_GP_LKG = calcs.formatAmount(Number(gpAccum.T2_CQ_GP_LKG) + Number(gp.t2.value)); //Number(element.T2_CQ_GP_LKG);
                gpAccum.T3_CQ_GP_LKG = calcs.formatAmount(Number(gpAccum.T3_CQ_GP_LKG) + Number(gp.t3.value)); //Number(element.T3_CQ_GP_LKG);
                gpAccum.Tx_CQ_GP_LKG = calcs.formatAmount(Number(gpAccum.Tx_CQ_GP_LKG)
                  + Number(gp.t0.value) //Number(element.T0_CQ_GP_LKG)
                  + Number(gp.t1.value) //Number(element.T1_CQ_GP_LKG)
                  + Number(gp.t2.value) //Number(element.T2_CQ_GP_LKG)
                  + Number(gp.t3.value)); //Number(element.T3_CQ_GP_LKG);

                var cqApRev = Number(element.T0_CQ_AP_REV)
                  + Number(element.T1_CQ_AP_REV)
                  + Number(element.T2_CQ_AP_REV)
                  + Number(element.T3_CQ_AP_REV);

                gp.t0.status = calcs.getMillionsStatus(element.T0_CQ_GP_LKG,
                  element.PRI_T0_CQ_GP_LKG,
                  cqApRev);
                gp.t1.status = calcs.getMillionsStatus(element.T1_CQ_GP_LKG,
                  element.PRI_T1_CQ_GP_LKG,
                  cqApRev);
                gp.t2.status = calcs.getMillionsStatus(element.T2_CQ_GP_LKG,
                  element.PRI_T2_CQ_GP_LKG,
                  cqApRev);
                gp.t3.status = calcs.getMillionsStatus(element.T3_CQ_GP_LKG,
                  element.PRI_T3_CQ_GP_LKG,
                  cqApRev);

                gp.total.status = calcs.getMillionsStatus(Number(element.T0_CQ_GP_LKG)
                    + Number(element.T1_CQ_GP_LKG)
                    + Number(element.T2_CQ_GP_LKG)
                    + Number(element.T3_CQ_GP_LKG)
                  , Number(element.PRI_T0_CQ_GP_LKG)
                    + Number(element.PRI_T1_CQ_GP_LKG)
                    + Number(element.PRI_T2_CQ_GP_LKG)
                    + Number(element.PRI_T3_CQ_GP_LKG)
                  , cqApRev);
                qtrGpLeakage.push(gp);

                eac.label = element.LABEL;
                eac.t0.value = calcs.calcValue(element.T0_EAC_LKG);
                eac.t1.value = calcs.calcValue(element.T1_EAC_LKG);
                eac.t2.value = calcs.calcValue(element.T2_EAC_LKG);
                eac.t3.value = calcs.calcValue(element.T3_EAC_LKG);
                // eac.total.value = calcs.calcValue(Number(element.T0_EAC_LKG)
                //   + Number(element.T1_EAC_LKG)
                //   + Number(element.T2_EAC_LKG)
                //   + Number(element.T3_EAC_LKG));
                eac.total.value = calcs.formatAmount(Number(eac.t0.value) + Number(eac.t1.value) + Number(eac.t2.value) + Number(eac.t3.value));

                eacAccum.T0_EAC_LKG = calcs.formatAmount(Number(eacAccum.T0_EAC_LKG) + Number(eac.t0.value)); //Number(element.T0_EAC_LKG);
                eacAccum.T1_EAC_LKG = calcs.formatAmount(Number(eacAccum.T1_EAC_LKG) + Number(eac.t1.value)); //Number(element.T1_EAC_LKG);
                eacAccum.T2_EAC_LKG = calcs.formatAmount(Number(eacAccum.T2_EAC_LKG) + Number(eac.t2.value)); //Number(element.T2_EAC_LKG);
                eacAccum.T3_EAC_LKG = calcs.formatAmount(Number(eacAccum.T3_EAC_LKG) + Number(eac.t3.value)); //Number(element.T3_EAC_LKG);
                eacAccum.Tx_EAC_LKG = calcs.formatAmount(Number(eacAccum.Tx_EAC_LKG)
                  + Number(eac.t0.value) //Number(element.T0_EAC_LKG)
                  + Number(eac.t1.value) //Number(element.T1_EAC_LKG)
                  + Number(eac.t2.value) //Number(element.T2_EAC_LKG)
                  + Number(eac.t3.value)); //Number(element.T3_EAC_LKG);




                var tcvPlanRtUsd = Number(element.T0_TCV_PLAN_RT_USD)
                    + Number(element.T1_TCV_PLAN_RT_USD)
                    + Number(element.T2_TCV_PLAN_RT_USD)
                    + Number(element.T3_TCV_PLAN_RT_USD);

                eac.t0.status = calcs.getMillionsStatus(element.T0_EAC_LKG,
                  element.PRI_T0_EAC_LKG,
                  tcvPlanRtUsd);
                eac.t1.status = calcs.getMillionsStatus(element.T1_EAC_LKG,
                  element.PRI_T1_EAC_LKG,
                  tcvPlanRtUsd);
                eac.t2.status = calcs.getMillionsStatus(element.T2_EAC_LKG,
                  element.PRI_T2_EAC_LKG,
                  tcvPlanRtUsd);
                eac.t3.status = calcs.getMillionsStatus(element.T3_EAC_LKG,
                  element.PRI_T3_EAC_LKG,
                  tcvPlanRtUsd);
                eac.total.status = calcs.getMillionsStatus(Number(element.T0_EAC_LKG)
                    + Number(element.T1_EAC_LKG)
                    + Number(element.T2_EAC_LKG)
                    + Number(element.T3_EAC_LKG)
                  , Number(element.PRI_T0_EAC_LKG)
                    + Number(element.PRI_T1_EAC_LKG)
                    + Number(element.PRI_T2_EAC_LKG)
                    + Number(element.PRI_T3_EAC_LKG)
                  , tcvPlanRtUsd);
                eacVTargetPlan.push(eac);

                cor.label = element.LABEL;
                cor.t0.value = calcs.calcValue(element.T0_COST_OVERRUN);
                cor.t1.value = calcs.calcValue(element.T1_COST_OVERRUN);
                cor.t2.value = calcs.calcValue(element.T2_COST_OVERRUN);
                cor.t3.value = calcs.calcValue(element.T3_COST_OVERRUN);
                // cor.total.value = calcs.calcValue(Number(element.T0_COST_OVERRUN)
                //   + Number(element.T1_COST_OVERRUN)
                //   + Number(element.T2_COST_OVERRUN)
                //   + Number(element.T3_COST_OVERRUN));
                cor.total.value = calcs.formatAmount(Number(cor.t0.value) + Number(cor.t1.value) + Number(cor.t2.value) + Number(cor.t3.value));

                corAccum.T0_COST_OVERRUN = calcs.formatAmount(Number(corAccum.T0_COST_OVERRUN) + Number(cor.t0.value)); //Number(element.T0_COST_OVERRUN);
                corAccum.T1_COST_OVERRUN = calcs.formatAmount(Number(corAccum.T1_COST_OVERRUN) + Number(cor.t1.value)); //Number(element.T1_COST_OVERRUN);
                corAccum.T2_COST_OVERRUN = calcs.formatAmount(Number(corAccum.T2_COST_OVERRUN) + Number(cor.t2.value)); //Number(element.T2_COST_OVERRUN);
                corAccum.T3_COST_OVERRUN = calcs.formatAmount(Number(corAccum.T3_COST_OVERRUN) + Number(cor.t3.value)); //Number(element.T3_COST_OVERRUN);
                corAccum.Tx_COST_OVERRUN = calcs.formatAmount(Number(corAccum.Tx_COST_OVERRUN)
                  + Number(cor.t0.value) //Number(element.T0_COST_OVERRUN)
                  + Number(cor.t1.value) //Number(element.T1_COST_OVERRUN)
                  + Number(cor.t2.value) //Number(element.T2_COST_OVERRUN)
                  + Number(cor.t3.value)); //Number(element.T3_COST_OVERRUN);

                var apLast3moCost = Number(element.T0_AP_LAST_3MO_COST)
                  + Number(element.T1_AP_LAST_3MO_COST)
                  + Number(element.T2_AP_LAST_3MO_COST)
                  + Number(element.T3_AP_LAST_3MO_COST);

                cor.t0.status = calcs.getMillionsStatus(element.T0_COST_OVERRUN,
                  element.PRI_T0_COST_OVERRUN,
                  apLast3moCost,
                  [-.1, -.2]);
                cor.t1.status = calcs.getMillionsStatus(element.T1_COST_OVERRUN,
                  element.PRI_T1_COST_OVERRUN,
                  apLast3moCost,
                  [-.1, -.2]);
                cor.t2.status = calcs.getMillionsStatus(element.T2_COST_OVERRUN,
                  element.PRI_T2_COST_OVERRUN,
                  apLast3moCost,
                  [-.1, -.2]);
                cor.t3.status = calcs.getMillionsStatus(element.T3_COST_OVERRUN,
                  element.PRI_T3_COST_OVERRUN,
                  apLast3moCost,
                  [-.1, -.2]);
                cor.total.status = calcs.getMillionsStatus(Number(element.T0_COST_OVERRUN)
                    + Number(element.T1_COST_OVERRUN)
                    + Number(element.T2_COST_OVERRUN)
                    + Number(element.T3_COST_OVERRUN)
                  , Number(element.PRI_T0_COST_OVERRUN)
                    + Number(element.PRI_T1_COST_OVERRUN)
                    + Number(element.PRI_T2_COST_OVERRUN)
                    + Number(element.PRI_T3_COST_OVERRUN)
                  , apLast3moCost
                  , [-.1, -.2]);

                costOverrun.push(cor);

            }, this);

            // var gpAccum = {
            //     label: "Total",
            //     t0: { value: calcs.calcValue(gpAccum.T0_CQ_GP_LKG) },
            //     t1: { value: calcs.calcValue(gpAccum.T1_CQ_GP_LKG) },
            //     t2: { value: calcs.calcValue(gpAccum.T2_CQ_GP_LKG)  },
            //     t3: { value: calcs.calcValue(gpAccum.T3_CQ_GP_LKG)  },
            //     //total: { value: calcs.calcValue(gpAccum.Tx_CQ_GP_LKG)  }
            //     total: { value: calcs.calcValue(gpAccum.T0_CQ_GP_LKG)+calcs.calcValue(gpAccum.T1_CQ_GP_LKG)+calcs.calcValue(gpAccum.T2_CQ_GP_LKG)+calcs.calcValue(gpAccum.T3_CQ_GP_LKG)}
            // };
            var gpAccum = {
              label: "Total",
              t0: { value: gpAccum.T0_CQ_GP_LKG },
              t1: { value: gpAccum.T1_CQ_GP_LKG },
              t2: { value: gpAccum.T2_CQ_GP_LKG },
              t3: { value: gpAccum.T3_CQ_GP_LKG },
              total: { value: gpAccum.Tx_CQ_GP_LKG }
              //total: { value: calcs.calcValue(gpAccum.Tx_CQ_GP_LKG)  }
              //total: { value: calcs.calcValue(gpAccum.T0_CQ_GP_LKG)+calcs.calcValue(gpAccum.T1_CQ_GP_LKG)+calcs.calcValue(gpAccum.T2_CQ_GP_LKG)+calcs.calcValue(gpAccum.T3_CQ_GP_LKG)}
          };
            qtrGpLeakage.push(gpAccum);

            // var eacAccum = {
            //     label: "Total",
            //     t0: { value: calcs.calcValue(eacAccum.T0_EAC_LKG) },
            //     t1: { value: calcs.calcValue(eacAccum.T1_EAC_LKG) },
            //     t2: { value: calcs.calcValue(eacAccum.T2_EAC_LKG)  },
            //     t3: { value: calcs.calcValue(eacAccum.T3_EAC_LKG)  },
            //     //total: { value: calcs.calcValue(eacAccum.Tx_EAC_LKG)  }
            //     total: { value: calcs.calcValue(eacAccum.T0_EAC_LKG)+calcs.calcValue(eacAccum.T1_EAC_LKG)+calcs.calcValue(eacAccum.T2_EAC_LKG)+calcs.calcValue(eacAccum.T3_EAC_LKG)  }
            // };
            var eacAccum = {
              label: "Total",
              t0: { value: eacAccum.T0_EAC_LKG },
              t1: { value: eacAccum.T1_EAC_LKG },
              t2: { value: eacAccum.T2_EAC_LKG },
              t3: { value: eacAccum.T3_EAC_LKG },
              total: { value: eacAccum.Tx_EAC_LKG }
              //total: { value: calcs.calcValue(eacAccum.T0_EAC_LKG)+calcs.calcValue(eacAccum.T1_EAC_LKG)+calcs.calcValue(eacAccum.T2_EAC_LKG)+calcs.calcValue(eacAccum.T3_EAC_LKG)  }
          };
            eacVTargetPlan.push(eacAccum);

            var corAccum = {
                label: "Total",
                t0: { value: corAccum.T0_COST_OVERRUN },
                t1: { value: corAccum.T1_COST_OVERRUN },
                t2: { value: corAccum.T2_COST_OVERRUN },
                t3: { value: corAccum.T3_COST_OVERRUN },
                total: { value: corAccum.Tx_COST_OVERRUN }
                //total: { value: calcs.calcValue(corAccum.T0_COST_OVERRUN)+calcs.calcValue(corAccum.T1_COST_OVERRUN)+calcs.calcValue(corAccum.T2_COST_OVERRUN)+calcs.calcValue(corAccum.T3_COST_OVERRUN)  }
            };
            costOverrun.push(corAccum);

            jsonData.data.push({ "qtrGpLeakage": qtrGpLeakage });
            jsonData.data.push({ "eacVTargetPlan": eacVTargetPlan });
            jsonData.data.push({ "costOverrun": costOverrun });
} catch (e) {
  jsonData = {"msg" : e.message};
}
            cb(err, jsonData);
        });
    };

    T2reporttieredleakagemillions.remoteMethod('processChild', {
        http: { path: '/', verb: 'get', status: 200 },
        accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
        { arg: 'filter', type: 'object' }],
        returns: { arg: 't2ReportTieredLeakageMillions', type: 'object' }
    });

};
