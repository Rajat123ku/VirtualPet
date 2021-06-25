var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var lastFed;
var feed;
var deductFood;
var timeValue;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the dog")
  feed.position(600,120);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,120);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 

 database.ref("FeedTime").on("value",(data)=>{timeValue = data.val()});
 textSize(12)
 fill("white");
 if(timeValue > 12){
   text("Last Fed :" + timeValue % 12 +"PM",300,30)
 }
 else if(timeValue === 12){
  text("Last Fed : 12 PM",300,30)
}
else{
  text("Last Fed :" + timeValue  +"AM",300,30)
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

var food_stock_val = foodObj.getFoodStock();
if(food_stock_val <= 0){
  foodObj.updateFoodStock(food_stock_val *0);
} else{
  foodObj.updateFoodStock(food_stock_val - 1);
}
if(foodS > 0){
  foodS--
}else{
  foodS = 0
}
database.ref('/').update({
  Food:foodS
})
getTime()
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
  async function getTime(){
  var response = await fetch ("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
  var responseJson = await response.json()
  var datetime = responseJson.datetime;
 var hour = parseInt(datetime.slice(11,13));
  //console.log(typeof hour);
 database.ref('/').update({
    FeedTime : hour
    
  })
}