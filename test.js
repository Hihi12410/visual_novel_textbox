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

    class textBox {
        constructor(x, y, w, h, title, image, imageSize,text, textcolor, font, fontsize, duration, backgroundGradientColor, backgroundGradientRatio, titleCardGradientRatio, ctx) {
            this.w = w;
            this.h = h;
            this.x = x;
            this.y = y;
            
            this.text = text;
            this.textcolor = textcolor;
            this.duration = duration;
            
            this.backgroundGradientColor = backgroundGradientColor;
            this.backgroundGradientRatio = backgroundGradientRatio;
            this.titleCardGradientRatio = titleCardGradientRatio;
            
            this.font = font;
            this.fontsize = fontsize;
            
            this.ctx = ctx;
            this.ctx.font = `${this.fontsize}px ${this.font}`;            

            this.backgroundGradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.h);
            this.backgroundGradient.addColorStop(0, this.backgroundGradientColor);
            this.backgroundGradient.addColorStop(this.backgroundGradientRatio, "rgba(0, 0, 0, 0.5)");
            this.backgroundGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

            this.titleCardGradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y - this.h);
            this.titleCardGradient.addColorStop(0, this.backgroundGradientColor);
            this.titleCardGradient.addColorStop(this.titleCardGradientRatio, "rgba(0, 0, 0, 0.5)");
            this.titleCardGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

            this.title = title;

            this.imageSize = imageSize;
            this.image = new Image();
            this.image.src = image;
            this.loaded = false;

            this.image.onload = () => {
                this.loaded = true;
                this.show();
            };
        }

        wrapText() {
            let words = this.text.split(" ");
            let lines = [];
            let currentLine = words[0];

            for (let i = 1; i < words.length; ++i) {
                let testLine = currentLine + " " + words[i];
                let width = this.ctx.measureText(testLine).width;
                if (width > this.w) {
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
            const imageAspectRatio = this.image.width / this.image.height;
            let imageWidth = this.imageSize;
            let imageHeight = imageWidth / imageAspectRatio;

            if (imageHeight > this.h) {
                imageHeight = this.h;
                imageWidth = imageHeight * imageAspectRatio;
            }

            const imageX = this.x;
            const imageY = this.y - this.imageSize;

            this.ctx.fillStyle = this.titleCardGradient;
            this.ctx.fillRect(imageX, imageY, this.imageSize, this.imageSize);

            this.ctx.drawImage(this.image, imageX, imageY, this.imageSize, this.imageSize);

            this.ctx.fillStyle = this.textcolor;
            this.ctx.fillText(this.title, imageX, imageY+this.imageSize);
        }

        renderBackground() 
        {
            this.ctx.fillStyle = this.backgroundGradient;
            this.ctx.fillRect(this.x, this.y, this.w, this.h);
        }

        renderText_allAtOnce() 
        {
            this.ctx.fillStyle = this.textcolor;
            let lines = this.wrapText();
            let lineHeight = this.fontsize * 1;
            let startY = this.y + (this.h - lines.length * lineHeight) / 2 + this.fontsize;

            for (let i = 0; i < lines.length; i++) {
                let textWidth = this.ctx.measureText(lines[i]).width;
                let textX = this.x + (this.w - textWidth) / 2;
                this.ctx.fillText(lines[i], textX, startY + i * lineHeight);
            }
        }

        show() {
            //Wait for the image to be loaded
            if (!this.loaded) {
                //setTimeout(() => this.show(), 10);
                return;
            }

            this.ctx.font = `${this.fontsize}px ${this.font}`;
            this.renderBackground();
            this.renderTitleCard();
            this.renderText_allAtOnce();
        }
    }

    const testText = "I quite fancy this textbox. It looks clean and nice! It also handles overflow, and that is always nice. I really do like javascript! To make the text overflow, we either have to write more text, or make the fontsize bigger. It also enables us to make fancy gradients, just like those visual-novel games!"; 

    function mainLoop(textBox, ctx) {
        requestAnimationFrame(() => mainLoop(textBox, ctx));
        
        ctx.clearRect(0, 0, xSize, ySize);
        
        textBox.show();
    }


    window.onload = function () {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        window.onresize = () => onWindowResize(canvas);
        onWindowResize(canvas);

        const text = new textBox(0, ySize-300, xSize, 300, "Hihi12410", "https://www.touhou-newworld.com/images/character-reimu_sp.webp",300, testText, "white", "system-ui", 30, 1, "blue", .9, .9, ctx);
        mainLoop(text, ctx);
    };
