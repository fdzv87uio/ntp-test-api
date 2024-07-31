import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { UploadService } from './../upload/services/upload.service'
import { CreateEventDTO } from './dtos/createEvent.dto';
import { log } from 'console';
import { EventResolverService } from './resolverservice/event.resolverservice';
import { UpdateEventDTO } from './dtos/updateEvent.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name) private eventModel: Model<Event>,
        private uploadService: UploadService,
        private eventResolverService: EventResolverService

    ) {}

    async findAllEvents(): Promise<Event[]> {
        const events = await this.eventModel.find();
        return events;
    }

    async findAllEventsByUserId(userId: string): Promise<Event[]> {
        const events = await this.eventModel.find({ userId: userId });
        return events;
    }

    async createEvent(event: CreateEventDTO): Promise<Event> {
        try {
            if (event.isFrecuency != null && event.isFrecuency) {
                event.frecuencyStatus = "Pending";
            }
            // Check if event title exists
            const existingEvent = await this.eventModel.findOne({ title: event.title });
            if (existingEvent) {
                throw new UnauthorizedException("Event Title Already Exists");
            } else {
                // Generate slug using name and city
                const initialTitleArr = event.title.toLowerCase().split(" ");
                const titleArray = initialTitleArr.length > 1 ? initialTitleArr : [initialTitleArr[0], "event"];
                const formattedTítuloArray: any[] = [];
                titleArray.forEach((x) => {
                    // clean the string
                    const currentString = x.replaceAll("á", "a").replaceAll("é", "e").replaceAll("í", "i").replaceAll("ó", "o").replaceAll("ú", "u").replaceAll("ñ", "n").replaceAll("ñ", "n");
                    const encoded = encodeURIComponent(currentString);
                    const formatted = encoded.replace(/%[0-9A-F]{2}/ig, '').trim();
                    formattedTítuloArray.push(formatted);
                })
                let newSlug = formattedTítuloArray.join("-");
                const cityFormatted = event.city ? event.city.toLowerCase() : "";
                newSlug = newSlug + "-" + cityFormatted;
                console.log("new slug:");
                console.log(newSlug);
                event.slug = newSlug;
                // adding url
                const uri = process.env.CURCLE_APP_URI;
                event.url = uri + `/event/${newSlug}`;
                const res = await this.eventModel.create(event);
                return res;
            }
        } catch (err) {
            log("error creating event " + err);
            throw new NotFoundException(`Error creating event: ${err.message}`);
        }
    }

    async createEventsByProcess(): Promise<Event[]> {
        try {
            const events = await this.eventModel.find({ frecuencyStatus: "Pending" });
            for (const event of events) {
                if (event.isFrecuency && !event.frecuency.includes("None")) {
                    this.eventResolverService.createEventsByEvent(event);
                    event.frecuencyStatus = "Executed";
                    await this.eventModel.updateOne({ _id: event._id }, event);
                }
            }
            return events;
        } catch (err) {
            log("error creating event " + err);
            throw new NotFoundException('Error creating event');
        }
    }

    async findEventById(id: string): Promise<Event> {
        const res = await this.eventModel.findById(id);
        if (!res) { throw new NotFoundException('Event Not Found'); }
        return res;
    }

    async findEventBySlug(slug: string): Promise<Event> {
        const res = await this.eventModel.findOne({ slug: slug });
        if (!res) { throw new NotFoundException('Event Not Found'); }
        return res;
    }

    async updateEventById(id: string, event: UpdateEventDTO): Promise<Event> {
        const res = await this.eventModel.findByIdAndUpdate(id, event, {
            new: true,
            runValidators: true
        }).exec();
        if (!res) { throw new NotFoundException('Event Not Found'); }
        return res;
    }

    async deleteEventById(id: string): Promise<Event> {
        const res = await this.eventModel.findByIdAndDelete(id);
        return res;
    }
}
