const {exec} = require('child_process');
const variables = require('./variables');

let endPoint = variables.IS_OFFLINE === 'true' ? variables.BASE_DOMAIN_LOCAL : variables.BASE_DOMAIN;
let route = process.argv[process.argv.length - 1];

console.log(route);
exec(`curl -o -H "Content-Type: application/json" -X GET ${endPoint}/users`);
