import { Module } from '@nestjs/common';
import { PaymentMethodController } from './paymentMethod.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentMethodSchema } from './schemas/paymentMethod.schema';
import { PaymentMethodService } from './paymentMethod.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'PaymentMethod', schema: PaymentMethodSchema }]), MailModule],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService]
})
export class PaymentMethodModule {}
