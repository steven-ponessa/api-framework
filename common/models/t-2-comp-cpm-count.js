'use strict';

var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2compcpmcount) {

    T2compcpmcount.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message) {
          if (err) {
            return cb(err, null);
        }

        try {

          var dateValue = '';
          var dataMessage = '';
          if (!message.length <= 0) {
            dateValue =  message[0].DATA_LOAD_DESC;
          } else {
            dataMessage = "No Data Available";
          }; //end if empty
          var cpmaColor = '';
          var cpmeColor = '';
          var cpmaLabel = "CPM Assigned - Assigned";
          var cpmeLabel = "CPM + Exceptions - Compliant";
          var aprexLabel = "Approved Exceptions";
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

            var jsonData = {
              "SELECTED_LABEL":"",
              "DATA_LOAD_DATE" :dateValue,
              "DATA_MESSAGE": dataMessage,
              "TIMEFRAME":dateUtils.formatQuarterYear(req.query['yrQtrKey']),
              "data": [
                  {
                    "label": cpmaLabel,
                    "color": cpmaColor,
                    "busAttrData": []
                  },
                  {
                    "label": cpmeLabel,
                    "color": cpmeColor,
                    "busAttrData": []
                  },
                  {
                    "label": aprexLabel,
                    "color": "#054ADA",
                    "busAttrData": []
                  }]
              };
              var show_ww = 0;

              message.forEach(function (element) {
                  var cpma = {
                    "name": "",
                    "count": "",
                    "total_count_label":"Total Complex Contracts",
                    "active_cpm_label":"Active CPMs",
					"cic_cpm_label":"CIC CPMs",
                    "cpm_asnd_label":"CPM Assigned Contracts",
                    "cpm_nasnd_label":"CPM Not Assigned Contracts",
                    "cpm_asnd_cnt": "",
                    "cpm_nasnd_cnt": "",                    
                    "active_cpm_cnt": "",
					"cic_cpm_cnt": "",
                    "total_count": "",
                    "percent": ""
                  };

                  var cpme = {
                    "name": "",
                    "count": "",
                    "total_count_label":"Total Complex Contracts",
                    "active_cpm_label":"Active CPMs",
					"cic_cpm_label":"CIC CPMs",
                    "cpm_comp_label":"Compliant Contracts",
                    "cpm_noncomp_label":"Non Compliant Contracts",
                    "cpm_comp_cnt": "",
                    "cpm_noncomp_cnt": "",
                    "active_cpm_cnt": "",
					"cic_cpm_cnt": "",
                    "total_count": "",
                    "percent": ""
                  };

                  var aprex = {
                    "name": "",
                    "count": "",
                    "metric_count_label":"Approved Exceptions Contracts",
                    "total_count_label":"Total Complex Contracts",
                    "active_cpm_label":"Active CPMs",
					"cic_cpm_label":"CIC CPMs",
                    "active_cpm_cnt": "",
					"cic_cpm_cnt": "",
                    "total_count": "",
                    "percent": ""
                  };

                  if (( req.query['busAttr'] == 'GEO_DESC' ) || ( req.query['busAttr'] == 'GROWTH_PLATFORM_DESC' )) {
                      show_ww = 1;
                  } else {
                      show_ww = 0;
                  };

                  if ( element.BUS_ATTR != 'Worldwide' ) {
                      cpma.name = element.BUS_ATTR;
                      cpma.count = element.CPMA;
                      cpma.cpm_asnd_cnt = element.CPM_ASND_CNT
                      cpma.cpm_nasnd_cnt = element.CPM_NASND_CNT;
                      cpma.active_cpm_cnt = element.ACTIVE_CPM_CNT;
                      cpma.cic_cpm_cnt = element.CIC_CPM_CNT;
                      cpma.total_count = element.TOTAL_CNT;
                      cpma.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.CPMA_PCT)));

                      cpme.name = element.BUS_ATTR;
                      cpme.count = element.CPME;
                      cpme.cpm_comp_cnt = element.CPM_COMP_CNT;
                      cpme.cpm_noncomp_cnt = element.CPM_NONCOMP_CNT;
                      cpme.active_cpm_cnt = element.ACTIVE_CPM_CNT;
                      cpme.cic_cpm_cnt = element.CIC_CPM_CNT;
                      cpme.total_count = element.TOTAL_CNT;
                      cpme.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.CPME_PCT)));

                      aprex.name = element.BUS_ATTR;
                      aprex.count = element.APREX;
                      aprex.active_cpm_cnt = element.ACTIVE_CPM_CNT;
					  aprex.cic_cpm_cnt = element.CIC_CPM_CNT;
                      aprex.total_count = element.TOTAL_CNT;
                      aprex.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.APREX_PCT)));

                      jsonData.data[0].busAttrData.push(cpma);
                      jsonData.data[1].busAttrData.push(cpme);
                      jsonData.data[2].busAttrData.push(aprex);
                  } else { 
                      if ( ( element.BUS_ATTR == 'Worldwide' ) && ( show_ww == 1 ) ) {
                          cpma.name = element.BUS_ATTR;
                          cpma.count = element.CPMA;
                          cpma.cpm_asnd_cnt = element.CPM_ASND_CNT
                          cpma.cpm_nasnd_cnt = element.CPM_NASND_CNT;
						  cpma.active_cpm_cnt = element.ACTIVE_CPM_CNT;
						  cpma.cic_cpm_cnt = element.CIC_CPM_CNT;
                          cpma.total_count = element.TOTAL_CNT;
                          cpma.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.CPMA_PCT)));
    
                          cpme.name = element.BUS_ATTR;
                          cpme.count = element.CPME;
                          cpme.cpm_comp_cnt = element.CPM_COMP_CNT;
                          cpme.cpm_noncomp_cnt = element.CPM_NONCOMP_CNT;
						  cpme.active_cpm_cnt = element.ACTIVE_CPM_CNT;
						  cpme.cic_cpm_cnt = element.CIC_CPM_CNT;
                          cpme.total_count = element.TOTAL_CNT;
                          cpme.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.CPME_PCT)));
    
                          aprex.name = element.BUS_ATTR;
                          aprex.count = element.APREX;
                          aprex.active_cpm_cnt = element.ACTIVE_CPM_CNT;
						  aprex.cic_cpm_cnt = element.CIC_CPM_CNT;
                          aprex.total_count = element.TOTAL_CNT;
                          aprex.percent = calcs.removeMinusZero(calcs.formatPercentage100(Number(element.APREX_PCT)));
    
                          jsonData.data[0].busAttrData.push(cpma);
                          jsonData.data[1].busAttrData.push(cpme);
                          jsonData.data[2].busAttrData.push(aprex);
                      }; 
                    }; // end if WW and GEO or GP view by

              }, this);
            } catch(e) {
              jsonData = {msg: e.message};
            }

            cb(err, jsonData);
        });
    };

    T2compcpmcount.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2CompCPMcount', type: 'object'}
    });

  };
