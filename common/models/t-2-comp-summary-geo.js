'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var summary = require("./utils/compSummaryCalcs");
var date = require("./utils/dateUtils");

module.exports = function(T2compsummarygeo) {
  T2compsummarygeo.processChild = function(req, filter, cb) {
    this.process(req, filter, function(err, message){
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

                MSURMT = {
                  "DIRECTIVE_NM": message[i].DIRECTIVE_FULL_DESC,
                  "MSURMT_NM": message[i].MSURMT_FULL_DESC,
                  "MTM": summary.mtmStatus(Number(message[i].MTM_PT_CHANGE)),
                  "PTS": summary.ptsEvenOddCheck(Number(message[i].MTM_PT_CHANGE)),
                  "MSURMT_TYPE": message[i].MSURMT_TYPE,
                  "LINK_ACTIVE": message[i].LINK_ACTIVE,
                  "TREND_COLOR": "blue",
                  "WW": "N/A",
                  "WW_COLOR": "gray",
                  "WW_TARGET": "0",
                  "WW_MIN": "0",
                  "WW_MAX": "0"
                }

                formatedJson.DATA.push(MSURMT);
              }

              if(message[i].MSURMT_TYPE === "COUNT") {
                MSURMT[message[i].LVL1_CD] = message[i].COMPLIANCE_CNT !== null
                ? String(Math.round(message[i].COMPLIANCE_CNT))
                : "N/A";

                MSURMT[message[i].LVL1_CD + "_COLOR"] = "gray";
                MSURMT[message[i].LVL1_CD + "_TARGET"] = "0";
                MSURMT[message[i].LVL1_CD + "_MIN"] = "0";
                MSURMT[message[i].LVL1_CD + "_MAX"] = "0";
              } else if(message[i].MSURMT_TYPE === "PERCENTAGE"){

                if (message[i].COMPLIANCE_PCT !== null) {
                  MSURMT[message[i].LVL1_CD] = calcs.formatPercentage100(Number(message[i].COMPLIANCE_PCT));

                  MSURMT[message[i].LVL1_CD + "_COLOR"] = summary.wwColor1(
                    calcs.formatPercentage100(Number(message[i].COMPLIANCE_PCT)),
                    calcs.formatPercentage100(Number(message[i].MAX)),
                    calcs.formatPercentage100(Number(message[i].MIN)),
            Number(message[i].MSURMT_DIRECTION));
                } else {
                  MSURMT[message[i].LVL1_CD] = "N/A";
                  MSURMT[message[i].LVL1_CD + "_COLOR"] = "gray";
                }

                MSURMT[message[i].LVL1_CD + "_TARGET"] = calcs.formatPercentage100(message[i].TARGET);
                MSURMT[message[i].LVL1_CD + "_MIN"] = calcs.formatPercentage100(message[i].MIN);
                MSURMT[message[i].LVL1_CD + "_MAX"] = calcs.formatPercentage100(message[i].MAX);

              } else if(message[i].MSURMT_TYPE === "STAT") {

                MSURMT[message[i].LVL1_CD] = message[i].STATUS;
                //console.log("===>GEO code = " + message[i].LVL1_CD + " and status -> "+ message[i].STATUS);
                MSURMT[message[i].LVL1_CD + "_COLOR"] = "";
                switch (message[i].STATUS) { 
                  case "sat":
                    MSURMT[message[i].LVL1_CD + "_COLOR"] = "green";
                  break;
                  case "unsat":
                    MSURMT[message[i].LVL1_CD + "_COLOR"] = "red";
                  break;
                  case "marg":
                    MSURMT[message[i].LVL1_CD + "_COLOR"] = "yellow";
                  break;
                };

                //console.log("===>GEO code = " + message[i].LVL1_CD + " and color -> "+ MSURMT[message[i].LVL1_CD + "_COLOR"]);

                MSURMT[message[i].LVL1_CD + "_TARGET"] = "";
                MSURMT[message[i].LVL1_CD + "_MIN"] = "";
                MSURMT[message[i].LVL1_CD + "_MAX"] = "";

                MSURMT.MTM = "";
                MSURMT.PTS = "";
                MSURMT.TREND_COLOR = "";
                MSURMT.WW = "";
                MSURMT.WW_COLOR = "";
                MSURMT.WW_TARGET = "";
                MSURMT.WW_MIN = "";
                MSURMT.WW_MAX = "";

              }
            }
          } catch(e) {
            formatedJson = {msg: e.message};
          }
    } // end if message not empty
      cb(err, formatedJson);
    });
  };

  T2compsummarygeo.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompSummaryGeo', type: 'object'}
  });

};
