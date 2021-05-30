'use strict';
var calcs = require("./utils/tieredLeakageCalcs");
var dateUtils = require("./utils/dateUtils");

module.exports = function(T2compippfexportmetric) {
  T2compippfexportmetric.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
            return cb(err, null);
        }

    try {

        var formatedJson = {};

        if(message.length == 0) { 
            formatedJson = {};
        } else {
            formatedJson = {}
            formatedJson.data = [];

            for (var i = 0; i < message.length; i++) {

              formatedJson.data.push({
  
          "WBS_ID [IPPF Link]":message[i].WBS_ID,
          "COUNTRY":message[i].COUNTRY,
          "BRAND":message[i].BRAND,
          "IPPF_SECTORSND":message[i].IPPF_SECTORSND,
          "IPPF_SECTOR_GBOVERLAY":message[i].IPPF_SECTOR_GBOVERLAY,
          "IPPF_INDUSTRY":message[i].IPPF_INDUSTRY,
          "SERVICE_LINE":message[i].SERVICE_LINE,
          "PRACTICE":message[i].PRACTICE,
          "GROWTH_PLATFORM":message[i].GROWTH_PLATFORM,
          "GEO":message[i].GEO,
          "MARKET":message[i].MARKET,
          "WBS_SHORT_DESC":message[i].WBS_SHORT_DESC,
          "WBS_START_DT":message[i].WBS_START_DT,
          "WBS_END_DT":message[i].WBS_END_DT,
          "WBS_CREATED_DATE":message[i].WBS_CREATED_DATE,
          "FORCAST_WORKFLOW_STATUS":message[i].FORCAST_WORKFLOW_STATUS,
          "FORCAST_OVERRIDE_STATUS":message[i].RSNCD,
          "FORCAST_SUBMITER_NOTESID":message[i].FORCAST_SUBMITER_NOTESID,
          "FORCAST_SUBMISSION_TIMESTAMP":message[i].SUBDT,
          "FORCAST_LAST_APPROVED_TIMESTAMP":message[i].FORCAST_LAST_APPROVED_TIMESTAMP,
          "PROCESS_INDICATOR":message[i].PROCESS_INDICATOR,
          "IPPF_CUSTOMER":message[i].CLT,
          "SYSTEM_CONTRACT_NUMBER":message[i].SYSTEM_CONTRACT_NUMBER,
          "WBS_IPPF_STATUS":message[i].WBS_IPPF_STATUS,
          "PE_NOTESID":message[i].PE_NOTESID,
          "BRAND_PE_NOTESID":message[i].BRAND_PE_NOTESID,
          "PM_NOTESID":message[i].PM,
          "OVERRIDE_JUSTIFICATION":message[i].OVERRIDE_JUSTIFICATION,
          "FORCAST_ELEGIBILITY_STATUS":message[i].FORCAST_ELEGIBILITY_STATUS,
          "PM_FORCAST_COMMENTS":message[i].PM_FORCAST_COMMENTS,
          "IPPF_AP51_INDICATOR":message[i].IPPF_AP51_INDICATOR,
          "IPPF_URL": message[i].PHD_URL

              });
            };

        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2compippfexportmetric.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2CompIPPFExportMetric', type: 'object'}
  });
};

