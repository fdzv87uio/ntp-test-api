import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentMethod } from './schemas/paymentMethod.schema';
import { capturePayment, createPayment, getAccessToken, PaymentDetails } from './utils/paypalUtils';
import { MailService } from '../mail/mail.service';

@Injectable()
export class PaymentMethodService {
    constructor(
        @InjectModel(PaymentMethod.name) private paymentMethodModel: Model<PaymentMethod>,
        private readonly mailService: MailService,
    ) {}

    async findAllPaymentMehtods(): Promise<PaymentMethod[]> {
        const paymentMethods = await this.paymentMethodModel.find();
        return paymentMethods;
    }

    async findAllPaymentMehtodsByUserEmail(email: string): Promise<PaymentMethod[]> {
        const res = await this.paymentMethodModel.find({ userEmail: email });
        if (!res) {
            throw new NotFoundException('Payment Mehtods Not Found');
        }
        return res;
    }

    async createPaymentMethod(paymentMethod: PaymentMethod): Promise<PaymentMethod> {
        const res = await this.paymentMethodModel.create(paymentMethod);
        const msg = `Estimado Administrador, Le notificamos que el usuario ${paymentMethod.userEmail} ha creado el siguiente método de pago: ${paymentMethod.description}. Ingrese al sistema para activarla.`
        await this.mailService.sendSimpleEmail(paymentMethod.userEmail, msg)
        return res;
    }

    async deletePaymentMethodById(id: string): Promise<PaymentMethod> {
        const res = await this.paymentMethodModel.findByIdAndDelete(id);
        return res;
    }

    async activatePaymentMethodById(id: string): Promise<any> {
        const res1 = await this.paymentMethodModel.find({ _id: id });
        if (!res1) {
            throw new NotFoundException('Payment Mehtods Not Found');
        } else {
            const current: any = res1[0];
            current.status = "active";
            const res = await this.paymentMethodModel.findOneAndUpdate({ _id: id }, current, {
                new: true,
                runValidators: false
            });
            if (!res) { throw new NotFoundException('Payment Method Not Found not found'); } else {
                //send email
                const msg = `Estimado usuario, Le notificamos que el siguente método de pago ha sido activado: ${current.description}, Ahora puede realizar compras en nuestras plataforma.`
                await this.mailService.sendSimpleEmail(current.userEmail, msg)
                return res;
            }
        }
    }


    async processPayment(): Promise<any> {
        try {
            const accessToken = await getAccessToken();
            const paymentDetails: PaymentDetails = {
                amount: '10.00',
                currency: 'USD',
                description: 'Test payment',
            };

            const orderResponse = await createPayment(accessToken, paymentDetails);
            console.log('Order created:', orderResponse);

            const captureResponse = await capturePayment(accessToken, orderResponse.id);
            console.log('Payment captured:', captureResponse);

        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }

}

