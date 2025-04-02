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
        console.log(currEaseIndex);

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
    static __simple_ease(ctx, x, y, w, h) {
        ctx.clearRect(x, y, w, h);
    }
}
