const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})