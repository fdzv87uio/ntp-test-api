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
exports.GeolocationService = void 0;
const common_1 = require("@nestjs/common");
const geolocation_utils_1 = require("./utils/geolocation.utils");
let GeolocationService = class GeolocationService {
    constructor() { }
    async findAllGeolocationsByQuery(query) {
        const locations = await (0, geolocation_utils_1.getAllGeolocationsByQuery)(query);
        return locations;
    }
    ;
    async findOneGeolocationByQuery(query) {
        const locations = await (0, geolocation_utils_1.getOneGeolocationByQuery)(query);
        return locations;
    }
};
exports.GeolocationService = GeolocationService;
exports.GeolocationService = GeolocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GeolocationService);
//# sourceMappingURL=geolocation.service.js.map