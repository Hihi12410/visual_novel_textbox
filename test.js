import { VisualTextBoxStyle, textBox, stopAllWrite, loadBackground } from './textbox.js';
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


const welcomeTitle1 = "Egyszer volt, hol nem volt..."
const characterText1 = "Be szép ez a nap! Ma semmi rossz nem történhet..."
const characterText2 = "Ó jaj! Te meg ki vagy?"
const evilText = "Az adóhivatalból Jöttünk. Jelenleg egy gazillió forinttal tartozik a magyar államnak!"
const ohno1 = "Jaj ne! Csak az adóhivatalt ne!"
const ohno2 = "Ez a vég."

window.onload = function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");;
    
    window.onresize = () => onWindowResize(canvas);
    onWindowResize(canvas);
    
    const manStyle = new VisualTextBoxStyle(
        0,
        ySize-300,
        xSize, 300,
        "József",
        "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-in-shirt-smiles-and-gives-thumbs-up-to-show-approval-png-image_13146336.png",
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
        "Zsaru",
        "https://sapoa.org/wp-content/uploads/2022/06/officers-resized.png",
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
        (ySize / 2) -300/2,
        xSize, 300,
        "Narrator",
        "",
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

    const sm = new stageMaster(canvas, [], stopAllWrite);
    sm.addObject(() => {narrator.setText(welcomeTitle1); canvas.style.backgroundColor="white"; narrator.show()});
    sm.addObject(async () => 
        {
            await loadBackground("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaAP8BGC69CSOWBrsLbFsgRE1grNHc0L-Yg&s", ctx, xSize, ySize);
            man.setText(characterText1);
            man.show();
        });
    sm.addObject(async () => 
        {
            await loadBackground("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaAP8BGC69CSOWBrsLbFsgRE1grNHc0L-Yg&s", ctx, xSize, ySize);
            man.setText(characterText2);
            man.show()
        });
    sm.addObject(async () => {
        await loadBackground("https://www.ujbuda.hu/sites/default/files/attachments/pictures/ujbudahu/2018_01/nav_mti.jpg", ctx, xSize, ySize);
        antagonist.show();
    });
    
    sm.addObject(() => {man.setText(ohno1); canvas.style.backgroundColor="black"; man.show()});
    sm.addObject(() => {man.setText(ohno2); man.show()});
    sm.addObject(async() => 
    {
        await loadBackground("https://news.mit.edu/sites/default/files/images/202409/MIT-PrisonHeat-01.jpg", ctx, xSize, ySize);
        man.setText("[Vége.]"); man.show()
    });


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
