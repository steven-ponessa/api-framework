'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2privareacplandetailscontract) {
  T2privareacplandetailscontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
      try {

        var formatedJson = {};
        var allValue = '';
        var allLabel = '';
        var dateValue = '';
      
        switch (req.query['all']) { //Check for all parameter value to determine dynamic headers
          case "ALLGO":
                allLabel = "Geography";
                break;
          case "ALLMK":
                allLabel = "Market / Region";
                break;
          case "ALLGP":
                allLabel = "Growth Platform";
                break;
          case "ALLSL":
                allLabel = "Service Line";
                break;
          case "ALLIN":
                allLabel = "Industry";
                break;
          case "ALLPR":
                allLabel = "Practice";
                break;
          default:
                allLabel = "Sector";
        };

            formatedJson = {
                  "pri_date":"",
                  "risk_color_label": "Risk Color",
                  "risk_type_label": "Risk Type",
                  "cntrct_nbr_label": "Contract No.",
                  "client_label": "Client Name",
                  "cic_label": "CIC",
                  "dca_label": "DCA",
                  "de_label": "DE",
                  "cntrct_name_label": "Contract Name",
                  "all_selected_label": allLabel,
                  "risk_gp_det_label": "Risk of GP Deterioration",
                  "risk_gp_det_info_label": "Risk of current GP % declining by over 2% over the next 6 months against the Price Case GP",
                  "mtm_pts_label": "MtM Movement (Pts)",
                  "mtm_pts_info_label": "Comparison with previous months Risk of GP deterioration. Increase represented by a plus sign in a Red color Pill. Decrease represented by a negative sign in a Green color Pill. No change represented in a Blue color Pill.",
                  "current_gp_pct_label": "Current GP %",
                  "current_gp_pct_info_label": "ItD GP% on Active Work Numbers under the Contract",
                  "pc_gp_pct_label": "Price Case GP %",
                  "tcv_label": "Active TCV $",
                  "tcv_info_label": "Active TCV $ includes only active Work Numbers under this Contract",
                  "etc_gp_amt_label": "EtC $",
                  // extra fields for customize table options
                  "geo_label":  "Geography", 
                  "market_label": "Market/Region", 
                  "growth_platform_label": "Growth Platform", 
                  "service_line_label": "Service Line", 
                  "sector_label": "Sector", 
                  "industry_label": "Industry",
                  "practice_label": "Practice", 
                  "country_label": "Country",
                  "partner_nm_label": "Partner Name",
                  "pm_nm_label": "PM Name",
                  "pc_gp_amt_label": "Price Case GP $",
                  "ap_gp_pct_label": "Approved Plan GP %",
                  "ap_gp_amt_label": "Approved Plan GP $",
                  "eac_pln_gp_pct_label": "EaC to Plan GP %",
                  "etc_gp_pct_label": "EtC GP %",
                  "etc_cost_amt_label": "EtC Cost $",
                  "etc_rev_amt_label": "EtC Reveune $",
                  "itd_cost_amt_label": "ItD Cost $",
                  "itd_rev_amt_label": "ItD Revenue GP $",
                      
                  };
      
                  if(message.length > 0) { //Avoid processing a empty result set
      
                        switch (message[0].LNCH_FLG) {
                              case 0:
                                    dateValue =  message[0].DATA_LOAD_DESC; //Delivery model
                                    break;
                              default:
                                    dateValue =  message[0].LNCH_DATE;  //Launch model
                                    break;                    
                              };
                    formatedJson.pri_date = dateValue;
                    formatedJson.data = [];
        
                    for (var i = 0; i < message.length; i++) {
      
                      switch (req.query['all']) {  //Check for all parameter value to determine dynamic attribute values
                        case "ALLGO":
                              allValue = message[i].GEO_LVL1_NM;
                              break;
                        case "ALLMK":
                              allValue = message[i].GEO_LVL2_NM;
                              break;
                        case "ALLGP":
                              allValue = message[i].GRTH_PLFM_DESC;
                              break;
                        case "ALLSL":
                              allValue = message[i].SVC_LINE_NM;
                              break;
                        case "ALLIN":
                              allValue = message[i].INDSTRY_CMR_NM;
                              break;
                        case "ALLPR":
                              allValue = message[i].PRACTICE_NM;
                              break;
                        default:
                              allValue = message[i].SCTR_GB_NM;
                        };
      
                      formatedJson.data.push({
                        "risk_color" :message[i].RISK_COLOR,
                        "risk_type" :message[i].RISK_VALUE,
                        "cntrct_nbr" :message[i].CNTRCT_NUM,
                        "client" :message[i].CLIENT_NM,
                        "cic_ind" :(message[i].CIC_IND), 
                        "dca_ind" :(message[i].DCA_IND),
                        "de_ind" :(message[i].DE_IND),
                        "cntrct_name" :message[i].CNTRCT_DESC,
                        "all_value" :allValue,
      
                        "risk_gp_det" :calcs.formatAmount(message[i].OVERALL_RISK,2),
                        //"prev_risk" :calcs.formatAmount(message[i].PREV_RISK,2),
                        "mtm_pts" :message[i].MTM_PTS_SIGN + calcs.formatAmount(message[i].MTM_PTS,2),
                        "mtm_pts_color" :(message[i].MTM_PTS_COLOR),
                        "current_gp_pct" :calcs.calcX100(message[i].ITD_GP_PCT),
                        "pc_gp_pct" :calcs.calcX100(message[i].PC_GP_PCT),
                        "tcv" :(message[i].TCV),
                        "etc_gp_amt" :(message[i].ETC_GP_AMT),
      
                        "geo" :(message[i].GEO_LVL1_NM), 
                        "market" :(message[i].GEO_LVL2_NM),
                        "growth_platform" :(message[i].GRTH_PLFM_DESC), 
                        "service_line" :(message[i].SVC_LINE_NM),
                        "sector" :(message[i].SCTR_GB_NM),
                        "industry" :(message[i].INDSTRY_CMR_NM), 
                        "practice" :(message[i].PRACTICE_NM),  
                        "country" :(message[i].CTRY_NM), 
                        "partner_nm" :(message[i].PARTNER_NM),
                        "pm_nm" :(message[i].PM_NM),
                        "pc_gp_amt" :(message[i].PC_GP_AMT),
                        "ap_gp_pct" :calcs.calcX100(message[i].AP_GP_PCT),
                        "ap_gp_amt" :(message[i].AP_GP_AMT),
                        "eac_pln_gp_pct" :calcs.calcX100(message[i].EAC_TO_PLN_GP_PCT),
                        "etc_gp_pct" :calcs.calcX100(message[i].ETC_GP_PCT),
                        "etc_cost_amt" :(message[i].ETC_COST_AMT),
                        "etc_rev_amt" :(message[i].ETC_REV_AMT),
                        "itd_cost_amt" :(message[i].ITD_COST_AMT),
                        "itd_rev_amt_" :(message[i].ITD_REV_AMT)
                  
                  });
                };
              };  // end if no data

    } catch (e) {
      formatedJson = {"msg" : e.message}
    }

      cb(err, formatedJson);
    });
};

  T2privareacplandetailscontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriVarEacPlanDetailsContract', type: 'object'}
  });
};

