var request = require('request');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');


var apitoken, torrentfile, nfo, name, description, mediainfo, category_id, type_id, resolution_id, _user_id, tmdb, imdb,
    tvdb, mal,
    igdb, anonymous, stream, sd, internal, featured, free, doubleup, sticky;

var type_id = ["", "Full Disc", "Remux", "Encode", "WEB-DL", "WEBRIP", "HD-TV"];

//More mappings or custom mappings
main();


function main() {
    takeinputs();
    readfile();
    buildnetwork();

}


function takeinputs() {
    // Take the user inputs and override the file settings
    apitoken = "helgHxqvhSqEzMTRL4CkROkgXoJC8suUoV1g0HwsQgUVcecrFiNJ4gcVsaPMeW6icjunVPkjqB715848ixXOHSV71uZFClR3geTo";
    name = "POTATO";
    description = "BIG POTATO /<b/>test/<//b/>";
    category_id = '1';
    type_id = '1';
    resolution_id = '1';
    _user_id = '1';
    tmdb = '1';
    imdb = '0';
    tvdb = '0';
    mal = '0';
    igdb = '0';
    anonymous = '0';
    stream = '0';
    sd = '0';
    internal = '0';
    featured = '0';
    free = '0';
    doubleup = '0';
    sticky = '0';

}

function readfile() {
    //torrentfile = fs.readFileSync("kali-linux.torrent");
}


function sendnetwork(networkdata) {
    //Sends the network call

    request.post({
            url: "https://unit3d.site/api/torrents/upload?api_token=helgHxqvhSqEzMTRL4CkROkgXoJC8suUoV1g0HwsQgUVcecrFiNJ4gcVsaPMeW6icjunVPkjqB715848ixXOHSV71uZFClR3geTo",
            formdata: networkdata
        }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            console.log( body);
        }
    );

}

function buildnetwork() {
    //builds the post request data
    var bodyFormData = new FormData();
    console.log(__dirname+'\\kali-linux.torrent')
    bodyFormData.append('torrent', fs.createReadStream(path.join(__dirname,'kali-linux.torrent')));
    //bodyFormData.append('nfo', nfo);
    bodyFormData.append('api_token', apitoken)
    bodyFormData.append('name', name);
    bodyFormData.append('description', description);
    //bodyFormData.append('mediainfo', mediainfo);
    bodyFormData.append('category_id', category_id);
    bodyFormData.append('type_id', type_id);
    bodyFormData.append('resolution_id', resolution_id);
    bodyFormData.append('_user_id', _user_id);
    bodyFormData.append('tmdb', tmdb);
    bodyFormData.append('imdb', imdb);
    bodyFormData.append('tvdb', tvdb);
    bodyFormData.append('mal', mal);
    bodyFormData.append('igdb', igdb);
    bodyFormData.append('anonymous', anonymous);
    bodyFormData.append('stream', stream);
    bodyFormData.append('sd', sd);
    bodyFormData.append('internal', internal);
    bodyFormData.append('featured', featured);
    bodyFormData.append('free', free);
    bodyFormData.append('doubleup', doubleup);
    bodyFormData.append('sticky', sticky);



    sendnetwork(bodyFormData);
}

