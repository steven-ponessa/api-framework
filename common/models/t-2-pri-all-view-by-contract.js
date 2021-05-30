'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T2priallviewbycontract) {
  T2priallviewbycontract.processChild = function(req, filter, cb) {
      this.process(req, filter, function(err, message){
        if (err) {
          return cb(err, null);
      }
    try {

          var formatedJson = {
            "DATA_MESSAGE": "No Data Available",
            "VIEW_BY_LABEL":"Second View by",
            "sectorData": [],
            "geoData": [],
            "mktData": [],
            "gPlatData": [],
            "serviceData": [],
            "industryData": [],
            "practiceData": []                  
        };
        
            if(message.length > 0) { //Avoid processing a empty result set
              formatedJson.DATA_MESSAGE = " ";
              var colors = [
              "#FF5003","#810000","#FF7D87","#FDAC00","#DB2780","#E7BCFF","#000077","#9855D4","#F220E9","#C0E6FF","#415FDB","#5AAAFA","#FDD600","#008571","#41D6C3","#A7FFC1","#808100","#8CD211","#9B631B","#B8AEAE","#6D7777",
              "#FF5003","#810000","#FF7D87","#FDAC00","#DB2780","#E7BCFF","#000077","#9855D4","#F220E9","#C0E6FF","#415FDB","#5AAAFA","#FDD600","#008571","#41D6C3","#A7FFC1","#808100","#8CD211","#9B631B","#B8AEAE","#6D7777",
              "#FF5003","#810000","#FF7D87","#FDAC00","#DB2780","#E7BCFF","#000077","#9855D4","#F220E9","#C0E6FF","#415FDB","#5AAAFA","#FDD600","#008571","#41D6C3","#A7FFC1","#808100","#8CD211","#9B631B","#B8AEAE","#6D7777",
              "#FF5003","#810000","#FF7D87","#FDAC00","#DB2780","#E7BCFF","#000077","#9855D4","#F220E9","#C0E6FF","#415FDB","#5AAAFA","#FDD600","#008571","#41D6C3","#A7FFC1","#808100","#8CD211","#9B631B","#B8AEAE","#6D7777",
              "#FF5003","#810000","#FF7D87","#FDAC00","#DB2780","#E7BCFF","#000077","#9855D4","#F220E9","#C0E6FF","#415FDB","#5AAAFA","#FDD600","#008571","#41D6C3","#A7FFC1","#808100","#8CD211","#9B631B","#B8AEAE","#6D7777"
              ];

              let SectorInd  = 0;
              let GeoInd  = 0;
              let MktInd  = 0;
              let GPlatInd  = 0;
              let ServiceInd  = 0;
              let IndustryInd  = 0;
              let PracticeInd  = 0;

              for (var i = 0; i < message.length; i++) {

                  switch (message[i].TYPE_VALUE) {

                    case "SCTR":

                        switch (message[i].ATTR) {
                          case "All":
                            formatedJson.sectorData.push({
                              "label": message[i].LABEL_TXT,
                              "value": message[i].VALUE_TXT,
                              "value_desc": message[i].ATTR,
                              "rankValue": message[i].RANKATTR,
                              "all_text": message[i].ALL_TXT
                              });
                            break;

                          default:
                            formatedJson.sectorData.push({
                              "label": message[i].LABEL_TXT,
                              "value": message[i].VALUE_TXT,
                              "value_desc": message[i].ATTR,
                              "rankValue": message[i].RANKATTR,
                              "color": colors[SectorInd]
                              });
                              SectorInd++;
                            break;
                        }; // All check
                        break;
                    case "GEO":
                      switch (message[i].ATTR) {
                        case "All":
                          formatedJson.geoData.push({
                            "label": message[i].LABEL_TXT,
                            "value": message[i].VALUE_TXT,
                            "value_desc": message[i].ATTR,
                            "rankValue": message[i].RANKATTR,
                            "all_text": message[i].ALL_TXT
                            });
                          break;

                        default:
                          formatedJson.geoData.push({
                            "label": message[i].LABEL_TXT,
                            "value": message[i].VALUE_TXT,
                            "value_desc": message[i].ATTR,
                            "rankValue": message[i].RANKATTR,
                            "color": colors[GeoInd]
                            });
                            GeoInd++;
                          break;
                      }; // All check
                      break;
                    case "MKT":
                      switch (message[i].ATTR) {
                        case "All":
                          formatedJson.mktData.push({
                            "label": message[i].LABEL_TXT,
                            "value": message[i].VALUE_TXT,
                            "value_desc": message[i].ATTR,
                            "rankValue": message[i].RANKATTR,
                            "all_text": message[i].ALL_TXT
                            });
                          break;

                        default:
                          formatedJson.mktData.push({
                            "label": message[i].LABEL_TXT,
                            "value": message[i].VALUE_TXT,
                            "value_desc": message[i].ATTR,
                            "rankValue": message[i].RANKATTR,
                            "color": colors[MktInd]
                            });
                            MktInd++;
                          break;
                      }; // All check
                      break;

                    case "GPLAT":
                      switch (message[i].ATTR) {
                        case "All":
                          formatedJson.gPlatData.push({
                            "label": message[i].LABEL_TXT,
                            "value": message[i].VALUE_TXT,
                            "value_desc": message[i].ATTR,
                            "rankValue": message[i].RANKATTR,
                            "all_text": message[i].ALL_TXT
                            });
                          break;

                        default:
                          formatedJson.gPlatData.push({
                            "label": message[i].LABEL_TXT,
                            "value": message[i].VALUE_TXT,
                            "value_desc": message[i].ATTR,
                            "rankValue": message[i].RANKATTR,
                            "color": colors[GPlatInd]
                            });
                            GPlatInd++;
                          break;
                      }; // All check
                      break;

                    case "SERV":
                      switch (message[i].ATTR) {
                        case "All":
                          formatedJson.serviceData.push({
                            "label": message[i].LABEL_TXT,
                            "value": message[i].VALUE_TXT,
                            "value_desc": message[i].ATTR,
                            "rankValue": message[i].RANKATTR,
                            "all_text": message[i].ALL_TXT
                            });
                          break;

                        default:
                          formatedJson.serviceData.push({
                            "label": message[i].LABEL_TXT,
                            "value": message[i].VALUE_TXT,
                            "value_desc": message[i].ATTR,
                            "rankValue": message[i].RANKATTR,
                            "color": colors[ServiceInd]
                            });
                            ServiceInd++;
                          break;
                      }; // All check
                      break;

                    case "INDU":
                      switch (message[i].ATTR) {
                        case "All":
                          formatedJson.industryData.push({
                            "label": message[i].LABEL_TXT,
                            "value": message[i].VALUE_TXT,
                            "value_desc": message[i].ATTR,
                            "rankValue": message[i].RANKATTR,
                            "all_text": message[i].ALL_TXT
                            });
                          break;

                        default:
                          formatedJson.industryData.push({
                            "label": message[i].LABEL_TXT,
                            "value": message[i].VALUE_TXT,
                            "value_desc": message[i].ATTR,
                            "rankValue": message[i].RANKATTR,
                            "color": colors[IndustryInd]
                            });
                            IndustryInd++;
                          break;
                        }; // All check
                        break;

                        case "PRACT":
                          switch (message[i].ATTR) {
                            case "All":
                              formatedJson.practiceData.push({
                                "label": message[i].LABEL_TXT,
                                "value": message[i].VALUE_TXT,
                                "value_desc": message[i].ATTR,
                                "rankValue": message[i].RANKATTR,
                                "all_text": message[i].ALL_TXT
                                });
                              break;
    
                            default:
                              formatedJson.practiceData.push({
                                "label": message[i].LABEL_TXT,
                                "value": message[i].VALUE_TXT,
                                "value_desc": message[i].ATTR,
                                "rankValue": message[i].RANKATTR,
                                "color": colors[PracticeInd]
                                });
                                PracticeInd++;
                              break;
                      }; // All check
                      break;
                } // end type
              } // end loop
            };
      } catch (e) {
        formatedJson = {"msg" : e.message}
      }

        cb(err, formatedJson);
      });
  };

  T2priallviewbycontract.remoteMethod('processChild', {
      http: {path: '/', verb: 'get', status: 200},
      accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                  {arg: 'filter', type: 'object'}],
      returns: {arg: 't2PriAllViewByContract', type: 'object'}
  });
};

