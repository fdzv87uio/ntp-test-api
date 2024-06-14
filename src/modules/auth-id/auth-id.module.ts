import { Module } from '@nestjs/common';
import { AuthIdTokenService } from './services';
import { AuthIdController } from './controllers/auth-id.controller';
import {ExternalRequestModule } from '../external-request/external-request.module'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthIdTokenSchema } from './schemas/auth-id-token.schema';


@Module({ 
  imports: [
    ExternalRequestModule,    
    MongooseModule.forFeature([{ name: 'AuthIdToken', schema: AuthIdTokenSchema }])
  ],   
  providers: [AuthIdTokenService],
  controllers: [AuthIdController]
})
export class AuthIdModule {}
