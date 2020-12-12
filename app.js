const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3030;
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port);
