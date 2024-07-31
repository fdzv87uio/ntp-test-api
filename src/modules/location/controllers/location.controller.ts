import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from '../services/location.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Location')
@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @ApiOperation({ summary: 'Location address' })
    @Get('/:search')
    async getLocations(@Param('search') search: string) {
      console.log(search);
        return await this.locationService.searchPlaceIndexForText(search);
    }
}
