/**
 * Work with strings.
 */
window.addEventListener("DOMContentLoaded", function() {
  'use strict';
  let rockford = document.getElementById('baddie1'),
    area = document.getElementById('flash'),
    left = area.offsetLeft,
    top  = area.offsetTop,
    posLeft = 0, 
    posTop = 0,
    tileSize = 32,
    gridSize = 24,
    coins = 0,
    chest_is_open = false,




    /**
     * This is the background for the game area.
     */
    gameArea = [
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,27,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
      21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,
    ],

    /**
     * These are blocks that cant be moved to, or something happens when you try to move on them.
     * The blocks are drawn "on top" of the gamearea. Block 10 is empty, should be 0 but looks nicer with two figures.
     */
    gameBlocks = [
      20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,
      20,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,20,
      20,20,20,20,20,20,20,20,20,20,20,20,20,20,10,20,20,20,20,20,10,20,20,20,
      20,10,10,10,10,20,10,10,10,10,10,10,10,20,10,20,10,20,10,20,10,20,26,20,
      20,10,20,20,10,20,10,10,20,20,20,20,10,20,10,20,10,20,10,20,10,20,10,20,
      20,10,20,20,10,20,20,20,20,10,25,20,10,20,10,20,10,20,10,20,10,20,10,20,
      20,10,20,10,10,10,10,10,10,10,20,20,10,10,10,10,10,20,10,10,10,10,10,20,
      20,10,20,10,20,20,20,20,20,10,20,10,10,20,20,20,20,20,20,20,20,20,20,20,
      20,10,20,10,10,10,10,10,20,10,20,10,20,20,10,10,20,10,10,10,10,10,10,20,
      20,10,20,20,20,20,20,10,20,10,20,10,20,10,10,10,20,10,20,20,20,20,10,20,
      20,10,10,10,20,20,20,10,20,20,20,10,20,10,20,10,20,10,10,10,10,20,24,20,
      20,10,10,10,20,10,10,10,10,10,10,10,10,10,20,20,20,10,20,20,10,20,20,20,
      20,20,20,20,20,20,20,20,20,20,20,18,20,20,20,10,10,10,20,10,10,20,10,20,
      20,10,10,10,10,10,10,10,10,10,10,10,20,10,10,10,20,20,20,10,20,20,10,20,
      20,10,20,10,20,20,20,20,20,20,20,20,20,10,20,20,20,10,20,10,10,10,10,20,
      20,10,20,10,10,20,24,10,24,20,10,10,10,10,20,10,10,10,10,10,20,20,10,20,
      20,10,20,20,10,20,10,26,10,10,10,20,20,10,20,20,20,20,20,10,10,20,10,20,
      20,10,10,20,10,20,24,10,24,20,20,20,10,10,20,10,10,10,20,20,20,20,10,20,
      20,20,10,20,10,20,20,20,20,20,10,10,10,10,10,10,20,10,20,10,10,10,10,20,
      20,20,10,10,10,10,20,10,10,10,10,10,20,20,20,20,20,10,20,10,20,20,10,20,
      20,20,10,20,20,24,20,10,20,20,20,10,10,10,10,10,20,10,20,10,10,20,20,20,
      20,10,10,20,20,20,20,10,10,10,20,20,20,20,20,10,20,10,20,20,10,28,10,20,
      20,10,10,10,10,10,10,10,20,10,10,10,10,10,20,26,20,10,25,20,10,10,10,20,
      20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,
    ];

    /**
     * Draw the initial gameplan
    */
   function drawGamePlan(gameArea, gameBlocks) {
     var i,e,b;
     for(i = 0; i < gameArea.length; i++) {
       e = document.createElement('div');
       e.innerHTML = '';
       e.className = 'tile t' + gameArea[i] + (gameBlocks[i] ? ' b' + gameBlocks[i] : '');
       e.id = 'n' + i;
       area.appendChild(e);
      } 
    };
    console.log('Drawing gameplan.');  
    drawGamePlan(gameArea, gameBlocks);
    
    
    /**
     * Move Rockford
    */
   var move = function(moveLeft, moveTop, which) {
     
     function moveIt() {
       rockford.style.left = (area.offsetLeft + posLeft*tileSize + tileSize/2) + 'px';
       rockford.style.top  = (area.offsetTop + posTop*tileSize + tileSize/2) + 'px';      
      //  console.log("
      // Moved to: " + rockford.style.left + "x" + rockford.style.top);
      };
      if(which) { rockford.className='baddie ' + which; }
      
      let nextBlock = gameBlocks[(posLeft+moveLeft)+(posTop+moveTop)*gridSize];
      let ground = nextBlock -10 ==0;
      let closedDoor = 18;
      let openDoorBlock = 29;
      let coinBlocks = [24,25,26]
      let endChest = 28;

      // First if means the baddie can movie
      if((ground)) {
        posLeft += moveLeft; 
        posTop  += moveTop;
        moveIt();
      } 
      
      else if(nextBlock === closedDoor) {
        let audio = new Audio("sounds/door-open-close.mp3")
        audio.play();
        alert('Opps door locked')
      } else if (nextBlock === openDoorBlock){
        posLeft += moveLeft; 
        posTop  += moveTop;
        moveIt();
      }
     else if (coinBlocks.includes(nextBlock)){ //coins
        
        nextBlock = 10
        let block = document.getElementById(`n${(posLeft+moveLeft)+(posTop+moveTop)*gridSize}`);
        let classes = block.classList;
        const last = classes[classes.length -1]
        block.classList.remove(last);
        coins++;

        posLeft += moveLeft; 
        posTop  += moveTop;
        moveIt()

        let audio = new Audio("sounds/coins1-mini.mp3")
        audio.play();

        if (coins ==2) {
          openDoor();
        } else if (coins == 11) {
          openChest();
           
         } 
      } else if (nextBlock === endChest && chest_is_open) {
        let audio = new Audio("sounds/chest-end-game.mp3")
        alert("Piggy happy, you won!");
       audio.play();
      }
      
      else {  // Else means the baddie cannot move because of a wall
        console.log('Block detected, cant move.');
      }
      console.log("area.offsetLeft", area.offsetLeft);
      console.log("area.offsetTop", area.offsetTop);
      console.log("posLeft", posLeft)
      console.log("posTop", posTop)
    };
    console.log('Moving Mickey Mos (Rockford) to initial spot.');  
    move(1, 1, 'down');
    
    
    /**
     * Keep track on keys pressed and move Rockford accordingly.
    */
   document.onkeydown = function(event) {
    var key;
    key = event.keyCode || event.which;
    switch(key) {
      case 37: move(-1, 0, 'left'); break;
      case 39: move(1, 0, 'right'); break;
      case 38: move(0, -1, 'up'); break;
      case 40: move(0, 1, 'down'); break; 
      default: move(0, 0, 'down'); break;
    };
    console.log('Keypress: ' + event + ' key: ' + key + ' new pos: ' + rockford.offsetLeft + ', ' + rockford.offsetTop);
  };

    console.log('Everything is ready.');  

    function openDoor() {
      const door = document.querySelector(".b18");
      door.classList.remove("b18");
      door.classList.add("b29");
      gameBlocks[299] = 29;
  }
  
  function openChest() {
    const door = document.querySelector(".b28");
    door.classList.remove("b28");
    door.classList.add("b30");
    chest_is_open = true;
  }
});


