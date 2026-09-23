import { useFinance } from "../contexts/FinanceContext";
import Card from "../components/ui/Card";
import BudgetDonut from "../components/ui/BudgetDonut";
import { AnimatedPage } from "../components/ui/AnimatedPage";
import { AnimatedItem } from "../components/ui/AnimatedItem";
import { AnimatedList } from "../components/ui/AnimatedList";

import "../css/pages/dashboard.css";
import "../css/components/donutChart.css";

const formatCurrency = (amount) =>
  amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

function Dashboard() {
  const { transactions, budgets, pots } = useFinance();

  function getBudgetSpent(category) {
    return transactions
      .filter(
        (transaction) =>
          transaction.category === category && transaction.type === "expense",
      )
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  const budgetsWithSpent = budgets.map((budget) => ({
    ...budget,
    spent: getBudgetSpent(budget.category),
  }));

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  const totalSaved = pots.reduce((sum, p) => sum + p.total, 0);
  const totalSpent = budgetsWithSpent.reduce(
    (sum, budget) => sum + budget.spent,
    0,
  );

  const latestTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const topPots = pots.slice(0, 4);

  return (
    <AnimatedPage className="dashboard-page">
      {/* Page Header */}
      <AnimatedItem>
        <h1>Overview</h1>
      </AnimatedItem>

      {/* Stat Cards */}
      <div className="dashboard-stats">
        <AnimatedItem>
          <Card className="stat-card">
            <span>Current Balance</span>
            <strong>{formatCurrency(balance)}</strong>
          </Card>
        </AnimatedItem>

        <AnimatedItem>
          <Card className="stat-card">
            <span>Income</span>
            <strong className="stat-income">{formatCurrency(income)}</strong>
          </Card>
        </AnimatedItem>

        <AnimatedItem>
          <Card className="stat-card">
            <span>Expenses</span>
            <strong className="stat-expense">{formatCurrency(expenses)}</strong>
          </Card>
        </AnimatedItem>
      </div>

      {/* Pots + Transactions */}
      <div className="dashboard-row">
        {/* Pots Summary */}
        <AnimatedItem>
          <Card className="dashboard-block">
            <div className="block-header">
              <h2>Pots</h2>
              <a href="/pots">See Details →</a>
            </div>

            <div className="pots-summary-total">
              <span>Total Saved</span>
              <strong>{formatCurrency(totalSaved)}</strong>
            </div>

            <div className="pots-summary-grid">
              {topPots.map((pot) => (
                <div key={pot.id} className="pots-summary-item">
                  <span
                    className="color-dot"
                    style={{ backgroundColor: pot.theme }}
                  />

                  <div>
                    <span className="pots-summary-name">{pot.name}</span>

                    <strong>{formatCurrency(pot.total)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </AnimatedItem>

        {/* Transactions Preview */}
        <AnimatedItem>
          <Card className="dashboard-block">
            <div className="block-header">
              <h2>Transactions</h2>
              <a href="/transactions">View All →</a>
            </div>

            <AnimatedList className="transactions-preview-list">
              {latestTransactions.map((t) => (
                <AnimatedItem key={t.id}>
                  <div className="transactions-preview-item">
                    <div className="transactions-preview-info">
                      <span className="transaction-name">{t.name}</span>

                      <span className="transaction-category">{t.category}</span>
                    </div>

                    <span
                      className={t.type === "income" ? "income" : "expense"}
                    >
                      {t.type === "income" ? "+" : "-"}
                      {formatCurrency(t.amount)}
                    </span>
                  </div>
                </AnimatedItem>
              ))}
            </AnimatedList>
          </Card>
        </AnimatedItem>
      </div>

      {/* Budgets Breakdown */}
      <AnimatedItem>
        <Card className="dashboard-block">
          <div className="block-header">
            <h2>Budgets (spent)</h2>
            <a href="/budgets">See Details →</a>
          </div>

          <div className="dashboard-budgets-layout">
            {/* Budget Donut */}
            <AnimatedItem>
              <div className="budget-circle">
                <BudgetDonut
                  budgets={budgetsWithSpent}
                  totalAmount={formatCurrency(totalSpent)}
                  totalLabel={`of ${budgets.length} categories`}
                />
              </div>
            </AnimatedItem>

            {/* Spending Breakdown */}
            <AnimatedList className="spending-list">
              {budgetsWithSpent.map((b) => (
                <AnimatedItem key={b.id}>
                  <div className="spending-item">
                    <div className="spending-left">
                      <span
                        className="color-dot-bar"
                        style={{
                          backgroundColor: b.theme,
                        }}
                      />

                      <span className="spending-name">{b.category}</span>
                    </div>

                    <span className="spending-amount">
                      {formatCurrency(b.spent)}
                    </span>
                  </div>
                </AnimatedItem>
              ))}
            </AnimatedList>
          </div>
        </Card>
      </AnimatedItem>
    </AnimatedPage>
  );
}

export default Dashboard;
