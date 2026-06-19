export enum AccountType {
  CHECKING = "CHECKING",
  SAVINGS = "SAVINGS",
  CREDIT = "CREDIT",
  INVESTMENT = "INVESTMENT",
  CASH = "CASH",
}

export type Account = {
  id: string;
  name: string;
  balance: number;
  type: AccountType;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
