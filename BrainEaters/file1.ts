//create the canvas
let canvas = (<HTMLCanvasElement>document.getElementById('myCanvas'));
//create our grid using a constant that we can grab from anywhere without being able to change it
const grid = 110;
let cx = canvas.getContext("2d");
var zomImage = new Image();
var wallImage = new Image();
var heroImage = new Image();
zomImage.src = '/Content/zombie.jpg';
wallImage.src = '/Content/wall.jpg';
heroImage.src = '/Content/heroine.jpg';
let random = Math.floor(Math.random() * grid);
$('#endGame').hide();
let player: Player;
let zom: Zombie[] = [];

//this is creating our array
let arr = [];
class Player {
    public x: number
    public y: number
    public index: number
    //update player's position
    public updatePosition(value) {
        if (arr[this.index + value] == fullOf.empty) {
            arr[this.index + value] = fullOf.hero;
            arr[this.index] = fullOf.empty;
            this.index = this.index + value;
            this.updateCoord(this.index);
        }
    }
    protected updateCoord(index) {
        this.x = index % 10;
        this.y = Math.floor(index / 10);
    }
    constructor(index: number) {
        this.x = index % 10;
        this.y = Math.floor(index / 10);
        this.index = index;
    }
}
class Zombie extends Player {
    public x: number
    public y: number
    constructor(index) {
        super(index);
    }
    public zomAI(targetX, targetY) {
        //if the zombie is above the player
        if (this.y < targetY) {
            //and if the spot below the zombie is empty move the zombie down.
            if (arr[this.index + 10] == fullOf.empty) {
                arr[this.index + 10] = fullOf.zombie;
                arr[this.index] = fullOf.empty;
                this.index = this.index + 10;
                this.updateCoord(this.index);
            }
            //if the spot below the zombie has a wall
            else if (arr[this.index + 10] == fullOf.wall) {
                //and the zombie is to the left of the player, and the spot to the left is empty, move the zombie to the right.
                if (this.x < targetX && arr[this.index + 1] == fullOf.empty) {
                    arr[this.index + 1] = fullOf.zombie;
                    arr[this.index] = fullOf.empty;
                    this.index = this.index + 1;
                    this.updateCoord(this.index);
                }
                //if zom is right of player, and the spot to the left is empty, move zom left.
                else if (this.x > targetX && arr[this.index - 1] == fullOf.empty) {
                    arr[this.index - 1] = fullOf.zombie;
                    arr[this.index] = fullOf.empty;
                    this.index = this.index - 1;
                    this.updateCoord(this.index);
                }
            }
        }
        //if the zombie is to the left of the player
        else if (this.x < targetX) { 
            // and if the spot to the right of zombie is empty, move the zombie right
            if (arr[this.index + 1] == fullOf.empty) {
                arr[this.index + 1] = fullOf.zombie;
                arr[this.index] = fullOf.empty;
                this.index = this.index + 1;
                this.updateCoord(this.index);
            }
            //if the spot to the right of the zombie has a wall
            else if (arr[this.index + 1] == fullOf.wall) {
                //move down or up, randomly chosen, to get to the player
                let randomOfTwoChoices = Math.floor(Math.random() * 2);
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
                //if zom is right of player, and the spot to the left is empty, move zom left.
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
            console.log(`${this.x} <x tar> ${targetX}`);
            if (arr[this.index - 1] == fullOf.empty) {
                arr[this.index - 1] = fullOf.zombie;
                arr[this.index] = fullOf.empty;
                this.index = this.index - 1;
                this.updateCoord(this.index);
            }
        }

    }
}
//the enum for how we'll access the different spots
enum fullOf {
    empty,
    hero,
    zombie,
    wall,
}
//loop drawing data manipulation, mani, draw, mani, draw
fillSpot();
let numOfZoms = 1;
doTheZomThing();
let makeZoms = window.setInterval(doTheZomThing, 3000);
//while (true) {
//    //updateGame();
//}
//this draws each box in the board
function drawing() {
    //draws the rows of the board
    for (let y = 0; y < 11; y++) {
        //draws the rows one column at a time
        for (let x = 0; x < 10; x++) {
            //selects the index of the array, y*10+x, as relates to our grid, and then fills a rectangle size 50 by 50 into the canvas
            if (arr[y * 10 + x] == fullOf.empty) {
                cx.fillStyle = '#ffffff';
                cx.fillRect(50 * x, 50 * y, 50, 50);
            }
            else if (arr[y * 10 + x] == fullOf.wall) {
                cx.drawImage(wallImage, 50 * x, 50 * y, 50, 50);
            }
            else if (arr[y * 10 + x] == fullOf.zombie) {
                cx.drawImage(zomImage, 50 * x, 50 * y, 50, 50);
            }
            else if (arr[y * 10 + x] == fullOf.hero) {
                cx.drawImage(heroImage, 50 * x, 50 * y, 50, 50);
            }
        }
    }
}
//fills a box that was made in the drawing function with an enum
function fillSpot() {
    //for each box
    let spawnSpot = Math.floor(Math.random() * 109);
    player = new Player(spawnSpot);
    for (let y = 0; y < 11; y++) {
        for (let x = 0; x < 10; x++) {
            if (spawnSpot == (y * 10 + x)) {
                arr.push(fullOf.hero);
            }
            else if ((y + 1) % 2 == 0) {
                let chance = Math.floor(Math.random() * 14);
                //randomly spawn walls
                if (chance < 8) {
                    arr.push(fullOf.wall);
                }
                else {
                    arr.push(fullOf.empty);
                }
            } else {
                arr.push(fullOf.empty);
            }
            //spawn ze zoms
        }
    }
}
//about zombie creation
function doTheZomThing() {
    let zomSpawn;
    if (numOfZoms <= 10) {
        do {
            zomSpawn = 0;
        } while (arr[zomSpawn] != fullOf.empty) {
            arr[zomSpawn] = (fullOf.zombie);
            zom.push(new Zombie(zomSpawn));
        }
        numOfZoms += 1;
    }
}
drawing();

const up = -10;
const down = 10;
const left = -1;
const right = 1;
let buttonHandler = window.onkeydown = (e) => {
    heroMoves(e);
};
let leftState = false;
let downState = false;
let upState = false;
let rightState = false;
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
let endGameThing = false;
setInterval(() => {
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
        for (let r = 0; r < zom.length; r++) {
            if (zom[r].index + 1 == player.index || zom[r].index + 10 == player.index || zom[r].index - 1 == player.index || zom[r].index - 10 == player.index) {
                endGame();
            }
            zom[r].zomAI(player.x, player.y);
        }
    }
}, 500)

function endGame() {
    cx.globalAlpha = 0.5;
    $('#endGame').show();
    cx.fillRect(0, 0, 500, 600);
    endGameThing = true;
}
