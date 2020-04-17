let x = [];
let y = [];
let fourierY;

let time = 0;
let path = [];

function setup() {
    createCanvas(1000, 600);

    pixels = testImg();

    let tempX = 0;
    let tempY = 0;
    for (let i = 0; i < pixels.length; i = i+4 )  {

        if(pixels[i] < 50) {
            x.push(tempX);
            y.push(tempY);
        
        }
        if (i % (100 * 4) == 0) {
            tempY += 1;
            tempX = 0;
        }
        tempX += 1;
    }

    fourierX = dft(x);
    fourierY = dft(y);

    fourierX.sort((a, b) => b.amp - a.amp);
    fourierY.sort((a, b) => b.amp - a.amp);
}

function epiCycle(x, y, rotation, fourier) {
    for (let i = 0; i < fourier.length; i++) {
        let prevx = x;
        let prevy = y;

        let freq = fourier[i].freq;
        let radius = fourier[i].amp;
        let phase = fourier[i].phase;
        x += radius * cos(freq * time + phase + rotation);
        y += radius * sin(freq * time + phase + rotation);

        stroke(0, 100);
        noFill();
        ellipse(prevx, prevy, radius*2);

        stroke(0);
        line(prevx, prevy, x, y);
    }

    return createVector(x, y);
}

function draw() {
    background(255);

    let vx = epiCycle(width/2, 100, 0, fourierX);
    let vy = epiCycle(100, height/2+50, HALF_PI, fourierY);

    let v = createVector(vx.x, vy.y);
    path.unshift(v);

    line(vx.x, vx.y, v.x, v.y);
    line(vy.x, vy.y, v.x, v.y);

    beginShape();
    for (let i = 0; i < path.length; i++) {
        point(path[i].x, path[i].y);
    }
    endShape();

    if (time == TWO_PI) {
        path.pop();
    }

    const dt = TWO_PI / fourierY.length;
    time += dt;
}