import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { TransactionType } from './interfaces/transaction.interface';
import { TransactionDTO } from './dtos/transaction.dto';

@ApiTags('Transactions')
@Controller('transaction')
export class TransactionController {
    constructor(
        private transactionService: TransactionService
    ) {}

    // Get All Existing Transactions
    @ApiOperation({ summary: 'Get All Transactions' })
    @Get()
    async getAllTransactions(): Promise<TransactionType[]> {
        return this.transactionService.findAllTransactions();
    }

    // Get All Existing Transactions by User Email
    @ApiOperation({ summary: 'Get All Transactions by User ID' })
    @Get('getAllByUserEmail/:email')
    async getAllTransactionsByUserEmail(@Param('email') userEmail: string): Promise<TransactionType[]> {
        return this.transactionService.findAllTransactionsByUserEmail(userEmail);
    }

    // Create New Transaction
    @ApiOperation({ summary: 'Create New Transaction' })
    @Post('new')
    async createTransaction(@Body() transaction: TransactionDTO): Promise<TransactionType> {

        return this.transactionService.createTransaction(transaction)
    }

    // Delete Transaction
    @ApiOperation({ summary: 'Delete Transaction' })
    @Delete(':id')
    async deleteTransaction(@Param('id') id: string): Promise<TransactionType> {
        return this.transactionService.deleteTransactionById(id);
    }


}
