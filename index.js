const finalhandler = require('finalhandler');
const http = require('http');
const Router = require('router');
const fs = require('fs');

//const hostname = '0.0.0.0';
const port = 8080;

var router = Router();

router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    fs.readFile('./html/index.html', null, function (error, data) {
        if (error) return done(error);
        res.write(data);
        res.end();
    });
});

var server = http.createServer(function(req, res) {
    router(req, res, finalhandler(req, res))
});

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});