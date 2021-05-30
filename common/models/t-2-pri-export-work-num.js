'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2priexportworknum) {
  T2priexportworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }

    try {

          var formatedJson = {};

          if (message.length <= 0) {
                formatedJson = {};
            } else {

              var modelValue = '';
              switch (message[0].LNCH_IND) { 
                case "No":
                    modelValue = "Projects in delivery ( > 60 days )";
                    break;
                default:
                    modelValue = "Projects launched in the last 60 days";
                    break;
              };
        
              var levelValue = 'Work Number';
        /*       switch (message[0].expType) { 
                case "C":
                  levelValue = "Contract";
                    break;
                default:
                  levelValue = "Work Number";
                    break;
              }; */
        
              var targetValue = '';
              switch (message[0].TRGT_PLAN) { 
                case "APRVD":
                targetValue = "Approved Plan";
                    break;
                default:
                targetValue = "Price Case";
                    break;
              };
        
              var deValue = '';
              switch (req.query['de']) { //Check for de parameter value, 0 is excluded, 1 is default
                case "0":
                    deValue = "Excluded";
                    break;
                default:
                    deValue = "Included";
                    break;
              };

              var dcaValue = '';
              switch (req.query['dca']) { //Check for dca parameter value, 0 is excluded, 1 is default
                case "0":
                    dcaValue = "Excluded";
                    break;
                default:
                    dcaValue = "Included";
                    break;
              };
              var cicValue = '';
              switch (req.query['cic']) { //Check for cic parameter value, 0 is excluded, 1 is default
                case "0":
                  cicValue = "Excluded";
                    break;
                default:
                  cicValue = "Included";
                    break;
              };
                formatedJson = {
                  "MODEL":modelValue,
                  "LEVEL": levelValue,
                  "TARGET": targetValue,
                  "DE LIST": deValue,
                  "DCA LIST": dcaValue,
                  "CIC LIST": cicValue
              }

              formatedJson.data = [];
    
                for (var i = 0; i < message.length; i++) {

                  formatedJson.data.push({
                    "work_nbr":message[i].WORK_NUM,
                    "work_desc":message[i].WORK_DESC,
                    "global_buying_group":message[i].GBG_NM,
                    "cic_list":message[i].CIC_IND,
                    "dca_list":message[i].DCA_IND,
                    "de_list":message[i].DE_IND,
                    "overall_risk":calcs.formatAmount(message[i].OVERALL_RISK),
                    "ranking":message[i].RANKING,
                    "prev_ranking":message[i].PREV_RANKING,
                    "geo_ranking":message[i].GEO_RANKING,
                    "risk_type":message[i].RISK_TYPE,
                    "eac_to_pln_gp_pct":message[i].EAC_TO_PLN_GP_PCT,
                    "new_indicator":message[i].NEW_IND,
                    "geo_desc":message[i].GEO_LVL1_NM,
                    "mkt_desc":message[i].GEO_LVL2_NM,
                    "growth_platform_desc":message[i].GRTH_PLFM_DESC,
                    "svc_line_desc":message[i].SVC_LINE_NM,
                    "sector_desc":message[i].SCTR_GB_NM,
                    "industry_desc":message[i].INDSTRY_CMR_NM,
                    "practice_nm":message[i].PRACTICE_NM
                  });
            };
        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2priexportworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriExportWorkNum', type: 'object'}
  });
};

