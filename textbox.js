var writeOrder = 0;

export function stopAllWrite() 
{
    writeOrder++;
    if (writeOrder > 10000000) writeOrder = 0;
}

export class VisualTextBoxStyle 
{
    constructor(x, y, w, h, title, image, imageSize, text, textcolor, font, fontsize, duration, backgroundGradientColor, backgroundGradientRatio, titleCardGradientRatio, ctx)
    {
        this.ctx = ctx;
        
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        this.title = title;
        this.image = new Image();
        this.image.src = image;
        this.imageSize = imageSize;
        
        this.text = text;
        this.textcolor = textcolor;
        this.font = font;
        this.fontsize = fontsize;
        this.duration = duration;
        
        this.backgroundGradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.h);
        this.backgroundGradient.addColorStop(0, backgroundGradientColor);
        this.backgroundGradient.addColorStop(backgroundGradientRatio, "rgba(0, 0, 0, 0.5)");
        this.backgroundGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        this.titleCardGradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y - this.h);
        this.titleCardGradient.addColorStop(0, backgroundGradientColor);
        this.titleCardGradient.addColorStop(titleCardGradientRatio, "rgba(0, 0, 0, 0.5)");
        this.titleCardGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        this.writeOrder = writeOrder;
    }
}

export class textBox {
    constructor(vtbs) {
        //Loading images and files
        this.loaded = false;
        this.vtbs = vtbs;    
        this.vtbs.image.onload = () => {
            this.loaded = true;
        };
    }
        
    wrapText() {
        let words = this.vtbs.text.split(" ");
        let lines = [];
        let currentLine = words[0];
        
        for (let i = 1; i < words.length; ++i) {
            let testLine = currentLine + " " + words[i];
            let width = this.vtbs.ctx.measureText(testLine).width;
            if (width > this.vtbs.w) {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    //Making the overflowing text wrap
    wrapText_monospaced() {
        
        let words = this.vtbs.text.split(" ");
        let lines = [];
        let currentLine = words[0];
        
        for (let i = 1; i < words.length; ++i) {
            let testLine = currentLine + " " + words[i];
            let width = this.vtbs.fontsize * testLine.length;
            if (width > this.vtbs.w) {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        return lines;
    }
    
    renderTitleCard() 
    {
        const imageAspectRatio = this.vtbs.image.width / this.vtbs.image.height;
        let imageWidth = this.vtbs.imageSize;
        let imageHeight = imageWidth / imageAspectRatio;
        
        if (imageHeight > this.vtbs.h) {
            imageHeight = this.vtbs.h;
            imageWidth = imageHeight * imageAspectRatio;
        }
        
        const imageX = this.vtbs.x;
        const imageY = this.vtbs.y - this.vtbs.imageSize;
        
        this.vtbs.ctx.fillStyle = this.vtbs.titleCardGradient;
        this.vtbs.ctx.fillRect(imageX, imageY, this.vtbs.imageSize, this.vtbs.imageSize);
        
        this.vtbs.ctx.drawImage(this.vtbs.image, imageX, imageY, this.vtbs.imageSize, this.vtbs.imageSize);
        
        this.vtbs.ctx.fillStyle = this.vtbs.textcolor;
        this.vtbs.ctx.fillText(this.vtbs.title, imageX, imageY+this.vtbs.imageSize);
    }
    
    renderBackground() 
    {
        this.vtbs.ctx.fillStyle = this.vtbs.backgroundGradient;
        this.vtbs.ctx.fillRect(this.vtbs.x, this.vtbs.y, this.vtbs.w, this.vtbs.h);
    }
    
    renderText_allAtOnce() 
    {
        this.vtbs.ctx.fillStyle = this.vtbs.textcolor;
        let lines = this.wrapText();
        let lineHeight = this.vtbs.fontsize * 1;
        let startY = this.vtbs.y + (this.vtbs.h - lines.length * lineHeight) / 2 + this.vtbs.fontsize;
        
        for (let i = 0; i < lines.length; i++) {
            let textWidth = this.vtbs.ctx.measureText(lines[i]).width;
            let textX = this.vtbs.x + (this.vtbs.w - textWidth) / 2;
            this.vtbs.ctx.fillText(lines[i], textX, startY + i * lineHeight);
        }
    }
    
    renderText_typeWriter() 
    {
        this.vtbs.ctx.fillStyle = this.vtbs.textcolor;
        
        let lines = this.wrapText_monospaced();
        var lineHeight = this.vtbs.fontsize * 1;
        var startY = this.vtbs.y + (this.vtbs.h - lines.length * lineHeight) / 2 + this.vtbs.fontsize;
        
        var i = 0;
        var j = 0;
    
        var curr = writeOrder

        function write(vtbs)
        {   
            if(curr == writeOrder){
                const charSize = vtbs.fontsize;
                const textX = vtbs.x + (vtbs.w - charSize) / 2;
                vtbs.ctx.fillText(lines[i][j], vtbs.fontsize*j, startY + i * lineHeight);
                
                if (i < lines.length) 
                    {
                    
                    if (++j < lines[i].length && curr == writeOrder) 
                        {
                        setTimeout(()=>{write(vtbs);}, vtbs.delay);
                    }else
                    {
                        i++; j = 0;
                        if (i < lines.length && curr == writeOrder) 
                            {
                            setTimeout(()=>{write(vtbs);}, vtbs.delay);
                        }
                    }
                }
        
            }
        }
        write(this.vtbs);
    }

    setText(text)
    {
        this.vtbs.text = text;
    }
    
    show() {
        if (!this.loaded) {
            setTimeout(this.show(), 500);
            return;
        }

        this.vtbs.ctx.font = `${this.vtbs.fontsize}px ${this.vtbs.font}`;
        //this.renderBackground();
        his.renderTitleCard();
        this.renderText_typeWriter();
    }
}
