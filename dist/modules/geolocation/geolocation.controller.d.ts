import { GeolocationService } from './geolocation.service';
export declare class GeolocationController {
    private geolocationService;
    constructor(geolocationService: GeolocationService);
    getAllTransactionsByUserEmail(query: string): Promise<any[]>;
    getOneTransactionsByUserEmail(query: string): Promise<any[]>;
}
