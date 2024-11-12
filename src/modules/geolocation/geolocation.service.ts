import { Injectable, } from '@nestjs/common';
import { getAllGeolocationsByQuery, getOneGeolocationByQuery } from './utils/geolocation.utils';

@Injectable()
export class GeolocationService {
    constructor(

    ) {}

    async findAllGeolocationsByQuery(query: string): Promise<any[]> {
        const locations = await getAllGeolocationsByQuery(query);
        return locations;
    };

    async findOneGeolocationByQuery(query: string): Promise<any> {
        const locations = await getOneGeolocationByQuery(query);
        return locations;
    }

}
