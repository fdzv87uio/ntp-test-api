import { PaymentMethodService } from './paymentMethod.service';
import { PaymentMethodType } from './interfaces/paymentMethod.interface';
import { PaymentMethodDTO } from './dtos/createPaymentMethod.dto';
export declare class PaymentMethodController {
    private paymentMethodService;
    constructor(paymentMethodService: PaymentMethodService);
    getAllPaymentMethods(): Promise<PaymentMethodType[]>;
    getAllPaymentMethodsByUserEmail(email: string): Promise<PaymentMethodType[]>;
    createPaymentMethod(paymentMethod: PaymentMethodDTO): Promise<PaymentMethodType>;
    deletePaymentMethod(id: string): Promise<PaymentMethodType>;
    activatePaymentMethod(id: string): Promise<PaymentMethodType[]>;
}
