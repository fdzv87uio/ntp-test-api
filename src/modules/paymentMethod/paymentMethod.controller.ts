import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentMethodService } from './paymentMethod.service';
import { PaymentMethodType } from './interfaces/paymentMethod.interface';
import { PaymentMethodDTO } from './dtos/createPaymentMethod.dto';


@ApiTags('PaymentMethods')
@Controller('paymentMethods')
export class PaymentMethodController {
    constructor(
        private paymentMethodService: PaymentMethodService,
    ) {}

    // Get All Existing PaymentMethods
    @ApiOperation({ summary: 'Get All PaymentMethods' })
    @ApiBearerAuth()
    @Get()
    async getAllPaymentMethods(): Promise<PaymentMethodType[]> {
        return this.paymentMethodService.findAllPaymentMehtods();
    }

    // Get All Existing PaymentMethods by User ID
    @ApiOperation({ summary: 'Get All PaymentMethods by User Email' })
    @ApiBearerAuth()
    @Get('getAllByUserEmail/:email')
    async getAllPaymentMethodsByUserEmail(@Param('email') email: string): Promise<PaymentMethodType[]> {
        return this.paymentMethodService.findAllPaymentMehtodsByUserEmail(email);
    }

    // Create New PaymentMethod
    @ApiOperation({ summary: 'Create New PaymentMethod' })
    @ApiBearerAuth()
    @Post('new')
    async createPaymentMethod(@Body() paymentMethod: PaymentMethodDTO): Promise<PaymentMethodType> {

        return this.paymentMethodService.createPaymentMethod(paymentMethod)
    }

    // Delete PaymentMethod
    @ApiOperation({ summary: 'Delete PaymentMethod' })
    @ApiBearerAuth()
    @Delete(':id')
    async deletePaymentMethod(@Param('id') id: string): Promise<PaymentMethodType> {
        return this.paymentMethodService.deletePaymentMethodById(id);
    }

    // Activate Payment Method by Id
    @ApiOperation({ summary: 'Activate Payment Method by Id' })
    @ApiBearerAuth()
    @Get('activate/:id')
    async activatePaymentMethod(@Param('id') id: string): Promise<PaymentMethodType[]> {
        return this.paymentMethodService.activatePaymentMethodById(id);
    }


}
