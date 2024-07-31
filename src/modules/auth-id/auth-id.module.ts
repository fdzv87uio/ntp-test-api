import { Module } from '@nestjs/common';
import { AuthIdTokenService } from './services';
import { AuthIdController } from './controllers/auth-id.controller';
import {ExternalRequestModule } from '../external-request/external-request.module'
import { MongooseModule } from '@nestjs/mongoose';
import { AuthIdTokenSchema } from './schemas/auth-id-token.schema';
import { AuthIdService } from './services/auth-id.service';
import { AuthIdAccountSchema } from './schemas/auth-id-account.schema';
import { AuthIdRepositoryService } from './services/auth-id-respository.service';


@Module({ 
  imports: [
    ExternalRequestModule,    
    MongooseModule.forFeature([{ name: 'AuthIdToken', schema: AuthIdTokenSchema }]),
    MongooseModule.forFeature([{ name: 'AuthIdAccount', schema: AuthIdAccountSchema }])
  ],   
  providers: [AuthIdTokenService,AuthIdService,AuthIdRepositoryService],
  controllers: [AuthIdController],
  exports: [AuthIdTokenService,AuthIdService,AuthIdRepositoryService]
})
export class AuthIdModule {}
