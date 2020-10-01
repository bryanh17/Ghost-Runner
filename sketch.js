var gameState = "play";
var tower,towerImg;
var climber,climberImg, climberGroup;
var ghost, ghostImg1,ghostImg2;
var door,doorImg,doorGroup;
var invisibleBlock,invisibleBGroup;
var sound;
var score;

function preload() {
  
  towerImg = loadImage("tower.png");
  
  ghostImg1 = loadImage("ghost-jumping.png");
  
  ghostImg2 = loadImage("ghost-standing.png");
  
  doorImg = loadImage("door.png");
  
  climberImg = loadImage("climber.png");
  
  sound = loadSound("spooky.wav");
  
}


function setup () {
  
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg1);
  ghost.scale = 0.4;
  
  climberGroup = new Group();
  doorGroup = new Group();
  invisibleBGroup = new Group();
  //sound.loop();
  score=0;
}

function draw() {
  background(0);
 if (gameState==="play") {
  score = score+Math.round(getFrameRate()/60);
   
   
   
  if (keyDown("left")){
      ghost.x = ghost.x-3;
      
      }
  if (keyDown("right")){
      ghost.x = ghost.x+3;
      }
  if (keyDown("space")){
    ghost.velocityY = -5;
    
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  
  if (tower.y > 400){
    tower.y = 300;
  }
  
if (climberGroup.isTouching(ghost)){
  
  ghost.velocityY = 0;
  
}
  if (invisibleBGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();    
    gameState="end";
  }
  
  spawnDoor();
  drawSprites();
 }
  else if(gameState==="end"){
    stroke("blue");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
    
  }
  
  text("Score: "+score,50,50)
  
}


function spawnDoor(){
 
  if (frameCount % 100===0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    door.x = Math.round(random(120,400));
    door.velocityY = 2;
    door.lifetime = 300;
    doorGroup.add(door);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;
    
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 2;
    climber.lifetime =300;
    climberGroup.add(climber);
  
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;
    invisibleBGroup.add(invisibleBlock);
}
  
  
  
}
