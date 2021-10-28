var canvas = " ";
var img =  " ";
var s1 = " ";
var object_detect = " ";
var object = [];

function preload() {
     img = loadImage("image1.jpg");
}

function setup() {
     canvas = createCanvas(640, 480);
    canvas.center();

     object_detect = ml5.objectDetector('cocossd', modelLoaded);
     document.getElementById("status").innerHTML = "Status - Detecting";
}

function modelLoaded() {
     console.log("model is loaded");
     s1 = true;
     object_detect.detect(img, gotResults)
}

function gotResults(error, results) {
     if (error) {
          console.error(error);
     } else {
          console.log(results);
          object = results;
     }
}

function draw() {
     image(img, 0, 0, 640, 480);

     if(s1 != " "){
          for (let i = 0; i < object.length; i++) {
               var percent = floor(object[i].confidence * 100);
               document.getElementById("status").innerHTML = "Detected";
               fill("#000");
               text(object[i].label + " " + percent + " %", object[i].x + 15, object[i].y + 15);
               noFill();
               stroke("#000");
               rect(object[i].x, object[i].y, object[i].width , object[i].height);
          }
     }

}