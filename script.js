var runSrtart=0;

function keyCheck(event){

    //Enter Key
    if(event.which==13){
       if(runWorkerId==0){
        backgroundWorkerId=setInterval(moveBackground,100); 
        runWorkerId= setInterval(run,100);
        runSrtart=1;
        gameSound.pause();
        runSound.play();
      
        scoreWorkerId=setInterval( updatescore,100);

        createBlockId=setInterval(createBlock,100);
        moveBlocksId =setInterval(moveBlocks,100);

        createHeartId=setInterval(createHeart,100);
        moveHeartsId =setInterval(moveHearts,100);
    }
        
       
      
       
 }

    //space Key
    if(event.which==32){
        if(runSrtart==1){
            if(jumpWorkerId==0){
                clearInterval(runWorkerId);
                runSound.pause();
                jumpWorkerId= setInterval(jump,100);
                jumpSound.play();
            }
        }
        
        
    }

    idleWorkerId=setInterval(idle,100);
}

//Paused btn
function pausedBtn(){
    clearInterval(runWorkerId);
    runWorkerId =0; 
    clearInterval(backgroundWorkerId);
    backgroundWorkerId=0; 
    clearInterval(scoreWorkerId);
    scoreWorkerId=0;
    clearInterval(createBlockId);
    createBlockId=0;
    clearInterval(moveBlocksId);
    moveBlocksId=0;
    runSound.pause();
    gameSound.pause();
    jumpSound.pause();
    clearInterval(moveHeartsId);
}


//Run Sound
var runSound= new Audio("run.mp3");
runSound.loop= true;

//Run Function
var runImageNumber = 1;
var player = document.getElementById("player");
var runWorkerId = 0;

function run(){
    player.src = "Run ("+runImageNumber+").png";

    runImageNumber++;
    if(runImageNumber==9){
        runImageNumber=1;
    }


}

//Jump Sound
var jumpSound=new Audio("jump.mp3");
//Jump Function

var jumpImageNumber=1;
var playerMarginTop=360;
var jumpWorkerId=0;

function jump(){
    player.src="Jump ("+jumpImageNumber+").png";

    jumpImageNumber++;
    if(jumpImageNumber<=7){
        playerMarginTop= playerMarginTop-35;
        player.style.marginTop = playerMarginTop +"px";

    }

    if(jumpImageNumber>=8){
        playerMarginTop= playerMarginTop+35;
        player.style.marginTop = playerMarginTop +"px";
    }

    if(jumpImageNumber==13){
        jumpImageNumber=1;
        
        clearInterval(jumpWorkerId);
        jumpWorkerId=0;

        runWorkerId= setInterval(run,100);
        runSound.play();
    }
}

//Move Background
var background= document.getElementById("background");
var backgroundX =0;
backgroundWorkerId=0;

function moveBackground(){
    backgroundX= backgroundX-20;
    background.style.backgroundPositionX = backgroundX+"px";

}

//Update Score
var score =document.getElementById("score");
var newScore =0;
var scoreWorkerId=0;

function updatescore(){
    newScore++;
    score.innerHTML= newScore;

    if(newScore>500){

        clearInterval(runWorkerId);
        clearInterval(jumpWorkerId);
        jumpWorkerId=-1;
        clearInterval(backgroundWorkerId);
        clearInterval(scoreWorkerId);
        clearInterval(createBlockId);
        clearInterval(moveBlocksId);
        clearInterval(moveHeartsId);
        runSound.pause();
        jumpSound.pause();
        wonSound.play();
        document.getElementById("wonScore").innerHTML= newScore;
        document.getElementById("collectedLives").innerHTML= newLive;
        document.getElementById("won").style.visibility="visible";
    }


}


var wonSound= new Audio("won.mp3");

//Create Block
var createBlockId=0;
var blockMarginLeft =600;
var blockId =1;

function createBlock(){
    var block=document.createElement("div");
    block.className="block";
    block.id="block"+ blockId;
    blockId++;

    var gap=Math.random()*(1000-400)+400;
    blockMarginLeft= blockMarginLeft+gap;
    block.style.marginLeft= blockMarginLeft+"px";

    background.appendChild(block);
}

//Move Blocks
var moveBlocksId=0;
function moveBlocks(){
    for(var i=1; i<=blockId; i++){
        var currentBlock = document.getElementById("block"+i);
        var currentMarginleft= currentBlock.style.marginLeft;
        var newMarginLeft= parseInt(currentMarginleft)-20;
        currentBlock.style.marginLeft= newMarginLeft+"px";


        if(newMarginLeft<=113){
            if(newMarginLeft>=53){
                if(playerMarginTop<=370){
                    if(playerMarginTop>=310){
                        clearInterval(runWorkerId);
                        clearInterval(jumpWorkerId);
                        jumpWorkerId=-1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(createBlockId);
                        clearInterval(moveBlocksId);
                        clearInterval(moveHeartsId);
                        runSound.pause();
                        jumpSound.pause();
                        deadWorkerId= setInterval(dead,100);
                        deadSound.play();
                        currentBlock.style.visibility="hidden";
                        document.getElementById("blast").style.visibility="visible";
                        
                        
                        
                    }
                }
                    
            }
        }
    }
}

var deadSound= new Audio("blast.mp3");
//Dead Function
var deadImageNumber = 1;
var player = document.getElementById("player");
var deadWorkerId = 0;


function dead(){
    deadImageNumber++;
    if(deadImageNumber==9){
        deadImageNumber=8;

        player.style.marginTop="370px";
        
        


        document.getElementById("endScore").innerHTML= newScore;
        document.getElementById("collectedHearts").innerHTML= newLive;
        document.getElementById("gameOver").style.visibility="visible";
        
    }
    player.src="Dead ("+deadImageNumber+").png";
    
}

//Restart

function re(){
    location.reload();
}

//Back

function back(){
    location.reload();
}

//Create Hearts

var createHeartId=0;
var heartMarginLeft =300;
var heartId =1;
var heart =document.createElement("div");

function createHeart(){
    var heart =document.createElement("div");
    heart.className="heart";
    heart.id="heart"+ heartId;
    heartId++;

    var gap=Math.random()*(1000-400)+400;
    heartMarginLeft= heartMarginLeft+gap;
    heart.style.marginLeft= heartMarginLeft+"px";

    background.appendChild(heart);
}


var heartSound= new Audio("heart.mp3");
//Move Hearts
var moveHeartsId=0;

function moveHearts(){
    for(var i=1; i<=heartId; i++){
        var currentHeart= document.getElementById("heart"+i);
        
        var current_Marginleft= currentHeart.style.marginLeft;
        var new_MarginLeft= parseInt(current_Marginleft)-20;
        currentHeart.style.marginLeft= new_MarginLeft+"px";
        
        if(new_MarginLeft<=193){
            
            if(new_MarginLeft>=173){
                
                if(playerMarginTop<=360){
                    if(playerMarginTop>=310){
                        heartSound.play();
                      currentHeart.style.visibility="hidden";
                      newLive=newLive+1;
                        live.innerHTML= newLive;

                        if(newLive==5){
                            newScore=newScore+200;
                        }




                        
                    }
                }
                    
            }
        }



         
    }
}

//Update Lives
var live =document.getElementById("live");
var newLive =0;
var liveWorkerId=0;

var gameSound= new Audio("game.mp3");
//Game page visible

function game(){
    document.getElementById("background").style.visibility="visible";
}
//Instruction page visible
function frontPage(){
    document.getElementById("frontPage").style.visibility="visible";
    gameSound.play();
   
    
}





