var dictionary = [];
var newxyz = [];

var checker = [];

var checkerText;

var ct = true;

var fontRegular;

var g1 = 0;
var g2 = 0;
var g3 = 0;
var g4 = 0;
var g5 = 0;

var g1x = 0;
var g2x = 0;
var g3x = 0;
var g4x = 0;
var g5x = 0;

var g1y = 0;
var g2y = 0;
var g3y = 0;
var g4y = 0;
var g5y = 0;

var g1s = 0;
var g2s = 0;
var g3s = 0;
var g4s = 0;
var g5s = 0;

var g1ys = 0;
var g2ys = 0;
var g3ys = 0;
var g4ys = 0;
var g5ys = 0;

var g1a = 0;
var g2a = 0;
var g3a = 0;
var g4a = 0;
var g5a = 0;

var playerState = 0;
var gameState = 3;

var p1v = 0;
var p2v = 0;
var p1g = [];
var p2g = [];

var ghostLetters = ["G-", "H-", "O-", "S-", "T!"];

function preload() {
  dictionary = loadStrings('dictionary.txt');
  fontRegular = loadFont("texgyreschola-regular-webfont.ttf");
  ghost1 = loadImage('Ghost1.png');
  ghost2 = loadImage('Ghost2.png');
  ghost3 = loadImage('Ghost3.png');
  ghost4 = loadImage('Ghost4.png');
  ghost5 = loadImage('Ghost5.png');
}

function setup() {
  createCanvas(800, 600);
  
  g1 = random(-50, 200);
  g2 = random(-50, 200);
  g3 = random(-50, 200);
  g4 = random(-50, 200);
  g5 = random(-50, 200);

 g1x = random(width);
 g2x = random(width);
 g3x = random(width);
 g4x = random(width);
 g5x = random(width);

 g1y = random(height - 200);
 g2y = random(height - 200);
 g3y = random(height - 200);
 g4y = random(height - 200);
 g5y = random(height - 200);

 g1s = random(-5, 5);
 g2s = random(-5, 5);
 g3s = random(-5, 5);
 g4s = random(-5, 5);
 g5s = random(-5, 5);
 
 g1ys = random(-5, 5);
 g2ys = random(-5, 5);
 g3ys = random(-5, 5);
 g4ys = random(-5, 5);
 g5ys = random(-5, 5);
 
 g1a = int(random(-5, 5));
 g2a = int(random(-5, 5));
 g3a = int(random(-5, 5));
 g4a = int(random(-5, 5));
 g5a = int(random(-5, 5));
}

function draw() {
  
  if (gameState === 0) {
  background(24,110,135);
  
  ghostBusiness();
  
  runGame();
  }
  
  else if (gameState == 1) {
    fill(0, 0, 210);
    rect(0, 0, width, height);
    fill(223);
    textAlign(CENTER);
    text("Player", width/2, 200);
    textSize(144);
    text("2", width/2, 325);
    textSize(72);
    text("Wins!", width/2, 400);
  }
  
  else if (gameState == 2) {
    fill(210, 0, 0);
    rect(0, 0, width, height);
    fill(223);
    textAlign(CENTER);
    text("Player", width/2, 200);
    textSize(144);
    text("1", width/2, 325);
    textSize(72);
    text("Wins!", width/2, 400);
  }  
  
  else if (gameState == 3) {
    fill(157,167,128);
    rect(0, 0, width, height);
    fill(223);
    textFont(fontRegular);
    textSize(72);
    textAlign(CENTER);
    text("Let's play ghost!", width/2, 125);
    textSize(36);
    text("The object of the game is to NOT \nmake a word.", width/2, 225);
    text("Players take turns typing in letters. \nWhoever forces their opponent to make \nfive words first wins!", width/2, 350);
    text("Click anywhere to begin!", width/2, 550);
  }
  
}

function madeWord(word) {
  if (dictionary.indexOf(word) >= 0 && checker.length >=3) {
    return true;
  } else {
    return false;
  }
}

function runGame() {
  
  checkerText = join(checker, '');
  
  textFont(fontRegular);
  
  textSize(72);
  
  textAlign(CENTER);
  
  if (playerState === 0) {
    fill(210, 0, 0);
    text("Player 1's Turn", width/2, 150);
  } else if (playerState == 1) {
    fill(0, 0, 210);
    text("Player 2's Turn", width/2, 150);
  }
  
  text (checkerText, width/2, height/2);
  
  push();
  textSize(48);
  fill(210, 0, 0);
  translate(200, 450);
  text("Player 1", 0, 0);
  text(join(p1g, ''), 0, 100);
  pop();
  
  push();
  textSize(48);
  fill(0, 0, 210);
  translate(600, 450);
  text("Player 2", 0, 0);
  text(join(p2g, ''), 0, 100);
  pop();
  
  if (madeWord(checkerText) === true) {
  if (playerState === 1) {
    checker.length = 0;
    p1v++;
  } else if (playerState === 0) {
    checker.length = 0;
    p2v++;
  }
  }
  
    if (ct === false)   {
    if (playerState === 1) {
    checker.length = 0;
    p1v++;
  } else if (playerState === 0) {
    checker.length = 0;
    p2v++;
  }
  ct = true;
  }
if (p1v >= 5){
  gameState = 1;
}

if (p2v >= 5){
  gameState = 2;
}

p1g = subset(ghostLetters, 0, p1v);
p2g = subset(ghostLetters, 0, p2v);
}

function checkText(word) {
  var i = 0;
  
  while (match(dictionary[i], word) === null) {
    i++;
  
  if (i >= dictionary.length -  1) {
  ct = false;
  return false;
  }
  
  }
  
  if (match(dictionary[i], word) !== null) {
    ct = true;
    return true;
  }
}

function ghostBusiness() {
  
  tint(255, g1);
  image(ghost1, g1x, g1y);
  g1x += g1s;
  g1y += g1ys;
  g1 += g1a;
  
  if (g1 < -50 || g1 > 200) {
    g1a = g1a * -1;
  }
  
  if (g1x > width || g1x < 0 - 100) {
    g1s = g1s * -1;
  }
  
  if (g1y > height - 200 || g1y < 0 - 50) {
    g1ys = g1ys * -1;
  }
  
  tint(255, g2);
  image(ghost2, g2x, g2y);
  g2x += g2s;
  g2y += g2ys;
  g2 += g2a;
  
  if (g2 < -51 || g2 > 201) {
    g2a = g2a * -1;
  }
  
  if (g2x > width || g2x < 0 - 200) {
    g2s = g2s * -1;
  }
  
  if (g2y > height - 200 || g2y < 0 - 50) {
    g2ys = g2ys * -1;
  }
  
  tint(255, g3);
  image(ghost3, g3x, g3y);
  g3x += g3s;
  g3y += g3ys;
  g3 += g3a;
  
  if (g3 < -51 || g3 > 201) {
    g3a = g3a * -1;
  }
  
  if (g3x > width || g3x < 0 - 200) {
    g3s = g3s * -1;
  }
  
  if (g3y > height - 200 || g3y < 0 - 50) {
    g3ys = g3ys * -1;
  }

  tint(255, g4);
  image(ghost4, g4x, g4y);
  g4x += g4s;
  g4y += g4ys;
  g4 += g4a;
  
  if (g4 < -51 || g4 > 201) {
    g4a = g4a * -1;
  }
  
  if (g4x > width || g4x < 0 - 200) {
    g4s = g4s * -1;
  }

  if (g4y > height - 200 || g4y < 0 - 50) {
    g4ys = g4ys * -1;
  }
  
  tint(255, g5);
  image(ghost5, g5x, g5y);
  g5x += g5s;
  g5y += g5ys;
  g5 += g5a;
  
  if (g5 < -51 || g5 > 201) {
    g5a = g5a * -1;
  }
  
  if (g5x > width  || g5x < 0 - 200) {
    g5s = g5s * -1;
  }
  
  if (g5y > height - 200 || g5y < 0 - 50) {
    g5ys = g5ys * -1;
  }
}

function keyTyped() {
  checker.push(key);
  checkerText = join(checker, '');
  checkText(checkerText);
  console.log(checkerText);
  playerState = abs(playerState - 1);
}

function mousePressed() {
  if (gameState > 0) {
    p1v = 0;
    p2v = 0;
    gameState = 0;
  }
}