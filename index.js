const express = require('express');
const path = require('path');
const https = require('https');
var fs = require('fs');
const si = require('systeminformation');
const app = express();

const port = 8080;
const ssl = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});
app.get('/system/data', function(req, res) {
  si.getDynamicData()
    .then((data) => {
      res.json({error: false, data: data});
    })
    .catch((err) => {
      console.error('system.data', err);
      res.json({error: true, data: err});
      res.end();
    });
});


app.use(express.static('dist'));

var httpsServer = https.createServer(ssl, app);

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
httpsServer.listen(8443, () => {
  console.log(`SSL server at http://localhost:${8443}`)
});