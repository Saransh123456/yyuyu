var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg,ghostImg2;
var invisibleBlockGroup, invisibleBlock;
var gameOver,gameOverImg;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostImg2 = loadImage("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
  gameOverImg = loadImage("game-over.jpg");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
 
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  
  ghost=createSprite(200,150);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.5;
  ghost.debug=false;
  ghost.setCollider("circle",0,0,130);

  gameOver=createSprite(300,300);
  gameOver.visible=false;   

}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300
    }
    spawnDoor();
    drawSprites();
    createEdgeSprites();

    if(keyDown("space"))
    {
      ghost.velocityY=-4;
    }

    if(keyDown("left_arrow"))
    {
      ghost.x=ghost.x-4;
    }

    if(keyDown("right_arrow"))
    {
      ghost.x=ghost.x+4;
    }

    ghost.velocityY=ghost.velocityY+0.8;
     

    if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY=0;
    }

    if(ghost.isTouching(invisibleBlockGroup))
    {
      ghost.destroy();
      gameOver.addImage("gameover",gameOverImg);
      gameOver.visible=true;
      doorsGroup.destroyEach();
      climbersGroup.destroyEach();
    }  

    if(ghost.y>550)
    {
      ghost.destroy();
      gameOver.addImage("gameover",gameOverImg);
      gameOver.visible=true;
      doorsGroup.destroyEach();
      climbersGroup.destroyEach();
    }

    
}

function spawnDoor()
{
if (frameCount % 240===0)
{
  door=createSprite(200,50);
  door.addImage("door",doorImg);
 // door.scale=0.5;
  door.velocityY=1;
  door.lifetime=600;
  doorsGroup.add(door);
  door.x=Math.round(random(120,400));

  climber=createSprite(200,100);
  climber.addImage("climber",climberImg);
  //climber.scale=0.5;
  climber.velocityY=1;
  climber.lifetime=600;
  climbersGroup.add(climber);
  climber.x=door.x;

  invisibleBlock=createSprite(200,120);
  invisibleBlock.velocityY=1;
  invisibleBlock.x=door.x;
  invisibleBlock.lifetime=600;
  invisibleBlock.width=climber.width; 
  invisibleBlock.height=2;
  invisibleBlockGroup.add(invisibleBlock); 
  invisibleBlock.visible=false;

  door.depth=ghost.depth;
  ghost.depth+=1;

}
}















