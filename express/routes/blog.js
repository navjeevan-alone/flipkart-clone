import express from "express";
import path from "path"
import { fileURLToPath } from 'url';
import { blogs } from "../data/blogs.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router()
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"))
    // res.send("this is home route")
})

// app.get('/', function (req, res) {
//     res.render('home');
// });
router.get("/blog", (req, res) => {
    // let list = ``;
    // blogs.blogs.forEach(blog => {
    //     console.log("title : ", blog.title);
    //     list += `<div class="list-item" style="border:1px solid #ccc">
    //     <h1>${blog.title}</h1>
    //     <p>${blog.content}</p>
    // </div>`
    // })
    // res.send(list)
    res.sendFile(path.join(__dirname, "../views/blog.html"))
});
router.get("/blog/:slug", (req, res) => {
    const myBlog = blogs.blogs.filter(e => {
        return e.slug == req.params.slug
    })
    console.log(myBlog)
    let myBlogData = ""
    myBlog.forEach(blog => {
        myBlogData += `this is ${blog.slug} learn page, title : ${blog.title} <br />`
    }

    )
    res.send(myBlogData)
})
export default router;
