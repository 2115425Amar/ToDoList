const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require("mongoose");

//const router =express.Router;
const PORT = process.env.PORT || 3600
//const ejs = require('ejs');
const app = express();

var items=[];

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//mongodb://0.0.0.0:27017/todolistDB
mongoose.connect('mongodb+srv://amar1234:Vaibhav1234@cluster0.sq2qahp.mongodb.net/todolistDB', {useNewUrlParser: true,
useUnifiedTopology:true});

var itemsSchema = new mongoose.Schema({
    name: String
  });
  
  var Item =mongoose.model('Item._id',itemsSchema);

  const item1=new Item({
    name:"this is item1"
  });

  const item2=new Item({
    name:"item2"
  });

  const item3=new Item({
    name:"item3 "
  });
  
  const defaultItems=[item1,item2,item3];

app.get("/", function(req, res) {

    var today = new Date();

    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    var day=today.toLocaleDateString("en-US",options);

    Item.find({},function(err,founditems){

      if(founditems.length===0){
      Item.insertMany(defaultItems,function(err){
        if(err){
         console.log(err);
        }
        else{
         console.log("Succesfully saved all the itemsDb");
        }
     });
       }
       else{
      res.render("list", {kindofDay: day,newListItem: founditems});
     }
  });
});

app.post("/",function(req,res){
    const itemName=req.body.newItem;
    const item=new Item({
      name:itemName
    });
    item.save();
    res.redirect("/");
});

app.post("/delete",function(req,res){
  //console.log(req.body);
  const checkedItemId=req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId,function(err){
    if(!err){
      console.log("Successfully deleted");
      res.redirect("/");
    }
  })
});

app.listen(PORT, (req, res)=>{
     console.log("The Server has started on PORT: "+PORT)
})