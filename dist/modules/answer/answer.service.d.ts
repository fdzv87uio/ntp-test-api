import { Answer } from './schemas/answer.schema';
import { CreateAnswerDTO } from './dtos/createAnswer.dto';
export declare class AnswerService {
    private answerModel;
    findAllAnswers(): Promise<Answer[]>;
    findAllAnswersByUserId(userId: string): Promise<Answer[]>;
    createAnswer(answer: CreateAnswerDTO): Promise<Answer>;
    findAnswerById(id: string): Promise<Answer>;
    updateAnswerById(id: string, answer: any): Promise<Answer>;
    deleteAnswerById(id: string): Promise<Answer>;
}
