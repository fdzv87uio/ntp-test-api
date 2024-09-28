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
exports.EventResolverService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const event_schema_1 = require("../schemas/event.schema");
const utils_1 = require("../../common/utils/utils");
let EventResolverService = class EventResolverService {
    constructor(eventModel) {
        this.eventModel = eventModel;
    }
    async getNextDate(frecuency, date) {
        switch (frecuency) {
            case "Weekly":
                return await this.convertWeekleDate(date);
            case "Daily":
                break;
            case "Monthly":
                return await this.convertMonthlyDate(date);
            case "Yearly":
                return await this.convertYearlyDate(date);
            case "None":
            default:
                break;
        }
    }
    async createDateEvents(event) {
        const events = [];
        if ((0, utils_1.isNotNullAndNotEmpty)(event.occurenceCount)) {
            for (let index = 0; index < event.occurenceCount; index++) {
                let eventToCreate = null;
                if (events.length > 0) {
                    eventToCreate = await this.parsingEvent(events[events.length - 1]);
                }
                else {
                    eventToCreate = await this.parsingEvent(event);
                }
                events.push(eventToCreate);
            }
        }
        return events;
    }
    async convertWeekleDate(date) {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 7);
        return newDate;
    }
    async convertMonthlyDate(date) {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + 1);
        return newDate;
    }
    async convertYearlyDate(date) {
        const newDate = new Date(date);
        newDate.setFullYear(newDate.getFullYear() + 1);
        return newDate;
    }
    async parsingEvent(event) {
        const eventToCreate = new event_schema_1.Event();
        eventToCreate.address = event.address;
        eventToCreate.author = event.author;
        eventToCreate.city = event.city;
        eventToCreate.description = event.description;
        eventToCreate.endDate = await this.getNextDate(event.frecuency, event.endDate);
        eventToCreate.endTime = event.endTime;
        eventToCreate.eventEnds = true;
        eventToCreate.eventMode = event.eventMode;
        eventToCreate.eventType = event.eventType;
        eventToCreate.frecuency = 'None';
        eventToCreate.frecuencyStatus = 'Executed';
        eventToCreate.guestList = event.guestList;
        eventToCreate.images = event.images;
        eventToCreate.isFrecuency = false;
        eventToCreate.location = event.location;
        eventToCreate.occurenceCount = 0;
        eventToCreate.preferenceListIds = event.preferenceListIds;
        eventToCreate.slug = event.slug;
        eventToCreate.startDate = await this.getNextDate(event.frecuency, event.startDate);
        eventToCreate.startTime = event.startTime;
        eventToCreate.title = event.title;
        eventToCreate.url = event.url;
        eventToCreate.userId = event.userId;
        eventToCreate.videos = event.videos;
        return eventToCreate;
    }
};
exports.EventResolverService = EventResolverService;
exports.EventResolverService = EventResolverService = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(event_schema_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EventResolverService);
//# sourceMappingURL=event.resolverservice.js.map