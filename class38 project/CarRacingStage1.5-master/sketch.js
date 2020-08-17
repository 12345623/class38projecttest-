const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var car1;

var car1image,track1image,track2image;

var obstacle1;
var obstacle2;
var obstacle3;


function preload()
{car1image= loadImage("images/car1.png")
track1image= loadImage("images/track.png")
track2image=loadImage("images/track.jpg")
obstacle1image= loadImage("images/car2.png")
obstacle2image= loadImage("images/car3.png")
obstacle3image= loadImage("images/car4.png")
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-100);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  obstacle1= createSprite(Math.round (random (displayWidth-20),-50 ));
  obstacle1.visible=false;

  obstacle2= createSprite(Math.round (random (displayWidth-20),-50 ));
  obstacle2.visible=false;

  obstacle3= createSprite(Math.round (random (displayWidth-20),-50 ));
  obstacle3.visible=false;

}


function draw(){
  if(playerCount === 1){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(car1.y-obstacle1.y<car1.height-obstacle1.height){
    text(GameOver);
    gameState=2;
    obstacle1.velocityY=0;
  }

  if(car1.y-obstacle2.y<car1.height-obstacle2.height){
    text(GameOver);
    gameState=2;
    obstacle2.velocityY=0;
  }

  if(car1.y-obstacle3.y<car1.height-obstacle3.height){
    text(GameOver);
    gameState=2;
    obstacle3.velocityY=0;
  }
}


function spawnobstacles(){
  if (frameCount%50===0){
    //obstacle= new Obstacles (600,Math.round (random (displayWidth-20) ))
    obstacle1.visible=true;
       obstacle1.addImage(obstacle1image)
       obstacle1.velocityY=10;
       obstacle1.lifetime=750;
       obstacle1.scale=1.5;}
       
       if (frameCount%50===10){
    obstacle2.visible=true;
       obstacle2.addImage(obstacle2image)
       obstacle2.velocityY=10;
       obstacle2.lifetime=750;
       obstacle2.scale=1.5;}
       
       if (frameCount%50===20){
    obstacle3.visible=true;
       obstacle3.addImage(obstacle3image)
       obstacle3.velocityY=10;
       obstacle3.lifetime=750
       obstacle3.scale=1.5;;
    }
}