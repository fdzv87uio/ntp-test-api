import { LocationClient, SearchPlaceIndexForTextCommand } from '@aws-sdk/client-location';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);
  private client: LocationClient;

  constructor() {
    this.client = new LocationClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async searchPlaceIndexForText(searchTerm: string) {
    const params = {
        IndexName: "Place-Index-curcleup",
        Text: searchTerm,
        MaxResults: 25,
        FilterCountries: ["USA"]
        //BiasPosition: [-122.33, 47.61],
      };
    const command = new SearchPlaceIndexForTextCommand(params);

    try {
      const response = await this.client.send(command);
      return{
        status: true,
        data: response.Results,
        };     
    } catch (error) {
      this.logger.error(`Failed to search place index for text: ${error.message}`);
      throw error;
    }
  }
}
