function BudgetCard({ budget, spent }) {
  const percentage = (spent / budget.maximum) * 100;

  const remaining = budget.maximum - spent;

  return (
    <div className="budget-card">
      <div className="budget-card-top">
        <div className="budget-title">
          <div
            className="budget-theme"
            style={{
              background: budget.theme,
            }}
          />

          <h3>{budget.category}</h3>
        </div>

        <button className="menu-button">•••</button>
      </div>

      <p className="budget-limit">
        Maximum of{" "}
        {budget.maximum.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        })}
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            background: budget.theme,
          }}
        />
      </div>

      <div className="budget-footer">
        <div className="footer-box">
          <h4>
            {spent.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </h4>
          <p>Spent</p>
        </div>

        <div className="footer-box">
          <h4>
            {remaining.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </h4>
          <p>Remaining</p>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;
