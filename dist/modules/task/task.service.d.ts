import { UpdateTaskDTO } from './dtos/updateTask.dto';
import { Task } from './schemas/task.schema';
export declare class TaskService {
    private taskModel;
    findAllTasks(): Promise<Task[]>;
    findAllAvailableTasksByUserEmail(userEmail: string): Promise<Task[]>;
    createTask(task: UpdateTaskDTO): Promise<Task>;
    findTaskById(id: string): Promise<Task>;
    findTaskBySlug(slug: string): Promise<Task>;
    updateTaskById(id: string, task: any): Promise<Task>;
    deleteTaskById(id: string): Promise<Task>;
}
