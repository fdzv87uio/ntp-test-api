import { RealtorService } from './realtor.service';
import { CreateRealtorDTO } from './dtos/createRealtor.dto';
import { UpdateRealtorDTO } from './dtos/updateRealtor.dto';
export declare class RealtorController {
    private realtorService;
    constructor(realtorService: RealtorService);
    getAllRealtors(): Promise<any[]>;
    getRealtorByUserId(id: string): Promise<any>;
    getRealtorByd(id: string): Promise<any>;
    createRealtor(realtor: CreateRealtorDTO): Promise<any>;
    updateRealtor(id: string, realtor: UpdateRealtorDTO): Promise<any>;
    deleteRealtor(id: string): Promise<any>;
}
