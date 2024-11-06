import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EventModule } from './modules/event/event.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UploadModule } from './modules/upload/upload.module';
import { MailController } from './modules/mail/mail.controller';
import { MailService } from './modules/mail/mail.service';
import { MailModule } from './modules/mail/mail.module';
import { TaskModule } from './modules/task/task.module';
import { AnswerModule } from './modules/answer/answer.module';
import { ElementModule } from './modules/element/element.module';
import { PaymentMethodModule } from './modules/paymentMethod/paymentMethod.module';
import { OrderModule } from './modules/order/order.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO),
    AuthModule,
    UserModule,
    EventModule,
    TransactionModule,
    UploadModule, ConfigModule, MailModule, TaskModule, AnswerModule, TaskModule, ElementModule, PaymentMethodModule, OrderModule
  ],
  controllers: [AppController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}

