export class applyEase 
{

    static async __make_ease_bg_buff(img)
    {
        document.body.innerHTML += 
        `
            <canvas id="tempBuffer"></canvas>
        `;
        const buffer = document.getElementById("tempBuffer");
        await buffer.getContext("2d").drawImage(img,0,0);
        return buffer;
    }
    
    static async simpleEase(ctx, next_img, res, time, overlap) 
    {
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;

        const stepY = h / res;

        const promises = [];
        const buff = await this.__make_ease_bg_buff(ctx.canvas);

        for (let i = 0; i <= res; ++i) 
        {
            promises.push(new Promise((resolve, reject)=>
            {
                setTimeout(this.__simple_ease, i * time - overlap, ctx, 0, i * stepY, w, stepY, resolve, reject);
            }));
        }
        await Promise.all(promises);
    }

    static __simple_ease(ctx, x, y, w, h, resolve ) 
    {
        ctx.clearRect(x,y,w+1,h+1);
        resolve();
    }
}