import { Model } from 'mongoose';
import { PaymentMethod } from './schemas/paymentMethod.schema';
import { MailService } from '../mail/mail.service';
export declare class PaymentMethodService {
    private paymentMethodModel;
    private readonly mailService;
    constructor(paymentMethodModel: Model<PaymentMethod>, mailService: MailService);
    findAllPaymentMehtods(): Promise<PaymentMethod[]>;
    findAllPaymentMehtodsByUserEmail(email: string): Promise<PaymentMethod[]>;
    createPaymentMethod(paymentMethod: PaymentMethod): Promise<PaymentMethod>;
    deletePaymentMethodById(id: string): Promise<PaymentMethod>;
    activatePaymentMethodById(id: string): Promise<any>;
    processPayment(): Promise<any>;
}
