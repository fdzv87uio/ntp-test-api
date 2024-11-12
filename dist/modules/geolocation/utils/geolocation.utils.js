"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneGeolocationByQuery = getOneGeolocationByQuery;
exports.getAllGeolocationsByQuery = getAllGeolocationsByQuery;
const axios_1 = require("axios");
async function getOneGeolocationByQuery(query) {
    try {
        const myApiKey = process.env.OPEN_CAGE_API_KEY;
        const { data } = await axios_1.default.get(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${myApiKey}`);
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
    }
    catch (error) {
        console.log(error);
    }
}
async function getAllGeolocationsByQuery(query) {
    try {
        const myApiKey = process.env.OPEN_CAGE_API_KEY;
        const { data } = await axios_1.default.get(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${myApiKey}`);
        console.log(" OC data");
        console.log(data);
        if (data.results.length > 0) {
            return data.results;
        }
        return null;
    }
    catch (error) {
        console.log(error);
    }
}
//# sourceMappingURL=geolocation.utils.js.map