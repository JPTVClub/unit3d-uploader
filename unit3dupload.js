let request = require('request');
const fs = require('fs');
const settings = require('./settings.json');
const path = require('path');

let type_id = [
    "",
    "Full Disc",
    "Remux",
    "Encode",
    "WEB-DL",
    "WEBRIP",
    "HD-TV"
];

function main() {
    upload();
}

function upload() {

    let bodyFormData = {
        torrent: fs.createReadStream(path.join(__dirname, 'kali-linux.torrent')),
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
