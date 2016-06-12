// var fs = require('fs');
// var path = require('path');

var walk = require('./para_list');

function GetMediaFileNames() {
  walk(process.env.HOME+"/Node/", function(err, results) {
  if (err) throw err;
//   console.log(results);
  
    var fns=[];
  for (m in results) {
//   console.log(results[m]);
fns.push(results[m].split('/').pop());
}

//   console.log(fns);
  return fns;
//   
//   for (m in results) {
// console.log(results[m].split('/').pop());
// }

});
}

// GetMediaFileNames();

module.exports=GetMediaFileNames;
