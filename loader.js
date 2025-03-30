export class Loader {

    static async loadImages(link_to_data) {
        const expo = {};
        const promises = [];

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
}
