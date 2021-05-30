'use strict';

var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(t2PMProcComp7KPopup) {

  t2PMProcComp7KPopup.processChild = function(req, filter, cb) {
        this.process(req, filter, function(err, message){
          if (err) {
            return cb(err, null);
        }

        try {
          var dataMessage = "No data available";
          var formatedJson = {
              "DATA_MESSAGE": dataMessage,
              "data":[],
              "sevenkeys":[],
              "pm_pe_Info":[]
            };

            if (!message.length <= 0) {
              dataMessage = "";
              formatedJson.DATA_MESSAGE = dataMessage;

                formatedJson.data.push({
                  "CNTRCT_NUM": message[0].CNTRCT_NUM,
                  "CONTRACT_KEY":message[0].CNTRCT_KEY,
                  "Legal_Cntrct_Num_label":"Legal Contract Number",
                  "Legal_Cntrct_Num":message[0].LEGAL_CNTRCT_NUM,
                  "TCV": calcs.calcValue(message[0].TCV),
                  "IPPF_Customer": message[0].IPPF_CUSTOMER,
                  "Wbs_Start_dt": message[0].WBS_START_DT,
                  "Contract_sign_date": message[0].CONTRACT_SIGN_DATE,
                  "Contract_Status": message[0].CONTRACT_STATUS,
                  "Overal7Keys":message[0].OVERAL7KEYS,
                  "Seven_Keys":message[0].SEVEN_KEYS,
                  //IPPF LINK
                  "IPPF_URL": message[0].IPPF_URL
                });

                formatedJson.sevenkeys.push({
                  //Seven Keys
                  "Label7key":"7 Keys",
                  "LabelRed":"Red",
                  "LabelOrange":"Orange",
                  "LabelGreen":"Green",
                  "Stake_Holder_7key": message[0].STAKE_HOLDER_7KEY,
                  "Business_Benefits_7key": message[0].BUSINESS_BENEFITS_7KEY,
                  "Scope_7key": message[0].SCOPE_7KEY,
                  "Risk_7key": message[0].RISK_7KEY,
                  "Work_Schedule_7key": message[0].WORK_SCHEDULE_7KEY,
                  "Team7key": message[0].TEAM7KEY,
                  "Deli_Orga_7key": message[0].DELI_ORGA_7KEY
                });

                formatedJson.pm_pe_Info.push({
                  //title here
                  "IPPF_Sector": message[0].SECTOR,
                  "Country": message[0].COUNTRY,
                  "Wbs_shr_desc": message[0].WBS_SHR_DESC,
                  "Brand_pm_gen_rmrk": message[0].BRAND_PM_GEN_REM,
                  "Brand_pm_submission": message[0].BRAND_PM_SUBMISSION,
                  "Brand_pm_name": message[0].BRAND_PM_NAME,
                  "Brand_pm": message[0].BRAND_PM,
                  "Brand_pe_name": message[0].BRAND_PE_NAME,
                  "Brand_pe_approval": message[0].BRAND_PE_APPROVAL,
                  "Brand_pe_comments": message[0].BRAND_PE_COMMENTS

                });
              }; // end if empty message

          } catch (e) {
            formatedJson = {"msg" : e.message}
          }

          cb(err, formatedJson);
        });
    };

    t2PMProcComp7KPopup.remoteMethod('processChild', {
        http: {path: '/', verb: 'get', status: 200},
        accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                    {arg: 'filter', type: 'object'}],
        returns: {arg: 't2PMProcComp7KPopup', type: 'object'}
    });

};