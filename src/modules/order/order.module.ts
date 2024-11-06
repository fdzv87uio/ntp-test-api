import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { OrderService } from './order.service';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]), UserModule, OrderModule, MailModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
