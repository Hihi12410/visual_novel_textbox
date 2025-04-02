
import { stageMaster } from '../staging/staging.js'

window.onload = async function () {
    const canvas = document.getElementById("canvas");
    const bgCanv = document.getElementById("bgBuffer");

    const sm = new stageMaster(canvas, bgCanv,"./data/story.json");
    await sm.init();

    window.onresize += sm.windowResizeHook;
    sm.startShow();

    //window.onclick = sm.progressHook;
    window.onclick = () => {sm.progressHook();};
    window.onkeydown = (e) => {if(e.key == ' ' || e.key == 'Enter') {sm.progressHook();}}


}
