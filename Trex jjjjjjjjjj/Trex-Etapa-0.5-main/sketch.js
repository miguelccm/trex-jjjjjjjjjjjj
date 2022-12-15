var trex, trex_running, edges, trex_colliding;
var groundImage, ground, invisibleground;
var clouds, cloudImage,cloudsGroup;
var obstaclesGroup,obstacle1Image,obstacle2Image,obstacle3Image,obstacle4Image,obstacle5Image,obstacle6Image;
var gameOverImg, reStartImg, gameOverSprite, reStartSprite;
var play = 1;
var gameOver = 0;
var gameState = play; 
var points = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage('cloud.png')
  obstacle1Image = loadImage('obstacle1.png')
  obstacle2Image = loadImage('obstacle2.png')
  obstacle3Image = loadImage('obstacle3.png')
  obstacle4Image = loadImage('obstacle4.png')
  obstacle5Image = loadImage('obstacle5.png')
  obstacle6Image = loadImage('obstacle6.png')
  gameOverImg = loadImage('gameOver.png')
  reStartImg = loadImage('restart.png')
  trex_colliding = loadAnimation('trex_collided.png')
}

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_colliding);
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  
 
  ground = createSprite(200,180,400,20);
  ground.addImage('ground',groundImage);
  ground.x = ground.width/2

  invisibleground = createSprite(200,190,400,10)
  invisibleground.visible = false; 

  gameOverSprite = createSprite(300,100);
  gameOverSprite.addImage("gameOverSprite", gameOverImg);

  reStartSprite = createSprite(300,140);
  reStartSprite.addImage('reStartSprite', reStartImg);

  reStartSprite.scale = 0.5
  gameOverSprite.scale = 0.75     

  obstaclesGroup = new Group()

  cloudsGroup = new Group()
   
  trex.setCollider("circle",0,0,40)
 //trex.debug = true;        
  
}


function draw(){

  //definir a cor do plano de fundo 
  background("white");
  text ("pontos: " + points,500,50)

  if (gameState === play){
    ground.velocityX = -(4 + 3 * points/400);
    if (ground.x<0){
      ground.x = ground.width/2
    }
    if(keyDown("space")&& trex.y >= 160 ) {
    trex.velocityY = -10;
    }
    if(obstaclesGroup.isTouching(trex)){
      gameState = gameOver
    }
    trex.velocityY = trex.velocityY + 0.5;
    cloudsGenerator();
    gameOverSprite.visible = false;
    reStartSprite.visible = false;
    points = points + Math.round(getFrameRate()/60);


  } else if (gameState === gameOver){
    ground.velocityX = 0;
    trex.changeAnimation("collided", trex_colliding);                         
    cloudsGroup.setVelocityEach(0);
    obstaclesGroup.setVelocityEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    gameOverSprite.visible = true;
    reStartSprite.visible = true;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
  } 
 
  if (mousePressedOver(reStartSprite)){
    reset()
  }
 
 
   
    trex.collide(invisibleground);
    
   
  //registrando a posição y do trex
  
  
  //pular quando tecla de espaço for pressionada

  

  
 //impedir que o trex caia
  
  

  
  
 obstaclesGenerator();
  drawSprites();
}

function cloudsGenerator(){
  if(frameCount % 60 === 0){
    clouds = createSprite(600,80,40,10);
    clouds.addImage(cloudImage);
    clouds.velocityX = -(4 + 3 * points/400);
    clouds.lifetime = 130
    clouds.depth = trex.depth
    trex.depth++
    cloudsGroup.add(clouds);
  }
}

function obstaclesGenerator(){
  
  if(frameCount % 60 === 0){
    var numeros = Math.round(random(1,6));
  console.log(numeros);
    let obstacle = createSprite(400,165,10,40);
    obstacle.velocityX = -(4 + 3 * points/400);
    switch(numeros){
      case 1: obstacle.addImage(obstacle1Image)
                break
      case 2: obstacle.addImage(obstacle2Image)
               break 
      case 3: obstacle.addImage(obstacle3Image)
               break
      case 4: obstacle.addImage(obstacle4Image)
               break
      case 5: obstacle.addImage(obstacle5Image)
               break 
      case 6: obstacle.addImage(obstacle6Image)
               break
    default: break 
                        
    } 
      obstacle.lifetime = 130;
      obstaclesGroup.add(obstacle);
      obstacle.scale = 0.5 
  }
}

function reset(){
  gameState = play;
  gameOverSprite.visible= false;
  reStartSprite.visible = false;
  points = 0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation('running', trex_running);
}

