import { VisualTextBoxStyle, textBox, stopAllWrite } from './textbox.js';
import { stageMaster } from './staging.js'

var xSize = 0;
var ySize = 0;


function onWindowResize(canvas) {
    const scale = window.devicePixelRatio;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width * scale;
    canvas.height = height * scale;
    
    xSize = canvas.width;
    ySize = canvas.height;
}


const welcomeTitle1 = "Once upon a time..."
const welcomeTitle2 = "Let's meet our character!"
const characterText1 = "Hello! I am the main character! Lets have a lot of fun!"
const characterText2 = "Oh no! Who is that?"
const evilText = "I am the big evil antagonist of this story! I'll cut it short right here!"
const ohno1 = "Oh noes!"
const ohno2 = "Goodbye!"

window.onload = function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    window.onresize = () => onWindowResize(canvas);
    onWindowResize(canvas);
    
    const manStyle = new VisualTextBoxStyle(
        0,
        ySize-300,
        xSize, 300,
        "Man",
        "https://media.gettyimages.com/id/1141508304/photo/portrait-of-smiling-tattooed-man-with-arms-crossed.jpg?s=170667a&w=gi&k=20&c=DWwC_IdHb0NJVYSiLIaSka0cYyuEWQhqiEUGuak99IY=",
        300,
        characterText1,
        "white",
        "system-ui",
        27,
        200,
        "blue",
        .9,
        .9,
        ctx,
        false);

    const antagonistStlye = new VisualTextBoxStyle(
        0,
        ySize-300,
        xSize, 300,
        "Evil",
        "https://media.gettyimages.com/id/1141508304/photo/portrait-of-smiling-tattooed-man-with-arms-crossed.jpg?s=170667a&w=gi&k=20&c=DWwC_IdHb0NJVYSiLIaSka0cYyuEWQhqiEUGuak99IY=",
        300,
        evilText,
        "white",
        "system-ui",
        27,
        200,
        "red",
        .9,
        .9,
        ctx,
        false);
    
    const narratorStyle = new VisualTextBoxStyle(
        0,
        (ySize / 2) -300,
        xSize, 300,
        "Narrator",
        "https://media.gettyimages.com/id/1141508304/photo/portrait-of-smiling-tattooed-man-with-arms-crossed.jpg?s=170667a&w=gi&k=20&c=DWwC_IdHb0NJVYSiLIaSka0cYyuEWQhqiEUGuak99IY=",
        300,
        welcomeTitle1,
        "white",
        "system-ui",
        27,
        200,
        "black",
        .9,
        .9,
        ctx,
        true);
    
    const man = new textBox(manStyle)
    const antagonist = new textBox(antagonistStlye);
    const narrator = new textBox(narratorStyle) 

    const sm = new stageMaster(canvas, [narrator, man, antagonist, narrator], stopAllWrite);

    window.onclick = function()
    {
        sm.nextSlide()
    }

    window.onkeypress = function (e)
    {
        if (e.key == ' ' || e.key == '\n') 
        {
            sm.nextSlide();
        }
    }
}
