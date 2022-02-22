var back,galaxyimg;
var ship,shipimg;
var asteroid,asteroidimg,asteroidg;
var star,starimg,starg;
var score = 0;
var gameover,goimg;

//Game States
var PLAY=1;
var END=0;
var gameState=1;
//var gameState=PLAY;



function preload(){
  galaxyimg = loadImage("galaxy.jpg");
  shipimg = loadImage("ship.png");
  asteroidimg = loadImage("asteroid.png");
  starimg = loadImage("star.png");
  goimg = loadImage("gameover.png");
}

function setup() {
  createCanvas(600, 600);
  
  //Background
  back = createSprite(300,300);
  back.addImage(galaxyimg);
  back.velocityY = 1;
  back.scale = 2.6;
  
  //Ship 
  ship = createSprite(50,50,50,50);
  ship.addImage(shipimg);
  ship.scale = 0.2;

  //Groups
  starg = new Group();
  asteroidg = new Group();

  //Game Over
  gameover = createSprite(300,200);
  gameover.addImage(goimg)
  gameover.scale = 2.7
  gameover.visible = false
}

function draw() {

  
   if(gameState == PLAY)
    {
      background(200);

      if(back.y > 400){
        back.y = 200;
      }

    //Keybinds
      if(keyDown(LEFT_ARROW)){
        ship.x = ship.x-5;
      }

      if(keyDown(RIGHT_ARROW)){
        ship.x = ship.x+5;
      } 
    
      if(keyDown("space")){
        ship.velocityY = -10;
      }
    
      //Gravity
      ship.velocityY = ship.velocityY+0.8;

      createStar();
      createAsteroid();

      //Score
      for(var i = 0; i<starg.length; i++){
  
        if(starg.get(i).isTouching(ship)){
          starg.get(i).destroy()
           score = score+1
      
        }
      }
      //End game
      if(asteroidg.isTouching(ship)) {
        gameState = END;
        gameover.visible = true
        asteroidg.destroyEach()
        }  
    
    }else {
        
    
        if(gameState === END ){
        starg.destroyEach();
        asteroidg.destroyEach();   
        starg.setVelocityYEach(0);
        asteroidg.setVelocityYEach(0);
        ship.setVelocityYEach(0);
        }
      }
      drawSprites();
      
      //Score
      textSize(20); //size of the score text
      fill(255); //Tone of the score
      text("Score: "+ score,10,30); //Placement of score
  }


//Functions
function createStar() {
  if (World.frameCount % 150 == 0) {
  var star = createSprite(Math.round(random(50, 350),40, 10, 10));
  star.addImage(starimg);
  star.debug = false
  star.scale=0.3;
  star.velocityY = 4;
  star.lifetime = 150;
  starg.add(star);
  }
}

function createAsteroid(){
  if (World.frameCount % 200 == 0) {
  var asteroid = createSprite(Math.round(random(50, 350),40, 10, 10));
  asteroid.addImage(asteroidimg);
  asteroid.debug = false
  asteroid.scale= 0.3;
  asteroid.velocityY = 5;
  asteroid.lifetime = 150;
  asteroidg.add(asteroid);
  }
}
    