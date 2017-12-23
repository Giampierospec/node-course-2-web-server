const express = require('express');
const hbs = require('hbs');
var path = require('path');

const fs = require('fs');
var app = express();
hbs.registerPartials(path.resolve(__dirname, 'views/partials'));
hbs.registerHelper('getCurrentYear',()=> new Date().getFullYear());
hbs.registerHelper('screamIt', (text)=> text.toUpperCase());
app.set('view engine', "hbs");
app.use(express.static(path.resolve(__dirname, 'public')));
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method}:${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('Unable to append server.log');
        }
    });
next();
});
// app.use((req, res, next) => {
//     res.render("maintenance");
// });
var router = express.Router();
app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the app'
    });
});
app.get('/about', (req, res) => {
    // res.send('About page');
    res.render("about", {
        pageTitle: 'About Page',

    });
});
app.get('/bad', (req, res) => {
    res.send({
        error: "Unable to fulfill request"
    });
});

app.get("/projects", (req, res) => {
    res.render("projects");
});
var port = process.env.PORT || 3000;
app.set('port', port);
app.listen(app.get('port'), () => {
    console.log(`App started on port ${app.get('port')}`);
});