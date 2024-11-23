import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Realtor } from './schemas/realtor.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RealtorService {
    @InjectModel(Realtor.name) private realtorModel: Model<Realtor>;

    async findAllRealtors(): Promise<Realtor[]> {
        const realtors = await this.realtorModel.find();
        return realtors;
    }

    async findRealtorById(id: string): Promise<Realtor> {
        const realtor = await this.realtorModel.findOne({ _id: id });
        return realtor;
    }


    async findRealtorByUserId(id: string): Promise<Realtor> {
        const realtor = await this.realtorModel.findOne({ userId: id });
        return realtor;
    }

    async createRealtor(realtor: any): Promise<Realtor> {
        try {

            // Check if realtor title exists
            const existingRealtor = await this.realtorModel.findOne({ name: realtor.name });
            if (existingRealtor) {
                throw new UnauthorizedException("Realtor Name Already Exists");
            } else {
                const res = await this.realtorModel.create(realtor);
                return res;
            }
        } catch (err) {
            console.log("error creating realtor " + err);
            throw new NotFoundException(`Error creating realtor: ${err.message}`);
        }
    }


    async updateRealtorById(id: string, realtor: any): Promise<Realtor> {
        console.log('updates:');
        console.log(realtor);
        const res = await this.realtorModel.findByIdAndUpdate(
            id,
            { $set: realtor },
            { new: true, runValidators: true }).exec();
        if (!res) { throw new NotFoundException('Realtor Not Found'); }
        return res;
    }

    async deleteRealtorById(id: string): Promise<Realtor> {
        const res = await this.realtorModel.findByIdAndDelete(id);
        console.log(res);
        return res;
    }

}

