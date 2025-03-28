export class stageMaster
{
    constructor(canvas, objects, handleTextBoxShowStop) {
        this.objects = [];

        objects.forEach(object => {
            this.objects.push(object)
        });
        
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.currentIndex = 0;
        this.handleTextBoxShowStop = handleTextBoxShowStop;
    }
    
    addObject(obj) {
        this.objects.push(obj);
    }

    slidePresent() 
    {
        this.handleTextBoxShowStop();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects[this.currentIndex]();
    }

    nextSlide() 
    {
        if (this.currentIndex < this.objects.length) { this.slidePresent(); this.currentIndex++;}
    }

    startShow() 
    {
        this.currentIndex = 0;
        this.slidePresent();
    }
}