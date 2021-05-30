'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2priexportcontract) {
  T2priexportcontract.processChild = function(req, filter, cb) {
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
            var dateValue = '';

            switch (message[0].LNCH_IND) { 
              case "No":
                  modelValue = "Projects in delivery ( > 60 days )";
                  dateValue =  message[0].DATA_LOAD_DESC; //Delivery model
                  break;
              default:
                  modelValue = "Projects launched in the last 60 days";
                  dateValue =  message[0].LNCH_DATE;  //Launch model
                  break;
            };
      
            var levelValue = 'Work Number';
     
            var targetValue = '';
            switch (req.query['type']) { 
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
                "EXPORT_DATE":dateValue,
                "MODEL":modelValue,
                "LEVEL": levelValue,
                "TARGET": targetValue,
                "CIC LIST": cicValue,
                "DCA LIST": dcaValue,
                "DE LIST": deValue
            }

            formatedJson.data = [];
  
              for (var i = 0; i < message.length; i++) {

                formatedJson.data.push({
                  "cntrct_nbr" :message[i].CNTRCT_NUM,
                  "cntrct_name" :message[i].CNTRCT_DESC,
                  "client" :message[i].CLIENT_NM,
                  "partner_name" :(message[i].PARTNER_NM),
                  "pm_name" :(message[i].PM_NM),
                  "geo" :(message[i].GEO_LVL1_NM), 
                  "market" :(message[i].GEO_LVL2_NM),
                  "country" :(message[i].CTRY_NM), 
                  "growth_platform" :(message[i].GRTH_PLFM_DESC), 
                  "service_line" :(message[i].SVC_LINE_NM),
                  "practice" :(message[i].PRACTICE_NM), 
                  "industry" :(message[i].INDSTRY_CMR_NM), 
                  "sector" :(message[i].SCTR_GB_NM),
                  "cic_ind" :(message[i].CIC_IND), 
                  "dca_ind" :(message[i].DCA_IND),
                  "de_ind" :(message[i].DE_IND),
                  "risk_gp_det" :calcs.formatAmount(message[i].OVERALL_RISK,2),
                  //"prev_risk" :calcs.formatAmount(message[i].PREV_RISK,2),
                  "mtm_pts" :calcs.formatAmount(message[i].MTM_PTS,2),
                  //"mtm_pts_color" :(message[i].MTM_PTS_COLOR),
                  "current_gp_pct" :calcs.calcX100(message[i].ITD_GP_PCT),
                  "pc_gp_pct" :calcs.calcX100(message[i].PC_GP_PCT),
                  "pc_gp_amt" :(message[i].PC_GP_AMT),
                  "ap_gp_pct" :calcs.calcX100(message[i].AP_GP_PCT),
                  "ap_gp_amt" :(message[i].AP_GP_AMT),
                  "eac_pln_gp_pct" :calcs.calcX100(message[i].EAC_TO_PLN_GP_PCT),
                  "etc_gp_pct" :calcs.calcX100(message[i].ETC_GP_PCT),
                  "etc_gp_amt" :(message[i].ETC_GP_AMT),
                  "etc_cost_amt" :(message[i].ETC_COST_AMT),
                  "etc_rev_amt" :(message[i].ETC_REV_AMT),
                  "itd_gp_amt" :(message[i].ITD_GP_AMT),
                  "itd_cost_amt" :(message[i].ITD_COST_AMT),
                  "itd_rev_amt" :(message[i].ITD_REV_AMT),
                  "tcv" :(message[i].TCV),
                  "risk_type" :message[i].RISK_VALUE,
                  "ippf_url" :message[i].IPPF_URL,

                });
          };
      };  // end if no data

    } catch (e) {
      formatedJson = {"msg" : e.message}
    }

      cb(err, formatedJson);
    });
};

  T2priexportcontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriExportContract', type: 'object'}
  });
};

