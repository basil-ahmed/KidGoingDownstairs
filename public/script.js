let playerName = prompt("Please Enter Your Name");
while (playerName == "") {
    playerName = prompt("Please Enter Your Name, Do Not Leave It Blank");
}

let x2, y2, w2, h2, image2;
let game_started = false
function preload() {
    bgMusic = loadSound('background.mp3');
    spikeRow = loadImage('5.png');
    gameover_img = loadImage('end.png');
    SpikeSound = loadSound("spike.mp3");
    FireSound = loadSound("fire.mp3");
    LandSound = loadSound("land.mp3");
    ScreamSound = loadSound("scream.mp3");
    img1 = loadImage('kid1.png');
    img2 = loadImage('kid2.png');
    img = loadImage('bg.jpeg');
    instructions = loadImage("Instructions.png")
}

class Game {

    constructor(w, h, g, ground)
    // g is length of spikes
    // ground is the bottom ground of the game 
    // (where character lands)
    {
        this.w = w;
        this.h = h;
        this.g = g;
        this.ground = ground;
        this.speed = 0;
        this.level = 0;
        this.kid = new
            Player(this.g + 100, this.g + 100, this.g, 800, 100, 100, img1, img2);
        // this.kid2 = new
        //     Player(this.g + 300, this.g + 300, this.g, 800, 100, 100, img3, img4);
        this.platforms = [];
        this.gameOver = false;
        this.count = 8;
        this.bgMusic = bgMusic;
        this.spikeRow = spikeRow;
        this.bgMusic.loop(); // Playing background music on loop
    }

    form_platform() {

        // Randomly forms platforms of 
        // different types at the start of the game 
        if (this.count == 8) {
            for (let i = 0; i < 8; i++) {
                let position = random([0, 1, 2, 3, 4]);
                let type = random([0, 1, 2, 3, 4]);
                this.count = this.count - 1;
                let new_platform =
                    new Platform(120, 25, position * 120, (i + 1) * 100, type);
                this.platforms.push(new_platform);
            }
        }

        // Removing Platforms when they reach the top
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.platforms[i].y <= 0) {
                this.platforms.splice(i, 1);
                this.level = this.level + 1;
                this.count = this.count + 1;
                break;
            }
        }

        // Randomly forms platforms of 
        // different types until the game is over 
        if (this.gameOver == false && this.count == 1) {
            this.count = this.count - 1;
            let position = random([0, 1, 2, 3, 4]);
            let type = random([0, 1, 2, 3, 4]);
            let new_platform1 =
                new Platform(120, 25, position * 120, 800, type);
            this.platforms.push(new_platform1);
        }

    }

    display() {

        // Displaying the row of spikes at the top
        image(this.spikeRow, 0, 0, 120, 51);
        image(this.spikeRow, 120, 0, 120, 51);
        image(this.spikeRow, 240, 0, 120, 51);
        image(this.spikeRow, 360, 0, 120, 51);
        image(this.spikeRow, 480, 0, 120, 51);

        // Moving platforms (until game is over) and 
        // displaying the character
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.gameOver == false) {
                this.platforms[i].move();
            }
            this.platforms[i].display();

        }

        this.kid.display();

        // let player = this.kid;
        // socket.emit('player', player);

        // socket.on('player', function(player) {
        //     player.display();
        // })
    }

}

class Player {

    constructor(x, y, g, ground, char_w, char_h, img_r, img_l) {
        this.x = x;
        this.y = y;
        this.g = g;
        this.ground = ground;
        this.char_w = char_w;
        this.char_h = char_h;
        this.vx = 0; // Change in x coordinate of the character
        this.vy = 1; // Change in y coordinate of the character
        this.on = 0;
        this.life = 10; // Starting health is 10
        this.dir = 1; // Direction
        this.gameover_img = gameover_img;
        this.SpikeSound = SpikeSound;
        this.FireSound = FireSound;
        this.LandSound = LandSound;
        this.ScreamSound = ScreamSound;
        this.img1 = img_r;
        this.img2 = img_l;
        // this.img3 = img3;
        // this.img4 = img4;
        this.keyHandler = { LEFT: false, RIGHT: false, UP: false };
    }

    // Falling of the character
    gravity() {

        if (this.y + this.char_h < this.ground) {
            this.vy += 0.5;
        }
        else {
            this.vy = 0;
        }

        // Changes the ground of the character to 
        // the y position of the platform below it
        for (let i = 0; i < game.platforms.length; i++) {
            if (game.platforms[i].x <= this.x + 50 &&
                this.x + 50 <= game.platforms[i].x + game.platforms[i].w &&
                this.y + this.char_h - game.platforms[i].y <= 30 &&
                game.platforms[i].type != 4) {
                this.ground = game.platforms[i].y;
                return;
            }
        }

        this.ground = game.ground;

    }

    update() {

        this.gravity();

        // Horizontal movement of the player
        if (this.keyHandler[LEFT]) {
            this.vx = -7;
            this.dir = -1;
        }
        else if (this.keyHandler[RIGHT]) {
            this.vx = 7;
            this.dir = 1;
        }
        else {
            this.vx = 0;
        }

        //Moving of the character
        this.x += this.vx;
        this.y += this.vy;
        if (this.y + this.char_h > this.ground) {
            this.y = this.ground - this.char_h;
        }

        // When landed on a platform 
        // (Increase life or decrease life depending on 
        // the platform type)
        if (this.vy == 0) {
            for (let i = 0; i < game.platforms.length; i++) {
                if (this.on == 0 &&
                    game.platforms[i].x <= this.x + 50 &&
                    this.x + 50 <= game.platforms[i].x + game.platforms[i].w &&
                    this.y + this.char_h == game.platforms[i].y) {
                    if (game.platforms[i].type == 1) {
                        this.SpikeSound.play();
                        this.reduce_life();
                        this.reduce_life();
                        this.on = 1;
                    }
                    else if (game.platforms[i].type == 2) {
                        this.FireSound.play();
                        this.reduce_life();
                        this.on = 1;
                    }
                    else if (game.platforms[i].type == 0 ||
                        game.platforms[i].type == 3) {
                        this.LandSound.play();
                        if (this.life < 10) { this.plus_life(); }
                        this.on = 1;
                    }
                }
            }
        }
        else {
            this.on = 0;
        }

        // Conditions for game over
        if (800 - this.char_h == this.y &&
            game.gameOver == false) {
            this.gameOver();
        }
        else if (this.life <= 0 &&
            game.gameOver == false) {
            this.gameOver();
        }

        // When player hits the above row of spikes
        if (this.y + 50 <= 70) {
            this.SpikeSound.play();
            this.y = 40;
            this.reduce_life();
        }

        // For the player to not go outisde the screen (Horizontally)
        if (this.x < 1) {
            this.x = 0;
        }
        else if (this.x + this.char_w > 600) {
            this.x = 600 - this.char_w;
        }

    }

    reduce_life() { if (this.life > 0) { this.life = this.life - 1; } }
    plus_life() { this.life = this.life + 1; }

    gameOver() {
        this.ScreamSound.play();
        game.gameOver = true;
    }

    // Display the character going left or right  
    display() {

        this.update()
        if (this.dir > 0) {
            image(this.img1, this.x, this.y, this.char_w, this.char_h);
            // let playerPos = { x: this.x, y: this.y, w: this.char_w,h: this.char_h, img:"image1"};
            // //Send mouse position object to the server
            // socket.emit('position', playerPos);
            // image2=this.img1;
            // socket.on('position', function(position) {
            //     console.log(position);
            //     x2=position.x;
            //     y2=position.y;
            //     w2=position.w;
            //     h2=position.h;
            //     if(position.img == "image1"){
            //         image2 = this.img1;
            //     }
            //     else{
            //         image2 = this.img2;
            //     }
            // });
            // image(image2, x2, y2, w2, h2);
        }
        if (this.dir < 0) {
            image(this.img2, this.x, this.y, this.char_w, this.char_h);
            // let playerPos = { x: this.x, y: this.y, w: this.char_w,h: this.char_h, img:"image2"};
            // socket.emit('position', playerPos);
            // image2 = this.img1;
            // socket.on('position', function(position) {
            //     console.log(position);
            //     x2=position.x;
            //     y2=position.y;
            //     w2=position.w;
            //     h2=position.h;
            //     if(position.img == "image2"){
            //         image2 = this.img2;
            //     }
            //     else{
            //         image2 = this.img1;
            //     }
            // });
            // image(image2, x2, y2, w2, h2);
        }
    }

}

class Platform {

    constructor(w, h, x, y, t) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.type = t;
        this.img = loadImage(str(this.type) + '.png');
    }

    move() // Moving the platform upwards
    {
        // Gradually increase the game speed as it moves on
        this.y = this.y - 4 - (game.level / 100);
    }

    display() {
        image(this.img, this.x, this.y, this.w, this.h);
    }

}

let game;

function setup() {

    createCanvas(600, 800);

}

let storeData = true;

function draw() {

    background(img);

    // Start Game When Mouse Clicked
    if (game_started == true) {

        game.form_platform();
        game.display();

        // Scoreboard
        fill(202, 0, 42)
        rect(5, 45, 150, 85)
        fill(255, 255, 255);
        textSize(40);

        //Increase 1 score for 10 platforms passed
        text('Score:' + str((int(game.level / 10)) + 1), 10, 80);

        // Display Player Health
        text('Life:' + str(game.kid.life), 10, 120);

        // Display Game Over Message
        if (game.gameOver == true) {

            image(game.kid.gameover_img, 170, 300, 250, 300);
            text("Click to Restart!!", 150, 650)

            if (storeData == true) {
                let score = (int(game.level / 10)) + 1;

                //creating the object 
                let obj = { "score": score, "name": playerName };

                //stringify the object
                let jsonData = JSON.stringify(obj);

                //fetch to route noCups
                fetch('/Score', {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: jsonData
                })
                    .then(response => response.json())
                    .then(data => { console.log(data) });

                //1. make a fetch request of type POST so that we can send the (noCups) info to the server

                storeData = false;
            }
        }
    }
    // Display The Menu
    else {

        image(instructions, 0, 0)

    }
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        game.kid.keyHandler[LEFT] = true;
    }
    else if (keyCode == RIGHT_ARROW) {
        game.kid.keyHandler[RIGHT] = true;
    }
}

function keyReleased() {
    if (keyCode == LEFT_ARROW) {
        game.kid.keyHandler[LEFT] = false;
    }
    else if (keyCode == RIGHT_ARROW) {
        game.kid.keyHandler[RIGHT] = false;
    }
}

function mouseClicked() { //Start and Restart Game when mouse clicked
    if (game_started == false) {
        game = new Game(600, 800, 51, 800);
        game_started = true
        storeData = true;
    }
    if (game.gameOver == true) {
        game = new Game(600, 800, 51, 800);
        storeData = true;
    }
}

scoreButton = document.createElement("button")
scoreButton.innerHTML = "LeaderBoard";
document.body.appendChild(scoreButton);
scoreButton.addEventListener('click', () => {
    window.location.href = 'Leaderboard/';
})
