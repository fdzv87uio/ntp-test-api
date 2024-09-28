import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
export declare class TransactionService {
    private transactionModel;
    constructor(transactionModel: Model<Transaction>);
    findAllTransactions(): Promise<Transaction[]>;
    findAllTransactionsByUserEmail(email: string): Promise<Transaction[]>;
    createTransaction(transaction: Transaction): Promise<Transaction>;
    deleteTransactionById(id: string): Promise<Transaction>;
}
