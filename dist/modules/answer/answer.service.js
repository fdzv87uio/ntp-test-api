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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const answer_schema_1 = require("./schemas/answer.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let AnswerService = class AnswerService {
    async findAllAnswers() {
        const answers = await this.answerModel.find();
        return answers;
    }
    async findAllAnswersByUserId(userId) {
        const answers = await this.answerModel.find({ userId: userId });
        return answers;
    }
    async createAnswer(answer) {
        try {
            const existingAnswer = await this.answerModel.findOne({ answerId: answer.taskId });
            if (existingAnswer) {
                throw new common_1.UnauthorizedException("answer for this task Already Exists");
            }
            else {
                const res = await this.answerModel.create(answer);
                return res;
            }
        }
        catch (err) {
            console.log("error creating answer " + err);
            throw new common_1.NotFoundException(`Error creating answer: ${err.message}`);
        }
    }
    async findAnswerById(id) {
        const res = await this.answerModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('Answer Not Found');
        }
        return res;
    }
    async updateAnswerById(id, answer) {
        console.log('updates:');
        console.log(answer);
        const res = await this.answerModel.findByIdAndUpdate(id, { $set: answer }, { new: true, runValidators: true }).exec();
        if (!res) {
            throw new common_1.NotFoundException('Answer Not Found');
        }
        return res;
    }
    async deleteAnswerById(id) {
        const res = await this.answerModel.findByIdAndDelete(id);
        return res;
    }
};
exports.AnswerService = AnswerService;
__decorate([
    (0, mongoose_2.InjectModel)(answer_schema_1.Answer.name),
    __metadata("design:type", mongoose_1.Model)
], AnswerService.prototype, "answerModel", void 0);
exports.AnswerService = AnswerService = __decorate([
    (0, common_1.Injectable)()
], AnswerService);
//# sourceMappingURL=answer.service.js.map