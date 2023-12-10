let moonX, moonY; // Position of the moon
let eyeSize = 30; // Initial size of the eyes
let eyeDistance = 60; // Distance between the eyes
let isExpanding = false; // Variable to control eye expansion
let maxEyeSize = 100; // Maximum size for the eyes
let stars = [];
let showGoodNightMessage = false;
let goodNightMessageTime = 0;
let goodNightMessageDuration = 6000; // 6 seconds

let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;



function setup() {
  createCanvas(windowWidth, windowHeight); // Increased height to accommodate the clock
  stroke(255);

  let radius = min(width, height) / 6; // Adjusted radius for the clock
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

  cx = width / 2;
  cy = height / 3; // Adjusted the clock position above the moon

  // Initialize moon position to the center
  moonX = width / 2;
  moonY = height / 1.5;

  // Create an array of stars with random positions
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 4),
      brightness: random(200, 255),
    });
  }
}

function draw() {
  background(0, 10, 50); // Night sky

  // Draw and update the stars
  for (let i = 0; i < stars.length; i++) {
    // Twinkle effect: Randomly change brightness or size
    if (random() > 0.95) {
      stars[i].brightness = random(200, 255);
    }
    if (random() > 0.95) {
      stars[i].size = random(1, 4);
    }

    fill(stars[i].brightness);
    ellipse(stars[i].x, stars[i].y, stars[i].size, stars[i].size);
  }

  // Draw the clock background
  noStroke();
  fill(244, 12, 18);
  ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill(237, 34, 93);
  ellipse(cx, cy, clockDiameter, clockDiameter);

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock
  stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  // Draw the minute ticks
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();

  // Draw and update the stars
  for (let i = 0; i < stars.length; i++) {
    // Twinkle effect: Randomly change brightness or size
    if (random() > 0.95) {
      stars[i].brightness = random(200, 255);
    }
    if (random() > 0.95) {
      stars[i].size = random(1, 4);
    }

    fill(stars[i].brightness);
    ellipse(stars[i].x, stars[i].y, stars[i].size, stars[i].size);
  }

  // Draw the moon at the cursor position
  fill(255); // White color for the moon
  ellipse(moonX, moonY, 300, 300);

  // Draw two eyes in the moon
  fill(0); // Black color for the eyes
  let eye1X = moonX - eyeDistance / 1;
  let eye2X = moonX + eyeDistance / 1;

  // Check if the eyes should be expanding
  if (isExpanding) {
    // Expand the eyes
    eyeSize += 5;
    // Check if the eyes have reached the maximum size
    if (eyeSize >= maxEyeSize) {
      // Stop expanding and reset to the normal size
      isExpanding = false;
      eyeSize = 30;
    }
  }

  ellipse(eye1X, moonY, eyeSize, eyeSize);
  ellipse(eye2X, moonY, eyeSize, eyeSize);

  // Draw the button
  fill(200); // Gray color for the button
  rect(width / 2 - 50, moonY + 180, 100, 40);

  // Draw the "Good Night" message
  if (showGoodNightMessage) {
    fill(255); // White color for the text
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Good Night!", width / 2, moonY + 200);
  }

  // Check if it's time to hide the "Good Night" message
  if (millis() - goodNightMessageTime > goodNightMessageDuration) {
    showGoodNightMessage = false;
  }
}

function mousePressed() {
  // Toggle eye expansion on mouse click
  isExpanding = true;

  // Check if the mouse is over the button
  if (
    mouseX > width / 2 - 50 &&
    mouseX < width / 2 + 50 &&
    mouseY > moonY + 180 &&
    mouseY < moonY + 220
  ) {
    // Show the "Good Night" message and set the time
    showGoodNightMessage = true;
    goodNightMessageTime = millis();
  }
}
