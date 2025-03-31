import { textBox, VisualTextBoxStyle } from "../visual/textbox.js";

export class Loader {

    static async loadImages(link_to_data) {
        let expo = {};
        let promises = [];

        try {
            const response = await fetch(link_to_data);
            const jsonData = await response.json();

            if (Array.isArray(jsonData.links)) {
                jsonData.links.forEach(linkObject => {
                    const imageName = linkObject.name;
                    const imageUrl = linkObject.link;
                    const img = new Image();

                    const promise = new Promise((resolve, reject) => {
                        img.onload = () => {
                            expo[imageName] = img;
                            resolve();
                        };
                        img.onerror = (error) => {
                            console.error(`Error loading image: ${imageUrl}`, error);
                            reject(error);
                        };
                        img.src = imageUrl;
                    });

                    promises.push(promise);
                });
            } else {
                console.error("Error: JSON data doesn't contain links!");
            }

            await Promise.all(promises);
            return expo;

        } catch (error) {
            console.error("Error fetching or processing JSON: ", error);
        }
    }

    static async loadText(link_to_data, actor_name) {
        let expo = [];

        try {
            const response = await fetch(link_to_data);
            const jsonData = await response.json();

            if (Array.isArray(jsonData.texts)) {
                jsonData.texts.forEach(textObject => {
                    const name = textObject.actor_name;

                    if (name == actor_name) 
                    {
                        if (Array.isArray(textObject.text)) 
                        {
                            textObject.text.forEach(element => {
                                expo.push(element);
                            });
                        }else
                        {
                            expo.push(textObject.text);
                        }
                    }
                });
            } else {
                console.error("Error: JSON data doesn't contain actor lines!");
            }

            return expo;

        } catch (error) {
            console.error("Error fetching or processing JSON: ", error);
        }
    }

    static async loadStoryJSON(link_to_data) 
    {
        try
        {
            const response = await fetch(link_to_data);
            const json = await response.json();

            return json;

        } catch (error) {
            console.error("Error fetching or processing JSON: ", error);
        }
    }

    static async loadBackgrounds(link_to_data, images) 
    {
        let expo = {};
        try
        {
            const response = await fetch(link_to_data);
            const json = await response.json();


            if (Array.isArray(json.backgrounds)) {
                json.backgrounds.forEach(bgObject => {
                    const name = bgObject.name;
                    const type = bgObject.type;
                    const value = bgObject.value;

                    let action;
        
                    if (type === "color") {
                        action = (canvas) => {
                            const ctx = canvas.getContext("2d");
                            ctx.fillStyle = value;
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                        };
        
                    } else if (type === "image") {
                        action = (canvas) => {
                            const ctx = canvas.getContext("2d");
                            ctx.drawImage(images[value], 0, 0, canvas.width, canvas.height);
                        };
                    }
                    
                    expo[name] = action;
                });
            } else {
                console.error("Error: Malformed background JSON!");
            }
        } catch (error) {
            console.error("Error fetching or processing JSON: ", error);
        }

        return expo;
    }

    static async loadActor(link_to_data, images, canvas) 
    {
        let expo = {};
        try
        {
            const response = await fetch(link_to_data);
            const json = await response.json();

            if (Array.isArray(json.actors)) {
                json.actors.forEach(actorObject => {
                    const ctx = canvas.getContext("2d");
                    
                    const vtbs = new VisualTextBoxStyle
                    (
                        actorObject.left,
                        actorObject.top,
                        actorObject.width,
                        actorObject.height,
                        canvas.width,
                        canvas.height,
                        actorObject.title,
                        images[actorObject.image],
                        actorObject.image_size,
                        actorObject.text_color,
                        actorObject.font,
                        actorObject.font_size,
                        actorObject.delay,
                        actorObject.background_gradient_color,
                        actorObject.background_gradient_ratio,
                        actorObject.title_card_gradient_ratio,
                        ctx,
                        actorObject.headless
                    );
                    const textbox = new textBox(vtbs);
                    expo[actorObject.name] = textbox;
                });
            }
            else
            {
                console.error("Error: Malformed Actors JSON!");
            }
        } catch (error)
        {
            console.error("Error fetching or processing JSON: ", error);
        }
        return expo;
    }
}