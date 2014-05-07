var express = require('express'),
app = express(),
port = process.env['PORT'] || 3000;

app.get('/', function(req, res) {
  res.send('<a href="/shop">Browse products</a>');
});

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});
