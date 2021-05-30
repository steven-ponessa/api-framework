'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2pripopcicontract) {
  T2pripopcicontract.processChild = function(req, filter, cb) {
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
          "CNTRCT_NUM_LABEL":"Contract No",
          "CNTRCT_NAME_LABEL":"Contract Name",
          "CLIENT_NM_LABEL":"Client Name",
          "CNTRCT_SIGN_DT_LABEL":"Contract Sign Date",
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
          "RISK_GP_DET_LABEL": "Risk of GP Deterioration",
          "MTM_PTS_LABEL": "MtM Movement (Pts)",
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
                  "PRI_DATE":dateValue,
                  "DATE_LABEL": message[i].DATE_LABEL,
                  "CNTRCT_NUM":message[i].CNTRCT_NUM,
                  "CNTRCT_KEY":(message[i].CNTRCT_KEY),
                  "CNTRCT_NAME":(message[i].CNTRCT_DESC),
                  "CLIENT_NM":(message[i].CLIENT_NM),
                  "CNTRCT_SIGN_DT":(message[i].SGND_DT),
                  "PARTNER_NM":(message[i].PARTNER_NM),
                  "PM_NM":(message[i].PM_NM),
                  "GEO":(message[i].GEO),
                  "MARKET_REGION":(message[i].MARKET),
                  "COUNTRY":(message[i].CTRY_NM),
                  "GRWTH_PLFRM":(message[i].GRTH_PLFM_DESC),
                  "SERVICE_LINE":(message[i].SERVICE_LINE),
                  "PRACTICE":(message[i].PRACTICE_NM),
                  "SECTOR":(message[i].SCTR_NM),
                  "INDUSTRY":(message[i].INDUSTRY),
                  // check mapping in SQL
                  "TCV":message[i].TCV,
                  "RISK_GP_DET" :calcs.formatAmount(message[i].OVERALL_RISK,2),
                  //"PREV_RISK" :calcs.formatAmount(message[i].PREV_RISK,2),
                  "MTM_PTS" :calcs.formatAmount(message[i].MTM_PTS,2),
                  "PC_GP_AMT":message[i].PC_GP_AMT,
                  "PC_GP_PCT":calcs.calcX100(message[i].PC_GP_PCT),
                  "AP_GP_AMT":(message[i].AP_GP_AMT),
                  "AP_GP_PCT":calcs.calcX100(message[i].AP_GP_PCT),
                  "EAC_PLAN_GP_PCT":calcs.calcX100(message[i].EAC_TO_PLN_GP_PCT),
                  "ETC_GP_PCT":calcs.calcX100(message[i].ETC_GP_PCT),
                  "ETC_GP_AMT":(message[i].ETC_GP_AMT),
                  "ETC_COST_AMT":(message[i].ETC_COST_AMT),
                  "ETC_REV_AMT":(message[i].ETC_REV_AMT),

                  "ITD_GP_PCT":calcs.calcX100(message[i].ITD_GP_PCT),
                  "ITD_GP_AMT":(message[i].ITD_GP_AMT),
                  "ITD_COST_AMT":(message[i].ITD_COST_AMT),
                  "ITD_REV_AMT":(message[i].ITD_REV_AMT),

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

  T2pripopcicontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriPopCIContract', type: 'object'}
  });
};

