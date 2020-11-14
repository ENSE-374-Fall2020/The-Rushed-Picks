// other requires
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { runInNewContext } = require("vm");

// app.use statements
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

const registerKey = "123456"; // secure!

app.get("/", function (req, res) {
    res.render("index", { test: "CommunityCookbookTemplate" });
});


app.get('/edit/:bookId/', function (req, res){

    const myCookbook = {
        bookID: 123,
        name: "TempBook",
        categories: ['a','b','c']
    };  //database.getBookByID(req.params.bookId)
    res.render("editCookbook", myCookbook)  //res.params.bookId
})


app.listen(3000, function () {
    console.log("Server started on port 3000");
})