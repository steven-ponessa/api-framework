'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2privareacplandetailsworknum) {
  T2privareacplandetailsworknum.processChild = function(req, filter, cb) {
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
                  "work_label": "Work No.",
                  "gbg_label": "Global Buying Group",
                  "work_desc_label": "Work No. Short Description",
                  "overall_risk_label": "Overall Risk",
                  "ranking_label": "Ranking",
                  "prev_ranking_label": "Prev Rank",
                  "geo_ranking_label": "Geo Rank",
                  "new_ind_label": "New Indicator",
                  "new_reason_label": "New Reason",
                  "de_label": "DE",
                  "dca_label": "DCA",
                  "cic_label": "CIC",
                  "all_selected_label": allLabel
              };

              if(message.length > 0) { //Avoid processing a empty result set
                formatedJson.data = [];
    
                switch (message[0].LNCH_FLG) {
                  case 0:
                      dateValue =  message[0].DATA_LOAD_DESC; //Delivery model
                      break;
                  default:
                      dateValue =  message[0].LNCH_DATE;  //Launch model
                      break;                    
                };
                
                formatedJson.pri_date = dateValue;

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
                    "risk_color":message[i].RISK_COLOR,
                    "risk_type":message[i].RISK_VALUE,
                    "work_nbr":message[i].WORK_NUM, 
                    "work_dur_pct":message[i].PROJ_STAGE_PCT,
                    "gbg_nm":message[i].GBG_NM,
                    "work_desc":message[i].WORK_DESC,
                    "overall_risk":calcs.formatAmount(message[i].OVERALL_RISK,2),
                    "ranking":(message[i].RANKING),
                    "prev_ranking":(message[i].PREV_RANKING),
                    "geo_ranking":(message[i].GEO_RANKING),
                    "new_ind":(message[i].NEW_IND),
                    "new_reason":(message[i].NEW_REASON),
                    "de_ind":(message[i].DE_IND),
                    "dca_ind":(message[i].DCA_IND),
                    "cic_ind":(message[i].CIC_IND), 
                    "all_value":allValue
                    });
                  };
                };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2privareacplandetailsworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriVarEacPlanDetailsWorkNum', type: 'object'}
  });
};

