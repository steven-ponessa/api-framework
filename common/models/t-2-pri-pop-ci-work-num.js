'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2pripopciworknum) {
  T2pripopciworknum.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
    try {

          var formatedJson = {};
          var dateValue = '';
          var dataMsg = 'No Data Available';

          formatedJson = {
            "DATA_MESSAGE": dataMsg,
            "WORK_NBR_LABEL":"Work No",
            "WORK_DESC_LABEL":"Project Name",
            "CONTRACT_NBR_LABEL":"Contract Number",
            "CONTRACT_DESC_LABEL":"Contract Name",
            "CLIENT_NM_LABEL":"Client Name",
            "CONTRACT_SIGN_DATE_LABEL":"Contract Sign Date",
            "PARTNER_NM_LABEL":"Partner Name",
            "PM_NM_LABEL":"PM Name",
            "GEO_LABEL":"Geography",
            "MARKET_REGION_LABEL":"Market/Region",
            "COUNTRY_LABEL":"Country",
            "GRWTH_PLFRM_LABEL":"Growth Platform",
            "SERVICE_LINE_LABEL":"Service Line",
            "PRACTICE_LABEL":"Practice",
            "SECTOR_LABEL":"Sector",
            "INDUSTRY_LABEL":"Industry",
            "TCV_LABEL":"TCV $",
            "APRVD_PLAN_DT_LABEL": "Approved Plan Date",
            "FCAST_APRVD_PLAN_DT_LABEL": "Forecast Approved Date",
            "PC_GP_AMT_LABEL":"Price Case GP $",
            "PC_GP_PCT_LABEL":"Price Case GP %",
            "AP_GP_AMT_LABEL":"Approved Plan GP $",
            "AP_GP_PCT_LABEL":"Approved Plan GP %",
            "EAC_PLAN_GP_PCT_LABEL":"EaC to Plan GP %",
            "ETC_GP_PCT_LABEL":"EtC GP %",
            "ETC_GP_AMT_LABEL":"EtC GP $",
            "ETC_COST_AMT_LABEL":"EtC Cost $",
            "ETC_REV_AMT_LABEL":"EtC Revenue $",
            "ITD_GP_PCT_LABEL":"ItD GP %",
            "ITD_GP_AMT_LABEL":"ItD GP $",
            "ITD_COST_AMT_LABEL":"ItD Cost $",
            "ITD_REV_AMT_LABEL":"ItD Revenue $",
            "data":[]
          }
            if(message.length > 0) { //Avoid processing a empty result set

              switch (message[0].LNCH_FLG) {
                case 0:
                    dateValue =  message[0].DATA_LOAD_DESC; //Delivery model
                    break;
                default:
                    dateValue =  message[0].LNCH_DATE;  //Launch model
                    break;                    
              };

                formatedJson.DATA_MESSAGE = '';

                for (var i = 0; i < message.length; i++) {

                  formatedJson.data.push({
                    "pri_date":dateValue,
                    "date_label": message[i].DATE_LABEL,
                    "work_nbr":(message[i].WORK_NUM),
                    "work_key":(message[i].PROJ_KEY),
                    "work_desc":(message[i].WORK_DESC),
                    "contract_nbr":(message[i].CNTRCT_NUM),
                    "contract_key":(message[i].CNTRCT_KEY),
                    "contract_desc":(message[i].CNTRCT_DESC),
                    "client_nm":(message[i].CLIENT_NM),
                    "contract_sign_date":(message[i].SGND_DT),
                    "partner_nm":(message[i].PARTNER_NM),
                    "pm_nm":(message[i].PM_NOTES_ID),
                    "geo":(message[i].GEO),
                    "market_region":(message[i].MARKET),
                    "country_nm":(message[i].CTRY_NM),
                    "growth_platform_nm":(message[i].GRTH_PLFM_DESC),
                    "service_line":(message[i].SERVICE_LINE),
                    "practice":(message[i].PRACTICE_NM),
                    "gb_sector_nm":(message[i].SCTR_NM),
                    "industry":(message[i].INDUSTRY),
                    "tcv":message[i].TCV,
                    "aprvd_plan_dt":(message[i].APRVD_PLAN_DT),
                    "fcast_aprvd_plan_dt":(message[i].FCAST_APRVD_PLAN_DT),
                    "pc_gp_amt":message[i].PC_GP_AMT,
                    "pc_gp_pct":calcs.calcX100(message[i].PC_GP_PCT),
                    "ap_gp_amt":(message[i].AP_GP_AMT),
                    "ap_gp_pct":calcs.calcX100(message[i].AP_GP_PCT),
                    "eac_to_pln_gp_pct":calcs.calcX100(message[i].EAC_TO_PLN_GP_PCT),
                    "etc_gp_pct":calcs.calcX100(message[i].ETC_GP_PCT),
                    "etc_gp_amt":(message[i].ETC_GP_AMT),
                    "etc_cost_amt":(message[i].ETC_COST_AMT),
                    "etc_rev_amt":(message[i].ETC_REV_AMT),
                    "itd_gp_pct":calcs.calcX100(message[i].ITD_GP_PCT),
                    "itd_gp_amt":(message[i].ITD_GP_AMT),
                    "itd_cost_amt":(message[i].ITD_COST_AMT),
                    "itd_rev_amt":(message[i].ITD_REV_AMT),
                    "ippf_url":(message[i].IPPF_URL)
                  });
            };
        };  // end if no data

      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2pripopciworknum.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriPopCIWorkNum', type: 'object'}
  });
};

