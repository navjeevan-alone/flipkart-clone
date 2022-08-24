// import express from 'express';
// import exphbs from 'express-handlebars';
const express = require("express")
const exphbs = require("express-handlebars");
const blogs = require("./data/blogs")
var app = express();

app.engine('handlebars', exphbs.engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('home');
});
app.get('/post', function (req, res) {
  res.render('nav', {
    showTitle: true,
    name: "navjeevan",
    developer: true,
    age: 19,
    stacks: ["react", "angular", "vue"],
    blogs: blogs
  });
});
app.get("/allposts", (req, res) => {
  res.render("allposts", { blogs: blogs })
})
app.get("/blog/:slug", (req, res) => {
  const myBlog = blogs.filter(e => {
    return e.slug == req.params.slug
  })
  console.log(myBlog[0])

  res.render("blogpost", { blog: myBlog[0] })
})

app.listen(3000);