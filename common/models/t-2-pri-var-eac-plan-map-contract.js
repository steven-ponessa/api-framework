'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2privareacplanmapcontract) {
  T2privareacplanmapcontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
      try {

        var formatedJson = {};
        var dateValue = '';
          if(message.length > 0) { //Avoid processing a empty result set

            switch (message[0].LNCH_FLG) {
              case 0:
                  dateValue =  message[0].DATA_LOAD_DESC; //Delivery model
                  break;
              default:
                  dateValue =  message[0].LNCH_DATE;  //Launch model
                  break;                    
            };

              formatedJson = {
              "label": "Inverted Variance EaC to Plan GP%",
              "pri_date":dateValue,
              "value": "var_eac_to_plan",
              "color": "#E3ECEC"
            }
  
            formatedJson.data = [];
  
            let colorIndex  = 0;

              for (var i = 0; i < message.length; i++) {

                formatedJson.data.push({
                  "cntrct_nbr":message[i].CNTRCT_NUM,                    
                  "client_nm":message[i].GBG_NM,
                  "cntrct_desc":message[i].CNTRCT_DESC,
                  "bus_attr":message[i].BUS_ATTR,
                  "geo_desc":message[i].GEO_LVL1_NM,
                  "mkt_desc":message[i].GEO_LVL2_NM,
                  "growth_platform_desc":message[i].GRTH_PLFM_DESC,
                  "svc_line_desc":message[i].SVC_LINE_NM,
                  "sector_desc":message[i].SCTR_GB_NM,
                  "industry_desc":message[i].INDSTRY_CMR_NM,
                  "practice_nm":message[i].PRACTICE_NM,
                  "overall_risk":calcs.formatAmount(message[i].OVERALL_RISK),
                  "etc_gp":calcs.calcValue(message[i].ETC_GP),
                  "var_eac_plan_gp_pct":calcs.calcX100(message[i].VAR_EAC_PLAN_GP_PCT)
                });
          };
      };  // end if no data

    } catch (e) {
      formatedJson = {"msg" : e.message}
    }

      cb(err, formatedJson);
    });
};

  T2privareacplanmapcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriVarEacPlanMapContract', type: 'object'}
  });
};

