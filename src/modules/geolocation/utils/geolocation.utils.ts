import axios from "axios";

// Geolocation
export async function getOneGeolocationByQuery(query: string) {
    try {
        const myApiKey = process.env.OPEN_CAGE_API_KEY;
        const { data } = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${myApiKey}`
        );
        console.log(" OC data");
        console.log(data);
        if (data.results.length > 0) {
            const info = {
                latitude: data.results[0].geometry.lat,
                longitude: data.results[0].geometry.lng,
                formatted: data.results[0].formatted,
                data: data.results[0],
            };
            return info;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}


export async function getAllGeolocationsByQuery(query: string) {
    try {
        const myApiKey = process.env.OPEN_CAGE_API_KEY;
        const { data } = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${myApiKey}`
        );
        console.log(" OC data");
        console.log(data);
        if (data.results.length > 0) {
            return data.results;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}