import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Event } from '../schemas/event.schema';

export class EventResolverService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<Event>,        

    ) {}

    async createEventsByEvent(event: Event): Promise<Event> {
        if(event.frecuency==="Weekly"){

        }else{
            
        }        
        const eventCreated = await this.eventModel.create(event);
        return eventCreated;
    }
}
