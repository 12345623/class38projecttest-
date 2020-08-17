class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(630,300);
    car1.addImage("car1image",car1image)
    car1.scale=1.5;
    
  }

  play(){
    form.hide();

    spawnobstacles();

    Player.getPlayerInfo();
   
    //if(keyIsDown(UP_ARROW))
    //{background.velocity}
    
    if(keyIsDown(RIGHT_ARROW)){
      car1.x=car1.x+10;
    }
    if(keyIsDown(LEFT_ARROW)){
      car1.x=car1.x-10;
    }

    
    if(allPlayers !== undefined){
      //var display_position = 100;
      //background(0)
      image(track1image,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 100;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        

        if (index === player.index){
          camera.position.x = displayWidth/2;
          camera.position.y = car1.y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }


      if(player.distance<3500){
        gameState=1
        game.update(1)
      }
      else
      gameState=2
      
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }
}
