// other requires
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { runInNewContext } = require("vm");
const mongoose = require("mongoose");

// app.use statements
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/cookbookDB", 
                {useNewUrlParser: true, 
                 useUnifiedTopology: true});

const bookSchema = new mongoose.Schema ({
    bookName: String,
    categories: {
        categoryName: String
    },
});

const Book = mongoose.model("Book", bookSchema);

const recipeSchema = new mongoose.Schema ({
    recipeName: String,
    ingredients: {
        quantity: Number,
        unit: String,
        description: String
    },
    instructions: String,
    books:{type: [bookSchema],
        default: ()=>({}),
    }
      
});

const Recipe = mongoose.model("Recipe", recipeSchema);

const port=5000;

const registerKey = "123456"; // secure!

app.get("/", function(req, res) {
    res.render("index", { test: "CommunityCookbookTemplate" });
});


app.get('/edit/:bookId/', function(req, res) {

    const myCookbook = {
        bookID: 123,
        name: "TempBook",
        categories: ['a', 'b', 'c']
    }; //database.getBookByID(req.params.bookId)
    res.render("editCookbook", myCookbook) //res.params.bookId
})


app.get('/search', (req, res) => {
    res.render('search', {text: "this is ejs"});
});

app.get('/openRecipe', (req, res) => {
    res.render('open', {text: "this is ejs"});
});

app.get('/addBook', function(req, res) {
    res.render("newCookbook"); //res.params.bookId
});


app.get('/addRecipe', function(req, res) {
    res.render("newRecipe") //res.params.bookId
})

app.post('/addRecipe'), function(req, res){
    var recipe = new Recipe ({
        // recipeName = req.body.recipeName,
        // ingredients = req.body.ingredients
    })
};

app.post('/addBook', function(req, res){
    var book = new Book({})
});
app.listen(port, function() {
    console.log("Server started on port " + port);
});

