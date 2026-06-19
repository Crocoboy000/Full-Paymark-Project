
import { CreateTransactionInput } from '@paymark/validations';

import { TransactionCategory,TransactionType } from '@prisma/client';


export class CreateTransactionDto implements CreateTransactionInput {

  senderAccountId!: string;


  receiverAccountId?: string;

  amount!: number;


  type!: TransactionType;


  category?: TransactionCategory;


  description?: string;

  externalReference?: string;
}


export class CreateTransferDto {
  senderAccountId: string;

  receiverAccountId: string;

  amount: number;

  description?: string;
}