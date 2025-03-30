import { stopAllWrite} from '../visual/textbox.js';
import { stageMaster } from '../staging/staging.js'

function onWindowResize(canvas) {
    const scale = window.devicePixelRatio;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width * scale;
    canvas.height = height * scale;
    
}
    
window.onload = async function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    window.onresize += onWindowResize(canvas);
    onWindowResize(canvas);
    
    const sm = new stageMaster(canvas, "./data/story.json", stopAllWrite);
    await sm.init();

    window.onresize += sm.windowResizeHook;
    sm.startShow();

    window.onclick = function()
    {
        sm.progressHook()
    }

    window.onkeypress = function (e)
    {
        if (e.key == ' ' || e.key == '\n') 
        {
            sm.progressHook();
        }
    }
}
