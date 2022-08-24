// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import express from "express"
// import exphbs from 'express-handlebars';
// import blog from "./routes/blog.js"
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const path = require("path")
const express = require("express")
var exphbs = require("express-handlebars")
const blog = require("./routes/blog.js")

const app = express();
const port = 3000

app.use(express.static("static"));

app.engine('handlebars', exphbs.engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'handlebars');
app.get('/', function (req, res) {
  res.render('home');
});
app.use('/', blog)


app.listen(port, () => {
  console.log(`Blog app listening on port ${port}`)
})
