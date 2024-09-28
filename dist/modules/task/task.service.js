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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const task_schema_1 = require("./schemas/task.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let TaskService = class TaskService {
    async findAllTasks() {
        const tasks = await this.taskModel.find();
        return tasks;
    }
    async findAllAvailableTasksByUserEmail(userEmail) {
        const tasks = await this.taskModel.find({ participants: userEmail });
        return tasks;
    }
    async createTask(task) {
        try {
            const existingTask = await this.taskModel.findOne({ title: task.title });
            if (existingTask) {
                throw new common_1.UnauthorizedException("task Title Already Exists");
            }
            else {
                const initialTitleArr = task.title.toLowerCase().split(" ");
                const titleArray = initialTitleArr.length > 1 ? initialTitleArr : [initialTitleArr[0], "task"];
                const formattedTítuloArray = [];
                titleArray.forEach((x) => {
                    const currentString = x.replaceAll("á", "a").replaceAll("é", "e").replaceAll("í", "i").replaceAll("ó", "o").replaceAll("ú", "u").replaceAll("ñ", "n").replaceAll("ñ", "n");
                    const encoded = encodeURIComponent(currentString);
                    const formatted = encoded.replace(/%[0-9A-F]{2}/ig, '').trim();
                    formattedTítuloArray.push(formatted);
                });
                let newSlug = formattedTítuloArray.join("-");
                const cityFormatted = task.city ? task.city.toLowerCase() : "";
                newSlug = newSlug + "-" + cityFormatted;
                console.log("new slug:");
                console.log(newSlug);
                task.slug = newSlug;
                const uri = process.env.SAVYWORKER_APP_URI;
                task.url = uri + `/task/${newSlug}`;
                const res = await this.taskModel.create(task);
                return res;
            }
        }
        catch (err) {
            console.log("error creating task " + err);
            throw new common_1.NotFoundException(`Error creating task: ${err.message}`);
        }
    }
    async findTaskById(id) {
        const res = await this.taskModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('Task Not Found');
        }
        return res;
    }
    async findTaskBySlug(slug) {
        const res = await this.taskModel.findOne({ slug: slug });
        if (!res) {
            throw new common_1.NotFoundException('Task Not Found');
        }
        return res;
    }
    async updateTaskById(id, task) {
        console.log('updates:');
        console.log(task);
        const res = await this.taskModel.findByIdAndUpdate(id, { $set: task }, { new: true, runValidators: true }).exec();
        if (!res) {
            throw new common_1.NotFoundException('Task Not Found');
        }
        return res;
    }
    async deleteTaskById(id) {
        const res = await this.taskModel.findByIdAndDelete(id);
        return res;
    }
};
exports.TaskService = TaskService;
__decorate([
    (0, mongoose_2.InjectModel)(task_schema_1.Task.name),
    __metadata("design:type", mongoose_1.Model)
], TaskService.prototype, "taskModel", void 0);
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)()
], TaskService);
//# sourceMappingURL=task.service.js.map