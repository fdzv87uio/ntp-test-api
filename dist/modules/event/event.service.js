"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_schema_1 = require("./schemas/event.schema");
const upload_service_1 = require("./../upload/services/upload.service");
const console_1 = require("console");
const event_resolverservice_1 = require("./resolverservice/event.resolverservice");
const utils_1 = require("../common/utils/utils");
let EventService = class EventService {
    constructor(eventModel, uploadService, eventResolverService) {
        this.eventModel = eventModel;
        this.uploadService = uploadService;
        this.eventResolverService = eventResolverService;
    }
    async findAllEvents() {
        const events = await this.eventModel.find();
        return events;
    }
    async findAllEventsByUserId(userId) {
        const events = await this.eventModel.find({ userId: userId });
        return events;
    }
    async createEvent(event) {
        try {
            if ((0, utils_1.isNotNull)(event.isFrecuency) && event.isFrecuency) {
                event.frecuencyStatus = 'Pending';
            }
            const existingEvent = await this.eventModel.findOne({ title: event.title });
            if (existingEvent) {
                throw new common_1.UnauthorizedException("Event Title Already Exists");
            }
            else {
                const initialTitleArr = event.title.toLowerCase().split(" ");
                const titleArray = initialTitleArr.length > 1 ? initialTitleArr : [initialTitleArr[0], "event"];
                const formattedTítuloArray = [];
                titleArray.forEach((x) => {
                    const currentString = x.replaceAll("á", "a").replaceAll("é", "e").replaceAll("í", "i").replaceAll("ó", "o").replaceAll("ú", "u").replaceAll("ñ", "n").replaceAll("ñ", "n");
                    const encoded = encodeURIComponent(currentString);
                    const formatted = encoded.replace(/%[0-9A-F]{2}/ig, '').trim();
                    formattedTítuloArray.push(formatted);
                });
                let newSlug = formattedTítuloArray.join("-");
                const cityFormatted = event.city ? event.city.toLowerCase() : "";
                newSlug = newSlug + "-" + cityFormatted;
                console.log("new slug:");
                console.log(newSlug);
                event.slug = newSlug;
                const uri = process.env.CURCLE_APP_URI;
                event.url = uri + `/event/${newSlug}`;
                const res = await this.eventModel.create(event);
                return res;
            }
        }
        catch (err) {
            (0, console_1.log)("error creating event " + err);
            throw new common_1.NotFoundException(`Error creating event: ${err.message}`);
        }
    }
    async createEventsByProcess() {
        try {
            const events = await this.eventModel.find({ frecuencyStatus: "Pending" });
            for (const event of events) {
                if (event.isFrecuency && !event.frecuency.includes("None")) {
                    this.eventResolverService.createDateEvents(event);
                    event.frecuencyStatus = 'Executed';
                    await this.eventModel.updateOne({ _id: event._id }, event);
                }
            }
            return events;
        }
        catch (err) {
            (0, console_1.log)("error creating event " + err);
            throw new common_1.NotFoundException('Error creating event');
        }
    }
    async findEventById(id) {
        const res = await this.eventModel.findById(id);
        if (!res) {
            throw new common_1.NotFoundException('Event Not Found');
        }
        return res;
    }
    async findEventBySlug(slug) {
        const res = await this.eventModel.findOne({ slug: slug });
        if (!res) {
            throw new common_1.NotFoundException('Event Not Found');
        }
        return res;
    }
    async updateEventById(id, event) {
        const res = await this.eventModel.findByIdAndUpdate(id, event, {
            new: true,
            runValidators: true
        }).exec();
        if (!res) {
            throw new common_1.NotFoundException('Event Not Found');
        }
        return res;
    }
    async deleteEventById(id) {
        const res = await this.eventModel.findByIdAndDelete(id);
        return res;
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(event_schema_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        upload_service_1.UploadService,
        event_resolverservice_1.EventResolverService])
], EventService);
//# sourceMappingURL=event.service.js.map