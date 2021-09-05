
// import node libs
var fs = require('fs');
var path = require('path');
var https = require('https');

var specificationURL = 'https://petstore3.swagger.io/api/v3/openapi.json';

// this line is needed since the specification is on a server with malformed signature
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

// check if artifacts path exists otherwise create it
var artifactsPath = path.resolve( __dirname + '/artifacts');
if(!fs.existsSync(artifactsPath)) {
  fs.mkdirSync(artifactsPath);
}

// Download specification
var specificationFile = fs.createWriteStream(artifactsPath + "/specification.json");
var request = https.get(specificationURL,
  function(response) {
    response.pipe(specificationFile);
    console.log(__dirname);
  });
