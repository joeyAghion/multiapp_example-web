var express = require('express'),
http = require('http'),
app = express(),
port = process.env['PORT'] || 3000,
api_url = process.env['API_URL'] || 'http://api.example.com';

app.get('/', function(req, res) {
  res.send('<a href="/shop">Browse products</a>');
});

app.get('/shop', function(req, res) {
  http.get(api_url + '/api/widgets', function(apiRes) {
    var data = '';
    apiRes.on('data', function(chunk) {
      data += chunk;
    });
    apiRes.on('end', function() {
      var obj = data ? JSON.parse(data) : [];
      res.send(obj.map(function(widget) {
        return "<p>" + widget.name + ", " + widget.price_cents + "</p>";
      }).join("\n"));
    });
  }).on('error', function(e) {
    res.send('Got error: ' + e.message);
  });
});

app.listen(port);
