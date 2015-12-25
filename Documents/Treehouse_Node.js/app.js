var profile = require('./profile.js');
//.js above is optional.
//however, path to js file is mandatory.
var users = process.argv.slice(2);

users.forEach(profile.get);