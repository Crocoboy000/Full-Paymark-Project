import { LucideIcon, Send, Plus, LayoutDashboard, Wallet, ArrowLeftRight, TrendingUp, CreditCard, Goal, BarChart3, Blocks, Settings } from "lucide-react";

export type SidebarNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};


export const quickActions =

 [ 
  
  { label: "Send Money",
    icon: Send,
    href: "/dashboard/transfer",
   },

   { 
    label: "Add Money",
    icon: Plus,
    href: "/dashboard/wallet",
  },

  ];



   export const sidebarLinks: SidebarNavItem[] = [ { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, }, { label: "Accounts", href: "/dashboard/accounts", icon: Wallet, }, { label: "Transactions", href: "/dashboard/transactions", icon: ArrowLeftRight, }, { label: "Investments", href: "/dashboard/investments", icon: TrendingUp, }, { label: "Cards", href: "/dashboard/cards", icon: CreditCard, }, { label: "Goals", href: "/dashboard/goals", icon: Goal, }, { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, }, { label: "Integrations", href: "/dashboard/integrations", icon: Blocks, }, { label: "Settings", href: "/dashboard/settings", icon: Settings, }, ];
  export type QuickAction = {
    label: string;
    icon: LucideIcon;
  };