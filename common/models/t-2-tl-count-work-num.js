'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2tlcountworknum) {
  T2tlcountworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message) {
        if (err) {
          return cb(err, null);
      }
        try {
            
             var green_range = ">= -2.00%";
             var yellow_range = "< -2.00% and > -4.00%";
             var red_range = "<= -4.00%";

    
             var jsonData = {};
      
             switch (req.query['metric']) {
                case "COST_OVER":
                    green_range = ">= -5.00%";
                    yellow_range = "< -5.00% and > -10.00%";
                    red_range = "<= -10.00%";
                break;
                };

            jsonData.mtm_labels = {
                "mtm_green_color" : "#7CCD10",
                "mtm_green_label" : green_range,
                "mtm_yellow_color" : "#FFB400",
                "mtm_yellow_label" : yellow_range,
                "mtm_red_color" : "#FC3640",
                "mtm_red_label" : red_range
                };
            jsonData.tier_labels = {
                "tier0_label": "Tier 0",
                "tier1_label": "Tier 1",
                "tier2_label": "Tier 2",
                "tier3_label": "Tier 3",
                "tier0_COLOR": "#B4E0FF",
                "tier1_COLOR": "#6BB9FF",
                "tier2_COLOR": "#4A97F8",
                "tier3_COLOR": "#FFB400",
            };

    jsonData.data_label = [];
    jsonData.busAttrData = [];
    jsonData.totalsData = [];

    dl = {};
    switch (req.query['metric']) {
        case "CQ_TO_AP":
            dl.label = "CQ to AP";
            dl.color = "#FE9D98",
            dl.value = "CQ_TO_AP"
            break;
        case "FC_EAC_AP":
            dl.metric_lbl = "FC EaC to AP";
            dl.color = "#FC6227",
            dl.value = "FC_EAC_AP"
            break;
        case "COST_OVER":
            dl.metric_lbl = "3 Mo. Cost Overrun";
            dl.color = "#26D181",
            dl.value = "COST_OVER"
            break;
    };
    jsonData.data_label.push(dl);

        var bussAtt = [];
        var total = 0;
        var total_pct = 0;

        if (!message.length <= 0) {

        message.forEach(function (element) {

            var data = {
                bussAtt_nm : "",
                tier: "",
                date: "",
                date_label: "",
                tier_label: "",
                tier_color: "",
                lkg_amt: "",
                lkg_amt_prev_mth: "",
                lkg_pct: "",
                qtq_amt: "",
                mtm_pct: "",
                mtm_diff: "",
                arrw_col: "",
                arrw_dir: "",
                arrw_col_pct: "", 
                arrw_dir_pct: "" 
            };

            var lkg_diff_pct = calcs.calcValue(Number(element.MTM_PCT))
            // switch (req.query['metric']) {
            //     case "CQ_TO_AP":           
            //         if(lkg_diff_pct >= -2.00){ 
            //             data.arrw_col_pct = "#7CCD10",//Green
            //             data.arrw_dir_pct = "up"
            //         }else if(lkg_diff_pct < -2.00 || lkg_diff_pct > -4.00){ 
            //             data.arrw_col_pct = "#FCCF0A", // Amber
            //             data.arrw_dir_pct = "-"
            //         }else if(lkg_diff_pct <= -4.00){ 
            //             data.arrw_col_pct = "#FC3640", // Red
            //             data.arrw_dir_pct = "down"
            //         };
            //         break;
            //     case "FC_EAC_AP":                       
            //         if(lkg_diff_pct >= -2.00){ 
            //             data.arrw_col_pct = "#7CCD10",//Green
            //             data.arrw_dir_pct = "up"
            //         }else if(lkg_diff_pct < -2.00 || lkg_diff_pct > -4.00){ 
            //             data.arrw_col_pct = "#FCCF0A", // Amber
            //             data.arrw_dir_pct = "-"
            //         }else if(lkg_diff_pct <= -4.00){ 
            //             data.arrw_col_pct = "#FC3640", // Red
            //             data.arrw_dir_pct = "down"
            //         };
            //         break;
            //     case "COST_OVER":                   
            //         if(lkg_diff_pct >= -5.00){ 
            //             data.arrw_col_pct = "#7CCD10",//Green
            //             data.arrw_dir_pct = "up"
            //         }else if(lkg_diff_pct < -5.00 || lkg_diff_pct > -10.00){ 
            //             data.arrw_col_pct = "#FCCF0A", // Amber
            //             data.arrw_dir_pct = "-"
            //         }else if(lkg_diff_pct <= -10.00){ 
            //             data.arrw_col_pct = "#FC3640", // Red
            //             data.arrw_dir_pct = "down"
            //         };
            //         break;
            // };

                var lkg_act = element.LKG_AMT;
                var lkg_prv = element.LKG_AMT_PREV_MTH;
                                
                // if(lkg_act > lkg_prv){ 
                //     data.arrw_col = "#7CCD10",//Green
                //     data.arrw_dir = "up"
                // }else if(lkg_act = lkg_prv){ 
                //     data.arrw_col = "#FCCF0A", // Amber
                //     data.arrw_dir = "-"
                // }else if(lkg_act < lkg_prv){ 
                //     data.arrw_col = "#FC3640", // Red
                //     data.arrw_dir = "down"
                // };

            var tier_num = element.TIER_NO
            switch (tier_num) {
                case 0:
                    data.tier_label = "Tier 0",
                    data.tier_color = "#B4E0FF"
                    break;
                case 1:
                    data.tier_label = "Tier 1",
                    data.tier_color = "#6BB9FF"                  
                    break;
                case 2:
                    data.tier_label = "Tier 2",
                    data.tier_color = "#4A97F8"
                    break;
                case 3:
                    data.tier_label = "Tier 3",
                    data.tier_color = "#FFB400"
                    break;
            };

              data.tier = element.TIER_NO;
              data.date = element.DATA_LOAD_DESC;
              data.date_label = element.DESC_2;
              data.bussAtt_nm = element.CATEGORY;
              data.lkg_amt = calcs.calcValue(element.LKG_AMT);
              data.lkg_amt_prev_mth = calcs.calcValue(element.LKG_AMT_PREV_MTH);
              data.lkg_pct = calcs.formatPercentage100(Number(element.LKG_PCT));
              //data.qtq_amt = calcs.calcValue(Number(element.QTQ_AMT));
              data.mtm_pct = calcs.formatPercentage100(Number(element.MTM_PCT));
              data.mtm_diff = element.MTM__DIFF;

            var tt = {
                total_label: "",
                bussAtt_nm: "",
                total_val : "",
                total_pct: "",
                total_arrw_col: "",
                total_arrw_dir: "",
                total_arrw_col_pct: "", 
                total_arrw_dir_pct: "" 
            };

        var val =  Number(element.LKG_AMT);
        var prev_lkg_val = Number(element.LKG_AMT_PREV_MTH);
        var val_pct =  Number(element.LKG_PCT);
        var ba = element.CATEGORY;
        


        if(req.query['operator'] = "="){
            //lkg amt
            total = val;

            // % pct
            total_pct = val_pct;

            // lgk prev mth
            prev_mth_total = prev_lkg_val;

             // lkg
            //  if(total > prev_mth_total){ 
            //     tt.total_arrw_col = "#7CCD10",//Green
            //     tt.total_arrw_dir = "up"
            // }else if(total = prev_mth_total){ 
            //     tt.total_arrw_col = "#FCCF0A", // Amber
            //     tt.total_arrw_dir = "-"
            // }else if(total < prev_mth_total){ 
            //     tt.total_arrw_col = "#FC3640", // Red
            //     tt.total_arrw_dir = "down"
            // };
                        
            // % 
        // switch (req.query['metric']) {
        //     case "CQ_TO_AP":           
        //         if(total_pct >= -2.00){ 
        //             tt.total_arrw_col_pct = "#7CCD10",//Green
        //             tt.total_arrw_dir_pct = "up"
        //         }else if(total_pct < -2.00 || total_pct > -4.00){ 
        //             tt.total_arrw_col_pct = "#FCCF0A", // Amber
        //             tt.total_arrw_dir_pct = "-"
        //         }else if(total_pct <= -4.00){ 
        //             tt.total_arrw_col_pct = "#FC3640", // Red
        //             tt.total_arrw_dir_pct = "down"
        //         };
        //         break;
        //     case "FC_EAC_AP":                       
        //         if(total_pct >= -2.00){ 
        //             tt.total_arrw_col_pct = "#7CCD10",//Green
        //             tt.total_arrw_dir_pct = "up"
        //         }else if(total_pct < -2.00 || total_pct > -4.00){ 
        //             tt.total_arrw_col_pct = "#FCCF0A", // Amber
        //             tt.total_arrw_dir_pct = "-"
        //         }else if(total_pct <= -4.00){ 
        //             tt.total_arrw_col_pct = "#FC3640", // Red
        //             tt.total_arrw_dir_pct = "down"
        //         };
        //         break;
        //     case "COST_OVER":                   
        //         if(total_pct >= -5.00){ 
        //             tt.total_arrw_col_pct = "#7CCD10",//Green
        //             tt.total_arrw_dir_pct = "up"
        //         }else if(total_pct < -5.00 || total_pct > -10.00){ 
        //             tt.total_arrw_col_pct = "#FCCF0A", // Amber
        //             tt.total_arrw_dir_pct = "-"
        //         }else if(total_pct <= -10.00){ 
        //             tt.total_arrw_col_pct = "#FC3640", // Red
        //             tt.total_arrw_dir_pct = "down"
        //         };
        //         break;
        // };

            tt.total_val = "";
            tt.total_pct = "";
            tt.bussAtt_nm = "";

            jsonData.totalsData.push(tt);

        };

        
        bussAtt.push(data)
        }, this); 

        jsonData.busAttrData.push(bussAtt);

        } // end if not an empty message

          } catch(e) {
            jsonData = {msg: e.message};
          }

          cb(err, jsonData);
      });
  };

  T2tlcountworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2TLCountWorkNum', type: 'object'}
  });
};
