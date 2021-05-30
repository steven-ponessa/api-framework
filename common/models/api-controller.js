'use strict';
var request = require("request");
var util = require('util');
var js2xmlparser = require("js2xmlparser");
var jwt = require('jsonwebtoken');
var fs = require('fs');
var URL = require('url');
var secret = 'yourSuperSecretPassword';
var myMapper = require('./Mapper');
var filterConfigFileName = './phdb-filter-configuration.json';
var filterConfig = require(filterConfigFileName);

var ibmdb = require('ibm_db');

module.exports = function (Apicontroller) {
	
    Apicontroller.process = function (req, filter, cb) {

        var token = req.headers.authorization;

        if (typeof (token) === 'undefined') {
            if (req.cookies)
                token = req.cookies['token'];
        }

        var dataRestrictions = [];
        var secFilter = null;
        var loggingID = 'development';
        var tokenFromCookies = '';        

       console.log("===>Apicontroller.process req.cookies['token'] token =" + token);
        if (token) {
            var decoded = jwt.verify(token, secret);
            //var decodedObj = JSON.parse(decoded);
            dataRestrictions = decoded.token.dataRestrictions;
            loggingID = JSON.stringify(decoded.token.id);
            loggingID = loggingID.replace(/"/g, '');
            console.log("===>Apicontroller.process jwt.verify(token, secret)=" + JSON.stringify(decoded));
        }

        if (dataRestrictions) {
            if (dataRestrictions && dataRestrictions.length > 0) {
                if (!(dataRestrictions.length == 1 && dataRestrictions[0].Category == "emp_access")) {
                    if (!filter) {
                        filter = { "where": {} };
                    }
                    secFilter = { "where": {} };
                    dataRestrictions.forEach(function (element) {

                        for (var i = 0; i < filterConfig.length; i++) {
                            if (element.Category == filterConfig[i].name) {
                                cleanFilter(filter, filterConfig[i].columnName, secFilter, element);
                                break;
                            } //end - if (element.Category == filterConfig[i].name)
                        }

                    });
                }//end - if only emp_access
            } //end - if (dataRestrictions && dataRestrictions.length > 0)
        } //end - if (dataRestrictions)


        var serviceNm = req.baseUrl.substring(5, req.baseUrl.length); //-1);
        //console.log("=====>serviceNm=" + serviceNm);

        /*
        * Temporary until we enable configuration and start the process specifying a value for process.env.NODE_ENV.
        * This code does nothing except check/verify that we don't have process.env.NODE_ENV specified.
        */
/*         if (process) {
            if (process.env) {
                //console.log('process.env=' + JSON.stringify(process.env));
                if (process.env.NODE_ENV) console.log('process.env.NODE_ENV=' + process.env.NODE_ENV);
            }
        } */

        /*
        * Temporary - logPath should be set in the configuration file and used in all environments but development.
        *  Note too that the logPath was supposed to be /opt/phd-logs/ but apicadm does not have permission to write
        *  to that directory (the directory was created by apicadm using sudo mkdir phd-logs)
        */
        //if (process.env.NODE_ENV != 'development') {
/*         if (logPath.length > 0) {
            try {
                //console.log("in logging try/catch");
                if (serviceNm != "entitlement") {
                    if (serviceNm == "phdPageLogger") {
                        var q = URL.parse(req.originalUrl, true);
                        var qData = q.query;
                        console.log("PAGEXXX " + qData.page);
                        fs.appendFileSync(logPath+'/api-usage.log', loggingID + ' ~PAGE~ ' + qData.page + ' ~ ' + Date() + '\n');
                    } else 
                        if (serviceNm == "phdFilterLogger") {
                            var q = URL.parse(req.originalUrl, true);
                            var qData = q.query;
                            console.log("FILTERXXX " + qData.filters);
                            fs.appendFileSync(logPath+'/api-usage.log', loggingID + ' ~FILTER~ ' + qData.filters + ' ~ ' + Date() + '\n');
                        }                      
                            else {
                            fs.appendFileSync(logPath+'/api-usage.log', loggingID + ' ~SERVICE~ ' + serviceNm + ' ~ ' + Date() + '\n');
                        }
                    //console.log('logging worked');
                }
            } catch (err) {
                if (err) {
                    return console.log(err);
                }
            }
        } // logging logic */
        //}

        var eTZ = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
        eTZ = new Date(eTZ);
        let testBody = {};
        if (serviceNm == "phdPageLogger") {
            var q = URL.parse(req.originalUrl, true);
            var qData = q.query;

            console.log("===>Log Page Name: "+ qData.page + ' date->'+ eTZ);
            testBody = {
                'APPL_ID': 300,
                'TRX_TIME' : eTZ,
                'INET_ID' : loggingID,
                'DEST_NM' : qData.page,
                'DEST_TYPE' : 'PAGE'
                };
        } else {
            console.log("===>Log Service Name: "+ serviceNm + ' date->'+ eTZ);
            testBody = {
                'APPL_ID': 300,
                'TRX_TIME' : eTZ,
                'INET_ID' : loggingID,
                'DEST_NM' : serviceNm,
                'DEST_TYPE' : 'SERVICE'
                };
        }; // logging logic to insert directly into usage table


        var options_log = {
            method: 'POST',
            url: process.env.URL + 'api/CC_USAGE/',
            headers:{
            accept: 'application/json',
            authorization: req.headers.authorization,
            cookie: req.headers.cookie
            },
            body: testBody,
            json: true
        };
        
        request(options_log, function (error, response, body) {
            if (error){
                console.log('Error in Logging : ' + JSON.stringify(error));
            } else {
                console.log('This is status : ' + JSON.stringify(body));
            }
        });


        var protocol = "https";
        if (req.headers.host.endsWith("3000") || req.headers.host.endsWith("3001")) protocol = "http";
        req.headers.accept = 'application/json';
        var options = {
            method: 'GET',
            url: protocol + '://' + req.headers.host + '/api/Services/' + serviceNm,
            headers: //req.headers - req.headers alone returns compressed data Ã¯Â¿Â½DÃ¯Â¿Â½Ã¯Â¿Â½Ã¯Â¿Â½{Ã¯
                {
                    accept: 'application/json',
                    authorization: req.headers.authorization,
                    cookie: req.headers.cookie
                }
        };

        //Retrieve the service from the in-memory DB
        request(options, function (err, response, serviceStr) {
            if (err) {
                //return console.error('Failed retrieving service: %s', error.message);
                var error = new Error();
                error.status = 450;
                error.message = err.message;
                error.code = err.code;
                return cb(error, null);
            }

            console.log("===>Apicontroller.process().request() .. Success");
            console.log('Success: ', serviceStr.substring(0, 100) + "...");

            var service = JSON.parse(serviceStr);

            //Retrieve the parameters for the service from the in-memory DB
            options.url += "/Parameters"
            request(options, function (err, response, parmsStr) {
                if (err) {
                    //return console.error('Failed retrieving service parameters: %s', error.message);
                    var error = new Error();
                    error.status = 450;
                    error.message = err.message;
                    error.code = err.code;
                    return cb(error, null);
                }
                console.log('Success: ', parmsStr.substring(0, 100) + "...");

                var parms = JSON.parse(parmsStr);

                var where = " ";
                var secWhere = ' ';
                var propCnt = 0;

                if (JSON.stringify(filter) === '{"where":{}}') {
                    filter = null;
                    console.log("FILTER = NULL");
                }
                var excludeFilters; // = service.excludeFilters;
                //console.log("EXCLUDE-FILTERS: " + excludeFilters);
                where = prepareWhereClause(service.name, filter, false, excludeFilters);

                if (JSON.stringify(secFilter) === '{"where":{}}') {
                    secFilter = null;
                    console.log("SEC FILTER = NULL");
                }
                secWhere = prepareWhereClause(service.name, secFilter, true, excludeFilters);
                console.log("where: " + where);
                console.log("SEC where: " + secWhere);

                //Process parameters
                var sqlTempl = service.sqlTemplate;
                if (parms) {
                    parms.forEach(function (parm, i) {
                        //TO-DO add checks for missing required parameters, defaults, etc.
                        var name = parm.name;
                        var value = req.query[name];
                        if (typeof value == 'undefined') {
                            if (parm.defaultValue != null) {
                            //if (parm.defaultValue) {
                                value = parm.defaultValue;
                            }
                            else {
                                if (parm.requiredInd) { //terrible variable name .. to rename to isRequired
                                    var error = new Error();
                                    error.status = 400;
                                    error.message = "Bad Request: Mandatory parameter " + name + " was not supplied.";
                                    error.code = "MISSING_PARAMETER";
                                    return cb(error, null);
                                }
                            }
                        }
                        if (name != "filter") {
                            var regEx = new RegExp("{" + name + "}", "g");
                            sqlTempl = sqlTempl.replace(regEx, myMapper.map(service.name, value)); //req.query[name]);
                        }
                    });
                }

                var finalWhere = "WHERE ";
                if (filter && (!secFilter || secWhere === " ")) {
                    finalWhere += where;
                }
                else if ((!filter || where === " ") && secFilter) {
                    finalWhere += secWhere;
                }
                else if (filter && secFilter && (secWhere != " " || where != " ")) {
                    finalWhere += where + " AND " + secWhere;
                }
                else {
                    finalWhere = " ";
                }
              
                //var sqlStage1 = sqlTempl.replace(new RegExp("\\{filter\\}", "g"), where);
                var sqlStage1 = sqlTempl.replace(new RegExp("\\{filter\\}", "g"), finalWhere);
                var sql = "";

                if (filter || secFilter)
                    sql = sqlStage1.replace(new RegExp("<filter\\?AND:WHERE>", "g"), " AND ");
                else
                    sql = sqlStage1.replace(new RegExp("<filter\\?AND:WHERE>", "g"), " WHERE ");

                console.log("SQL: " + sql);

                var ds = Apicontroller.dataSource;
                console.log(" #### api-controller dataSource (ds)="+ds);
                //sp try {
/*
                    console.log("$$$$ api-controller - connected? --> ", JSON.stringify(ds.connected));

                    //if (!JSON.stringify(ds.connected)) {
                        ibmdb.open(ds.connector, function(err, conn) {
                        //console.log("$$$$ api-controller - DB2 open conn ", JSON.stringify(conn));
                        console.log("$$$$ api-controller - conn.connected? --> ", JSON.stringify(conn.connected));
                        if(err) {
                            console.log("$$$$ api-controller - DB2 open error: ", err.message);
                            //callback();
                            return cb(err, conn);
                        };
                        });
                   // };

                    console.log("$$$$ api-controller - connected after open ? --> ", JSON.stringify(ds.connected));
*/
                    ds.connector.query(sql, [], function (err, messages) {
                        if (err) {

                            console.log("$$$ DB2 connection if err -->"+err);

                            var error = new Error();
                            error.status = 450;
                            error.message = err.message;
                            error.code = err.state;
                            return cb(error, null);
                        }
                        //console.log("$$$ DB2 connection err:"+ JSON.stringify(err));
                        //console.log("DB2 connection status:"+ds.connector.status);

                        var format = req.query["f"];
                        if (format && format.toLowerCase() == 'xml') {
                            return cb(err, js2xmlparser.parse("results", messages));
                        }
                        cb(err, messages);
                    });
                //sp } catch (err) {
                //sp    var error = new Error();
                //sp    error.status = 450;
                //sp    error.message = err.message;
                //sp    error.code = err.code;
                //sp    
                //sp    console.log("DB2 connection error, catch:"+error);
                //sp 
                //sp    return cb(error, null);
                //sp};
            });
        });
    };
};

function cleanFilter(filter, level, secFilter, element) {
    if (element.Value.length == 1) {
        secFilter.where[level] = element.Value[0];
    }
    else {
        secFilter.where[level] = [];
        element.Value.forEach(function (category) {
            secFilter.where[level].push(category);
        });
    }
}

function prepareWhereClause(serviceNm, filter, forSecurity, excludeFilters = '') //needs to be optional parameter, rename it excludeFilters
{
    excludeFilters = excludeFilters.toLowerCase();
    var excludeFiltersArray = excludeFilters.split(', ');
    var where = " ";
    var propCnt = 0;
    if (filter) { // && filter.trim().length>0) {
        // where += "WHERE ";
        where += "(";
        //console.log("In If filter code block");
        //Build the SQL WHERE clause based on the URL
        if (forSecurity) {
            //console.log("this is for security");
            var geoWhere = "(";
            for (var property in filter.where) { //geo filters
                if (excludeFiltersArray.indexOf(property.toLowerCase()) != -1) {
                    //console.log("IN SECURITY Filter if block");
                    //console.log("SECURITY PROPERTY: " + property);
                    property = " ";
                    //console.log("NEW SECURITY PROPERTY: " + property);
                }
                else if (isGeo(property)) {
                    if (propCnt++ > 0) {
                        geoWhere += " OR "
                    }
                    //geoWhere += property + populateWhereClause(filter.where[property]);
                    geoWhere +=  myMapper.map(serviceNm, property) + populateWhereClause(filter.where[property]);
                }
            }
            geoWhere += ")";
            //console.log("geoWhere = " + geoWhere);
            propCnt = 0;
            var busWhere = "(";
            for (var property in filter.where) { //business filters
                if (excludeFiltersArray.indexOf(property.toLowerCase()) != -1) {
                    //console.log("IN SECURITY Filter if block");
                    //console.log("SECURITY PROPERTY: " + property);
                    property = " ";
                    //console.log("NEW SECURITY PROPERTY: " + property);
                }
                else if (isBusiness(property)) {
                    if (propCnt++ > 0) {
                        busWhere += " OR "
                    }
                    busWhere += myMapper.map(serviceNm, property) + populateWhereClause(filter.where[property]);
                }

            }
            busWhere += ")";
            //console.log("busWhere = " + busWhere);
            propCnt = 0;
            var otherWhere = "(";
            for (var property in filter.where) { //other filters (e.g., Labor Pool)
                //if (property.toLowerCase() === excludeFilters)
                if (excludeFiltersArray.indexOf(property.toLowerCase()) != -1) {
                    property = " ";
                }
                else if (!(isGeo(property) || isBusiness(property))) {
                    if (propCnt++ > 0) {
                        otherWhere += " AND "
                    }
                    otherWhere += myMapper.map(serviceNm, property) + populateWhereClause(filter.where[property]);
                }
            }
            otherWhere += ")";
            //console.log("otherWhere = " + otherWhere);
            if (geoWhere === "()" && busWhere === "()" && otherWhere != "()") {
                //console.log("only otherWhere");
                where += otherWhere;
            }
            else if (geoWhere === "()" && busWhere != "()" && otherWhere === "()") {
                //console.log("only busWhere");
                where += busWhere;
            }
            else if (geoWhere != "()" && busWhere === "()" && otherWhere === "()") {
                //console.log("only geoWhere");
                where += geoWhere;
            }
            else if (geoWhere === "()" && busWhere != "()" && otherWhere != "()") {
                //console.log("busWhere + otherWhere");
                where += busWhere + " AND " + otherWhere;
            }
            else if (geoWhere != "()" && busWhere === "()" && otherWhere != "()") {
                //console.log("geoWhere + otherWhere");
                where += geoWhere + " AND " + otherWhere;
            }
            else if (geoWhere != "()" && busWhere != "()" && otherWhere === "()") {
                //console.log("geoWhere + busWhere");
                where += geoWhere + " AND " + busWhere;
            }
            else {
                //console.log("all three: geoWhere + busWhere + otherWhere");
                where += geoWhere + " AND " + busWhere + " AND " + otherWhere;
            }
        }
        else {
            //console.log("This is for user-applied filters");
            for (var property in filter.where) {
                //console.log("property: " + property);
                //console.log("excludeFilters: " + (excludeFilters));

                //can have multiple filters excluded
                if (excludeFiltersArray.indexOf(property.toLowerCase()) != -1) {
                    //console.log("In Filter if block");
                    //console.log("PROPERTY: " + property);
                    property = " ";
                    //console.log("NEW PROPERTY: " + property);
                }
                else {
                    if (propCnt++ > 0) {
                        where += " AND ";
                    }
                    where += myMapper.map(serviceNm, property) + populateWhereClause(filter.where[property]);
                }


            } //end - for (var property in filter.where)
        }
        where += ")";
        //console.log("NEW WHERE: " + where);
        if (where === " ()") {
            where = " ";
            //console.log("TEST WHERE: " + where);
        }
        else if (where === " (() AND () AND ())") {
            where = " ";
            //console.log("SECURITY TEST WHERE: " + where);
        }
    }
    return where;
}

function populateWhereClause(theProperty) {
    var subWhere = "";

    if (Array.isArray(theProperty)) {
        subWhere += " IN (";
        for (var i = 0; i < theProperty.length; i++) {
            if (i > 0) subWhere += ", ";
            if (typeof theProperty[i] === 'string')
                subWhere += "'" + theProperty[i] + "'";
            else
                subWhere += theProperty[i];
        } //end - for (var i=0; i<theProperty.length; i++)
        subWhere += ")";
    } //end - if (Array.isArray(theProperty))
    else {
        subWhere += "=";
        if (typeof theProperty === 'string')
            subWhere += "'" + theProperty + "'";
        else
            subWhere += theProperty;
    }
    return subWhere;
}

function isGeo(fieldName) {
    for (var i = 0; i < filterConfig.length; i++) {
        if (fieldName == filterConfig[i].columnName && filterConfig[i].type == 'Geo') return true;
    }
    return false;
}

function isBusiness(fieldName) {
    for (var i = 0; i < filterConfig.length; i++) {
        if (fieldName == filterConfig[i].columnName && filterConfig[i].type == 'Business') return true;
    }
    return false;
}
