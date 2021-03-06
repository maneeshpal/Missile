var express = require('express'),
    compression = require('compression'),
   	path = require('path'),
    ejs = require('ejs'),
    layouts = require('express-ejs-layouts');

var React = require('react/addons');
var todoApp = React.createFactory(require('./public/js/todo').todoApp);

ejs.open = '{{';
ejs.close = '}}';

var app = express(),
    port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.use(compression());

app.get('/', function (req, res) {
	var reactHtml = React.renderToString(todoApp({data: ['server1', 'server2']}));
 	res.render('index', {reactHtml: reactHtml});
});

app.get('/omni', function (req, res) {
	res.render('omni');
});

app.get('/dropdowntest', function (req, res) {
	res.render('dropdowntest');
});

app.get('/promisetest', function (req, res) {
	res.render('promisetest');
});


app.get('/routertest/?*', function (req, res) {
    res.render('omni');
});

var server = app.listen(port, function () {
    console.log('Missile launched http://%s:%s', server.address().address, server.address().port);
});