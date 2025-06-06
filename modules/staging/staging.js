import { Loader } from "./loader.js";
import { stopAllWrite } from '../visual/textbox.js';
import { applyEase, stopAllEase } from "../visual/easing.js";

function onWindowResize(canvas, bgCanvas) {
    const scale = window.devicePixelRatio;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width * scale;
    canvas.height = height * scale;   
    bgCanvas.width = width * scale;
    bgCanvas.height = height * scale;
    
}

export class stageMaster
{
    constructor(canvas,bgCanvas, story_link) {

        this.story = null; 
        this.story_link = story_link;

        this.images = null;
        this.bgs = null;
        this.actors = null;

        this.canvas = canvas;
        this.bgCanvas = bgCanvas;
        this.bgCanvCtx = this.bgCanvas.getContext("2d");
        this.ctx = canvas.getContext("2d");

        onWindowResize(this.canvas, this.bgCanvas);

        this.currentIndex = 0;

        this.storypointer = 0;
        this.story_length = 0;

        this.loaded = false;
    }
    
    async init() 
    {
        this.story = await Loader.loadStoryJSON(this.story_link);
        
        try
        {
            this.images = await Loader.loadImages(this.story.res.images);
            this.bgs = await Loader.loadBackgrounds(this.story.res.bgs, this.images, this.canvas);
            this.actors = await Loader.loadActor(this.story.res.actors, this.images, this.canvas);
            this.story_length = this.story.story.length;

        } catch (e) 
        {
            console.log("Error initializing stage manager! : " + e);
        }

        this.loaded = true;
    }

    progressHook() 
    {
        if (!this.loaded) return;
        if (this.storypointer < this.story.story.length-1) 
        {
            this.storypointer++;
            this.storyPresent();
        }else
        {
            this.storypointer = 0;
            this.storyPresent();
        }
    }

    async storyPresent() 
    {
        stopAllWrite();
        stopAllEase();
        
        const act = this.story.story[this.storypointer];

        if(act.ease) 
        {
            if (act.ease_name == "simple") 
            {
                if (act.ease_reversed) 
                    {
                        applyEase.simpleEase_reversed(this.ctx, this.bgCanvCtx, act.ease_resolution);
                    }
                    else
                    {
                        applyEase.simpleEase(this.ctx, this.bgCanvCtx, act.ease_resolution);
                    }
            }

            if (act.ease_name == "cubic") 
                {
                    if (act.ease_reversed) 
                        {
                            applyEase.circleEase(this.ctx, this.bgCanvCtx, act.ease_resolution);
                        }
                        else
                        {
                            applyEase.cubicEase(this.ctx, this.bgCanvCtx, act.ease_resolution);
                        }
                }
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.bgs[act.bg](this.canvas);
        
        this.actors[act.actor].setText(act.text);
        
        this.actors[act.actor].show(act.delay);
    }

    startShow() 
    {
        this.storypointer = 0;
        this.storyPresent();
    }

    windowResizeHook()
    {
        this.actors.forEach(actor => {
            actor.onWindowResize();
        });
        onWindowResize(this.canvas, this.bgCanvas);
    }   
}