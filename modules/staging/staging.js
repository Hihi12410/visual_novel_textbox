import { Loader } from "./loader.js";
import { stopAllWrite } from '../visual/textbox.js';
import { applyEase } from "../visual/easing.js";

function onWindowResize(canvas) {
    const scale = window.devicePixelRatio;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width * scale;
    canvas.height = height * scale;   
}

export class stageMaster
{
    constructor(canvas, story_link) {

        this.story = null; 
        this.story_link = story_link;

        this.images = null;
        this.bgs = null;
        this.actors = null;

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        onWindowResize(this.canvas);

        this.currentIndex = 0;

        this.storypointer = 0;
        this.story_length = 0;


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

    }

    progressHook() 
    {
        if (this.storypointer < this.story.story.length-1) 
        {
            this.storypointer++;
            this.storyPresent();
        }else
        {
            this.storypointer = 0;
        }
    }

    async storyPresent() 
    {
        stopAllWrite();
        console.log(this.images);
        await applyEase.simpleEase(this.ctx, this.images[0],100, 10, 10);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const act = this.story.story[this.storypointer];
        
        this.bgs[act.bg](this.canvas);
        this.actors[act.actor].setText(act.text);
        
        this.actors[act.actor].show();
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
        onWindowResize(this.canvas);
    }   
}