import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { UserService } from '../user/services/user.service';
import { MailService } from '../mail/mail.service';


@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>,
        private userService: UserService,
        private mailService: MailService
    ) {}

    async findAllOrders(): Promise<Order[]> {
        const orders = await this.orderModel.find();
        return orders;
    }

    async findAllOrdersByUserEmail(email: string): Promise<Order[]> {
        const res = await this.orderModel.find({ userEmail: email });
        if (!res) {
            throw new NotFoundException('Orders Not Found');
        }
        return res;
    }

    async createOrder(order: Order): Promise<Order> {
        const currentUser = await this.userService.findOneById(order.userId);
        if (!currentUser) {
            throw new NotFoundException('User Not Found');
        } else {
            const current: any = currentUser;
            const planString = order.item.split('-');
            const dayNumber = parseInt(planString[1]);
            current.plan = [planString[0]];
            const today = new Date()
            const dealine = new Date(today);
            dealine.setDate(today.getDate() + dayNumber);
            current.deadline = dealine;
            const res = await this.userService.updateById(order.userId, current);
            if (res) {
                //send email
                const result = await this.orderModel.create(order);
                const msg = `Estimado usuario, Muchas Gracias por preferir PICOSA:NET. El siguente plan ha sido activado: ${order.item}. Su plan caduca el ${dealine}.`
                await this.mailService.sendSimpleEmail(currentUser.email, msg)
                const msg2 = `Estimado Administrador, Le notificamos que el usuario ${currentUser.email} ha creado una orden. Ingrese al sistema para activarla.`
                await this.mailService.sendSimpleEmail(currentUser.email, msg2)
                return result;
            }
        }

    }

    async deleteOrderById(id: string): Promise<Order> {
        const res = await this.orderModel.findByIdAndDelete(id);
        return res;
    }

}
