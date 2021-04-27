document.addEventListener('DOMContentLoaded', function () {
    //Define variables for relevant DOM objexts
    const ball = document.getElementById("ball"),
        innerBall = document.getElementById("innerBall"),
        gameDiv = document.getElementById("game-div"),
        scoreBoard = document.getElementById("scoreBoard"),
        recordBoard = document.getElementById("recordBoard"),
        theBallShadow = document.getElementById("ballShadow"),
        loaderScreen = document.getElementById("loader");
    scoreBoard.innerText = "0";
    recordBoard.innerText = "0";

    //define variables relevant to the physics and position of the ball
    let timeInterval,
        bounces = 0,
        record = 0,
        speedX = 10,
        speedY = 0,
        positionX = 0,
        positionY = gameDiv.clientHeight + 300,
        stopY = false,
        recordMode = false;

    //loading screen
    setTimeout(() => {
        gameDiv.style.opacity = '1';
    }, 500);
    setTimeout(() => {
        loaderScreen.style.opacity = '0';
    }, 500);
    setTimeout(() => {
        loaderScreen.style.display = 'none';
    }, 1000);

    ball.addEventListener("click", function (event) {
        //remember the bounces count and update the current record (maximum bounces in a single attempt)
        bounces++;
        if (bounces > record) {
            record = bounces;
            if (!recordMode) {
                //crate an element which looks identical to the record num element for and animation to mark the new record
                let recordbehind = document.createElement("div");
                recordbehind.setAttribute("id", "recnum" + bounces);
                recordbehind.innerText = record.toString();
                recordbehind.setAttribute("class", "recordBoard-behind");
                gameDiv.appendChild(recordbehind);
                recordMode = true;
            }
        }

        //change the speed of the ball both vertically and horizontally acording to the mouse X,Y position at the moment of clicking
        speedX = (45 - event.layerX) / 5;
        speedY = (event.layerY + 30) / 6;
        if (speedY > 1) {
            stopY = false;
        } else {
            speedY = 0;
        }
    });

    //continuous update of the position and speed according to the physical state of the ball
    timeInterval = setInterval(() => {
        if (speedY < 3 && speedY > -3 && positionY < 0.2) {
            stopY = true;
            speedY = 0;
            positionY = 0;
            bounces = 0;
            recordMode = false;
        }

        if (!stopY) {
            speedY -= 0.5;
        }
        if (positionY <= 0 && !stopY) {
            if (speedY < 0) {
                bounces = 0;
                recordMode = false;
            }
            positionY = Math.abs(positionY);
            speedY = Math.abs(speedY) / 2;
        }
        if (positionX <= 0) {
            positionX = Math.abs(positionX);
            speedX = Math.abs(speedX) / 1.5;
        }
        if (positionX + 90 > gameDiv.clientWidth) {
            positionX = 2 * gameDiv.clientWidth - Math.abs(positionX) - 180;
            speedX = 0 - speedX / 1.5;
        }
        positionY += speedY;
        if (speedX < 0.1 && speedX > -0.1 && stopY) {
            speedX = 0;
        }
        if (speedX > 0 && stopY) {
            speedX -= 0.1;
        }
        if (speedX < 0 && stopY) {
            speedX += 0.1;
        }
        positionX += speedX;
        //actual update of the elements' style attributes to change his position
        ball.style.bottom = positionY.toString() + "px";
        ball.style.left = positionX.toString() + "px";
        innerBall.style.transform =
            "rotate(" + (positionX * (360 / 282.74)).toString() + "deg)";
        //move the ball shadow element according to ball's positionX
        theBallShadow.style.left = (positionX + 45).toString() + "px";
        theBallShadow.style.filter =
            "blur(" + ((positionY + 80) / 40).toString() + "px)";
        theBallShadow.style.width = ((positionY + 225) / 5).toString() + "px";
        //update record number and style according to the current number of bounces
        if (recordMode) {
            recordBoard.classList.add("recordmode");
            scoreBoard.classList.add("scorerecordmode");
        } else {
            recordBoard.classList.remove("recordmode");
            scoreBoard.classList.remove("scorerecordmode");
        }
        scoreBoard.innerText = bounces;
        recordBoard.innerText = record;
    }, 20);
})

//stop timeInterval before leaving page
window.onbeforeunload = function () {
    clearInterval(timeInterval);
};
