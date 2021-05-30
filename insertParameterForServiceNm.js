var request = require("request");

var options = { method: 'POST',
  //url: 'https://localhost:4002/api/Services/t1-tiered-leakage/Parameters',
  //url: 'http://localhost:4001/api/Services/t1-tiered-leakage/Parameters',
  //url: 'http://bldbz173018.bld.dst.ibm.com:3000/api/Services/t1-tiered-leakage/Parameters',
  url: 'https://phd-dev-api.w3ibm.mybluemix.net//api/Services/t1-tiered-leakage/Parameters',
  headers: 
   { accept: 'application/json',
     'content-type': 'application/json',
     'x-ibm-client-secret': 'SECRET',
     'x-ibm-client-id': 'default' },
  body: 
   {
  "name": "filter",
  //"serviceName": "t1-tiered-leakage",
  "requiredInd": false,
  "externalName": "Filter",
  "dataType": 3,
  "description": "Specifies the filters to be applied against the data.  These filters translate into the SQL WHERE clause."
},
  json: true };

request(options, function (error, response, body) {
  if (error) return console.error('Failed: %s', error.message);

  console.log('Success: ', body);
});
