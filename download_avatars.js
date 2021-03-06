var request = require('request');
var token = require('./secrets');
var fs = require('fs');

token = token.GITHUB_TOKEN;


console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'Bearer ' + token
    }
  };
  //Callback function
  request(options, function(err, res, body) {
    var parsedBody = JSON.parse(body);
    for (var key in parsedBody){
      var currentURL = parsedBody[key].avatar_url;
      var currentFilePath = './avatars/' + parsedBody[key].login + '.jpg';
      cb(currentURL, currentFilePath);
    }

  });
}

function downloadImageByURL(url, filePath) {
  //function to get and download image by url and filePath
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         console.log('Error occured. Error message: ', err);
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode);
         console.log('Response message: ', response.statusMessage);
         console.log('Reponse content type: ', response.headers['content-type']);
       })
        //if data is recieving
       .on('data', function (){
          console.log('Downloading image');
       })
        //when all data is finished downlaoding
       .on('end', function (){
          console.log("Finished downloading image");
       })
       .pipe(fs.createWriteStream(filePath));
}

// TEST CODE below, driver function call
var repoOwner = process.argv[2];
var repoName = process.argv[3];

if ( repoOwner && repoName){
  getRepoContributors(repoOwner, repoName, downloadImageByURL);
} else {
  console.log("Please enter the owner name and repo name in format: node download_avatars.js <owner> <repo>");
}

