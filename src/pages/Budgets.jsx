import { useFinance } from "../contexts/FinanceContext";
import BudgetCard from "../components/budgets/BudgetCard";
import BudgetDonut from "../components/ui/BudgetDonut";
import { AnimatedPage } from "../components/ui/AnimatedPage";
import { AnimatedItem } from "../components/ui/AnimatedItem";
import { AnimatedList } from "../components/ui/AnimatedList";

import "../css/pages/budgets.css";
import "../css/components/donutChart.css";

function Budgets() {
  const { budgets, transactions } = useFinance();

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

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.maximum, 0);

  return (
    <AnimatedPage className="budgets-page">
      {/* Page Header */}
      <AnimatedItem>
        <div className="budgets-header">
          <h1>Budgets</h1>
        </div>
      </AnimatedItem>

      {/* Budgets Content */}
      <div className="budgets-layout">
        {/* Spending Summary */}
        <AnimatedItem>
          <aside className="budget-summary">
            <h2>Spending Summary</h2>

            <div className="budget-circle">
              <BudgetDonut
                budgets={budgetsWithSpent}
                totalAmount={totalBudget.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
                totalLabel="Total Budget"
              />
            </div>

            <div className="spending-list">
              {budgetsWithSpent.map((budget) => (
                <div className="spending-item" key={budget.id}>
                  <div className="spending-left">
                    <div
                      className="color-dot"
                      style={{
                        background: budget.theme,
                      }}
                    />

                    <span className="spending-name">{budget.category}</span>
                  </div>

                  <span className="spending-amount">
                    {budget.spent.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </aside>
        </AnimatedItem>

        {/* Budget Cards */}
        <AnimatedList className="budget-list">
          {budgets.map((budget) => (
            <AnimatedItem key={budget.id}>
              <BudgetCard
                budget={budget}
                spent={getBudgetSpent(budget.category)}
              />
            </AnimatedItem>
          ))}
        </AnimatedList>
      </div>
    </AnimatedPage>
  );
}

export default Budgets;
