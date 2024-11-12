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
exports.GeolocationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const geolocation_service_1 = require("./geolocation.service");
let GeolocationController = class GeolocationController {
    constructor(geolocationService) {
        this.geolocationService = geolocationService;
    }
    async getAllTransactionsByUserEmail(query) {
        return this.geolocationService.findAllGeolocationsByQuery(query);
    }
    async getOneTransactionsByUserEmail(query) {
        return this.geolocationService.findOneGeolocationByQuery(query);
    }
};
exports.GeolocationController = GeolocationController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get All Locations by query' }),
    (0, common_1.Get)('getAllByQuery/:query'),
    __param(0, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeolocationController.prototype, "getAllTransactionsByUserEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get One Location by Query' }),
    (0, common_1.Get)('getOneByQuery/:query'),
    __param(0, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GeolocationController.prototype, "getOneTransactionsByUserEmail", null);
exports.GeolocationController = GeolocationController = __decorate([
    (0, swagger_1.ApiTags)('Geolocation'),
    (0, common_1.Controller)('geolocation'),
    __metadata("design:paramtypes", [geolocation_service_1.GeolocationService])
], GeolocationController);
//# sourceMappingURL=geolocation.controller.js.map