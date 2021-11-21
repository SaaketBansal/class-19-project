var backgroundImg;
var obstalcesGroup,car1,car1Img;
var car2,car2Img;
var gameOver , gameOverImg;
var ground,invisibleGround, groundImage;
var motorcycle,motorcycleImg;

var restart,restartImg;
var runner,runnerImg;
var scooty,scootyImg;
var start,startImg;
var distance=0;

var END =0;
var PLAY =1;
var START =2;
gameState = START;

function preload(){
runnerImg = loadAnimation("runner 1.png","runner 2.png","runner 3.png","runner 4.png")
backgroundImg = loadImage("backgroundImg.png")
groundImage = loadImage("ground.png");
car1Img = loadImage("car1.png");
car2Img = loadImage("car2.png");
motorcycleImg = loadImage("motorcycle.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart1.jpg");
scootyImg = loadImage("scooty.png");
startImg = loadImage("start.png");
}

function setup() {
    createCanvas(1200,600);

 runner = createSprite(100,480,30,30);
 runner.addAnimation("runner",runnerImg);
 runner.scale = 0.1;

 start = createSprite(600,300,20,20);
 start.addImage("start",startImg);
 start.scale = 0.1;
 

 gameOver = createSprite(600,200,20,20);
 gameOver.addImage("gameOver",gameOverImg);
 gameOver.scale = 0.7;


 restart = createSprite(600,300,20,20);
restart.addImage("restart",restartImg);
restart.scale = 0.1;

 ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2;
  ground.velocityX = -(6 + 3*distance/100);
   

  car1 =createSprite(1100,500);
  car1.scale =0.1;
  car1.velocityX = -(6 + 2*distance/150);
  car1.addAnimation("car1",car1Img);
  car1.setLifetime=170;
  car1.setCollider('rectangle',100,300,2000,200);
  car1.debug = true;


  car2 =createSprite(1100,500);
  car2.scale =0.1;
  car2.velocityX = -(6 + 2*distance/150);
  car2.addAnimation("car2",car2Img);
  car2.setLifetime=170;
  car2.setCollider('rectangle',100,300,2000,200);
  car2.debug = true;

  motorcycle =createSprite(1100,500);
  motorcycle.scale =0.1;
  motorcycle.velocityX = -(6 + 2*distance/150);
  motorcycle.addAnimation("motorcycle",motorcycleImg);
  motorcycle.setLifetime=170;
  motorcycle.setCollider('rectangle',100,300,2000,200);
  motorcycle.debug = true;

  scooty =createSprite(1100,460);
  scooty.scale =0.09;
  scooty.velocityX = -(6 + 2*distance/150);
  scooty.addAnimation("scooty",scootyImg);
  scooty.setLifetime=170;
  scooty.setCollider('rectangle',100,230,2000,1100);
  scooty.debug = true;
}

function draw() {
    background(backgroundImg);
 drawSprites();
 textSize(20);
 fill(255);
 text("Distance: "+ distance,900,30);
 
 car1.visible = false;
 car2.visible = false;
 motorcycle.visible = false;
 scooty.visible = false;

 if(gameState===START){
  runner.visible = false;
  start.visible = true;
  restart.visible = false;
  gameOver.visible = false;
 
  ground.velocityX = 0;

  distance = 0;

  if(mousePressedOver(start)){
    gameState = PLAY;
   }
}
if(gameState===PLAY){
  runner.visible = true;
  start.visible = false;
  restart.visible = false;
  gameOver.visible = false;
  distance = distance + Math.round(getFrameRate()/50);
 ground.velocityX = -(6 + 2*distance/150);

 

 
  //code to reset the background
 if(ground.x < 0 ){
  ground.x = width/2;
  }

  //code to play cycle bell sound
  if(keyDown("up_arrow")) {
  runner.y = runner.y-20; 
  }


  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,4));

  if (World.frameCount % 150 == 0) {
  if (select_oppPlayer == 1) {
    car1;
  } else if (select_oppPlayer == 2) {
    car2;
  } else if (select_oppPlayer == 3) {
    motorcycle;
  }
  else{
    scooty;
  }
  }

  if(car1.isTouching(runner)){
    gameState = END;
   scooty.destroyEach();
  }
  
  if(car2.isTouching(runner)){
    gameState = END;
    scooty.destroyEach();
  }
  
  if(motorcycle.isTouching(runner)){
    gameState = END;
    scooty.destroyEach();
  }
  if(scooty.isTouching(runner)){
   gameState = END;
   scooty.destroyEach();
  }
  
  scooty.visible = true;
  car1.visible = true;
  car2.visible = true;
  motorcycle.visible = true;
}else if (gameState === END) {
  gameOver.visible = true;
  start.visible = false;
  
  restart.visible=true;

  ground.velocityX = 0;
  runner.visible = false;

  
  
  
   if(mousePressedOver(restart)){
    reset();
  }
}
runner.collide(ground);
}


  





function reset(){
gameState = START;


}



