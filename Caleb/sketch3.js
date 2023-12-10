function setup() {
    createCanvas(windowWidth, windowHeight);
    background(102);
  }
  
  function draw() {
    stroke(255);
    if (mouseIsPressed === true) {
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
  }