var block = document.getElementById("block");
var fish = document.getElementById("fish");
var shark = document.getElementById("shark");
var up = false;
var down = false;
var jumping = 0;
var counter = 0;
var highscore = 0;
var attempt = 0;

//fish spawn
fish.addEventListener('animationiteration', () => {
    var random = -((Math.random()*400)+300);
    //random spawn pos
    fish.style.top = random + "px";
    counter++;
    //fish movement reset
    if(up = true){
        up = false;
    }
    if(down = true){
        down = false;
    }
    document.getElementById("fish").style.opacity = 1;
});

setInterval(function(){
    var sharkTop = parseInt(window.getComputedStyle(shark).getPropertyValue("top"));
    var fishTop = parseInt(window.getComputedStyle(fish).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    //shark top collision detect value
    var sTop = -(600-sharkTop);
    //gravity
    if((jumping==0) && (sharkTop < 540)){
        shark.style.top = (sharkTop+3)+"px";
    }
    //shark offset left needed to disappear fish
    function getOffset(s) {
        var _x = -200;
            while( s && !isNaN( s.offsetLeft ) ) {
                _x += s.offsetLeft - s.scrollLeft;
                s = s.offsetParent;
            }
            return {left: _x};
        }
    var x = getOffset(document.getElementById('shark')).left;
    if(x > blockLeft){
        document.getElementById("fish").style.opacity = 0;
    }
    //collision detect
    if((shark.style.left == blockLeft - 250) &&((sTop-90<fishTop)||(sTop>fishTop+270))){
        if (counter > highscore){
            highscore = counter
        }
        attempt++;
        alert("The Shark missed food!" + "\n Fish eaten: "+(counter) + "\n Highscore: " + (highscore) + "\n\nFish's escapes: " + (attempt));
        shark.style.top = 100 + "px";
        counter=0;
    }
},10);

//fish movemant
document.addEventListener('keydown',press)
function press(e){
        if (e.keyCode == 87){
            up = true
        }
        if (e.keyCode == 83){
            down = true
        }
    }
document.addEventListener('keyup',release)
function release(e){
        if (e.keyCode == 87){
            up = false
        }
        if (e.keyCode == 83){
            down = false
        }
    }

//fish gameloop
function gameLoop(){
    var y = parseInt(window.getComputedStyle(fish).getPropertyValue("top"));
    if(up){
        y -= 3;
    }
    if(down){
        y += 3;
    }
    fish.style.top = y+"px";
    window.requestAnimationFrame(gameLoop)
}
window.requestAnimationFrame(gameLoop)
 
//shark jump function
function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var sharkTop = parseInt(window.getComputedStyle(shark).getPropertyValue("top"));
        if((sharkTop>6)&&(jumpCount<17)){
            shark.style.top = (sharkTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}