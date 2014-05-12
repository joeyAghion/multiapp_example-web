var express = require('express'),
http = require('http'),
app = express(),
port = process.env['PORT'] || 3000,
api_url = process.env['API_URL'] || 'http://api.example.com',

getWidgets = function(callback, error) {
  http.get(api_url + '/api/widgets', function(apiRes) {
    var data = '';
    apiRes.on('data', function(chunk) { data += chunk; });
    apiRes.on('end', function() {
      callback(data ? JSON.parse(data) : []);
    });
  }).on('error', function(e) { if (error) error(e); });
};

app.get('/', function(req, res) {
  res.send('<a href="/shop">Browse products</a>');
});

app.get('/shop', function(req, res) {
  getWidgets(function(data) {
    res.send(data.map(function(widget) {
      return "<p>" + widget.name + ", " + widget.price_cents + "</p>";
    }).join("\n"));
  });
});

app.listen(port);
