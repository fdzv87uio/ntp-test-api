import { Realtor } from './schemas/realtor.schema';
export declare class RealtorService {
    private realtorModel;
    findAllRealtors(): Promise<Realtor[]>;
    findRealtorById(id: string): Promise<Realtor>;
    findRealtorByUserId(id: string): Promise<Realtor>;
    createRealtor(realtor: any): Promise<Realtor>;
    updateRealtorById(id: string, realtor: any): Promise<Realtor>;
    deleteRealtorById(id: string): Promise<Realtor>;
}
