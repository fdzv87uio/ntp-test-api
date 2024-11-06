import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderType } from './interfaces/order.interface';
import { OrderDTO } from './dtos/createPaymentMethod.dto';


@ApiTags('Orders')
@Controller('order')
export class OrderController {
    constructor(
        private orderService: OrderService,
    ) {}

    // Get All Existing Orders
    @ApiOperation({ summary: 'Get All Orders' })
    @ApiBearerAuth()
    @Get()
    async getAllOrders(): Promise<OrderType[]> {
        return this.orderService.findAllOrders();
    }

    // Get All Existing Orders by User Email
    @ApiOperation({ summary: 'Get All Orders by User ID' })
    @ApiBearerAuth()
    @Get('getAllByUserEmail/:email')
    async getAllOrdersByUserEmail(@Param('email') userEmail: string): Promise<OrderType[]> {
        return this.orderService.findAllOrdersByUserEmail(userEmail);
    }

    // Create New Order
    @ApiOperation({ summary: 'Create New Order' })
    @ApiBearerAuth()
    @Post('new')
    async createOrder(@Body() paymentMethod: OrderDTO): Promise<OrderType> {

        return this.orderService.createOrder(paymentMethod)
    }

    // Delete Order
    @ApiOperation({ summary: 'Delete Order' })
    @ApiBearerAuth()
    @Delete(':id')
    async deleteOrder(@Param('id') id: string): Promise<OrderType> {
        return this.orderService.deleteOrderById(id);
    }


}
