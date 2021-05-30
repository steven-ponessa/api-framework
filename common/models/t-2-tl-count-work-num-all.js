'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2tlcountworknumall) {
    T2tlcountworknumall.processChild = function(req, filter, cb) {
           this.process(req, filter, function(err, message) {
                if (err) {
                  return cb(err, null);
              }
                try {
            var green_range = ">= -2.00%";
            var yellow_range = "< -2.00% and > -4.00%";
            var red_range = "<= -4.00%";

            var jsonData = {};
            jsonData.date = message[0].DATA_LOAD_DESC
			jsonData.date_label = message[0].DESC_2

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
        
                message.forEach(function (element) {
                var ba = {
                    bussAtt_Name: "",
                    Total:  [],
                    QtQ: [],
                    Tier: []
                };
                var totals = "";
                var totals_pct = "";
                var total_arrw_col = "";
                var total_arrw_dir = "";
                var total_arrw_col_pct = "";
                var total_arrw_dir_pct = "";

                var qtq_amt = "";
                var qtq_pct = "";
                var T0 = {
                        tier0_label: "Tier 0",
                        tier0_color: "#B4E0FF",
                        name: "",
                        tier0_lkg_amt: "",
                        tier0_lkg_amt_prev_mth: "",
                        tier0_lkg_pct: "",
                        //tier0_qtq_amt: "",
                        tier0_mtm_pct: "",
                        tier0_mtm_diff: "",
                        tier0_arrw_col: "",
                        tier0_arrw_dir: "",
                        tier0_arrw_col_pct: "", 
                        tier0_arrw_dir_pct: "" 
                };
        
                      T0.name= element.CATEGORY;
                      T0.tier0_lkg_amt = calcs.calcValue(Number(element.LKG_AMT_T0));
                      T0.tier0_lkg_amt_prev_mth = calcs.calcValue(Number(element.LKG_AMT_PREV_MTH_T0));
                      T0.tier0_lkg_pct = calcs.formatPercentage100(Number(element.LKG_PCT_T0));
                      //T0.tier0_qtq_amt = calcs.calcValue(Number(element.QTQ_AMT));
                      T0.tier0_mtm_pct = calcs.formatPercentage100(Number(element.MTM_PCT_T0));
                      T0.tier0_mtm_diff = calcs.calcValue(Number(element.MTM_DIFF_T0));
        
                var T1 = {
                        tier1_label: "Tier 1",
                        tier1_color: "#6BB9FF",
                        name: "",
                        tier1_lkg_amt: "",
                        tier1_lkg_amt_prev_mth: "",
                        tier1_lkg_pct: "",
                        //tier1_qtq_amt: "",
                        tier1_mtm_pct: "",
                        tier1_mtm_diff: "",
                        tier1_arrw_col: "",
                        tier1_arrw_dir: "",
                        tier1_arrw_col_pct: "", 
                        tier1_arrw_dir_pct: "" 
                };    
                       T1.name= element.CATEGORY;
                       T1.tier1_lkg_amt = calcs.calcValue(Number(element.LKG_AMT_T1));
                       T1.tier1_lkg_amt_prev_mth = calcs.calcValue(Number(element.LKG_AMT_PREV_MTH_T1));
                       T1.tier1_lkg_pct = calcs.formatPercentage100(Number(element.LKG_PCT_T1));
                       //T1.tier1_qtq_amt = calcs.calcValue(Number(element.QTQ_AMT));
                       T1.tier1_mtm_pct = calcs.formatPercentage100(Number(element.MTM_PCT_T1));
                       T1.tier1_mtm_diff = calcs.calcValue(Number(element.MTM_DIFF_T1));
        
                var T2 = {
                        tier2_label: "Tier 2",
                        tier2_color: "#4A97F8",
                        name: "",
                        tier2_lkg_amt: "",
                        tier2_lkg_amt_prev_mth: "",
                        tier2_lkg_pct: "",
                        //tier2_qtq_amt: "",
                        tier2_mtm_pct: "",
                        tier2_mtm_diff: "",
                        tier2_arrw_col: "",
                        tier2_arrw_dir: "",
                        tier2_arrw_col_pct: "", 
                        tier2_arrw_dir_pct: "" 
                };
                        T2.name= element.CATEGORY;
                        T2.tier2_lkg_amt = calcs.calcValue(Number(element.LKG_AMT_T2));
                        T2.tier2_lkg_amt_prev_mth = calcs.calcValue(Number(element.LKG_AMT_PREV_MTH_T2));
                        T2.tier2_lkg_pct = calcs.formatPercentage100(Number(element.LKG_PCT_T2));
                        //T2.tier2_qtq_amt = calcs.calcValue(Number(element.QTQ_AMT));
                        T2.tier2_mtm_pct = calcs.formatPercentage100(Number(element.MTM_PCT_T2));
                        T2.tier2_mtm_diff = calcs.calcValue(Number(element.MTM_DIFF_T2));
        
                var T3 = {
                        tier3_label: "Tier 3",
                        tier3_color: "#FFB400",
                        name: "",
                        tier3_lkg_amt: "",
                        tier3_lkg_amt_prev_mth: "",
                        tier3_lkg_pct: "",
                        //tier3_qtq_amt: "",
                        tier3_mtm_pct: "",
                        tier3_mtm_diff: "",
                        tier3_arrw_col: "",
                        tier3_arrw_dir: "",
                        tier3_arrw_col_pct: "", 
                        tier3_arrw_dir_pct: "" 
                };
                        T3.name= element.CATEGORY;
                        T3.tier3_lkg_amt = calcs.calcValue(Number(element.LKG_AMT_T3));
                        T3.tier3_lkg_amt_prev_mth = calcs.calcValue(Number(element.LKG_AMT_PREV_MTH_T3));
                        T3.tier3_lkg_pct = calcs.formatPercentage100(Number(element.LKG_PCT_T3));
                        //T3.tier3_qtq_amt = calcs.calcValue(Number(element.QTQ_AMT));
                        T3.tier3_mtm_pct = calcs.formatPercentage100(Number(element.MTM_PCT_T3));
                        T3.tier3_mtm_diff = calcs.calcValue(Number(element.MTM_DIFF_T3));
    

                    // total Calcs 
                     totals = calcs.calcValue(Number(Number(element.LKG_AMT_T0) + Number(element.LKG_AMT_T1) + Number(element.LKG_AMT_T2) + Number(element.LKG_AMT_T3)));
                     prev_totals = calcs.calcValue(Number(element.LKG_AMT_PREV_MTH_T0) + Number(element.LKG_AMT_PREV_MTH_T1) + Number(element.LKG_AMT_PREV_MTH_T2) + Number(element.LKG_AMT_PREV_MTH_T3));
                     
                     totals_pct = calcs.formatPercentage100(Number(element.LKG_PCT_T0 + element.LKG_PCT_T1  + element.LKG_PCT_T2 + element.LKG_PCT_T3 ));
                    
                     //qtq_amt = calcs.calcValue(Number(element.QTQ_AMT));
                     var busAtt_nm = element.CATEGORY;
                     qtq_pct = "";
                // calc to get arrow colors and direction for %
                    var t0_lkg_diff_pct = calcs.formatPercentage100(Number(element.MTM_PCT_T0));
                    var t1_lkg_diff_pct = calcs.formatPercentage100(Number(element.MTM_PCT_T1));
                    var t2_lkg_diff_pct = calcs.formatPercentage100(Number(element.MTM_PCT_T2));
                    var t3_lkg_diff_pct = calcs.formatPercentage100(Number(element.MTM_PCT_T3));
                    
                    

                    // switch (req.query['metric']) {
                    //     case "CQ_TO_AP":           
                    //         if(t0_lkg_diff_pct >= -2.00){ 
                    //             T0.tier0_arrw_col_pct = "#7CCD10",//Green
                    //             T0.tier0_arrw_dir_pct = "up"
                    //         }else if(t0_lkg_diff_pct < -2.00 || t0_lkg_diff_pct > -4.00){ 
                    //             T0.tier0_arrw_col_pct = "#FCCF0A", // Amber
                    //             T0.tier0_arrw_dir_pct = "-"
                    //         }else if(t0_lkg_diff_pct <= -4.00){ 
                    //             T0.tier0_arrw_col_pct = "#FC3640", // Red
                    //             T0.tier0_arrw_dir_pct = "down"
                    //         };
                    //         if(t1_lkg_diff_pct >= -2.00){ 
                    //             T1.tier1_arrw_col_pct = "#7CCD10",//Green
                    //             T1.tier1_arrw_dir_pct = "up"
                    //         }else if(t1_lkg_diff_pct < -2.00 || t1_lkg_diff_pct > -4.00){ 
                    //             T1.tier1_arrw_col_pct = "#FCCF0A", // Amber
                    //             T1.tier1_arrw_dir_pct = "-"
                    //         }else if(t1_lkg_diff_pct <= -4.00){ 
                    //             T1.tier1_arrw_col_pct = "#FC3640", // Red
                    //             T1.tier1_arrw_dir_pct = "down"
                    //         };
                    //         if(t2_lkg_diff_pct >= -2.00){ 
                    //             T2.tier2_arrw_col_pct = "#7CCD10",//Green
                    //             T2.tier2_arrw_dir_pct = "up"
                    //         }else if(t2_lkg_diff_pct < -2.00 || t2_lkg_diff_pct > -4.00){ 
                    //             T2.tier2_arrw_col_pct = "#FCCF0A", // Amber
                    //             T2.tier2_arrw_dir_pct = "-"
                    //         }else if(t2_lkg_diff_pct <= -4.00){ 
                    //             T2.tier2_arrw_col_pct = "#FC3640", // Red
                    //             T2.tier2_arrw_dir_pct = "down"
                    //         };
                    //         if(t3_lkg_diff_pct >= -2.00){ 
                    //             T3.tier3_arrw_col_pct = "#7CCD10",//Green
                    //             T3.tier3_arrw_dir_pct = "up"
                    //         }else if(t3_lkg_diff_pct < -2.00 || t3_lkg_diff_pct > -4.00){ 
                    //             T3.tier3_arrw_col_pct = "#FCCF0A", // Amber
                    //             T3.tier3_arrw_dir_pct = "-"
                    //         }else if(t3_lkg_diff_pct <= -4.00){ 
                    //             T3.tier3_arrw_col_pct = "#FC3640", // Red
                    //             T3.tier3_arrw_dir_pct = "down"
                    //         };
                    //         /// Total
                    //         if(totals_pct >= -2.00){ 
                    //             total_arrw_col_pct = "#7CCD10",//Green
                    //             total_arrw_dir_pct = "up"
                    //         }else if(totals_pct < -2.00 || totals_pct > -4.00){ 
                    //             total_arrw_col_pct = "#FCCF0A", // Amber
                    //             total_arrw_dir_pctt = "-"
                    //         }else if(totals_pct <= -4.00){ 
                    //             total_arrw_col_pct = "#FC3640", // Red
                    //             total_arrw_dir_pctt = "down"
                    //         };
                    //         break;
                    //     case "FC_EAC_AP":                       
                    //         if(t0_lkg_diff_pct >= -2.00){ 
                    //             T0.tier0_arrw_col_pct = "#7CCD10",//Green
                    //             T0.tier0_arrw_dir_pct = "up"
                    //         }else if(t0_lkg_diff_pct < -2.00 || t0_lkg_diff_pct > -4.00){ 
                    //             T0.tier0_arrw_col_pct = "#FCCF0A", // Amber
                    //             T0.tier0_arrw_dir_pct = "-"
                    //         }else if(t0_lkg_diff_pct <= -4.00){ 
                    //             T0.tier0_arrw_col_pct = "#FC3640", // Red
                    //             T0.tier0_arrw_dir_pct = "down"
                    //         };
                    //         if(t1_lkg_diff_pct >= -2.00){ 
                    //             T1.tier1_arrw_col_pct = "#7CCD10",//Green
                    //             T1.tier1_arrw_dir_pct = "up"
                    //         }else if(t1_lkg_diff_pct < -2.00 || t1_lkg_diff_pct > -4.00){ 
                    //             T1.tier1_arrw_col_pct = "#FCCF0A", // Amber
                    //             T1.tier1_arrw_dir_pct = "-"
                    //         }else if(t1_lkg_diff_pct <= -4.00){ 
                    //             T1.tier1_arrw_col_pct = "#FC3640", // Red
                    //             T1.tier1_arrw_dir_pct = "down"
                    //         };
                    //         if(t2_lkg_diff_pct >= -2.00){ 
                    //             T2.tier2_arrw_col_pct = "#7CCD10",//Green
                    //             T2.tier2_arrw_dir_pct = "up"
                    //         }else if(t2_lkg_diff_pct < -2.00 || t2_lkg_diff_pct > -4.00){ 
                    //             T2.tier2_arrw_col_pct = "#FCCF0A", // Amber
                    //             T2.tier2_arrw_dir_pct = "-"
                    //         }else if(t1_lkg_diff_pct <= -4.00){ 
                    //             T2.tier2_arrw_col_pct = "#FC3640", // Red
                    //             T2.tier2_arrw_dir_pct = "down"
                    //         };
                    //         if(t3_lkg_diff_pct >= -2.00){ 
                    //             T3.tier3_arrw_col_pct = "#7CCD10",//Green
                    //             T3.tier3_arrw_dir_pct = "up"
                    //         }else if(t3_lkg_diff_pct < -2.00 || t3_lkg_diff_pct > -4.00){ 
                    //             T3.tier3_arrw_col_pct = "#FCCF0A", // Amber
                    //             T3.tier3_arrw_dir_pct = "-"
                    //         }else if(t3_lkg_diff_pct <= -4.00){ 
                    //             T3.tier3_arrw_col_pct = "#FC3640", // Red
                    //             T3.tier3_arrw_dir_pct = "down"
                    //         };
        
                    //         /// Total
                    //         if(totals_pct >= -2.00){ 
                    //             total_arrw_col_pct = "#7CCD10",//Green
                    //             total_arrw_dir_pct = "up"
                    //         }else if(totals_pct < -2.00 || totals_pct > -4.00){ 
                    //             total_arrw_col_pct = "#FCCF0A", // Amber
                    //             total_arrw_dir_pctt = "-"
                    //         }else if(totals_pct <= -4.00){ 
                    //             total_arrw_col_pct = "#FC3640", // Red
                    //             total_arrw_dir_pctt = "down"
                    //         };

                    //         break;
                    //     case "COST_OVER":                   
                    //         if(t0_lkg_diff_pct >= -5.00){ 
                    //             T0.tier0_arrw_col_pct = "#7CCD10",//Green
                    //             T0.tier0_arrw_dir_pct = "up"
                    //         }else if(t0_lkg_diff_pct < -5.00 || t0_lkg_diff_pct > -10.00){ 
                    //             T0.tier0_arrw_col_pct = "#FCCF0A", // Amber
                    //             T0.tier0_arrw_dir_pct = "-"
                    //         }else if(t0_lkg_diff_pct <= -10.00){ 
                    //             T0.tier0_arrw_col_pct = "#FC3640", // Red
                    //             T0.tier0_arrw_dir_pct = "down"
                    //         };
                    //         if(t1_lkg_diff_pct >= -5.00){ 
                    //             T1.tier1_arrw_col_pct = "#7CCD10",//Green
                    //             T1.tier1_arrw_dir_pct = "up"
                    //         }else if(t1_lkg_diff_pct < -5.00 || t1_lkg_diff_pct > -10.00){ 
                    //             T1.tier1_arrw_col_pct = "#FCCF0A", // Amber
                    //             T1.tier1_arrw_dir_pct = "-"
                    //         }else if(t1_lkg_diff_pct <= -10.00){ 
                    //             T1.tier1_arrw_col_pct = "#FC3640", // Red
                    //             T1.tier1_arrw_dir_pct = "down"
                    //         };
                    //         if(t2_lkg_diff_pct >= -5.00){ 
                    //             T2.tier2_arrw_col_pct = "#7CCD10",//Green
                    //             T2.tier2_arrw_dir_pct = "up"
                    //         }else if(t2_lkg_diff_pct < -5.00 || t2_lkg_diff_pct > -10.00){ 
                    //             T2.tier2_arrw_col_pct = "#FCCF0A", // Amber
                    //             T2.tier2_arrw_dir_pct = "-"
                    //         }else if(t2_lkg_diff_pct <= -10.00){ 
                    //             T2.tier2_arrw_col_pct = "#FC3640", // Red
                    //             T2.tier2_arrw_dir_pct = "down"
                    //         };
                    //         if(t3_lkg_diff_pct >= -5.00){ 
                    //             T3.tier3_arrw_col_pct = "#7CCD10",//Green
                    //             T3.tier3_arrw_dir_pct = "up"
                    //         }else if(t3_lkg_diff_pct < -5.00 || t3_lkg_diff_pct > -10.00){ 
                    //             T3.tier3_arrw_col_pct = "#FCCF0A", // Amber
                    //             T3.tier3_arrw_dir_pct = "-"
                    //         }else if(t3_lkg_diff_pct <= -10.00){ 
                    //             T3.tier3_arrw_col_pct = "#FC3640", // Red
                    //             T3.tier3_arrw_dir_pct = "down"
                    //         };

                    //         /// Total
                    //         if(totals_pct >= -5.00){ 
                    //             total_arrw_col_pct = "#7CCD10",//Green
                    //             total_arrw_dir_pct = "up"
                    //         }else if(totals_pct < -5.00 || totals_pct > -4.00){ 
                    //             total_arrw_col_pct = "#FCCF0A", // Amber
                    //             total_arrw_dir_pct = "-"
                    //         }else if(totals_pct <= -10.00){ 
                    //             total_arrw_col_pct = "#FC3640", // Red
                    //             total_arrw_dir_pct = "down"
                    //         };
                    //         break;
                    // };
        
        
                // calc to get arrow directions
                        var t0_lkg_act = calcs.calcValue(Number(element.LKG_AMT_T0));
                        var t0_lkg_prv = calcs.calcValue(Number(element.LKG_AMT_PREV_MTH_T0));                           
                        // if(t0_lkg_act > t0_lkg_prv){ 
                        //     T0.tier0_arrw_col = "#7CCD10",//Green
                        //     T0.tier0_arrw_dir = "up"
                        // }else if(t0_lkg_act == t0_lkg_prv){ 
                        //     T0.tier0_arrw_col = "#FCCF0A", // Amber
                        //     T0.tier0_arrw_dir = "-"
                        // }else if(t0_lkg_act < t0_lkg_prv){ 
                        //     T0.tier0_arrw_col = "#FC3640", // Red
                        //     T0.tier0_arrw_dir = "down"
                        // };
                // calc to get arrow directions
                        var t1_lkg_act = calcs.calcValue(Number(element.LKG_AMT_T1));
                        var t1_lkg_prv = calcs.calcValue(Number(element.LKG_AMT_PREV_MTH_T1));                            
                        // if(t1_lkg_act > t1_lkg_prv){ 
                        //     T1.tier1_arrw_col = "#7CCD10",//Green
                        //     T1.tier1_arrw_dir = "up"
                        // }else if(t1_lkg_act == t1_lkg_prv){ 
                        //     T1.tier1_arrw_col = "#FCCF0A", // Amber
                        //     T1.tier1_arrw_dir = "-"
                        // }else if(t1_lkg_act < t1_lkg_prv){ 
                        //     T1.tier1_arrw_col = "#FC3640", // Red
                        //     T1.tier1_arrw_dir = "down"
                        // };
                // calc to get arrow directions
                        var t2_lkg_act = calcs.calcValue(Number(element.LKG_AMT_T2));
                        var t2_lkg_prv = calcs.calcValue(Number(element.LKG_AMT_PREV_MTH_T2));                           
                        // if(t2_lkg_act > t2_lkg_prv){ 
                        //     T2.tier2_arrw_col = "#7CCD10",//Green
                        //     T2.tier2_arrw_dir = "up"
                        // }else if(t2_lkg_act == t2_lkg_prv){ 
                        //     T2.tier2_arrw_col = "#FCCF0A", // Amber
                        //     T2.tier2_arrw_dir = "-"
                        // }else if(t2_lkg_act < t2_lkg_prv){ 
                        //     T2.tier2_arrw_col = "#FC3640", // Red
                        //     T2.tier2_arrw_dir = "down"
                        // };
                // calc to get arrow directions
                        var t3_lkg_act = calcs.calcValue(Number(element.LKG_AMT_T3));
                        var t3_lkg_prv = calcs.calcValue(Number(element.LKG_AMT_PREV_MTH_T3));                          
                        // if(t3_lkg_act > t3_lkg_prv){ 
                        //     T3.tier3_arrw_col = "#7CCD10",//Green
                        //     T3.tier3_arrw_dir = "up"
                        // }else if(t3_lkg_act == t3_lkg_prv){ 
                        //     T3.tier3_arrw_col = "#FCCF0A", // Amber
                        //     T3.tier3_arrw_dir = "-"
                        // }else if(t3_lkg_act < t3_lkg_prv){ 
                        //     T3.tier3_arrw_col = "#FC3640", // Red
                        //     T3.tier3_arrw_dir = "down"
                        // };
        
                // calc to get arrow directions                            
                    // if(totals > prev_totals){ 
                    //     total_arrw_col = "#7CCD10",//Green
                    //     total_arrw_dir = "up"
                    // }else if(totals == prev_totals){ 
                    //     total_arrw_col = "#FCCF0A", // Amber
                    //     total_arrw_dir = "-"
                    // }else if(totals < prev_totals){ 
                    //     total_arrw_col = "#FC3640", // Red
                    //     total_arrw_dir = "down"
                    // };

                     ba.Tier.push(T0);
                     ba.Tier.push(T1);
                     ba.Tier.push(T2);
                     ba.Tier.push(T3);
                     ba.Total.push({"total_label": "Total",
                                    "total_amt": totals, 
                                    "total_pct": totals_pct,
                                    "total_arrw_col": total_arrw_col,
                                    "total_arrw_dir": total_arrw_dir,
                                    "total_arrw_col_pct": total_arrw_col_pct,
                                    "total_arrw_dir_pct": total_arrw_dir_pct
                                    });
                     ba.QtQ.push({"QtQ_label": "",
                                    "qtq_amt": qtq_amt, 
                                    "qtq_pct": qtq_pct});
                     ba.bussAtt_Name = busAtt_nm;
                     bussAtt.push(ba);
        
         
                }, this); 
                

              
                // grouping the data by bussAtt
                // result = bussAtt.reduce(function (val, acc) {
                //     val[acc.geo_nm] = val[acc.geo_nm] || [tt];
                //     val[acc.geo_nm].push(acc);  
                //     return val;
                // }, Object.create(null));
        
            
        
                jsonData.busAttrData.push(bussAtt);
            
                
        
                  } catch(e) {
                    jsonData = {msg: e.message};
                  }
        
                  cb(err, jsonData);
              });
          };
  T2tlcountworknumall.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2TLCountWorkNumAll', type: 'object'}
  });
};
