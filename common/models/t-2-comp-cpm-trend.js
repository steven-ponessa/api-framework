'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2compcpmtrend) {
    T2compcpmtrend.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
      var cpmaColor = '';
      var cpmeColor = '';
      var cpmaLabel = "CPM Assigned - Assigned";
      var cpmeLabel = "CPM + Exceptions - Compliant";
      var aprexLabel = "Approved Exceptions";
      var aprexColor = '#054ADA';
        switch (req.query['assgn']) {
          case 'NASND':
            cpmaColor = "#FF832B";
            cpmaLabel = "CPM Assigned - Not Assigned";
            break;
          case 'ASND':
            cpmaColor = "#24A148";
            cpmaLabel = "CPM Assigned - Assigned";
            break;
          default:
            cpmaColor = "#24A148";
            cpmaLabel = "CPM Assigned - Assigned";
        }    
        switch (req.query['compl']) {
          case 'NONCOMP':
            cpmeColor = "#DA1E28";
            cpmeLabel = "CPM + Exceptions - Non Compliant";
            break;
          case 'COMP':
            cpmeColor = "#FDD13A";
            cpmeLabel = "CPM + Exceptions - Compliant";            
            break;
          default:
            cpmeColor = "#FDD13A";
            cpmeLabel = "CPM + Exceptions - Compliant";
        }
        var dataMessage = '';
        var formatedJson = {
                "DATA_LOAD_DATE": " ",
                "DATA_MESSAGE": dataMessage,
                "TIMEFRAME": " ",
                "CPM_ASSIGNED_LABEL": cpmaLabel,
                "CPM_ASSIGNED_COLOR": cpmaColor,
                "CPM_EXCEPTIONS_LABEL": cpmeLabel,
                "CPM_EXCEPTIONS_COLOR": cpmeColor,
                "APPR_EXCEPTIONS_LABEL": aprexLabel,
                "APPR_EXCEPTIONS_COLOR": aprexColor,
                "CPM_ASSIGNED": [],
                "CPM_EXCEPTIONS": [],
                "NON_COMPLIANT": [],
                "APPR_EXCEPTIONS": []
        }

        if (!message.length <= 0){
          var j = message.length-1;
          //formatedJson.SELECTED_LABEL = req.query['label'];
          formatedJson.TIMEFRAME = dateUtils.formatQuarterYear(req.query['yrQtrKey']);

          for (var i = 0; i < message.length; i++) {
            formatedJson.CPM_ASSIGNED.push({
              "id":i+1,
              "label": cpmaLabel,
              "value": "CPMA",
              "color": cpmaColor,
              "total_count_label":"Total Complex Contracts",
              "active_cpm_label":"Active CPMs", 
			  "cic_cpm_label":"CIC CPMs", 
              "cpm_asnd_label":"CPM Assigned Contracts",
              "cpm_nasnd_label":"CPM Not Assigned Contracts", 
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].CPMA,
              "total_count": message[i].TOTAL_CNT,
              "cpm_asnd_cnt": message[i].CPM_ASND_CNT,
              "cpm_nasnd_cnt": message[i].CPM_NASND_CNT,
              "active_cpm_cnt": message[i].ACTIVE_CPM_CNT,     
              "cic_cpm_cnt": message[i].CIC_CPM_CNT,
              "percent": calcs.formatPercentage100(message[i].CPMA_PCT,1)
              });
            formatedJson.CPM_EXCEPTIONS.push({
              "id":i+1,
              "label": cpmeLabel,
              "value": "CPME",
              "color": cpmeColor,
              "total_count_label":"Total Complex Contracts",
              "active_cpm_label":"Active CPMs", 
			  "cic_cpm_label":"CIC CPMs", 
              "cpm_comp_label":"Compliant Contracts",
              "cpm_noncomp_label":"Non Compliant Contracts", 
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].CPME,
              "total_count": message[i].TOTAL_CNT,
              "cpm_comp_cnt": message[i].CPM_COMP_CNT,
              "cpm_noncomp_cnt": message[i].CPM_NONCOMP_CNT,
              "active_cpm_cnt": message[i].ACTIVE_CPM_CNT,     
              "cic_cpm_cnt": message[i].CIC_CPM_CNT,
              "percent": calcs.formatPercentage100(message[i].CPME_PCT,1)
              });
            formatedJson.APPR_EXCEPTIONS.push({
              "id":i+1,
              "label": "Approved Exceptions",
              "value": "APREX",
              "color": aprexColor, 
              "metric_count_label":"Approved Exceptions Contracts",
              "total_count_label":"Total Complex Contracts",
              "active_cpm_label":"Active CPMs", 
			  "cic_cpm_label":"CIC CPMs", 
              "date": message[i].YR_NUM + '/' + message[i].MTH_NUM + '/01',
              "yrMoKey": message[i].YR_MO_KEY,
              "count": message[i].APREX,
              "total_count": message[i].TOTAL_CNT,
              "active_cpm_cnt": message[i].ACTIVE_CPM_CNT,     
              "cic_cpm_cnt": message[i].CIC_CPM_CNT,
              "percent": calcs.formatPercentage100(message[i].APREX_PCT,1)
              });
          }
          formatedJson.DATA_LOAD_DATE = message[j].DATA_LOAD_DESC; //this will be compliance Data_Load_Date
        } else {
          formatedJson.DATA_MESSAGE = "No Data Available";
        } //end if empty

      cb(err, formatedJson);
  });
};

T2compcpmtrend.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
              {arg: 'filter', type: 'object'}],
              returns: {arg: 't2CompCPMTrend', type: 'object'}
  });

};
