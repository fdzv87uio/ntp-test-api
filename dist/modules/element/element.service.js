"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementService = void 0;
const common_1 = require("@nestjs/common");
const element_schema_1 = require("./schemas/element.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const selenium_webdriver_1 = require("selenium-webdriver");
const elementUtils_1 = require("./utils/elementUtils");
const axios_1 = require("axios");
let ElementService = class ElementService {
    async findAllElements() {
        const elements = await this.elementModel.find();
        return elements;
    }
    async findAllElementsByQuery(query) {
        const date = new Date();
        const options = { weekday: 'long' };
        const dayName = new Intl.DateTimeFormat('es-ES', options).format(date);
        console.log(dayName);
        if (query.query === "all") {
            const elements = await this.elementModel.aggregate([
                {
                    $match: {
                        $and: [
                            { category: { $regex: query.category, $options: 'i' } },
                            { city: { $regex: query.city, $options: 'i' } },
                            { country: { $regex: query.country, $options: 'i' } },
                            { status: 'active' },
                            {
                                $or: [
                                    { deadline: { $lt: date.toISOString() } },
                                    { deadline: "none" },
                                ]
                            },
                        ]
                    }
                },
                {
                    $addFields: {
                        isToday: {
                            $in: [dayName, "$schedule"]
                        }
                    }
                },
                {
                    $sort: {
                        isToday: -1,
                        createdAt: -1
                    }
                },
                {
                    $project: {
                        isToday: 0
                    }
                }
            ]);
            return elements;
        }
        else if (query.query !== "all") {
            const formattedQuery = query.query.replace("-", " ");
            console.log('formated query:');
            console.log(formattedQuery);
            const elements = await this.elementModel.aggregate([
                {
                    $match: {
                        $and: [
                            { category: { $regex: query.category, $options: 'i' } },
                            { city: { $regex: query.city, $options: 'i' } },
                            { country: { $regex: query.country, $options: 'i' } },
                            { status: 'active' },
                            { description: { $regex: formattedQuery, $options: 'i' } },
                            {
                                $or: [
                                    { title: { $regex: formattedQuery, $options: 'i' } },
                                    { authorName: { $regex: formattedQuery, $options: 'i' } },
                                    { deadline: { $lt: date.toISOString() } },
                                    { deadline: "none" },
                                ]
                            },
                        ]
                    }
                },
                {
                    $addFields: {
                        isToday: {
                            $in: [dayName, "$schedule"]
                        }
                    }
                },
                {
                    $sort: {
                        isToday: -1,
                        createdAt: -1
                    }
                },
                {
                    $project: {
                        isToday: 0
                    }
                }
            ]);
            return elements;
        }
    }
    async findAllAvailableElementsByUserEmail(userEmail) {
        const elements = await this.elementModel.find({ participants: userEmail });
        return elements;
    }
    async findAllAvailableElementsByUserId(id) {
        const elements = await this.elementModel.find({ userId: id });
        return elements;
    }
    async createElement(element) {
        try {
            const existingElement = await this.elementModel.findOne({ title: element.title });
            if (existingElement) {
                throw new common_1.UnauthorizedException("Element Title Already Exists");
            }
            else {
                const initialTitleArr = element.title.toLowerCase().split(" ");
                const titleArray = initialTitleArr.length > 1 ? initialTitleArr : [initialTitleArr[0], "element"];
                const formattedTítuloArray = [];
                titleArray.forEach((x) => {
                    const currentString = x.replaceAll("á", "a").replaceAll("é", "e").replaceAll("í", "i").replaceAll("ó", "o").replaceAll("ú", "u").replaceAll("ñ", "n").replaceAll("ñ", "n");
                    const encoded = encodeURIComponent(currentString);
                    const formatted = encoded.replace(/%[0-9A-F]{2}/ig, '').trim();
                    formattedTítuloArray.push(formatted);
                });
                let newSlug = formattedTítuloArray.join("-");
                const cityFormatted = element.city ? element.city.toLowerCase() : "";
                newSlug = newSlug + "-" + cityFormatted;
                console.log("new slug:");
                console.log(newSlug);
                element.slug = newSlug;
                const res = await this.elementModel.create(element);
                return res;
            }
        }
        catch (err) {
            console.log("error creating element " + err);
            throw new common_1.NotFoundException(`Error creating element: ${err.message}`);
        }
    }
    async createElementFromPrepagos(page) {
        try {
            const driver = await new selenium_webdriver_1.Builder().forBrowser("chrome").build();
            const newItem = await this.scrapePrepagos(driver, page);
            console.log(newItem);
            const result = await this.createElement(newItem);
            return result;
        }
        catch (err) {
            console.log("error creating element " + err);
            throw new common_1.NotFoundException(`Error creating element: ${err.message}`);
        }
    }
    async findElementById(id) {
        const res = await this.elementModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('Element Not Found');
        }
        return res;
    }
    async findElementBySlug(slug) {
        const res = await this.elementModel.findOne({ slug: slug });
        if (!res) {
            throw new common_1.NotFoundException('Element Not Found');
        }
        return res;
    }
    async updateElementById(id, element) {
        console.log('updates:');
        console.log(element);
        const res = await this.elementModel.findByIdAndUpdate(id, { $set: element }, { new: true, runValidators: true }).exec();
        if (!res) {
            throw new common_1.NotFoundException('Element Not Found');
        }
        return res;
    }
    async deleteElementById(id) {
        const res = await this.elementModel.findByIdAndDelete(id);
        console.log(res);
        return res;
    }
    async scrapePrepagos(driver, page) {
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        const waitInterval = 20000;
        const url = `${page}`;
        try {
            await driver.get(url);
            await driver.manage().window().setRect({ width: 1366, height: 720 });
            await driver.manage().setTimeouts({ implicit: waitInterval });
            const adDescription = await driver.findElement(selenium_webdriver_1.By.xpath("/html/body/div[1]/div[2]/div[5]/div/div")).getText();
            const modelName = await driver.findElement(selenium_webdriver_1.By.xpath("/html/body/div[1]/div[2]/div[1]/div[1]/h1/span[1]")).getText();
            const newTitle = modelName + ', ' + adDescription.slice(0, 50) + "...";
            const modelCity = await driver.findElement(selenium_webdriver_1.By.xpath("/html/body/div[1]/div[2]/div[1]/div[2]/span")).getText();
            const modelCityArr = modelCity.split(',');
            const modelAddress = modelCityArr[0].trim();
            const modelCityName = modelCityArr[1].trim();
            const image1 = await driver
                .findElement(selenium_webdriver_1.By.xpath("/html/body/div[1]/div[2]/div[3]/img"))
                .getAttribute("src");
            const imageBuffer1 = await this.fetchImageFromUrl(image1);
            const image1Url = await (0, elementUtils_1.uploadImageWithWatermark)(imageBuffer1);
            const image2 = await driver
                .findElement(selenium_webdriver_1.By.xpath("/html/body/div[1]/div[2]/div[4]/div[1]/img"))
                .getAttribute("src");
            const imageBuffer2 = await this.fetchImageFromUrl(image2);
            const image2Url = await (0, elementUtils_1.uploadImageWithWatermark)(imageBuffer2);
            const image3 = await driver
                .findElement(selenium_webdriver_1.By.xpath("/html/body/div[1]/div[2]/div[4]/div[2]/img"))
                .getAttribute("src");
            const imageBuffer3 = await this.fetchImageFromUrl(image3);
            const image3Url = await (0, elementUtils_1.uploadImageWithWatermark)(imageBuffer3);
            const phoneNum = await driver
                .findElement(selenium_webdriver_1.By.css("button.h-14:nth-child(1)"))
                .getText();
            const newItem = {
                userId: '671d11005b8296252591f282',
                title: newTitle,
                description: adDescription,
                authorName: modelName,
                authorNationality: randomNumber > 1 ? 'Ecuador' : "Venezuela",
                authorPhone: "+593" + phoneNum,
                authorEmail: "support@picosa.net",
                location: modelCityName,
                address: modelAddress,
                city: modelCityName,
                country: "Ecuador",
                plan: "none",
                status: "active",
                category: "mujeres",
                schedule: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
                images: [image1Url, image2Url, image3Url]
            };
            console.log(newItem);
            await driver.close();
            return newItem;
        }
        catch (error) {
            console.log(error);
        }
    }
    async fetchImageFromUrl(url) {
        const response = await axios_1.default.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data, 'binary');
    }
};
exports.ElementService = ElementService;
__decorate([
    (0, mongoose_2.InjectModel)(element_schema_1.Element.name),
    __metadata("design:type", mongoose_1.Model)
], ElementService.prototype, "elementModel", void 0);
exports.ElementService = ElementService = __decorate([
    (0, common_1.Injectable)()
], ElementService);
//# sourceMappingURL=element.service.js.map