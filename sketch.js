var happyDog,dog;
var foodS,foodStock;
var database;

function preload()
{
 happyDogImg = loadImage("dogImg1.png");
 dogImg = loadImage("dogImg.png");
}

function setup() {
	createCanvas(500, 500);

  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  database = firebase.database();

  var foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
}


function draw() { 
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
    dog.scale = 0.3;
  }

  drawSprites();

  textSize(15);
  fill("black");
  stroke("white");
  text("Milk Remaining: " + foodS, 30,50)
  

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
    if(x <= 0){
      x = 0;
    } else{
      x = x - 1;
    }

    database.ref('/').update({
      Food : x
    });

}



