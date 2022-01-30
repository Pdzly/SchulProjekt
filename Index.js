var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
db = require('./mysql/manager');
db.connect()



var app = express();

var port = 3000
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.enable('view cache');

app.use("/scripts", express.static('scripts'));
app.use("/style", express.static('style'));
app.use("/img", express.static('images'));


var api = require('./api/gt_api');

app.use("/node_modules", express.static('node_modules'));
app.use("/api/", api);

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', function (request, response, next) {
    response.render('homepage');
});

app.get('/create', function (request, response, next) {
    response.render('creategames', { script: "scripts/creategames.js" });
});

app.get('/*', function (request, response, next) {
    response.render('404', { title: "GameTopia" });
});

app.listen(port, function () {
    console.log('Running on ' + port);
});
