var request = require("request");

var options = { method: 'POST',
  //url: 'https://localhost:4002/api/Services',
  url: 'https://phd-dev-api.w3ibm.mybluemix.net/api/Services',
  headers: 
   { accept: 'application/json',
     'content-type': 'application/json',
     'x-ibm-client-secret': 'SECRET',
     'x-ibm-client-id': 'default' },
  body: 
{
  "name": "t1-tiered-leakage",
  "sqlTemplate": "SELECT { bus-attr }, tier_num , sum(qtr_gp_lkg)   as qtr_gp_lkg, sum(eac_lkg)      as eac_lkg , sum(cost_overrun) as eac_lkg FROM   PLDB.FINANCIALS {filter}  GROUP BY  { bus-attr }, tier_num",
  "targetModelName": "t1TieredLeakage",
  "description": "Service to pull data for the first level tiered leakage report by the specified business attributes and the specified filters"
},
  json: true };

request(options, function (error, response, body) {
  if (error) return console.error('Failed: %s', error.message);

  console.log('Success: ', body);
});