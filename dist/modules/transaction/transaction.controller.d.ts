import { TransactionService } from './transaction.service';
import { TransactionType } from './interfaces/transaction.interface';
import { TransactionDTO } from './dtos/transaction.dto';
export declare class TransactionController {
    private transactionService;
    constructor(transactionService: TransactionService);
    getAllTransactions(): Promise<TransactionType[]>;
    getAllTransactionsByUserEmail(userEmail: string): Promise<TransactionType[]>;
    createTransaction(transaction: TransactionDTO): Promise<TransactionType>;
    deleteTransaction(id: string): Promise<TransactionType>;
}
