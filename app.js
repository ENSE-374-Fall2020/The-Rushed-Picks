// other requires
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

//const { runInNewContext } = require("vm");
const mongoose = require("mongoose");
const path = require("path");

//Setting up jQuery for node.js
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

// app.use statements
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: false
}));

// javascript use statements
app.use(express.static(path.join(__dirname,'scripts')));
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

//Functions
function saveToJson (fileName, obj) {
    fs.writeFileSync(fileName, JSON.stringify(obj), "utf8",  function(err) {
        if (err) return console.log(err);
    });
}

function loadFromJSON (fileName) {
    let fileContents = fs.readFileSync(fileName, "utf8", function(err) {
        if (err) return console.log(err);
    });
    let fileObject = JSON.parse(fileContents);
    return fileObject;
}

var myRecipes=[];
var myCategories=[];
function loadRecipes(){
    myRecipes = loadFromJSON (__dirname + "/testRecipes.json");
}

function loadCategories(){
    myCategories = loadFromJSON (__dirname + "/testCategories.json");
}

function loadComments(){
    comments = loadFromJSON (__dirname + "/testComments.json");
}

myCategories =loadFromJSON (__dirname + "/testCategories.json");
myRecipes = loadFromJSON (__dirname + "/testRecipes.json");
function saveRecipe(){

}

function saveComment(){

}
//App POST and GET
app.get("/", function(req, res) {
    // loadCategories();
    // loadRecipes();
    // loadComments();

    res.render("index", {
        test: "CommunityCookbookTemplate",
        categories: myCategories,
        recipes: myRecipes
    });
    console.log(myCategories);
    console.log(myRecipes);
});


app.get('/edit/:recipeId/', function(req, res) {

    const myRecipe = {
        recipeID: 123,
        name: "Coconut Rice",
        categories: ['a', 'b', 'c']
    }; //database.getBookByID(req.params.bookId)
    res.render("editRecipe", myRecipe) //res.params.bookId
})


app.get('/search', (req, res) => {
    res.render('search', {text: "this is ejs"});
});

app.get('/openRecipe', (req, res) => {
    res.render('openRecipe', {text: "THIS IS MY VARIABLE"});
});

// app.get('/addBook', function(req, res) {
//     res.render("newCookbook"); //res.params.bookId
// });


app.get('/addRecipe', function(req, res) {
    res.render("newRecipe", {categories:myCategories}) //res.params.bookId
})

app.post('/addRecipe', function(req, res){
    console.log(req.body);

    
    // var recipe = new Recipe ({
    //     recipeName = req.body.recipeName,
    //     //ingredients = [{},{},{}],
    //     instructions =req.body.instructions    //req.body.ingredients
    // })

    //console.log(recipe);
    res.sendStatus(200);
});

// app.post('/addBook', function(req, res){
//     var book = new Book({})
// });
app.listen(port, function() {
    console.log("Server started on port " + port);
});

