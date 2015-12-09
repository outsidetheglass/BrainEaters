var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//create the canvas
var canvas = document.getElementById('myCanvas');
//create our grid using a constant that we can grab from anywhere without being able to change it
var grid = 110;
var cx = canvas.getContext("2d");
var random = Math.floor(Math.random() * grid);
$('#endGame').hide();
var player;
var zom = [];
//this is creating our array
var arr = [];
var Player = (function () {
    function Player(index) {
        this.x = index % 10;
        this.y = Math.floor(index / 10);
        this.index = index;
    }
    //update player's position
    Player.prototype.updatePosition = function (value) {
        if (arr[this.index + value] == fullOf.empty) {
            arr[this.index + value] = fullOf.hero;
            arr[this.index] = fullOf.empty;
            this.index = this.index + value;
            this.updateCoord(this.index);
        }
    };
    Player.prototype.updateCoord = function (index) {
        this.x = index % 10;
        this.y = Math.floor(index / 10);
    };
    return Player;
})();
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie(index) {
        _super.call(this, index);
    }
    Zombie.prototype.zomAI = function (targetX, targetY) {
        //if the zombie is above the player
        if (this.y < targetY) {
            //and if the spot below the zombie is empty move the zombie down.
            if (arr[this.index + 10] == fullOf.empty) {
                arr[this.index + 10] = fullOf.zombie;
                arr[this.index] = fullOf.empty;
                this.index = this.index + 10;
                this.updateCoord(this.index);
            }
            else if (arr[this.index + 10] == fullOf.wall) {
                //and the zombie is to the left of the player, and the spot to the left is empty, move the zombie to the right.
                if (this.x < targetX && arr[this.index + 1] == fullOf.empty) {
                    arr[this.index + 1] = fullOf.zombie;
                    arr[this.index] = fullOf.empty;
                    this.index = this.index + 1;
                    this.updateCoord(this.index);
                }
                else if (this.x > targetX && arr[this.index - 1] == fullOf.empty) {
                    arr[this.index - 1] = fullOf.zombie;
                    arr[this.index] = fullOf.empty;
                    this.index = this.index - 1;
                    this.updateCoord(this.index);
                }
            }
        }
        else if (this.x < targetX) {
            // and if the spot to the right of zombie is empty, move the zombie right
            if (arr[this.index + 1] == fullOf.empty) {
                arr[this.index + 1] = fullOf.zombie;
                arr[this.index] = fullOf.empty;
                this.index = this.index + 1;
                this.updateCoord(this.index);
            }
            else if (arr[this.index + 1] == fullOf.wall) {
                //move down or up, randomly chosen, to get to the player
                var randomOfTwoChoices = Math.floor(Math.random() * 2);
                console.log(randomOfTwoChoices);
                if (randomOfTwoChoices == 1) {
                    randomOfTwoChoices = this.index - 10;
                }
                if (randomOfTwoChoices == 0) {
                    randomOfTwoChoices = this.index + 10;
                }
                if (this.x < targetX && arr[randomOfTwoChoices] == fullOf.empty) {
                    arr[randomOfTwoChoices] = fullOf.zombie;
                    arr[this.index] = fullOf.empty;
                    this.index = randomOfTwoChoices;
                    this.updateCoord(this.index);
                }
                else if (this.x > targetX && arr[this.index - 1] == fullOf.empty) {
                    arr[this.index - 1] = fullOf.zombie;
                    arr[this.index] = fullOf.empty;
                    this.index = this.index - 1;
                    this.updateCoord(this.index);
                }
            }
        }
        else if (this.y > targetY) {
            if (arr[this.index - 10] == fullOf.empty) {
                arr[this.index - 10] = fullOf.zombie;
                arr[this.index] = fullOf.empty;
                this.index = this.index - 10;
                this.updateCoord(this.index);
            }
        }
        else if (this.x > targetX) {
            console.log(this.x + " <x tar> " + targetX);
            if (arr[this.index - 1] == fullOf.empty) {
                arr[this.index - 1] = fullOf.zombie;
                arr[this.index] = fullOf.empty;
                this.index = this.index - 1;
                this.updateCoord(this.index);
            }
        }
    };
    return Zombie;
})(Player);
//the enum for how we'll access the different spots
var fullOf;
(function (fullOf) {
    fullOf[fullOf["empty"] = 0] = "empty";
    fullOf[fullOf["hero"] = 1] = "hero";
    fullOf[fullOf["zombie"] = 2] = "zombie";
    fullOf[fullOf["wall"] = 3] = "wall";
})(fullOf || (fullOf = {}));
//loop drawing data manipulation, mani, draw, mani, draw
fillSpot();
var numOfZoms = 1;
doTheZomThing();
setInterval(function () {
    if (numOfZoms <= 10) {
        doTheZomThing();
    }
}, 800);
//while (true) {
//    //updateGame();
//}
//this draws each box in the board
function drawing() {
    //draws the rows of the board
    for (var y = 0; y < 11; y++) {
        //draws the rows one column at a time
        for (var x = 0; x < 10; x++) {
            //selects the index of the array, y*10+x, as relates to our grid, and then fills a rectangle size 50 by 50 into the canvas
            if (arr[y * 10 + x] == fullOf.empty) {
                cx.fillStyle = "#ffebcd";
                cx.fillRect(50 * x, 50 * y, 50, 50);
            }
            else if (arr[y * 10 + x] == fullOf.wall) {
                cx.fillStyle = "#111111";
                cx.fillRect(50 * x, 50 * y, 50, 50);
            }
            else if (arr[y * 10 + x] == fullOf.zombie) {
                cx.fillStyle = "#8b8378";
                cx.fillRect(50 * x, 50 * y, 50, 50);
            }
            else if (arr[y * 10 + x] == fullOf.hero) {
                cx.fillStyle = "#00bfff";
                cx.fillRect(50 * x, 50 * y, 50, 50);
            }
        }
    }
}
//fills a box that was made in the drawing function with an enum
function fillSpot() {
    //for each box
    var spawnSpot = Math.floor(Math.random() * 109);
    player = new Player(spawnSpot);
    for (var y = 0; y < 11; y++) {
        for (var x = 0; x < 10; x++) {
            if (spawnSpot == (y * 10 + x)) {
                arr.push(fullOf.hero);
            }
            else if ((y + 1) % 2 == 0) {
                var chance = Math.floor(Math.random() * 14);
                //randomly spawn walls
                if (chance < 8) {
                    arr.push(fullOf.wall);
                }
                else {
                    arr.push(fullOf.empty);
                }
            }
            else {
                arr.push(fullOf.empty);
            }
        }
    }
}
//about zombie creation, calm down it's not dancing.
function doTheZomThing() {
    var zomSpawn;
    do {
        zomSpawn = Math.floor(Math.random() * 109);
    } while (arr[zomSpawn] != fullOf.empty);
    {
        arr[zomSpawn] = (fullOf.zombie);
        zom.push(new Zombie(zomSpawn));
    }
    numOfZoms += 1;
}
drawing();
var up = -10;
var down = 10;
var left = -1;
var right = 1;
var buttonHandler = window.onkeydown = function (e) {
    heroMoves(e);
};
var leftState = false;
var downState = false;
var upState = false;
var rightState = false;
function heroMoves(sender) {
    switch (sender.keyCode) {
        case 38:
            upState = true;
            break;
        case 37:
            leftState = true;
            break;
        case 39:
            rightState = true;
            break;
        case 40:
            downState = true;
            break;
    }
}
var endGameThing = false;
setInterval(function () {
    if (!endGameThing) {
        if (leftState) {
            if (player.index % 10 != 0) {
                player.updatePosition(left);
            }
            leftState = false;
        }
        if (upState) {
            player.updatePosition(up);
            upState = false;
        }
        if (downState) {
            player.updatePosition(down);
            downState = false;
        }
        if (rightState) {
            if (player.index % 10 != 9) {
                player.updatePosition(right);
            }
            rightState = false;
        }
        //if two are true, last key hit makes all other states false 
        //if upkey is triggered then make that key false, onpress and onkeyup
        drawing();
        for (var r = 0; r < zom.length; r++) {
            if (zom[r].index + 1 == player.index || zom[r].index + 10 == player.index || zom[r].index - 1 == player.index || zom[r].index - 10 == player.index) {
                endGame();
            }
            zom[r].zomAI(player.x, player.y);
        }
    }
}, 200);
function endGame() {
    cx.globalAlpha = 0.5;
    $('#endGame').show();
    cx.fillRect(0, 0, 500, 600);
    endGameThing = true;
}
