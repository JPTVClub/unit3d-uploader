const request = require('request');
const fs = require('fs');
const { type_id } = require('./elpers');
const settings = require('./settings.json');
const path = require('path');
const package = require('./package.json');

let torrent_file;
let arg_amount;
let args;

function main() {
    parse_arguments();
    //upload();
}

function parse_arguments() {
    arg_amount = process.argv.length-2;
    args = process.argv.splice(/ +/).slice(2);
    switch (args[0]) {
        case '--version':
            console.log(package.version);
            process.exit(0);
        case '--help':
            let help_text = fs.readFileSync('help_text.txt', 'utf-8');
            console.log(help_text);
            process.exit(1);
    }
}

function upload() {

    let bodyFormData = {
        torrent: fs.createReadStream(path.join(__dirname, torrent_file)),
        ...settings
    }

    request.post({
        url: 'https://dev33.jptv.club/api/torrents/upload?api_token=IXbgQuRbDesuWLd2rS894UDxs7eIQP8ky90xnCiFehfxxsWefPFQTKO3rHSnB1OWVyjZd250Hdf50EiSTGker3gJ620FvlxokOFB',
        formData: bodyFormData
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log(body);
    });

}

main();
