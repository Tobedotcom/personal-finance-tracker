import overviewIcon from "../assets/images/icon-nav-overview.svg";
import transactionsIcon from "../assets/images/icon-nav-transactions.svg";
import budgetsIcon from "../assets/images/icon-nav-budgets.svg";
import potsIcon from "../assets/images/icon-nav-pots.svg";
import recurringBillsIcon from "../assets/images/icon-nav-recurring-bills.svg";

export const navigation = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: overviewIcon,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: transactionsIcon,
  },
  {
    title: "Budgets",
    path: "/budgets",
    icon: budgetsIcon,
  },
  {
    title: "Pots",
    path: "/pots",
    icon: potsIcon,
  },
  {
    title: "Recurring Bills",
    path: "/recurring-bills",
    icon: recurringBillsIcon,
  },
];