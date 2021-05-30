'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var summary = require("./utils/compSummaryCalcs");
var date = require("./utils/dateUtils");

module.exports = function(T2compsummarygrowthpltfrm) {
  T2compsummarygrowthpltfrm.processChild = function(req, filter, cb) {
    this.process(req, filter, function(err, message) {
      if (err) {
        return cb(err, null);
    }
      var formatedJson = {
        "DATA_MESSAGE":"No Data Available",
      };
      var directiveKey;
      var msurmtKey;
      var date_value = '';
      var monthName = '';

      if (!message.length <= 0) {
          monthName = date.getMonthName(message[0].ACCT_MTH_NUM);

          switch (req.query['graph']) { //Check graph parameter to determine Monthly vs Daily
            case "CPL_L2_GR2":
                date_value = message[0].DATA_LOAD_DESC;
                break;
            default:
                date_value = monthName + " " + message[0].ACCT_YR_NUM;
                //date_value = monthName.concat((message[0].DATA_LOAD_DESC).substr(6));
          };

          try {
            formatedJson = {
              "DATA_MESSAGE" : "",
              "DATE":date_value,
              "DIRECTIVE_NM": "Summary" ,
              "MTM_LABEL":"MtM",
              "PTS_LABEL":"pts",
              "RED":"#FA514C",
              "YELLOW":"#FFDB4F",
              "GREEN":"#70AC45",
              "BLUE":"#386BAC",
              "GRAY":"#E7E6E6",
              "LINK_HELP_TEXT" : "Click Metric to drill down for further information",
              "DATA":[]
            };

            var MSURMT = null;
            for (var i = 0; i < message.length; i++) {

              if(directiveKey !== message[i].DIRECTIVE_FULL_DESC || msurmtKey !== message[i].MSURMT_FULL_DESC) {

                directiveKey = message[i].DIRECTIVE_FULL_DESC;
                msurmtKey = message[i].MSURMT_FULL_DESC;

                // populate the ww data columns
                if(message[i].MSURMT_TYPE === "COUNT") {
                  MSURMT = {
                    "DIRECTIVE_NM": message[i].DIRECTIVE_FULL_DESC,
                    "MSURMT_NM": message[i].MSURMT_FULL_DESC,
                    "MTM": summary.mtmStatus(Number(message[i].MTM_PT_CHANGE)),
                    "PTS": summary.ptsEvenOddCheck(Number(message[i].MTM_PT_CHANGE)),
                    "MSURMT_TYPE": message[i].MSURMT_TYPE,
                    "LINK_ACTIVE": message[i].LINK_ACTIVE,
                    "TREND_COLOR": "gray",
                    "WW": message[i].WORLDWIDE_CNT !== null ? String(Math.round(message[i].WORLDWIDE_CNT)) : "N/A",
                    "WW_COLOR": "gray",
                    "WW_TARGET": "0",
                    "WW_MIN": "0",
                    "WW_MAX": "0"
                  }
                } else if(message[i].MSURMT_TYPE === "PERCENTAGE") {
                  MSURMT = {
                    "DIRECTIVE_NM": message[i].DIRECTIVE_FULL_DESC,
                    "MSURMT_NM": message[i].MSURMT_FULL_DESC,
                    "MTM": summary.mtmStatus(Number(message[i].MTM_PT_CHANGE)),
                    "PTS": summary.ptsEvenOddCheck(Number(message[i].MTM_PT_CHANGE)),
                    "MSURMT_TYPE": message[i].MSURMT_TYPE,
                    "LINK_ACTIVE": message[i].LINK_ACTIVE,
                    "TREND_COLOR": "blue",
                    "WW": message[i].WORLDWIDE_PCT !== null ? calcs.formatPercentage(Number(message[i].WORLDWIDE_PCT)) : "N/A",
                    "WW_COLOR": message[i].WORLDWIDE_PCT !== null ? summary.wwColor1(
                        calcs.formatPercentage(Number(message[i].WORLDWIDE_PCT)),
                        calcs.formatPercentage100(Number(message[i].MAX)),
                        calcs.formatPercentage100(Number(message[i].MIN)),
                          Number(message[i].MSURMT_DIRECTION)) : "gray",
                    "WW_TARGET": calcs.formatPercentage100(message[i].TARGET),
                    "WW_MIN": calcs.formatPercentage100(message[i].MIN),
                    "WW_MAX": calcs.formatPercentage100(message[i].MAX)
                  }
                } else if (message[i].MSURMT_TYPE === "STAT") {
                  MSURMT = {
                    "DIRECTIVE_NM": message[i].DIRECTIVE_FULL_DESC,
                    "MSURMT_NM": message[i].MSURMT_FULL_DESC,
                    "MTM": "",
                    "PTS": "",
                    "MSURMT_TYPE": message[i].MSURMT_TYPE,
                    "LINK_ACTIVE": message[i].LINK_ACTIVE,
                    "TREND_COLOR": "",
                    "WW": "",
                    "WW_COLOR": "",
                    "WW_TARGET": "",
                    "WW_MIN": "",
                    "WW_MAX": "",
                  }
                }

                formatedJson.DATA.push(MSURMT);
              }
              // populate the geo and growth platform columns
              if(message[i].MSURMT_TYPE === "COUNT") {
                MSURMT[message[i].GRTH_PLFM_CD] = message[i].COMPLIANCE_CNT !== null
                  ? String(Math.round(message[i].COMPLIANCE_CNT))
                  : MSURMT[message[i].GRTH_PLFM_CD] = "N/A";
                MSURMT[message[i].GRTH_PLFM_CD + "_COLOR"] = "gray";
                MSURMT[message[i].GRTH_PLFM_CD + "_TARGET"] = "0";
                MSURMT[message[i].GRTH_PLFM_CD + "_MIN"] = "0";
                MSURMT[message[i].GRTH_PLFM_CD + "_MAX"] = "0";

                MSURMT[message[i].GRTH_PLFM_CD + "_TARGET"] = calcs.formatPercentage100(message[i].TARGET);
                MSURMT[message[i].GRTH_PLFM_CD + "_MIN"] = calcs.formatPercentage100(message[i].MIN);
                MSURMT[message[i].GRTH_PLFM_CD + "_MAX"] = calcs.formatPercentage100(message[i].MAX);

              } else if (message[i].MSURMT_TYPE === "PERCENTAGE") {
                if (message[i].COMPLIANCE_PCT !== null) { 
                  MSURMT[message[i].GRTH_PLFM_CD] = calcs.formatPercentage(Number(message[i].COMPLIANCE_PCT));
                  MSURMT[message[i].GRTH_PLFM_CD + "_COLOR"] = summary.wwColor1(
                    calcs.formatPercentage(Number(message[i].COMPLIANCE_PCT)),
                    calcs.formatPercentage100(Number(message[i].MAX)),
                    calcs.formatPercentage100(Number(message[i].MIN)),
                      Number(message[i].MSURMT_DIRECTION));

                    MSURMT[message[i].GRTH_PLFM_CD + "_TARGET"] = calcs.formatPercentage100(message[i].TARGET);
                    MSURMT[message[i].GRTH_PLFM_CD + "_MIN"] = calcs.formatPercentage100(message[i].MIN);
                    MSURMT[message[i].GRTH_PLFM_CD + "_MAX"] = calcs.formatPercentage100(message[i].MAX);
                  }
            
              } else if (message[i].MSURMT_TYPE === "STAT") {

                  MSURMT[message[i].GRTH_PLFM_CD] = message[i].STATUS;
                  //console.log("===>GP code = " + message[i].GRTH_PLFM_CD + " and status -> "+ message[i].STATUS);
                  MSURMT[message[i].GRTH_PLFM_CD + "_COLOR"] = "";
                  switch (message[i].STATUS) { 
                    case "sat":
                      MSURMT[message[i].GRTH_PLFM_CD + "_COLOR"] = "green";
                    break;
                    case "unsat":
                      MSURMT[message[i].GRTH_PLFM_CD + "_COLOR"] = "red";
                    break;
                    case "marg":
                      MSURMT[message[i].GRTH_PLFM_CD + "_COLOR"] = "yellow";
                    break;
                  };
                  //console.log("===>GP  code = " + message[i].GRTH_PLFM_CD + " and color -> "+ MSURMT[message[i].GRTH_PLFM_CD + "_COLOR"]);

                  MSURMT[message[i].GRTH_PLFM_CD + "_TARGET"] = "";
                  MSURMT[message[i].GRTH_PLFM_CD + "_MIN"] = "";
                  MSURMT[message[i].GRTH_PLFM_CD + "_MAX"] = "";
                }  // end if STAT type

              } // end for loop

          } catch(e) {
            formatedJson = {msg: e.message};
          }
        } // end if message not empty
      cb(err, formatedJson);
    });
  };

  T2compsummarygrowthpltfrm.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompSummaryGrowthPltfrm', type: 'object'}
  });

};
