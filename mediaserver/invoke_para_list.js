var walk = require('./para_list');
walk(process.env.HOME+"/Node/", function(err, results) {
  if (err) throw err;
  console.log(results);
  
  for (m in results) {
console.log(results[m].split('/').pop());
}

});


// var path = require('path');
// var walk = function(dir, done) {
//   var results = [];
//   fs.readdir(dir, function(err, list) {
//     if (err) return done(err);
//     var pending = list.length;
//     if (!pending) return done(null, results);
//     list.forEach(function(file) {
//       file = path.resolve(dir, file);
//       fs.stat(file, function(err, stat) {
//         if (stat && stat.isDirectory()) {
//           walk(file, function(err, res) {
//             results = results.concat(res);
//             if (!--pending) done(null, results);
//           });
//         } else {
//           results.push(file);
//           if (!--pending) done(null, results);
//         }
//       });
//     });
//   });
// };
// 
// module.exports=walk;
