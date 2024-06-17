let gameSeq = [];
let userSeq = [];
let btnArr = ["top-left","top-right","bottom-left","bottom-right"];

var flashAudio = new Audio("./assets/flash.mp3");
var endAudio = new Audio("./assets/end.mp3");

let gameStarted = false;
let level = 0;
let maxScore = 0

let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");
let highScore = document.querySelector("#text2");

document.addEventListener("keydown", function(){
    if( !gameStarted ){
        h1.innerText = "Simon Game";
        h2.style.color = 'white';
        h2.classList.remove("redGlow");
        h1.classList.remove("scoreHeading");
        gameStarted = true;
        levelUp();
    }
})

function flash(btn, newcolor, oldcolor){
    document.querySelector("."+btn).style.backgroundColor = newcolor;
    flashAudio.play();
    setTimeout(function(){
        document.querySelector("."+btn).style.backgroundColor = oldcolor;
    }, 200)
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerHTML = "Level " + level;
    let randbtn = Math.floor(Math.random() * 4) + 0;
    gameSeq.push(randbtn);

    for(let i = 0; i < gameSeq.length; i++){
        
        setTimeout(() => {
            if(gameSeq[i]==0){
                flash(btnArr[0],"#0096FF","#00008B") ;
              }
              if(gameSeq[i]==1){
                flash(btnArr[1],"#FF0000", "#8B0000");
              }
              if(gameSeq[i]==2){
                 flash(btnArr[2],"#FFEA00", "#8B8000");
              }
              if(gameSeq[i]==3){
                 flash(btnArr[3],"#39FF14", "#023020") ;
              }
        }, i*500)
    }
}

function checkSeq(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1200);        // While using timeout we dont use () while calling function
        }
    }
    else{
        maxScore = Math.max(maxScore, level);
        h2.innerHTML = `Game Over!!! (Press any key to start)`;
        h2.style.color = 'red';
        h2.classList.add("redGlow");
        h1.innerHTML = `Your Score was ${level}`;
        h1.classList.add("scoreHeading");
        highScore.innerText = `Highest Score: ${maxScore}`;
        document.querySelector("body").style.backgroundImage = "none"
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "black";
            document.querySelector("body").style.backgroundImage = "url('./assets/BG2.jpg')";
        },200)
        resetGame();
    }
}

function btnPress(){
    // let classname = this.className;        <<<<<---These 2 lines can also be used instead of line 84,85
    // let index = btnArr.indexOf(classname);
    let btn = this.getAttribute("class");
    let index = btnArr.indexOf(btn);

    if(index == 0){
        flash(btnArr[0],"#0096FF","#00008B");
    }
    if(index == 1){
        flash(btnArr[1],"#FF0000","#8B0000");
    }
    if(index == 2){
        flash(btnArr[2],"#FFEA00","#8B8000");
    }
    if(index == 3){
        flash(btnArr[3],"#39FF14","#023020");
    }

    userSeq.push(index);
    checkSeq(userSeq.length - 1);

}

function resetGame(){
    endAudio.play();
    gameStarted = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

let allBtns = document.querySelectorAll("#btn");
for(i of allBtns){
    i.addEventListener("click",btnPress);
}