"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const common_1 = require("@nestjs/common");
exports.Email = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user ? request.user.email : null;
});
//# sourceMappingURL=email.decorator.js.map