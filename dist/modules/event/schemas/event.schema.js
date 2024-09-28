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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = exports.Event = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Event = class Event {
};
exports.Event = Event;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: "none"
    }),
    __metadata("design:type", String)
], Event.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ["public", "private"],
        default: "private"
    }),
    __metadata("design:type", String)
], Event.prototype, "eventType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ["in-person", "online"],
        default: "in-person"
    }),
    __metadata("design:type", String)
], Event.prototype, "eventMode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        required: false
    }),
    __metadata("design:type", Array)
], Event.prototype, "repeatOn", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Event.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true,
        required: false
    }),
    __metadata("design:type", Boolean)
], Event.prototype, "eventEnds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Event.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: 1,
        required: false
    }),
    __metadata("design:type", Number)
], Event.prototype, "occurenceCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Event.prototype, "isFrecuency", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        enum: ["None", "Day", "Week", "Month", "Year"],
        default: "None",
        required: false
    }),
    __metadata("design:type", String)
], Event.prototype, "frecuency", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        enum: ["None", "Pending", "Executed"],
        default: "None",
        required: false
    }),
    __metadata("design:type", String)
], Event.prototype, "frecuencyStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Event.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        required: false
    }),
    __metadata("design:type", Array)
], Event.prototype, "preferenceListIds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Event.prototype, "guestList", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Event.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Event.prototype, "videos", void 0);
exports.Event = Event = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], Event);
exports.EventSchema = mongoose_1.SchemaFactory.createForClass(Event);
//# sourceMappingURL=event.schema.js.map