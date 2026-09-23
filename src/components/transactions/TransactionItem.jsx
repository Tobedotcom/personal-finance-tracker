import transactionAvatar from "../../assets/images/icon-transaction.svg";

function TransactionItem({ transaction, onMoreClick }) {
  return (
    <div className="transaction-item">
      <div className="transaction-left">
        <div className="transaction-avatar">
          <img src={transactionAvatar} alt="" />
        </div>

        <div className="transaction-name-container">
          <div className="transaction-name">{transaction.name}</div>

       <button
  className="transaction-more-button"
  onClick={() => {
    console.log("CLICKED", transaction);
    onMoreClick(transaction);
  }}
>
  •••
</button>
        </div>
      </div>

      <div>{transaction.category}</div>

      <div className="transaction-date">{transaction.date}</div>

      <div
        className={`transaction-amount ${
          transaction.type === "income" ? "income" : "expense"
        }`}
      >
        {transaction.type === "income" ? "+" : "-"}
        {transaction.amount.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        })}
      </div>
    </div>
  );
}

export default TransactionItem;
