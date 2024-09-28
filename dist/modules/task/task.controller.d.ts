import { TaskService } from './task.service';
import { CreateTaskDTO } from './dtos/createTask.dto';
export declare class TaskController {
    private taskService;
    constructor(taskService: TaskService);
    getAllTasks(): Promise<any[]>;
    getAllTasksByUserId(userEmail: string): Promise<any[]>;
    createTask(task: CreateTaskDTO): Promise<any>;
    getTaskBySlug(slug: string): Promise<any>;
    getTask(id: string): Promise<any>;
    updateTask(id: string, task: any): Promise<any>;
    deleteTask(id: string): Promise<any>;
}
