import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Preference } from '../interfaces/Preference.interface';
import { PreferenceExtra } from '../interfaces/PreferenceExtra.interfaces';
import { CreatePreferenceDto } from '../dtos/create-preference.dto';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectModel('Preference') private readonly preferenceModel: Model<Preference>,
    @InjectModel('PreferenceExtra') private readonly preferenceExtraModel: Model<PreferenceExtra>,
  ) {}

  async create(createPreferenceDto: CreatePreferenceDto): Promise<Preference> {
    const createdPreference = new this.preferenceModel(createPreferenceDto);
    return createdPreference.save();
  }

  async addPreference(id: string, value: string): Promise<Preference> {
    const preference = await this.preferenceModel.findById(id);

    if (!preference) {
      throw new Error('preference not found');
    }

    if (preference.preferenceList.length < 10) { // Adjust limit as needed
        preference.preferenceList.push(value);
    } else {
      const preferenceExtra = new this.preferenceExtraModel({
        value,
        documentId: preference._id,
      });
      await preferenceExtra.save();
      preference.preferenceExtraIds.push(preferenceExtra._id);
    }

    return preference.save();
  }

  async findOne(id: string): Promise<Preference> {
    return this.preferenceModel
      .findById(id)
      .populate('PreferenceExtra')
      .exec();
  }

  async findAll(): Promise<Preference[]> {
    return this.preferenceModel
      .find()
      .populate('PreferenceExtra')
      .exec();
  }
}
