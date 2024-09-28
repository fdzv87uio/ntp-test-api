import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/services/user.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    private config;
    constructor(userService: UserService, config: ConfigService);
    validate(payload: any): Promise<import("../../user/interfaces/user.interface").User>;
}
export {};
