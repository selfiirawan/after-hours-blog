import express from "express";
import bodyParser from "body-parser";
import slugify from "slugify";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const posts = [];

// HOME  
app.get("/", (req, res) => {
    res.render("index.ejs", { 
        posts: posts,
    });
})

// ABOUT
app.get("/about", (req, res) => {
    res.render("about.ejs");
})

// CREATE 
app.get("/create", (req, res) => {
    res.render("create.ejs");
})

// VIEW FULL POST 
app.get("/view/:slug", (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(p => p.slug === slug);

    res.render("view.ejs", { post: post });
})

app.get("/edit/:slug", (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(p => p.slug === slug);

    res.render("edit.ejs", { post: post });
})

app.post("/edit/:slug", (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(p => p.slug === slug);

    if (post) {
        post.topic = req.body.topic;
        post.content = req.body.content;
        post.slug = slugify(req.body.topic, { lower: true, strict: true });
    }
    res.redirect(`/view/${post.slug}`);
})

app.post("/delete/:slug", (req, res) => {
    const slug = req.params.slug;
    const index = posts.findIndex(p => p.slug === slug);

    if (index !== -1) {
        posts.splice(index, 1);
    }
    res.redirect("/");
})

app.post("/submit", (req, res) => {
    const topic = req.body.topic;
    const content = req.body.content;
    
    const newPost = {
        topic: topic,
        content: content, 
        slug: slugify(topic, { lower: true, strict: true })
    }

    posts.push(newPost);

    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})