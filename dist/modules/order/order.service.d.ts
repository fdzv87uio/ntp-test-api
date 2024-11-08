import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { UserService } from '../user/services/user.service';
import { MailService } from '../mail/mail.service';
export declare class OrderService {
    private orderModel;
    private userService;
    private mailService;
    constructor(orderModel: Model<Order>, userService: UserService, mailService: MailService);
    findAllOrders(): Promise<Order[]>;
    findAllOrdersByUserEmail(email: string): Promise<Order[]>;
    getQuota(plan: string): 8 | 3;
    createOrder(order: Order): Promise<Order>;
    deleteOrderById(id: string): Promise<Order>;
}
