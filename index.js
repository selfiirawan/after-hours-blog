import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", { 
        posts: posts,
    });
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
})

app.get("/view/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    res.render("view.ejs", { post: post });
})

app.get("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    res.render("edit.ejs", { post: post });
})

app.post("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts[id-1];

    if (post) {
        post.topic = req.body.topic;
        post.content = req.body.content;
    }
    res.redirect(`/view/${id}`);
})

app.post("/submit", (req, res) => {
    const topic = req.body.topic;
    const content = req.body.content;
    
    const newPost = {
        id: posts.length + 1, 
        topic: topic,
        content: content
    }

    posts.push(newPost);

    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})