var mappingConfig = require('./mapper-configuration.json');

module.exports.map = function (serviceNm, columnNm) {
    var apiFound = false;
    mappingConfig.forEach(function (mapInstance) {
        var pattern = new RegExp(mapInstance.apiPattern, 'i'); // /t[0-9]comp/gi;
        if (pattern.test(serviceNm) && !apiFound) {
            apiFound = true;
            mapInstance.map.forEach(function (couple) {
                if (couple.source == columnNm) {
                    columnNm = couple.target;
                    return couple.target;
                }
            });
        }
    });
    return columnNm;
};
