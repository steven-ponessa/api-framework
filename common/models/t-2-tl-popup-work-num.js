'use strict';

var calcs = require("./utils/tieredLeakageCalcs");


module.exports = function(T2tlpopupworknum) {

  T2tlpopupworknum.processChild = function(req, filter, cb) {
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
              "CNTRCT_NUM_LABEL":"Contract Number",
              "CNTRCT_NAME_LABEL":"Contract Name",
              "CLIENT_NAME_LABEL":"Client Name",
              "PARTNER_NAME_LABEL":"Partner Name",
              "COUNTRY_LABEL":"Country",
              "CNTRCT_SIGN_DATE_LABEL":"Contract Sign Date",
              "APPR_PLAN_DATE_LABEL":"Approved Plan Date",
              "GB_SECTOR_LABEL":"GB Sector",
              "FCST_APPR_DATE_LABEL":"Forecast Approved Date",
              "GROWTH_PLATFORM_LABEL":"Growth Platform",
              "SERVICE_LINE_LABEL":"Service Line",
              "PC_GP_PCT_LABEL":"Price Case GP %",
              "PC_GP_LABEL":"Price Case GP $",
              "AP_GP_PCT_LABEL":"Approved Plan GP %",
              "AP_GP_LABEL":"Approved Plan GP $",
              "FC_GP_PCT_LABEL":"Forecast GP %",
              "FC_GP_LABEL":"Forecast GP $",
              "TCV_LABEL":"TCV $",
              //next based on metric
              "FC_TO_AP_PCT_LABEL":"FC EaC to AP Leakage %",
              "FC_TO_AP_LABEL":"FC EaC to AP Leakage $",
              "CQ_TO_AP_PCT_LABEL":"CQ to AP Leakage %",
              "CQ_TO_AP_LABEL":"CQ to AP Leakage $",
              "COST_OVER_PCT_LABEL":"3 Mo. Cost Overrun %",
              "COST_OVER_LABEL":"3 Mo. Cost Overrun $",
              "PLAN_LABEL":"Plan",
              "ACTUAL_LABEL":"Actual",
              "VAR_LABEL":"Variance",
              "TIER_LABEL":"Tier",
              "data":[],
            };
            if (message.length > 0 ) {
              formatedJson.data.push({
                "WORK_NUM": message[0].PROJECT_NUMBER,
                "work_key":message[0].PROJ_KEY,
                "contract_key":message[0].CNTRCT_KEY,                 
                "DATA_LOAD_DATE": message[0].DATA_LOAD_DESC,
                "PROJ_NAME": message[0].PROJECT_NAME,
                "CNTRCT_NAME": message[0].CONTRACT_NAME,
                "PARTNER_NAME": message[0].PARTNER_NAME,
                "CNTRCT_SIGN_DATE": message[0].CONTRACT_SIGN_DATE,
                "GB_SECTOR": message[0].SECTOR,
                "GROWTH_PLATFORM": message[0].GROWTH_PLATFORM,
                "SERVICE_LINE": message[0].SERVICE_LINE,
                "PC_GP_PCT": calcs.formatPercentage100(message[0].PC_GP_PCT,1)+"%",
                "AP_GP_PCT": calcs.formatPercentage100(message[0].AP_GP_PCT,1)+"%",
                "FC_GP_PCT": calcs.formatPercentage100(message[0].FC_GP_PCT,1)+"%",
                "CNTRCT_NUM": message[0].CONTRACT_NUMBER,
                "CLIENT_NAME": message[0].CLIENT_NM,
                "COUNTRY": message[0].COUNTRY,
                "APPR_PLAN_DATE": message[0].APPROVED_PLAN_DATE,
                "FCST_APPR_DATE": message[0].FORECAST_APPROVED_DATE,
                "TCV": (message[0].TCV_AMT),
                "PC_GP": (message[0].PC_GP_AMT),
                "AP_GP": (message[0].AP_GP_AMT),
                "FC_GP": (message[0].FC_GP_AMT),
                //next based on metric, UI needs to grab applicable values
                /*
                "CQ_TO_AP": (message[0].CQ_TO_AP_LKG_VARIANCE_DIFF),
                "CQ_TO_AP_PCT": calcs.formatPercentage100(message[0].CQ_TO_AP_LKG_VARIANCE_PCT,1)+"%",
                */
                "CQ_TO_AP": '--',
                "CQ_TO_AP_PCT": '--',

                "FC_EAC_AP": (message[0].FC_TO_AP_LKG_VARIANCE_DIFF), 
                "COST_OVER": Math.abs(message[0].COST_OVER_VARIANCE_DIFF),

                "FC_EAC_AP_PCT": calcs.formatPercentage100(message[0].FC_TO_AP_LKG_VARIANCE_PCT,1)+"%",
                "COST_OVER_PCT": Math.abs(calcs.formatPercentage100(message[0].COST_OVER_VARIANCE_PCT,1))+"%",

                "PLAN": (message[0].LKG_PLAN),
                "ACTUALS": (message[0].LKG_ACTUAL),
                "TIER_NUMBER": (message[0].TIER_NUM),                                

                "IPPF_URL": message[0].IPPF_URL
            });
          }; // End if not empty
            } catch (e) {
              formatedJson = {"msg" : e.message}
            }

          cb(err, formatedJson);
        });
    };

    T2tlpopupworknum.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2TLPopupWorkNum', type: 'object'}
    });

};
