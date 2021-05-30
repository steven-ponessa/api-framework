'use strict';
var util = require('util');
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T1tieredleakage) {

    T1tieredleakage.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }

            var valueDecimalPlace = 2;
            var percentDecimalPlace = 2;
            var myJson = {};

            if(message.length > 0) { //Avoid processing an empty result set

              var m = message[0];
              var category = message[0].CATEGORY;
              var date = message[0].DATA_LOAD_DATE;

              myJson = {category: category,
                            date: date,
                            tier0_label: "Tier 0",
                            tier0_color: "#DFEEFF",
                            tier1_label: "Tier 1",
                            tier1_color: "#87C3F8",
                            tier2_label: "Tier 2",
                            tier2_color: "#0292FC",
                            tier3_label: "Tier 3",
                            tier3_color: "#FFB400",
                           data:[
                           {label:"CQ to AP",
                            t0: {value: 0, percent: 0, status: ""},
                            t1: {value: 0, percent: 0, status: ""},
                            t2: {value: 0, percent: 0, status: ""},
                            t3: {value: 0, percent: 0, status: ""},
                            total: {value: 0, percent: 0, status: ""}},
                           {label:"FC EaC to AP",
                            t0: {value: 0, percent: 0, status: ""},
                            t1: {value: 0, percent: 0, status: ""},
                            t2: {value: 0, percent: 0, status: ""},
                            t3: {value: 0, percent: 0, status: ""},
                            total: {value: 0, percent: 0, status: ""}},
                           {label:"3 Mo. Cost Overrun",
                            t0: {value: 0, percent: 0, status: ""},
                            t1: {value: 0, percent: 0, status: ""},
                            t2: {value: 0, percent: 0, status: ""},
                            t3: {value: 0, percent: 0, status: ""},
                            total: {value: 0, percent: 0, status: ""}}
                           ]};

              myJson.data[0].t0.value = (m.T0_QTR_GP_LKG);
              myJson.data[0].t1.value = (m.T1_QTR_GP_LKG);
              myJson.data[0].t2.value = (m.T2_QTR_GP_LKG);
              myJson.data[0].t3.value = (m.T3_QTR_GP_LKG);
              myJson.data[0].total.value = calcs.formatAmount(Number(myJson.data[0].t0.value) +
                Number(myJson.data[0].t1.value) +
                Number(myJson.data[0].t2.value) +
                Number(myJson.data[0].t3.value));

              var cqRev = Number(m.T0_CQ_REV)
                  + Number(m.T1_CQ_REV)
                  + Number(m.T2_CQ_REV)
                  + Number(m.T3_CQ_REV);

              myJson.data[0].t0.percent = calcs.calcPercent(m.T0_QTR_GP_LKG, cqRev, percentDecimalPlace);
              myJson.data[0].t1.percent = calcs.calcPercent(m.T1_QTR_GP_LKG, cqRev, percentDecimalPlace);
              myJson.data[0].t2.percent = calcs.calcPercent(m.T2_QTR_GP_LKG, cqRev, percentDecimalPlace);
              myJson.data[0].t3.percent = calcs.calcPercent(m.T3_QTR_GP_LKG, cqRev, percentDecimalPlace);
              myJson.data[0].total.percent = calcs.calcPercent(Number(m.T0_QTR_GP_LKG)
                  + Number(m.T1_QTR_GP_LKG)
                  + Number(m.T2_QTR_GP_LKG)
                  + Number(m.T3_QTR_GP_LKG),
                cqRev,
                percentDecimalPlace);

              myJson.data[0].t0.status = calcs.getStatusNoColor(m.T0_QTR_GP_LKG_PRI_MTH, m.T0_CQ_REV_PRI_MTH, m.T0_QTR_GP_LKG, cqRev);
              myJson.data[0].t1.status = calcs.getStatusNoColor(m.T1_QTR_GP_LKG_PRI_MTH, m.T1_CQ_REV_PRI_MTH, m.T1_QTR_GP_LKG, cqRev);
              myJson.data[0].t2.status = calcs.getStatusNoColor(m.T2_QTR_GP_LKG_PRI_MTH, m.T2_CQ_REV_PRI_MTH, m.T2_QTR_GP_LKG, cqRev);
              myJson.data[0].t3.status = calcs.getStatusNoColor(m.T3_QTR_GP_LKG_PRI_MTH, m.T3_CQ_REV_PRI_MTH, m.T3_QTR_GP_LKG, cqRev);
              myJson.data[0].total.status = calcs.getStatusNoColor(
                m.T0_QTR_GP_LKG_PRI_MTH
                  + m.T1_QTR_GP_LKG_PRI_MTH
                  + m.T2_QTR_GP_LKG_PRI_MTH
                  + m.T3_QTR_GP_LKG_PRI_MTH,
                m.T0_CQ_REV_PRI_MTH
                  + m.T1_CQ_REV_PRI_MTH
                  + m.T2_CQ_REV_PRI_MTH
                  + m.T3_CQ_REV_PRI_MTH,
                m.T0_QTR_GP_LKG
                  + m.T1_QTR_GP_LKG
                  + m.T2_QTR_GP_LKG
                  + m.T3_QTR_GP_LKG,
                cqRev);



              myJson.data[1].t0.value=(m.T0_EAC_LKG);
              myJson.data[1].t1.value=(m.T1_EAC_LKG);
              myJson.data[1].t2.value=(m.T2_EAC_LKG);
              myJson.data[1].t3.value=(m.T3_EAC_LKG);
              myJson.data[1].total.value = calcs.formatAmount(Number(myJson.data[1].t0.value) +
                Number(myJson.data[1].t1.value) +
                Number(myJson.data[1].t2.value) +
                Number(myJson.data[1].t3.value));

              var tcvPlanRtUsd = Number(m.T0_TCV_PLAN_RT_USD)
                + Number(m.T1_TCV_PLAN_RT_USD)
                + Number(m.T2_TCV_PLAN_RT_USD)
                + Number(m.T3_TCV_PLAN_RT_USD);

              myJson.data[1].t0.percent=calcs.calcPercent(m.T0_EAC_LKG, tcvPlanRtUsd, percentDecimalPlace);
              myJson.data[1].t1.percent=calcs.calcPercent(m.T1_EAC_LKG, tcvPlanRtUsd, percentDecimalPlace);
              myJson.data[1].t2.percent=calcs.calcPercent(m.T2_EAC_LKG, tcvPlanRtUsd, percentDecimalPlace);
              myJson.data[1].t3.percent=calcs.calcPercent(m.T3_EAC_LKG, tcvPlanRtUsd, percentDecimalPlace);
              myJson.data[1].total.percent=calcs.calcPercent(Number(m.T0_EAC_LKG)
                  + Number(m.T1_EAC_LKG)
                  + Number(m.T2_EAC_LKG)
                  + Number(m.T3_EAC_LKG),
                tcvPlanRtUsd,
                percentDecimalPlace);

              myJson.data[1].t0.status=calcs.getStatusNoColor(m.T0_EAC_LKG_PRI_MTH, m.T0_TCV_PLAN_RT_USD_PRI_MTH, m.T0_EAC_LKG, tcvPlanRtUsd);
              myJson.data[1].t1.status=calcs.getStatusNoColor(m.T1_EAC_LKG_PRI_MTH, m.T1_TCV_PLAN_RT_USD_PRI_MTH, m.T1_EAC_LKG, tcvPlanRtUsd);
              myJson.data[1].t2.status=calcs.getStatusNoColor(m.T2_EAC_LKG_PRI_MTH, m.T2_TCV_PLAN_RT_USD_PRI_MTH, m.T2_EAC_LKG, tcvPlanRtUsd);
              myJson.data[1].t3.status=calcs.getStatusNoColor(m.T3_EAC_LKG_PRI_MTH, m.T3_TCV_PLAN_RT_USD_PRI_MTH, m.T3_EAC_LKG, tcvPlanRtUsd);
              myJson.data[1].total.status = calcs.getStatusNoColor(
                m.T0_EAC_LKG_PRI_MTH
                  + m.T1_EAC_LKG_PRI_MTH
                  + m.T2_EAC_LKG_PRI_MTH
                  + m.T3_EAC_LKG_PRI_MTH,
                m.T0_TCV_PLAN_RT_USD_PRI_MTH
                  + m.T1_TCV_PLAN_RT_USD_PRI_MTH
                  + m.T2_TCV_PLAN_RT_USD_PRI_MTH
                  + m.T3_TCV_PLAN_RT_USD_PRI_MTH,
                m.T0_EAC_LKG
                  + m.T1_EAC_LKG
                  + m.T2_EAC_LKG
                  + m.T3_EAC_LKG,
                tcvPlanRtUsd);



              myJson.data[2].t0.value = (m.T0_COST_OVERRUN);
              myJson.data[2].t1.value = (m.T1_COST_OVERRUN);
              myJson.data[2].t2.value = (m.T2_COST_OVERRUN);
              myJson.data[2].t3.value = (m.T3_COST_OVERRUN);
              myJson.data[2].total.value = calcs.formatAmount(Number(myJson.data[2].t0.value) +
                Number(myJson.data[2].t1.value) +
                Number(myJson.data[2].t2.value) +
                Number(myJson.data[2].t3.value));

              var last3moCostPlan = Number(m.T0_LAST_3MO_COST_PLAN)
                + Number(m.T1_LAST_3MO_COST_PLAN)
                + Number(m.T2_LAST_3MO_COST_PLAN)
                + Number(m.T3_LAST_3MO_COST_PLAN);

              myJson.data[2].t0.percent = calcs.calcPercent(m.T0_COST_OVERRUN, last3moCostPlan, percentDecimalPlace);
              myJson.data[2].t1.percent = calcs.calcPercent(m.T1_COST_OVERRUN, last3moCostPlan, percentDecimalPlace);
              myJson.data[2].t2.percent = calcs.calcPercent(m.T2_COST_OVERRUN, last3moCostPlan, percentDecimalPlace);
              myJson.data[2].t3.percent = calcs.calcPercent(m.T3_COST_OVERRUN, last3moCostPlan, percentDecimalPlace);
              myJson.data[2].total.percent = calcs.calcPercent(Number(m.T0_COST_OVERRUN)
                  + Number(m.T1_COST_OVERRUN)
                  + Number(m.T2_COST_OVERRUN)
                  + Number(m.T3_COST_OVERRUN),
                last3moCostPlan,
                percentDecimalPlace);

              myJson.data[2].t0.status=calcs.getStatusNoColor(m.T0_COST_OVERRUN_PRI_MTH, m.T0_LAST_3MO_COST_PLAN_PRI_MTH, m.T0_COST_OVERRUN, last3moCostPlan, [-.1, -.2]);
              myJson.data[2].t1.status=calcs.getStatusNoColor(m.T1_COST_OVERRUN_PRI_MTH, m.T1_LAST_3MO_COST_PLAN_PRI_MTH, m.T1_COST_OVERRUN, last3moCostPlan, [-.1, -.2]);
              myJson.data[2].t2.status=calcs.getStatusNoColor(m.T2_COST_OVERRUN_PRI_MTH, m.T2_LAST_3MO_COST_PLAN_PRI_MTH, m.T2_COST_OVERRUN, last3moCostPlan, [-.1, -.2]);
              myJson.data[2].t3.status=calcs.getStatusNoColor(m.T3_COST_OVERRUN_PRI_MTH, m.T3_LAST_3MO_COST_PLAN_PRI_MTH, m.T3_COST_OVERRUN, last3moCostPlan, [-.1, -.2]);
              myJson.data[2].total.status = calcs.getStatusNoColor(
                m.T0_COST_OVERRUN_PRI_MTH
                  + m.T1_COST_OVERRUN_PRI_MTH
                  + m.T2_COST_OVERRUN_PRI_MTH
                  + m.T3_COST_OVERRUN_PRI_MTH,
                m.T0_LAST_3MO_COST_PLAN_PRI_MTH
                  + m.T1_LAST_3MO_COST_PLAN_PRI_MTH
                  + m.T2_LAST_3MO_COST_PLAN_PRI_MTH
                  + m.T3_LAST_3MO_COST_PLAN_PRI_MTH,
                m.T0_COST_OVERRUN
                  + m.T1_COST_OVERRUN
                  + m.T2_COST_OVERRUN
                  + m.T3_COST_OVERRUN,
                last3moCostPlan,
                [-.1, -.2]);
            }

            cb(err, myJson);
        });
    };

    T1tieredleakage.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't1TieredLeakage', type: 'object'}
    });

};
