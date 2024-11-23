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
exports.RealtorService = void 0;
const common_1 = require("@nestjs/common");
const realtor_schema_1 = require("./schemas/realtor.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let RealtorService = class RealtorService {
    async findAllRealtors() {
        const realtors = await this.realtorModel.find();
        return realtors;
    }
    async findRealtorById(id) {
        const realtor = await this.realtorModel.findOne({ _id: id });
        return realtor;
    }
    async findRealtorByUserId(id) {
        const realtor = await this.realtorModel.findOne({ userId: id });
        return realtor;
    }
    async createRealtor(realtor) {
        try {
            const existingRealtor = await this.realtorModel.findOne({ name: realtor.name });
            if (existingRealtor) {
                throw new common_1.UnauthorizedException("Realtor Name Already Exists");
            }
            else {
                const res = await this.realtorModel.create(realtor);
                return res;
            }
        }
        catch (err) {
            console.log("error creating realtor " + err);
            throw new common_1.NotFoundException(`Error creating realtor: ${err.message}`);
        }
    }
    async updateRealtorById(id, realtor) {
        console.log('updates:');
        console.log(realtor);
        const res = await this.realtorModel.findByIdAndUpdate(id, { $set: realtor }, { new: true, runValidators: true }).exec();
        if (!res) {
            throw new common_1.NotFoundException('Realtor Not Found');
        }
        return res;
    }
    async deleteRealtorById(id) {
        const res = await this.realtorModel.findByIdAndDelete(id);
        console.log(res);
        return res;
    }
};
exports.RealtorService = RealtorService;
__decorate([
    (0, mongoose_2.InjectModel)(realtor_schema_1.Realtor.name),
    __metadata("design:type", mongoose_1.Model)
], RealtorService.prototype, "realtorModel", void 0);
exports.RealtorService = RealtorService = __decorate([
    (0, common_1.Injectable)()
], RealtorService);
//# sourceMappingURL=realtor.service.js.map