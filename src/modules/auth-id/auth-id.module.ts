import { Module } from '@nestjs/common';
import { AuthIdTokenService } from './services';
import { AuthIdController } from './controllers/auth-id.controller';
import {ExternalRequestModule } from '../external-request/external-request.module'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthIdTokenSchema } from './schemas/auth-id-token.schema';
import { AuthIdService } from './services/auth-id.service';
import { AuthIdAccountSchema } from './schemas/auth-id-account.schema';


@Module({ 
  imports: [
    ExternalRequestModule,    
    MongooseModule.forFeature([{ name: 'AuthIdToken', schema: AuthIdTokenSchema }]),
    MongooseModule.forFeature([{ name: 'AuthIdAccount', schema: AuthIdAccountSchema }])
  ],   
  providers: [AuthIdTokenService,AuthIdService],
  controllers: [AuthIdController],
  exports: [AuthIdTokenService,AuthIdService]
})
export class AuthIdModule {}
