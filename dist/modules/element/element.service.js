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
let ElementService = class ElementService {
    async findAllElements() {
        const elements = await this.elementModel.find();
        return elements;
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
        return res;
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