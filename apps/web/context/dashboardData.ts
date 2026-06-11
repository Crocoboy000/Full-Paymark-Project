



import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  TrendingUp,
  CreditCard,
  Goal,
  BarChart3,
  Blocks,
  Settings,
    BadgeDollarSign,
  ReceiptText,
} from "lucide-react";
import { LucideIcon } from "lucide-react";


export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const sidebarLinks: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Accounts",
    href: "/dashboard/accounts",
    icon: Wallet,
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
  },
  {
    label: "Investments",
    href: "/dashboard/investments",
    icon: TrendingUp,
  },
  {
    label: "Cards",
    href: "/dashboard/cards",
    icon: CreditCard,
  },
  {
    label: "Goals",
    href: "/dashboard/goals",
    icon: Goal,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Integrations",
    href: "/dashboard/integrations",
    icon: Blocks,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];




type StatCardType = {
  title: string;
  value: string;
  change: string;
  subtitle: string;
  trend: "up" | "down";
  icon: LucideIcon;
};

export const statsCards: StatCardType[] = [
  {
    title: "Total Balance",
    value: "$52,143.75",
    change: "-2.45%",
    trend: "down",
    subtitle: "vs last month",
    icon: Wallet,
  },
  {
    title: "Total Income",
    value: "$15,437.00",
    change: "+8.12%",
    trend: "up",
    subtitle: "vs last month",
    icon: BadgeDollarSign,
  },
  {
    title: "Total Expenses",
    value: "$8,212.90",
    change: "-3.10%",
    trend: "down",
    subtitle: "vs last month",
    icon: ReceiptText,
  },
  {
    title: "Net Worth",
    value: "$120,485.80",
    change: "+6.41%",
    trend: "up",
    subtitle: "vs last month",
    icon: TrendingUp,
  },
];




export type RevenuePoint = {
  date: string;
  income: number;
  expenses: number;
};


export const revenueData: RevenuePoint[] = [
  { date: "May 1", income: 32000, expenses: 15000 },
  { date: "May 4", income: 54000, expenses: 24000 },
  { date: "May 8", income: 48000, expenses: 35000 },
  { date: "May 11", income: 76000, expenses: 28000 },
  { date: "May 15", income: 29000, expenses: 72000 },
  { date: "May 18", income: 45000, expenses: 55000 },
  { date: "May 22", income: 52000, expenses: 38000 },
  { date: "May 25", income: 61000, expenses: 42000 },
  { date: "May 29", income: 59000, expenses: 47000 },
];


export type SpendingCategory = {
  name: string;
  amount: number;
};



export const spendingData: SpendingCategory[] = [
  {
    name: "Housing",
    amount: 2874,
  },
  {
    name: "Food & Dining",
    amount: 1642,
  },
  {
    name: "Transport",
    amount: 1231,
  },
  {
    name: "Shopping",
    amount: 821,
  },
  {
    name: "Entertainment",
    amount: 656,
  },
  {
    name: "Others",
    amount: 985,
  },
];


export const spendingColors = [
  "#FF8975",
  "#F07C68",
  "#D46A58",
  "#B85B4C",
  "#8C8E97",
  "#55585E",
];

import {
  Send,
  Plus,
  Receipt,
  Target,
} from "lucide-react";

export const quickActions = [
  {
    label: "Send Money",
    icon: Send,
  },
  {
    label: "Add Money",
    icon: Plus,
  },
  {
    label: "Pay Bills",
    icon: Receipt,
  },
  {
    label: "Create Goal",
    icon: Target,
  },
];



export type Activity = {
  title: string;
  date: string;
  amount: string;
  positive: boolean;
};


export const activities = [
  {
    title: "Salary Deposit",
    date: "May 31, 2024",
    amount: "+$5,437",
    positive: true,
  },
  {
    title: "Starbucks Coffee",
    date: "May 30, 2024",
    amount: "-$6.45",
    positive: false,
  },
  {
    title: "Netflix Subscription",
    date: "May 29, 2024",
    amount: "-$15.99",
    positive: false,
  },
  {
    title: "Online Transfer",
    date: "May 28, 2024",
    amount: "-$250",
    positive: false,
  },
];



export const accounts = [
  {
    name: "Primary Checking",
    balance: "$12,457.20",
  },
  {
    name: "Savings Account",
    balance: "$25,680.50",
  },
  {
    name: "Investment Portfolio",
    balance: "$48,006.05",
  },
  {
    name: "Credit Card",
    balance: "-$1,234.00",
  },
];



export const investments = [
  { month: "Jan", value: 40000 },
  { month: "Feb", value: 45000 },
  { month: "Mar", value: 39000 },
  { month: "Apr", value: 50000 },
  { month: "May", value: 54000 },
  { month: "Jun", value: 58000 },
];