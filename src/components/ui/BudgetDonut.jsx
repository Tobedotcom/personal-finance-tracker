import DonutChart from "./DonutChart";

function BudgetDonut({ budgets, totalLabel, totalAmount }) {
  const donutData = budgets.map((budget) => ({
    label: budget.category,
    value: budget.spent,
    color: budget.theme,
  }));

  return (
    <DonutChart
      data={donutData}
      size={220}
      strokeWidth={24}
      animationDuration={1}
      animationDelayPerSegment={0.1}
      highlightOnHover={true}
      centerContent={
        <div className="budget-circle-inner">
          <h3>{totalAmount}</h3>
          <p>{totalLabel}</p>
        </div>
      }
    />
  );
}

export default BudgetDonut;