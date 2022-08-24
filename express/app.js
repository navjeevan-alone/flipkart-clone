import express from 'express';
import exphbs from 'express-handlebars';

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('home');
});

app.listen(3000);