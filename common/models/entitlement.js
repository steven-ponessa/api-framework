'use strict';

module.exports = function (Entitlement) {

    Entitlement.processChild = function (req, filter, cb) {
        this.process(req, filter, function (err, message) {
            if (err) {
                return cb(err, null);
            }

            try {
                var applId = {
                    PHD: 300
                    //PLD: 301
                };

                var filterType = {
                    GLOBAL: 4,
                    GEO: 8,
                    IMT: 16,
                    REGION: 32,
                    COUNTRY: 64,
                    SECTOR: 128,
                    GROWTH_PLATFORM: 256,
                    SERVICE: 512,
                    PRACTICE: 1024,
                    LABOR_POOL: 2048
                };
                var accType = {
                    PRIVILIGED_ACCESS: 500
                };

                //Modify the returned JSON
                var DataRestrictions = [];
                var authorized = false;

                var geographies = [];
                var sectors = [];
                var imts = [];
                var regions = [];
                var countries = [];
                var sectors = [];
                var growth_platforms = [];
                var services = [];
                var practices = [];
                var labor_pools = [];
                var emp_access = [];
       
                console.log("message.length = " + message.length);
                message.forEach(function (element) {
                    
                    console.log("element = " + element.ROLE_ID);
                    switch (element.ROLE_ID) {
                        case accType.PRIVILIGED_ACCESS:
                            console.log("in priv access switch statement" + accType.PRIVILIGED_ACCESS);
                            emp_access.push("True");
                            break;
                        case applId.PHD:
                            authorized = true;
                            console.log("in authorized switch statement");
                            break;
                        case filterType.GLOBAL:
                            geographies = [];
                            console.log("in GLOBAL switch statement");
                            break;
                        case filterType.GEO:
                            geographies.push(element.VALUE);
                            break;
                        case filterType.IMT:
                            imts.push(element.VALUE);
                            break;
                        case filterType.REGION:
                            regions.push(element.VALUE);
                            break;
                        case filterType.COUNTRY:
                            countries.push(element.VALUE);
                            break;
                        case filterType.SECTOR:
                            sectors.push(element.VALUE);
                            break;
                        case filterType.GROWTH_PLATFORM:
                            growth_platforms.push(element.VALUE);
                            break;
                        case filterType.SERVICE:
                            services.push(element.VALUE);
                            break;
                        case filterType.PRACTICE:
                            practices.push(element.VALUE);
                            break;
                        case filterType.LABOR_POOL:
                            labor_pools.push(element.VALUE);
                            break;
                        default:
                            console.log("Unknown ROLE_ID=" + element.ROLE_ID);
                    }
                }, this);
                 
               /* message.forEach(function (element) {
                    switch (element.ROLE_ID) {
                        case 301:
                            authorized = true;
                            break;
                        case 4:
                            geographies = [];
                            break;
                        case 5:
                            geographies.push(element.VALUE);
                            break;
                        case 6:
                            sectors.push(element.VALUE);
                            break;
                        case 7:
                            countries.push(element.VALUE);
                            break;
                        default:
                            console.log("Unknown ROLE_ID=" + element.ROLE_ID);
                    }
                }, this);*/

                if (!authorized) {
                    var error = new Error();
                    error.status = 403;
                    error.message = "403 Forbidden access - user not authorized to PLDB.";
                    error.code = "MISSING_PARAMETER";
                    return cb(temp, null);
                }
                if (emp_access.length > 0) {
                    DataRestrictions.push({ "Category": "emp_access", "Value": emp_access });
                }
                if (geographies.length > 0) {
                    DataRestrictions.push({ "Category": "geography", "Value": geographies });
                }
                if (imts.length > 0) {
                    DataRestrictions.push({ "Category": "imt", "Value": imts });
                }
                if (regions.length > 0) {
                    DataRestrictions.push({ "Category": "region", "Value": regions });
                }
                if (countries.length > 0) {
                    DataRestrictions.push({ "Category": "country", "Value": countries });
                }
                if (sectors.length > 0) {
                    DataRestrictions.push({ "Category": "sector", "Value": sectors });
                }
                if (growth_platforms.length > 0) {
                    DataRestrictions.push({ "Category": "growth_platform", "Value": growth_platforms });
                }
                if (services.length > 0) {
                    DataRestrictions.push({ "Category": "service", "Value": services });
                }
                if (practices.length > 0) {
                    DataRestrictions.push({ "Category": "practice", "Value": practices });
                }
                if (labor_pools.length > 0) {
                    DataRestrictions.push({ "Category": "labor_pool", "Value": labor_pools });
                }
                console.log("Data Restrictions(entitlment.js): " + JSON.stringify(DataRestrictions)+"end DataRestrictions");
                cb(err, DataRestrictions);
            } catch (err) {
                // Handle the error here.
                var error = new Error();
                error.status = 450;
                error.message = err.message;
                error.code = err.code;
               // logger.error('Failed retrieving service: %s', error.message);
                return cb(error, null);
            }
        });
    };

    Entitlement.remoteMethod('processChild', {
        http: { path: '/', verb: 'get', status: 200 },
        accepts: [{ arg: 'data', type: 'object', http: { source: 'req' } },
        { arg: 'filter', type: 'object' }],
        returns: { arg: 'DataRestrictions', type: 'object' }
    });

};