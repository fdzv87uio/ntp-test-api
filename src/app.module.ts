import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PreferenceModule } from './modules/preference/preference.module';

@Module({
  imports: [       
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.MONGO), 
    AuthModule,
    UserModule,
    PreferenceModule,   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
