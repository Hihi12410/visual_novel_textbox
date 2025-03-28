import { VisualTextBoxStyle, textBox, stopAllWrite } from './textbox.js';

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


const testText = "I quite fancy this textbox. It looks clean and nice! It also handles overflow, and that is always nice. I really do like javascript! To make the text overflow, we either have to write more text, or make the fontsize bigger. It also enables us to make fancy gradients, just like those visual-novel games!"; 
const testText2 = "Muhahaha! I am the evil textbox. I am nothing else, but evil. You surely are scared. I am the spawn of all evil. I eat babies for breakfast. You don't wan't to mess with me, I am sure of that. Muhahahahaha!"



window.onload = function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    window.onresize = () => onWindowResize(canvas);
    onWindowResize(canvas);
    
    const vtbs = new VisualTextBoxStyle(0, ySize-300, xSize, 300, "Hihi12410", "./images/touhou.webp",300, testText, "white", "system-ui", 27, 200, "blue", .9, .9, ctx);
    const vtbs2 = new VisualTextBoxStyle(0, ySize-300, xSize, 300, "Evil Hihi12410", "./images/duranda.jpeg",300, testText2, "white", "system-ui", 27, 200, "red", .9, .9, ctx);
    const text = new textBox(vtbs);
    const evilText = new textBox(vtbs2);

    let a = 0;
    function switchtb() 
    {
        if (a == 0) 
        {
            a = 1;
            stopAllWrite();
            ctx.clearRect(0,0,xSize, ySize);
            text.show();
        }
        else
        {
            a = 0;
            stopAllWrite();
            ctx.clearRect(0,0,xSize, ySize);
            evilText.show();
        }
    }

    window.onclick = function()
    {
        switchtb();
    }

    window.onkeypress = function (e)
    {
        if (e.key == ' ' || e.key == '\n') 
        {
            switchtb();
        }
    }
    //window.ontouchstart = function(e) 
    //{
        //switchtb();
    //}
};
