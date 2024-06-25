import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<Transaction>
    ) {}

    async findAllTransactions(): Promise<Transaction[]> {
        const transactions = await this.transactionModel.find();
        return transactions;
    }

    async findAllTransactionsByUserEmail(email: string): Promise<Transaction[]> {
        const res = await this.transactionModel.find({ userEmail: email });
        if (!res) {
            throw new NotFoundException('Transactions Not Found');
        }
        return res;
    }

    async createTransaction(transaction: Transaction): Promise<Transaction> {
        const res = await this.transactionModel.create(transaction);
        return res;
    }

    async deleteTransactionById(id: string): Promise<Transaction> {
        const res = await this.transactionModel.findByIdAndDelete(id);
        return res;
    }

}
