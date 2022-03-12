const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const api = require('./api/gt_api');
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

app.use(bodyParser.json())


app.use("/node_modules", express.static('node_modules'));
app.use("/api/", api);


app.get('/', function (request, response, next) {
    response.render('homepage');
});

app.get('/game', function (request, response, next) {
    if (request.query["id"]) {
        response.render('game', { title: "GameTopia | Detail", style: "style_game.css", ignorescript: true, script: "scripts/gamefrontend.js" });
    } else { next("Kein Spiel gefunden!") }
});


app.get('/login', function (request, response, next) {
    response.render('login', {
        title: "GameTopia | Login",
        script: "scripts/loginfrontend.js",
        ignorescript: true,
    });
});

app.get('/register', function (request, response, next) {
    response.render('register', {
        title: "GameTopia | Register",
        script: "scripts/registerfrontend.js",
        ignorescript: true,
    });
});
app.get('/create', function (request, response, next) {
    response.render('creategames', {
        script: "scripts/creategames.js"
    });
});

app.get('/list', function (request, response, next) {
    response.render('list', {
        title: "GameTopia",
        ignorescript: true,
        style: "style_list.css"
    });
});

app.get('/*', function (request, response, next) {
    response.render('404', {
        title: "GameTopia",
        ignorescript: true,
    });
});
app.listen(port, function () {
    console.log('Running on ' + port);
});