import { AccountType } from './accounts';

export enum TransactionTypeEnum {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  TRANSFER = "TRANSFER",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum TransactionCategory {
  FOOD = "FOOD",
  TRANSPORT = "TRANSPORT",
  SHOPPING = "SHOPPING",
  ENTERTAINMENT = "ENTERTAINMENT",
  HOUSING = "HOUSING",
  SALARY = "SALARY",
  INVESTMENT = "INVESTMENT",
  OTHER = "OTHER",
}

export type TransactionType = typeof TransactionTypeEnum[keyof typeof TransactionTypeEnum];

export type Transaction = {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  externalReference: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TransactionInput = Omit<Transaction, "id" | "createdAt" | "updatedAt">;

export type TransferRecipientAccount = {
  id: string;
  name: string;
  type: AccountType;
};

export type SearchRecipientUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accounts: TransferRecipientAccount[];
};

export type SearchRecipientResponse =
  | { message: string }
  | {
      message: string;
      data: SearchRecipientUser;
    };

export type TransferInput = {
  senderAccountId: string;
  receiverAccountId: string;
  amount: number;
  description?: string;
};
