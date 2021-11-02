const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let rocket, rocketImg;
let meteorImg, starImg;
let meteor, star;
let bg, bgImg;

let meteorGroup, starGroup;

let gameState = 1;
let score = 0;

function preload() {
  rocketImg = loadImage("assets/rocket.png");
  meteorImg = loadImage("assets/meteor.png");
  starImg = loadImage("assets/star.png");
  bgImg = loadImage("assets/background.png");
}

function setup() {
  createCanvas(700, 800);
  engine = Engine.create();
  world = engine.world;

  meteorGroup = createGroup();
  starGroup = createGroup();

  bg = createSprite(width / 2, height / 2, 700, 800);
  bg.addImage("background", bgImg);
  bg.scale = 6.0;

  rocket = createSprite(width / 2, 660, 50, 50);
  rocket.addAnimation("rocket", rocketImg);
  rocket.scale = 0.2

  scoreboard = createElement("h1");
}


function draw() {
  background(255);
  Engine.update(engine);

  if (gameState) {
    bg.velocityY = 6;
    if (bg.y > height) {
      bg.y = height / 2;
    }

    if (keyDown("right_arrow")) {
      rocket.x += 5;
    }

    if (keyDown("left_arrow")) {
      rocket.x += -5;
    }

    if (frameCount % 60 === 0) {
      createMeteors();
    }

    if (frameCount % 80 === 0) {
      createStars();
    }

    if (meteorGroup.collide(rocket)) {
      meteorGroup.destroyEach();
      rocket.destroy();

      gameState = 2;
    }

    if (starGroup.collide(rocket)) {
      starGroup.destroyEach();
      score += 1;
    }

    scoreboard.html("Score: " + score);
    scoreboard.style("color:white");
    scoreboard.position(width - 200, 20);

  }

  if (gameState === 2) {
    bg.velocityY = 0;

    meteorGroup.destroyEach();
    starGroup.destroyEach();

    swal({
      title: "Game Over",
      text: "Your Rocket Crashed!!",
      text: "Your score was " + score,
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    })
  }
  drawSprites();
}

function createMeteors() {
  let meteor = createSprite(Math.round(random(0, 650)), 50, 50, 50);
  meteor.addAnimation("meteor", meteorImg);
  meteor.scale = 0.2;

  meteor.velocityY = 5;
  meteor.lifetime = 230;

  meteorGroup.add(meteor);
}

function createStars() {
  let star = createSprite(Math.round(random(0, 650)), 50, 50, 50);
  star.addAnimation("star", starImg);
  star.scale = 0.1;

  star.velocityY = 5;
  star.lifetime = 230;

  starGroup.add(star);
}
