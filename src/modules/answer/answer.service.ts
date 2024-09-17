import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Answer } from './schemas/answer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAnswerDTO } from './dtos/createAnswer.dto';

@Injectable()
export class AnswerService {
    @InjectModel(Answer.name) private answerModel: Model<Answer>;

    async findAllAnswers(): Promise<Answer[]> {
        const answers = await this.answerModel.find();
        return answers;
    }

    async findAllAnswersByUserId(userId: string): Promise<Answer[]> {
        const answers = await this.answerModel.find({ userId: userId });
        return answers;
    }

    async createAnswer(answer: CreateAnswerDTO): Promise<Answer> {
        try {

            // Check if answer title exists
            const existingAnswer = await this.answerModel.findOne({ answerId: answer.taskId });
            if (existingAnswer) {
                throw new UnauthorizedException("answer for this task Already Exists");
            } else {
                const res = await this.answerModel.create(answer);
                return res;
            }
        } catch (err) {
            console.log("error creating answer " + err);
            throw new NotFoundException(`Error creating answer: ${err.message}`);
        }
    }


    async findAnswerById(id: string): Promise<Answer> {
        const res = await this.answerModel.findById(id);
        if (!res) { throw new NotFoundException('Answer Not Found'); }
        return res;
    }


    async updateAnswerById(id: string, answer: any): Promise<Answer> {
        console.log('updates:');
        console.log(answer);
        const res = await this.answerModel.findByIdAndUpdate(
            id,
            { $set: answer },
            { new: true, runValidators: true }).exec();
        if (!res) { throw new NotFoundException('Answer Not Found'); }
        return res;
    }

    async deleteAnswerById(id: string): Promise<Answer> {
        const res = await this.answerModel.findByIdAndDelete(id);
        return res;
    }
}