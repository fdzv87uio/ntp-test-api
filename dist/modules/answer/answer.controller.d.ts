import { CreateAnswerDTO } from './dtos/createAnswer.dto';
import { AnswerService } from './answer.service';
export declare class AnswerController {
    private answerService;
    constructor(answerService: AnswerService);
    getAllAnswers(): Promise<any[]>;
    getAllAnswersByUserId(userId: string): Promise<any[]>;
    createAnswer(answer: CreateAnswerDTO): Promise<any>;
    getAnswer(id: string): Promise<any>;
    updateAnswer(id: string, answer: any): Promise<any>;
    deleteAnswer(id: string): Promise<any>;
}
