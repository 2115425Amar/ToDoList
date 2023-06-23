const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");

const path = require("path");
 app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended:true}));

var items=["Buy Food","Cook Food","Eat Food"];

app.get("/", function(req, res) {
    res.render("list", {newListItems:items});
});

app.post("/",function(req,res){
    var item = req.body.newItem;
    items.push(item);
    // console.log(item);
    // res.render("list",{newListItem:item});
    res.redirect("/");
});

app.listen(4500, (req, res) => {
  console.log("The Server has started successfully");
}); 