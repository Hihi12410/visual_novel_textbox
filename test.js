import { VisualTextBoxStyle, textBox, stopAllWrite, drawBg } from './textbox.js';
import { stageMaster } from './staging.js'
import { Loader } from './loader.js';

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

    
window.onload = async function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const images = await Loader.loadImages("./data.json");
    
    window.onresize += onWindowResize(canvas);
    onWindowResize(canvas);
    
    const manStyle = new VisualTextBoxStyle(0, 0.8, 1, 0.2, xSize, ySize, "Title", images["manImage"], 100, "Hi", "white", "system-ui", 20, 50, "white", .1, .1, ctx, false);
    
    const man = new textBox(manStyle);
    const antagonist = new textBox(manStyle);
    const narrator = new textBox(manStyle);

    const sm = new stageMaster(canvas, [], stopAllWrite);

    window.onresize += sm.windowResizeHook;
    sm.addObject(() => {narrator.setText(welcomeTitle1); canvas.style.backgroundColor="white"; narrator.show()});
    sm.addObject(async () => 
        {
            drawBg(images["manImage"], ctx, xSize, ySize);
            man.setText(characterText1);
            man.show();
        });
    sm.addObject(async () => 
        {
            drawBg(images["arab"], ctx, xSize, ySize);
            man.setText(characterText2);
            man.show()
        });
    sm.addObject(async () => {
        drawBg(images["manImage"], ctx, xSize, ySize);;
        antagonist.show();
    });
    
    sm.addObject(() => {man.setText(ohno1); canvas.style.backgroundColor="black"; man.show()});
    sm.addObject(() => {man.setText(ohno2); man.show()});
    sm.addObject(async() => 
    {
        drawBg(images["arab"], ctx, xSize, ySize);
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
