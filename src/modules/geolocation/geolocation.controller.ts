import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GeolocationService } from './geolocation.service';


@ApiTags('Geolocation')
@Controller('geolocation')
export class GeolocationController {
    constructor(
        private geolocationService: GeolocationService,
    ) {}

    // Get All Existing Geolocations by Query
    @ApiOperation({ summary: 'Get All Locations by query' })
    @Get('getAllByQuery/:query')
    async getAllTransactionsByUserEmail(@Param('query') query: string): Promise<any[]> {
        return this.geolocationService.findAllGeolocationsByQuery(query);
    }

    // Get One Existing Geolocations by Query
    @ApiOperation({ summary: 'Get One Location by Query' })
    @Get('getOneByQuery/:query')
    async getOneTransactionsByUserEmail(@Param('query') query: string): Promise<any[]> {
        return this.geolocationService.findOneGeolocationByQuery(query);
    }



}
