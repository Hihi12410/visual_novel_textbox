var easeIndex = 0;

export function stopAllEase() 
{
    if (easeIndex < 100000000) 
    {
        easeIndex++;

    }else 
    {
        easeIndex = 0;
    }
}

export class applyEase {
    static async simpleEase(ctx, bgCtx, res) {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        const stepY = h / res;

        bgCtx.drawImage(ctx.canvas, 0, 0);
        
        let currentFrame = res;
        let currEaseIndex = easeIndex;

        const animate = () => {
            if (currentFrame >= 0) {
                if (currEaseIndex != easeIndex) return;
                this.__simple_ease(bgCtx, 0, stepY * currentFrame, w, stepY + 2);

                currentFrame--;
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    static async simpleEase_reversed(ctx, bgCtx, res) {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        const stepY = h / res;

        bgCtx.drawImage(ctx.canvas, 0, 0);
        
        let currentFrame = 0;
        let currEaseIndex = easeIndex;

        const animate = () => {
            if (currentFrame <= res) {
                if (currEaseIndex != easeIndex) return;
                this.__simple_ease(bgCtx, 0, stepY * currentFrame, w, stepY + 2);

                currentFrame++;
                requestAnimationFrame(animate);
            }
        };

        animate();
    }
    static __simple_ease(ctx, x, y, w, h) {
        ctx.clearRect(x, y, w, h);
    }


    static async cubicEase(ctx, bgCtx, res) 
    {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        const stepX = (1/2 * w)/res;
        const stepY = (1/2 * h)/res;

        bgCtx.drawImage(ctx.canvas, 0, 0);
        
        let currentFrame = 0;
        let currEaseIndex = easeIndex;

        const animate = () => {
            if (currentFrame <= res) {
                if (currEaseIndex != easeIndex) return;
                this.__cubic_ease(bgCtx, 0, 0,  currentFrame * stepX * 2  , currentFrame * stepY * 2 );

                currentFrame++;
                requestAnimationFrame(animate);
            }
        };
        animate();
    }

    static async cubicEase_reversed(ctx, bgCtx, res) 
    {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        const stepX = (1/2 * w)/res;
        const stepY = (1/2 * h)/res;

        bgCtx.drawImage(ctx.canvas, 0, 0);
        
        let currentFrame = 0;
        let currEaseIndex = easeIndex;

        const animate = () => {
            if (currentFrame <= res) {
                if (currEaseIndex != easeIndex) return;
                this.__cubic_ease(bgCtx, w, h, - currentFrame * stepX * 2  , - currentFrame * stepY * 2 );

                currentFrame++;
                requestAnimationFrame(animate);
            }
        };
        animate();
    }

    static __cubic_ease(ctx, x, y, w, h) 
    {
        ctx.clearRect(x,y, w,h);
    }

    static async circleEase(ctx, bgCtx, res) 
    {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        const r = (w > h) ? w : h;
        const step = r / res;

        bgCtx.drawImage(ctx.canvas, 0, 0);
        
        let currentFrame = 0;
        let currEaseIndex = easeIndex;

        const animate = () => {
            if (currentFrame <= res) {
                if (currEaseIndex != easeIndex) return;
                this.__circular_ease(bgCtx, w/2, h/2, w, h, currentFrame * step);
                currentFrame++;
                requestAnimationFrame(animate);
            }
        };
        animate();
    }

    static __circular_ease(ctx, x, y, w, h, r) 
    {
        ctx.save();
        
        ctx.beginPath();
        ctx.arc(x,y,r, 0, Math.PI * 2, false);
        ctx.clip();

        ctx.clearRect(0,0, w, h);
        ctx.restore();
    }
}
