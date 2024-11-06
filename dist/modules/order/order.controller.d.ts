import { OrderService } from './order.service';
import { OrderType } from './interfaces/order.interface';
import { OrderDTO } from './dtos/createPaymentMethod.dto';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    getAllOrders(): Promise<OrderType[]>;
    getAllOrdersByUserEmail(userEmail: string): Promise<OrderType[]>;
    createOrder(paymentMethod: OrderDTO): Promise<OrderType>;
    deleteOrder(id: string): Promise<OrderType>;
}
