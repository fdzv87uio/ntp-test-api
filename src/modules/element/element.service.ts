import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Element } from './schemas/element.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateElementDTO } from './dtos/updateElement.dto';

@Injectable()
export class ElementService {
    @InjectModel(Element.name) private elementModel: Model<Element>;

    async findAllElements(): Promise<Element[]> {
        const elements = await this.elementModel.find();
        return elements;
    }

    async findAllAvailableElementsByUserEmail(userEmail: string): Promise<Element[]> {
        const elements = await this.elementModel.find({ participants: userEmail });
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
}