import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schemas/category.schema';
import { ICategory } from '../interfaces/category.interface';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel('Category') private categoryModel: Model<Category> 
    ) {}

    async findAll(): Promise<Category[]> {
        const categories = await this.categoryModel.find().exec();
        return categories;
    }

    async create(category: Category): Promise<Category> {
        const res = await this.categoryModel.create(category);
        if(!res)
            return null;
        return res;
    }

    async findById(id: string): Promise<Category> {
        const res = await this.categoryModel.findById(id).exec();
        if (!res) {
            throw new NotFoundException('Category Not Found');
        }
        return res;
    }

    async findByName(name: string): Promise<Category> {
        const res = await this.categoryModel.findOne({name:name}).exec();
        if (!res) {
            throw new NotFoundException('Category Not Found');
        }
        return res;
    }

    async updateById(id: string, category: Category): Promise<Category> {
        const res = await this.categoryModel.findByIdAndUpdate(id, category, {
            new: true,
            runValidators: true
        });
        return res;
    }

    async deleteById(id: string): Promise<Category> {
        const res = await this.categoryModel.findByIdAndDelete(id);
        return res;
    }
}
