import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Element } from './schemas/element.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateElementDTO } from './dtos/updateElement.dto';
// import axios from 'axios';
// import { Builder, By, Key, until } from 'selenium-webdriver'
import { Builder, By } from 'selenium-webdriver'

import { uploadImageWithWatermark } from './utils/elementUtils';
import axios from 'axios';


@Injectable()
export class ElementService {
    @InjectModel(Element.name) private elementModel: Model<Element>;

    async findAllElements(): Promise<Element[]> {
        const elements = await this.elementModel.find();
        return elements;
    }

    async findAllElementsByQuery(query: any): Promise<Element[]> {
        const date = new Date();
        const options: any = { weekday: 'long' };
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
                        isToday: 0 // Optionally remove the temporary field
                    }
                }
            ]);
            return elements;
        } else if (query.query !== "all") {
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
                        isToday: 0 // Optionally remove the temporary field
                    }
                }
            ]);

            return elements;
        }
    }


    async findAllAvailableElementsByUserEmail(userEmail: string): Promise<Element[]> {
        const elements = await this.elementModel.find({ participants: userEmail });
        return elements;
    }

    async findAllAvailableElementsByUserId(id: string): Promise<Element[]> {
        const elements = await this.elementModel.find({ userId: id });
        return elements;
    }

    async createElement(element: UpdateElementDTO): Promise<Element> {
        try {

            // Check if element title exists
            const existingElement = await this.elementModel.findOne({ title: element.title });
            if (existingElement) {
                throw new UnauthorizedException("Element Title Already Exists");
            } else {
                // Generate slug using name and city
                const initialTitleArr = element.title.toLowerCase().split(" ");
                const titleArray = initialTitleArr.length > 1 ? initialTitleArr : [initialTitleArr[0], "element"];
                const formattedTítuloArray: any[] = [];
                titleArray.forEach((x) => {
                    // clean the string
                    const currentString = x.replaceAll("á", "a").replaceAll("é", "e").replaceAll("í", "i").replaceAll("ó", "o").replaceAll("ú", "u").replaceAll("ñ", "n").replaceAll("ñ", "n");
                    const encoded = encodeURIComponent(currentString);
                    const formatted = encoded.replace(/%[0-9A-F]{2}/ig, '').trim();
                    formattedTítuloArray.push(formatted);
                })
                let newSlug = formattedTítuloArray.join("-");
                const cityFormatted = element.city ? element.city.toLowerCase() : "";
                newSlug = newSlug + "-" + cityFormatted;
                console.log("new slug:");
                console.log(newSlug);
                element.slug = newSlug;
                const res = await this.elementModel.create(element);
                return res;
            }
        } catch (err) {
            console.log("error creating element " + err);
            throw new NotFoundException(`Error creating element: ${err.message}`);
        }
    }

    async createElementFromPrepagos(page: string): Promise<any> {
        try {
            //scrape from prepagos
            const driver = await new Builder().forBrowser("chrome").build();
            const newItem: any = await this.scrapePrepagos(driver, page);
            console.log(newItem);
            const result = await this.createElement(newItem);
            return result;
        } catch (err) {
            console.log("error creating element " + err);
            throw new NotFoundException(`Error creating element: ${err.message}`);
        }
    }


    async findElementById(id: string): Promise<Element> {
        const res = await this.elementModel.findById(id);
        if (!res) { throw new NotFoundException('Element Not Found'); }
        return res;
    }

    async findElementBySlug(slug: string): Promise<Element> {
        const res = await this.elementModel.findOne({ slug: slug });
        if (!res) { throw new NotFoundException('Element Not Found'); }
        return res;
    }

    async updateElementById(id: string, element: any): Promise<Element> {
        console.log('updates:');
        console.log(element);
        const res = await this.elementModel.findByIdAndUpdate(
            id,
            { $set: element },
            { new: true, runValidators: true }).exec();
        if (!res) { throw new NotFoundException('Element Not Found'); }
        return res;
    }

    async deleteElementById(id: string): Promise<Element> {
        const res = await this.elementModel.findByIdAndDelete(id);
        return res;
    }

    //Utils

    // Scrapper Function - Prepagos.com
    async scrapePrepagos(driver, page) {
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        const waitInterval = 20000;
        const url = `${page}`;
        try {
            await driver.get(url);
            await driver.manage().window().setRect({ width: 1366, height: 720 });
            await driver.manage().setTimeouts({ implicit: waitInterval });
            // const allWindowHandles = await driver.getAllWindowHandles();
            // Get ad description
            const adDescription = await driver.findElement(
                By.xpath(
                    "/html/body/div[1]/div[2]/div[5]/div/div"
                )
            ).getText();
            // Get model name
            const modelName = await driver.findElement(
                By.xpath(
                    "/html/body/div[1]/div[2]/div[1]/div[1]/h1/span[1]"
                )
            ).getText();
            // Get ad title from description
            const newTitle = modelName + ', ' + adDescription.slice(0, 50) + "...";

            // Get Address and City
            const modelCity = await driver.findElement(
                By.xpath(
                    "/html/body/div[1]/div[2]/div[1]/div[2]/span"
                )
            ).getText();
            const modelCityArr = modelCity.split(',')
            const modelAddress = modelCityArr[0].trim();
            const modelCityName = modelCityArr[1].trim();
            // Get Images
            const image1 = await driver
                .findElement(
                    By.xpath(
                        "/html/body/div[1]/div[2]/div[3]/img"
                    )
                )
                .getAttribute("src");
            const imageBuffer1 = await this.fetchImageFromUrl(image1);
            const image1Url = await uploadImageWithWatermark(imageBuffer1);

            const image2 = await driver
                .findElement(
                    By.xpath(
                        "/html/body/div[1]/div[2]/div[4]/div[1]/img"
                    )
                )
                .getAttribute("src");
            const imageBuffer2 = await this.fetchImageFromUrl(image2);
            const image2Url = await uploadImageWithWatermark(imageBuffer2);

            const image3 = await driver
                .findElement(
                    By.xpath(
                        "/html/body/div[1]/div[2]/div[4]/div[2]/img"
                    )
                )
                .getAttribute("src");
            const imageBuffer3 = await this.fetchImageFromUrl(image3);
            const image3Url = await uploadImageWithWatermark(imageBuffer3);
            //Get Phone
            const phoneNum = await driver
                .findElement(
                    By.css(
                        "button.h-14:nth-child(1)"
                    )
                )
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
            }
            console.log(newItem);
            await driver.close();
            return newItem;
        } catch (error) {
            console.log(error);
        }
    }

    async fetchImageFromUrl(url: string): Promise<Buffer> {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data, 'binary');
    }

}

