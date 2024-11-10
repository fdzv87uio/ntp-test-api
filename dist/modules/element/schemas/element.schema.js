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
exports.ElementSchema = exports.Element = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Element = class Element {
};
exports.Element = Element;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Element.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Element.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: false,
        default: "none"
    }),
    __metadata("design:type", String)
], Element.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Element.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: "active",
    }),
    __metadata("design:type", String)
], Element.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: "mujeres",
    }),
    __metadata("design:type", String)
], Element.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: "renta",
    }),
    __metadata("design:type", String)
], Element.prototype, "operation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: 0,
    }),
    __metadata("design:type", Number)
], Element.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: "-0.15899762074480503",
    }),
    __metadata("design:type", String)
], Element.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: "-78.46525402178685",
    }),
    __metadata("design:type", String)
], Element.prototype, "longitude", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        default: ["J"],
    }),
    __metadata("design:type", String)
], Element.prototype, "schedule", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Element.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Element.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Element.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Element.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Element.prototype, "authorName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Element.prototype, "authorNationality", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Element.prototype, "authorPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Element.prototype, "authorEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "none" }),
    __metadata("design:type", String)
], Element.prototype, "plan", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "none" }),
    __metadata("design:type", String)
], Element.prototype, "deadline", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Element.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Element.prototype, "videos", void 0);
exports.Element = Element = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], Element);
exports.ElementSchema = mongoose_1.SchemaFactory.createForClass(Element);
//# sourceMappingURL=element.schema.js.map