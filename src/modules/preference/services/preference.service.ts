import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePreferenceDto } from '../dtos/create-preference.dto';
import { Preference, PreferenceDocument } from '../schemas/preference.schema';
import { UpdatePreferenceDto } from '../dtos/update-preference.dto';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectModel('Preference') private readonly preferenceModel: Model<Preference>,
    @InjectModel(Preference.name) private preferenceDocumentModel: Model<PreferenceDocument>
  ) {}

  async create(preference: CreatePreferenceDto): Promise<Preference> {
    const createdPreference = this.preferenceDocumentModel.create(preference);
    return createdPreference;
  }

  async findAll(): Promise<Preference[]> {
    const categories = await this.preferenceModel.find().populate('category').exec();
    return categories;
  }

  async findAllWithCategories(): Promise<any> {
    const preferences = await this.preferenceDocumentModel.find().populate('category').exec();
    const result = {};
    preferences.forEach(preference => {
      const categoryName = preference.category.name;
      if (!result[categoryName]) {
        result[categoryName] = [];
      }
      result[categoryName].push({
        id: preference.id,
        name: preference.name,
        description: preference.description
      });
    });
    return result;
  }

  async findById(id: string): Promise<Preference> {
    const res = await this.preferenceModel.findById(id).populate('category').exec();
    if (!res) {
      throw new NotFoundException('Preference Not Found');
    }
    return res;
  }

  async findByName(name: string): Promise<Preference> {
    const res = await this.preferenceModel.findOne({ name: name }).populate('category').exec();
    if (!res) {
      throw new NotFoundException('Peference Not Found');
    }
    return res;
  }

  async updateById(id: string, preference: UpdatePreferenceDto): Promise<Preference> {
    const res = await this.preferenceModel.findByIdAndUpdate(id, preference, {
      new: true,
      runValidators: true
    });
    return res;
  }

  async deleteById(id: string): Promise<Preference> {
    const res = await this.preferenceModel.findByIdAndDelete(id);
    return res;
  }
}
