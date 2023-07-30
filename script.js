var game =  document.getElementById('game');
var character =  document.getElementById('character');
var both = 0;
var counter = 0;
var runCharacter;
var currentBlock = []

function moveLeft(){
   var characterXpos = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
   if(characterXpos > 0){
    character.style.left = characterXpos - 2 + "px"
    }
}  
function moveRight(){
    var characterXpos = parseInt(window.getComputedStyle(character).getPropertyValue('left'))
    if(characterXpos <  380){
    character.style.left = characterXpos + 2 + "px"
    }
} 
document.addEventListener('keydown',function(e){
    if(both == 0){
        both ++;
    if(e.key == "ArrowLeft"){
      runCharacter = setInterval(moveLeft,1)
    }
    if(e.key == "ArrowRight"){
        runCharacter = setInterval(moveRight,1)
    }
}

})


    document.addEventListener('keyup',function(e){
        clearInterval(runCharacter)
        both=0
    })


    var blocks =  setInterval(function(){
   
    var prevBlock = document.getElementById('block'+ (counter - 1))
    var prevHole = document.getElementById('hole'+ (counter - 1))
    if(counter>0){
        var prevBlock_top = parseInt(window.getComputedStyle(prevBlock).getPropertyValue('top')) 
        var prevHole_top = parseInt(window.getComputedStyle(prevHole).getPropertyValue('top')) 
    }
    if(prevBlock_top < 400 || counter == 0){
            var block = document.createElement('div')
            block.setAttribute('class','block')
            block.setAttribute('id','block'+counter)
            var hole = document.createElement('div')
            hole.setAttribute('class','hole')
            hole.setAttribute('id','hole'+counter)
            randomPos = Math.floor(Math.random() * 360)
            hole.style.left = randomPos + "px"
            block.style.top = prevBlock_top + 100 + "px"
            hole.style.top = prevHole_top + 100 + "px"
            game.appendChild(block);
            game.appendChild(hole);
            currentBlock.push(counter);
            counter++;
           
    }   

    characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'))
         characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue('left')) 
         drop = 0
         if(characterTop <= 0){
            alert("Game over. Score: "+(counter-9));
            clearInterval(blocks);
            location.reload();
        }

        
    for(var i=0;i<currentBlock.length;i++){
        
        let current = currentBlock[i]; 
         
        
        let Cblock = document.getElementById("block"+current);
        let Chole = document.getElementById("hole"+current);
        let Cblock_top = parseFloat(window.getComputedStyle(Cblock).getPropertyValue('top'));  
        let Chole_left = parseFloat(window.getComputedStyle(Chole).getPropertyValue('left')); 
        Cblock.style.top = Cblock_top - 0.5 + "px"
        Chole.style.top = Cblock_top - 0.5 + "px"
        if(Cblock_top < -20){
            currentBlock.shift()
            Cblock.remove()
            Chole.remove()
        }
        if(Cblock_top-20<characterTop && Cblock_top>characterTop){
            drop++;
            if(Chole_left<=characterLeft && Chole_left+20>=characterLeft){
                drop = 0;
            }
        }


    } 

    if(drop==0){
            if(characterTop < 400){
        character.style.top = characterTop + 2 + "px"
    }
    }else{
        character.style.top = characterTop - 0.5 + "px"
    }
},1)

























