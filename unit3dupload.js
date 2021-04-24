const dotenv = require('dotenv').config();
const request = require('request');
const fs = require('fs');
const {JPTV_type_id,default_categories,default_type,default_resolution} = require('./elpers');
const settings = require('./settings.json');
const custom_settings = require('./custom_settings.json');
const path = require('path');
const package = require('./package.json');

let torrent_file;
let arg_amount;
let args;



function main() {
    parse_arguments();
    upload();
}

function parse_arguments() {
    arg_amount = process.argv.length - 2;
    args = process.argv.splice(/ +/).slice(2);
    for (let i = 0; i < arg_amount; i++) {
        switch (args[i]) {
            case '--version':
                console.log(package.version);
                process.exit(0);
            case '--help':
                let help_text = fs.readFileSync('help_text.txt', 'utf-8');
                console.log(help_text);
                process.exit();
            case '-t':
                torrent_file = args[i + 1];
                i++;
                break;
        }
    }
}

function upload() {

    let url = 'https://' + settings.url + '/api/torrents/upload?api_token=' + settings.apitoken;
    delete settings['url'];

    let bodyFormData = {
        torrent: fs.createReadStream(path.join(__dirname, torrent_file)),
        _user_id: 0,
        ...settings,
        ...custom_settings
    }

    request.post({
        url: url,
        formData: bodyFormData
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log(body);
    });

}

main();
