var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
// var http = require('http'),
//     Promise=require('bluebird');
      director = require('director');
 var   ipaddr=require("./ip_addr");
 var walk = require('./para_list');
 var URI = require('urijs');
  //
  // create some logic to be routed to.
  //
  function helloWorld() {
    this.res.writeHead(200, { 'Content-Type': 'text/plain' })
    this.res.end('hello world');
  }

  function ServePage() {
    this.res.writeHead(200, { "Content-Type": "text/html" });
    
    
//     var promise=Promise.resolve();
//     var fns=[];
    var res= this.res;
    var base=process.env.HOME+"/Node/mediaserver/";
    // walk(process.env.HOME+"/Node/mediaserver/", 
    walk(base, 
    function(err, results) {
  if (err) throw err;
//   console.log(results);
  
    var fns=[];
  for (m in results) {
//   console.log(results[m]);
// fns.push(results[m].split('/').pop());
fns.push(URI(results[m]).relativeTo(base).toString());
}

ip=ipaddr();
    
    fns.forEach(function(fs) {res.write('<video src="http://'+ip+':8080/'+fs+'" controls></video>');});
    
    res.end();

//   console.log(fns);
//   return fns;
//   
//   for (m in results) {
// console.log(results[m].split('/').pop());
// }

});

    // promise.then(function() {
//     
//     
//       }).then(function() {
//     
//     ip=ipaddr();
//     
//     fns.forEach(function(fs) {res.write('<video src="http://'+ip+':8080/'+fs+'" controls></video>');});
//     
//     res.end();
// //         this.res.write('<video src="http://localhost:8080/hots.mp4" controls></video>');
// //         this.res.write('<video src="http://'+ip+':8080/hots.mp4" controls></video>');
// //     this.res.end('<video src="http://'+ip+':8080/movie.mp4" controls></video>');
//   }
  
//     this.res.end('<video src="http://localhost:8080/movie.mp4" controls></video>');
  }
  
  function ServeVideo() {
  console.log("serv video is called");
  
  fn=this.req.url.split('/').pop();
//       var file = path.resolve(__dirname,"movie.mp4");
      var file = path.resolve(__dirname,fn);

      var res=this.res;
      var req=this.req;
    fs.stat(file, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // 404 Error if file not found
          return res.sendStatus(404);
        }
      res.end(err);
      }
      var range = req.headers.range;
      if (!range) {
       // 416 Wrong range
       return res.sendStatus(416);
      }
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });
//       var file = path.resolve(__dirname,"movie.mp4");
//     fs.stat(file, function(err, stats) {
//       if (err) {
//         if (err.code === 'ENOENT') {
//           // 404 Error if file not found
//           return this.res.sendStatus(404);
//         }
//       this.res.end(err);
//       }
//       var range = req.headers.range;
//       if (!range) {
//        // 416 Wrong range
//        return this.res.sendStatus(416);
//       }
//       var positions = range.replace(/bytes=/, "").split("-");
//       var start = parseInt(positions[0], 10);
//       var total = stats.size;
//       var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
//       var chunksize = (end - start) + 1;
// 
//       this.res.writeHead(206, {
//         "Content-Range": "bytes " + start + "-" + end + "/" + total,
//         "Accept-Ranges": "bytes",
//         "Content-Length": chunksize,
//         "Content-Type": "video/mp4"
//       });
// 
//       var stream = fs.createReadStream(file, { start: start, end: end })
//         .on("open", function() {
//           stream.pipe(this.res);
//         }).on("error", function(err) {
//           this.res.end(err);
//         });
//     });
}

function ServeVideo2() {
  console.log("serv video 2 is called");
//   console.log(this.req);
      var file = path.resolve(__dirname,"hots.mp4");
      var res=this.res;
      var req=this.req;
    fs.stat(file, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // 404 Error if file not found
          return res.sendStatus(404);
        }
      res.end(err);
      }
      var range = req.headers.range;
      if (!range) {
       // 416 Wrong range
       return res.sendStatus(416);
      }
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });
}

  //
  // define a routing table.
  //
  var router = new director.http.Router({
    '/hello': {
      get: helloWorld
    },
    '/show': {
    get: ServePage
    }
//         /\/\w+.mp4/:{
//     get: ServeVideo
//     }
//     "/movie.mp4":{
//     get: ServeVideo
//     },
//         "/hots.mp4":{
// //     get: ServeVideo2
//     get: ServeVideo
//     }
  });

    // router.get(/[\w\/]*\/\w+.mp4/, ServeVideo);
    router.get(/\/\w+.mp4/, ServeVideo);
  //
  // setup a server and when there is a request, dispatch the
  // route that was requested in the request object.
  //
  var server = http.createServer(function (req, res) {
    router.dispatch(req, res, function (err) {
      if (err) {
        res.writeHead(404);
        res.end();
      }
    });
  });

  //
  // You can also do ad-hoc routing, similar to `journey` or `express`.
  // This can be done with a string or a regexp.
  //
  router.get('/bonjour', helloWorld);
  router.get('/hola/', helloWorld);

  //
  // set the server to listen on port `8080`.
  //
  server.listen(8080);



// var fs = require("fs"),
//     http = require("http"),
//     url = require("url"),
//     path = require("path");
// 
// http.createServer(function (req, res) {
//   if (req.url != "/movie.mp4") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end('<video src="http://localhost:8888/movie.mp4" controls></video>');
//   } else {
//     var file = path.resolve(__dirname,"movie.mp4");
//     fs.stat(file, function(err, stats) {
//       if (err) {
//         if (err.code === 'ENOENT') {
//           // 404 Error if file not found
//           return res.sendStatus(404);
//         }
//       res.end(err);
//       }
//       var range = req.headers.range;
//       if (!range) {
//        // 416 Wrong range
//        return res.sendStatus(416);
//       }
//       var positions = range.replace(/bytes=/, "").split("-");
//       var start = parseInt(positions[0], 10);
//       var total = stats.size;
//       var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
//       var chunksize = (end - start) + 1;
// 
//       res.writeHead(206, {
//         "Content-Range": "bytes " + start + "-" + end + "/" + total,
//         "Accept-Ranges": "bytes",
//         "Content-Length": chunksize,
//         "Content-Type": "video/mp4"
//       });
// 
//       var stream = fs.createReadStream(file, { start: start, end: end })
//         .on("open", function() {
//           stream.pipe(res);
//         }).on("error", function(err) {
//           res.end(err);
//         });
//     });
//   }
// }).listen(8888);
