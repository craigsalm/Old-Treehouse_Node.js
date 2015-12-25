//Problem: We need a simple way t look at a user's bade count and JS points
//Soution: Use Node.js to connect to Treehouse's API to get profile information to print out

var https  = require('https');

//Print out message
function printMessage(username, badgeCount, points) {
  var message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' point(s) in Javascript.'
  console.log(message);
}

//Print out error messages
function printError(error){
  console.error(error.message);
};

function get(username){
  //Connect to the API URL (teamtreehouse.com/username.json)
  var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response){
    var body = '';
    //Read the data
    response.on('data', function(chunk){
      body += chunk;
    });
    response.on('end', function(){
      if(response.statusCode === 200){
      try {
        //Parse Error
        var profile = JSON.parse(body);
        //Print the data
        printMessage(username, profile.badges.length, profile.points.JavaScript);
      } catch(error){
        printError(error);
        }
      } else {
        //Status Code Error
        printError({message: "There was an error getting the profile " + username + ". (" + https.STATUS_CODES[response.statusCode] + ")"})
      }
    });
  });
  
  //Connection Error
  request.on('error', printError);
}


module.exports.get = get;