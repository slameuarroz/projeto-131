var song="";
var poseNet="";
var pulseLX=0;
var pulseLY=0;
var pulseRX=0;
var pulseRY=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoad);
    poseNet.on("pose", gotpose);
}
function draw(){
    //VIDEO
    image(video,0,0,600,500);
    //ESQUERDO
    fill("#FF0000");
    stroke("FF0000");
    circle(pulseLX,pulseLY,20);
    //CODIGOS
    
    numberPulseL=Number(pulseLY);
    removeDecimals=floor(numberPulseL);
    volume = removeDecimals/500;
    document.getElementById("volume").innerHTML="volume= "+volume;
    song.setVolume(volume);

    //DIREITO
    circle(pulseRX,pulseRY,20);
    if (pulseRY > 0 && pulseRY <= 100){
        document.getElementById("speed").innerHTML="velocidade= 0.5x";
        song.rate(0.5)
    }
    if (pulseRY > 100 && pulseRY <= 200){
        document.getElementById("speed").innerHTML="velocidade= 1x";
        song.rate(1)
    }
    if (pulseRY > 200 && pulseRY <= 300){
        document.getElementById("speed").innerHTML="velocidade= 1.5x";
        song.rate(1.5)
    }
    if (pulseRY > 300 && pulseRY <= 400){
        document.getElementById("speed").innerHTML="velocidade= 2x";
        song.rate(2)
    }
    if (pulseRY > 400 && pulseRY <= 500){
        document.getElementById("speed").innerHTML="velocidade= 2.5x";
        song.rate(2)
    }
}
function preload(){
    song=loadSound("music.mp3");
}
function playSound(){
    song.play();
   song.setVolume(1);
   song.rate(1);
}
function modelLoad(){
    console.log("modelo carregado");
}
function gotpose(results){
    if (results.length>0){
        console.log(results);
        pulseLX=results[0].pose.leftWrist.x;
        pulseLY=results[0].pose.leftWrist.y;
        pulseRX=results[0].pose.rightWrist.x;
        pulseRY=results[0].pose.rightWrist.y;
    }
}