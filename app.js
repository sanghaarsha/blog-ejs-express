const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();

// must write the line for using body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// for serving static CSS
app.use(express.static("public"));

// setting view engine to ejs
app.set("view engine", "ejs");

// setting port dynamically for heroku depolying in heroku later
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3030;
}

const posts = [];

const homeStart =
    "The introduction is a crucial part of a blog post. It’s a chance to connect with readers and encourage them to read your post. You may think that it’s common knowledge how to write a good introduction, but about 60% of all guest posts that land on my desk lack an introduction.";

const aboutStart =
    "There’s an old saying ‘clothes maketh the man’ and it’s equally true of books, you are what you read. You can definitely judge a man, or woman, by the books they read. So, in these difficult times, here’s a fun infographic showing just what some famous people have on their bookshelves…";

const contactStart =
    "In the opening sentence, make your point. This is also known as the topic sentence, as it introduces the topic you’re about to discuss.";

// Home route
app.get("/", (req, res) => {
    res.render("home", { homeStart: homeStart, posts: posts });
});

// Handling the posts route with express route parameters
app.get("/posts/:postName", (req, res) => {
    const reqPostTitle = _.lowerCase(req.params.postName);

    posts.forEach((post) => {
        const ourPostTitle = _.lowerCase(post.title);
        if (reqPostTitle == ourPostTitle) {
            res.render("post", { title: post.title, content: post.content });
        }
    });
});

// About route
app.get("/about", (req, res) => {
    res.render("about", { aboutStart: aboutStart });
});

// Contact route
app.get("/contact", (req, res) => {
    res.render("contact", { contactStart: contactStart });
});

// Compose route
app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const post = {
        title: req.body.postTitle,
        content: req.body.postContent,
    };

    posts.push(post);

    res.redirect("/");
});

// Listening on specified port
app.listen(port);
