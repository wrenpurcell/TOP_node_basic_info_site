let http = require('http');
let url = require('url');
let fs = require('fs');


http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    //if theres no path, redirect to home page 
    if (req.url === '/') {
        fs.readFile('index.html', function (err, data) {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(data);
            return res.end();
        });
    }

    else {
        fs.readFile(filename, function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(data);
            return res.end();
        });

    }
}).listen(8080);