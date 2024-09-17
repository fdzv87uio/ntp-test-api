import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateTaskDTO } from './dtos/updateTask.dto';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskService {
    @InjectModel(Task.name) private taskModel: Model<Task>;

    async findAllTasks(): Promise<Task[]> {
        const tasks = await this.taskModel.find();
        return tasks;
    }

    async findAllAvailableTasksByUserEmail(userEmail: string): Promise<Task[]> {
        const tasks = await this.taskModel.find({ participants: userEmail });
        return tasks;
    }

    async createTask(task: UpdateTaskDTO): Promise<Task> {
        try {

            // Check if task title exists
            const existingTask = await this.taskModel.findOne({ title: task.title });
            if (existingTask) {
                throw new UnauthorizedException("task Title Already Exists");
            } else {
                // Generate slug using name and city
                const initialTitleArr = task.title.toLowerCase().split(" ");
                const titleArray = initialTitleArr.length > 1 ? initialTitleArr : [initialTitleArr[0], "task"];
                const formattedTítuloArray: any[] = [];
                titleArray.forEach((x) => {
                    // clean the string
                    const currentString = x.replaceAll("á", "a").replaceAll("é", "e").replaceAll("í", "i").replaceAll("ó", "o").replaceAll("ú", "u").replaceAll("ñ", "n").replaceAll("ñ", "n");
                    const encoded = encodeURIComponent(currentString);
                    const formatted = encoded.replace(/%[0-9A-F]{2}/ig, '').trim();
                    formattedTítuloArray.push(formatted);
                })
                let newSlug = formattedTítuloArray.join("-");
                const cityFormatted = task.city ? task.city.toLowerCase() : "";
                newSlug = newSlug + "-" + cityFormatted;
                console.log("new slug:");
                console.log(newSlug);
                task.slug = newSlug;
                // adding url
                const uri = process.env.SAVYWORKER_APP_URI;
                task.url = uri + `/task/${newSlug}`;
                const res = await this.taskModel.create(task);
                return res;
            }
        } catch (err) {
            console.log("error creating task " + err);
            throw new NotFoundException(`Error creating task: ${err.message}`);
        }
    }


    async findTaskById(id: string): Promise<Task> {
        const res = await this.taskModel.findById(id);
        if (!res) { throw new NotFoundException('Task Not Found'); }
        return res;
    }

    async findTaskBySlug(slug: string): Promise<Task> {
        const res = await this.taskModel.findOne({ slug: slug });
        if (!res) { throw new NotFoundException('Task Not Found'); }
        return res;
    }

    async updateTaskById(id: string, task: any): Promise<Task> {
        console.log('updates:');
        console.log(task);
        const res = await this.taskModel.findByIdAndUpdate(
            id,
            { $set: task },
            { new: true, runValidators: true }).exec();
        if (!res) { throw new NotFoundException('Task Not Found'); }
        return res;
    }

    async deleteTaskById(id: string): Promise<Task> {
        const res = await this.taskModel.findByIdAndDelete(id);
        return res;
    }
}