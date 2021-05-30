'use strict';
var calcs = require("./utils/tieredLeakageCalcs");

module.exports = function(T1predrisk) {
  T1predrisk.processChild = function(req, filter, cb) {
    this.process(req, filter, function(err, message){
      if (err) {
        return cb(err, null);
    }

      if (!message.length <= 0){

        var sectorColors = [
          "#602797","#7732bb","#9753e1","#b07ce8","#bf93eb","#d2b5f0","#e2d2f4","#ece8f5",
          "#602797","#7732bb","#9753e1","#b07ce8","#bf93eb","#d2b5f0","#e2d2f4","#ece8f5",
          "#602797","#7732bb","#9753e1","#b07ce8","#bf93eb","#d2b5f0","#e2d2f4","#ece8f5",
          "#602797","#7732bb","#9753e1","#b07ce8","#bf93eb","#d2b5f0","#e2d2f4","#ece8f5",
          "#602797","#7732bb","#9753e1","#b07ce8","#bf93eb","#d2b5f0","#e2d2f4","#ece8f5",
          "#602797","#7732bb","#9753e1","#b07ce8","#bf93eb","#d2b5f0","#e2d2f4","#ece8f5",
          "#602797","#7732bb","#9753e1","#b07ce8","#bf93eb","#d2b5f0","#e2d2f4","#ece8f5"],

        geoColors = [
          "#5392FF","#71CDDD","#34BC6E","#95D13C","#FFB000","#FE8500","#FF509E","#9B82F3",
          "#5392FF","#71CDDD","#34BC6E","#95D13C","#FFB000","#FE8500","#FF509E","#9B82F3",
          "#5392FF","#71CDDD","#34BC6E","#95D13C","#FFB000","#FE8500","#FF509E","#9B82F3",
          "#5392FF","#71CDDD","#34BC6E","#95D13C","#FFB000","#FE8500","#FF509E","#9B82F3",
          "#5392FF","#71CDDD","#34BC6E","#95D13C","#FFB000","#FE8500","#FF509E","#9B82F3",
          "#5392FF","#71CDDD","#34BC6E","#95D13C","#FFB000","#FE8500","#FF509E","#9B82F3",
          "#5392FF","#71CDDD","#34BC6E","#95D13C","#FFB000","#FE8500","#FF509E","#9B82F3"],

        labelValue = "Geography Summary",

        formatedJson = {
          "DATE":message[0].LOAD_DATE,
          "TOTAL_TCV_LABEL":"Total Portfolio TCV",
          "AVG_RISK_LABEL":"Portfolio PRI (Weighted by TCV)",
          "TCV_AT_RISK_LABEL":"Total Portfolio TCV @ Risk",
          "GEO_LABEL":labelValue,
          "SECTOR_LABEL":"Sector Summary",
          "sectorData": [],
          "busAttrData": [],
          "Total": []
        }
        var metricValue = " ";
        switch (req.query['metric']) {
          case "GLOBAL":
              metricValue = "GEO";
              labelValue = "Geography Summary";
              break;
          case "GEO":
              metricValue = "MKT";
              labelValue = "Market/Region Summary";
              break;
          case "MKT":
              metricValue = "CTRY";
              labelValue = "Country Summary";
              break;
          default:
              metricValue = "GEO";
              labelValue = "Geography Summary";
              break;
        };

        formatedJson.GEO_LABEL = labelValue;
        let orderSectorColor  = 0;
        let orderGeoColor  = 0;

        for (var i = 0; i < message.length; i++) {

          switch (message[i].PRI_TYPE) {
            case "SCTR":
                formatedJson.sectorData.push({
                "name": message[i].ATTR_NAME,
                "color": sectorColors[orderSectorColor],                          
                //"risk_value": calcs.formatPercentage(Number(message[i].AVG_RISK)),
                "risk_value": calcs.calcX100(message[i].AVG_RISK),
                "tcv": (message[i].TOTAL_TCV)
              });
              orderSectorColor++;
              break;
            case metricValue:
              formatedJson.busAttrData.push({
                "name": message[i].ATTR_NAME,
                "color": geoColors[orderGeoColor],
                //"risk_value": calcs.formatPercentage(Number(message[i].AVG_RISK)),
                "risk_value": calcs.calcX100(message[i].AVG_RISK),
                "tcv": (message[i].TOTAL_TCV)
              });
              orderGeoColor++;
              break;
              case "Total":
              formatedJson.Total.push({
                "TCV_AT_RISK_VALUE": null,
                //"AVG_RISK_PCT": calcs.formatPercentage(Number(message[i].AVG_RISK)),
                "AVG_RISK_PCT": calcs.calcX100(message[i].AVG_RISK),
                "TOTAL_TCV_VALUE": (message[i].TOTAL_TCV)
              });
              break;
          } // end type
        } // end for
      }

      cb(err, formatedJson);
    });
  };

  T1predrisk.remoteMethod('processChild', {
    http: {path: '/', verb: 'get', status: 200},
    accepts: [{arg: 'data', type: 'object',  http: {source: 'req'} },
                {arg: 'filter', type: 'object'}],
    returns: {arg: 't1PredRisk', type: 'object'}
  });
};
