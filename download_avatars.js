var request = require('request');
var token = require('./secrets');
token = token.GITHUB_TOKEN;


console.log('Welcome to the GitHub Avatar Downloader!');
console.log('THE TOKEN IS: ', token);


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
    //console.log('body is: \n', body);
    var parsedBody = JSON.parse(body);
    console.log(parsedBody);

    cb(err, body);

  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  //console.log("Errors:", err);
  //console.log("Result:", result);
  console.log('Inside function call');
});