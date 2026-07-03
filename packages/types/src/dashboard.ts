import { LucideIcon } from 'lucide-react';
import { TransactionTypeEnum } from './transaction';
import { AccountType } from './accounts';

export type StatCardType = {
  title: string;
  value: string;
  change: string;
  subtitle: string;
  trend: "up" | "down";
  icon: LucideIcon;
};

export type SpendingCategory = {
  name: string;
  amount: number;
};

export type RecentTransaction = {
  id: string;
  description: string;
  amount: number;
  type: TransactionTypeEnum;
  category?: string;
  createdAt: string;
};

export type AccountCard = {
  id: string;
  name: string;
  balance: number;
  type: AccountType;
};

export type DashboardSummary = {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  netWorth: number;
};

export type DashboardChart = {
  date: string;
  income: number;
  expenses: number;
};

export type DashboardRevenue = {
  data: DashboardChart[];
  transactionCount: number;
};

export type DashboardState = {
  summary: DashboardSummary;
  accounts: AccountCard[];
  recentTransactions: RecentTransaction[];
  chartData: DashboardRevenue;
  spendingCategories: SpendingCategory[];
};
