'use strict';

var calcs = require("./utils/tieredLeakageCalcs");


module.exports = function(T2gpleakpopupcqqworknum) {

  T2gpleakpopupcqqworknum.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }
          var formatedJson = {};
          try {
            formatedJson = {
              "WORK_NUM_LABEL":"Work No.",
              "DATA_LOAD_DATE_LABEL":"Updated on ",
              "PROJ_NAME_LABEL":"Project Name",
              "CNTRCT_NAME_LABEL":"Contract Name",
              "PARTNER_NAME_LABEL":"Partner Name",
              "CNTRCT_SIGN_DATE_LABEL":"Contract Sign Date",
              "GB_SECTOR_LABEL":"GB Sector",
              "GROWTH_PLATFORM_LABEL":"Growth Platform",
              "SERVICE_LINE_LABEL":"Service Line",
              "INDUSTRY_LABEL": "Industry",
              "PC_GP_PCT_LABEL":"Price Case GP %",
              "AP_GP_PCT_LABEL":"Approved Plan GP %",
              "FC_GP_PCT_LABEL":"Forecast GP %",
              "FC_TO_PC_PCT_LABEL":"FC EaC to PC Leakage %",
              "YTD_TO_PC_PCT_LABEL":"YtD to PC Leakage %",
              "ITD_TO_PC_PCT_LABEL":"ItD to PC Leakage %",
              "CQ_TO_PC_PCT_LABEL":"CQ to PC Leakage %",
              "AP_TO_PC_PCT_LABEL":"AP to PC Leakage %",
              "FC_TO_AP_PCT_LABEL":"FC EaC to AP Leakage %",
              "CNTRCT_NUM_LABEL":"Contract Number",
              "CLIENT_NAME_LABEL":"Client Name",
              "COUNTRY_LABEL":"Country",
              "APPR_PLAN_DATE_LABEL":"Approved Plan Date",
              "FCST_APPR_DATE_LABEL":"Forecast Approved Date",
              "TCV_LABEL":"TCV $",
              "PC_GP_LABEL":"Price Case GP $",
              "AP_GP_LABEL":"Approved Plan GP $",
              "FC_GP_LABEL":"Forecast GP $",
              "FC_TO_PC_LABEL":"FC EaC to PC Leakage $",
              "YTD_TO_PC_LABEL":"YtD to PC Leakage $",
              "ITD_TO_PC_LABEL":"ItD to PC Leakage $",
              "CQ_TO_PC_LABEL":"CQ to PC Leakage $",
              "AP_TO_PC_LABEL":"AP to PC Leakage $",
              "FC_TO_AP_LABEL":"FC EaC to AP Leakage $",
              "data":[],
            };
            if (message.length > 0 ) {
              formatedJson.data.push({
                "WORK_NUM": message[0].WORK_NUM,
                "WORK_KEY":message[0].PROJ_KEY,
                "CONTRACT_KEY":message[0].CNTRCT_KEY,
                "DATA_LOAD_DATE": message[0].DATA_LOAD_DESC,
                "PROJ_NAME": message[0].PROJ_NAME,
                "CNTRCT_NAME": message[0].CONTRACT_NAME,
                "PARTNER_NAME": message[0].BRAND_PE,
                "CNTRCT_SIGN_DATE": message[0].CONTRACT_SIGN_DATE,
                "GB_SECTOR": message[0].SECTOR,
                "GROWTH_PLATFORM": message[0].GROWTH_PLATFORM,
                "SERVICE_LINE": message[0].SERVICE_LINE,
                "INDUSTRY": message[0].INDSTRY_CMR_NM,
                "PC_GP_PCT": calcs.formatPercentage100(message[0].PC_GP_PCT,1)+"%",
                "AP_GP_PCT": calcs.formatPercentage100(message[0].AP_GP_PCT,1)+"%",
                "FC_GP_PCT": calcs.formatPercentage100(message[0].FC_GP_PCT,1)+"%",
                "FC_TO_PC_PCT": calcs.formatPercentage100(message[0].FC_TO_PC_GP_PCT,1)+"%",
                "YTD_TO_PC_PCT": calcs.formatPercentage100(message[0].YTD_TO_PC_GP_PCT,1)+"%",
                "ITD_TO_PC_PCT": calcs.formatPercentage100(message[0].ITD_TO_PC_GP_PCT,1)+"%",
                "CQ_TO_PC_PCT": calcs.formatPercentage100(message[0].CQ_TO_PC_GP_PCT,1)+"%",
                "AP_TO_PC_PCT": calcs.formatPercentage100(message[0].AP_TO_PC_PCT,1)+"%",
                "FC_TO_AP_PCT": calcs.formatPercentage100(message[0].FC_TO_AP_PCT,1)+"%",
                "CNTRCT_NUM": message[0].CNTRCT_NUM,
                "CLIENT_NAME": message[0].CUSTOMER,
                "COUNTRY": message[0].COUNTRY,
                "APPR_PLAN_DATE": message[0].APPR_PLAN_DATE,
                "FCST_APPR_DATE": message[0].FCST_APPR_DATE,
                "TCV": (message[0].TCV),
                "PC_GP": (message[0].PC_GP),
                "AP_GP": (message[0].AP_GP),
                "FC_GP": (message[0].FC_GP_AMT),
                "FC_TO_PC": (message[0].FC_TO_PC_LKG),
                "YTD_TO_PC": (message[0].YTD_TO_PC_LKG),
                "ITD_TO_PC": (message[0].ITD_TO_PC_LKG),
                "CQ_TO_PC": (message[0].CQ_TO_PC_LKG),
                "AP_TO_PC": (message[0].AP_TO_PC_LKG),
                "FC_TO_AP": (message[0].FC_TO_AP_LKG),                
                "IPPF_URL": message[0].IPPF_URL
            });
          }; // End if not empty
            } catch (e) {
              formatedJson = {"msg" : e.message}
            }

          cb(err, formatedJson);
        });
    };

    T2gpleakpopupcqqworknum.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2GPLeakPopupCQQWorkNum', type: 'object'}
    });

};
