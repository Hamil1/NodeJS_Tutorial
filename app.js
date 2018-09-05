const cpu = require('os');
const lib = require('./lib.js');
const request = require('request');
const https = require('https');

let CHROME_USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36";

let options = {
    host: 'api.github.com',
    path: '/users/' + username,
    method: 'GET',
    headers: {'user-agent': CHROME_USER_AGENT}
}

https.request(options, function(response){
    let body;
    response.on('data', (out) => {
        body += out;
    });
});

console.log(https);
debugger;