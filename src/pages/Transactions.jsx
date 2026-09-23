import "../css/pages/transactions.css";

import { useFinance } from "../contexts/FinanceContext";
import TransactionItem from "../components/transactions/TransactionItem";
import { AnimatedPage } from "../components/ui/AnimatedPage";
import { AnimatedItem } from "../components/ui/AnimatedItem";
import { AnimatedList } from "../components/ui/AnimatedList";
import { useState, useEffect } from "react";

function Transactions() {
  const { transactions } = useFinance();

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (categoryFilter === "all") {
        return true;
      }

      return transaction.category === categoryFilter;
    })
    .filter((transaction) =>
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.date) - new Date(a.date);
      }

      if (sortOption === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }

      if (sortOption === "highest") {
        return b.amount - a.amount;
      }

      if (sortOption === "lowest") {
        return a.amount - b.amount;
      }

      if (sortOption === "az") {
        return a.name.localeCompare(b.name);
      }

      if (sortOption === "za") {
        return b.name.localeCompare(a.name);
      }

      return 0;
    });

  const categories = [
    ...new Set(transactions.map((transaction) => transaction.category)),
  ];

  

  return (
    <AnimatedPage className="transactions-page">
      {/* Page Header */}
      <AnimatedItem>
        <div className="transactions-header">
          <h1>Transactions</h1>
        </div>
      </AnimatedItem>

      {/* Transactions Card */}
      <AnimatedItem>
        <div className="transactions-card">
          {/* Toolbar */}
          <div className="transactions-toolbar">
            <input
              className="transactions-search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search transactions yami..."
            />

            <div className="transactions-actions">
              <select
                className="toolbar-btn"
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value)}
              >
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="highest">Sort: Highest Amount</option>
                <option value="lowest">Sort: Lowest Amount</option>
                <option value="az">Sort: A-Z</option>
                <option value="za">Sort: Z-A</option>
              </select>

              <select
                className="toolbar-btn"
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                <option value="all">Filter: All</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Transaction Table */}
          <AnimatedList className="transaction-table">
            {/* Table Header */}
            <div className="transaction-header">
              <div>Recipient / Sender</div>
              <div>Category</div>
              <div>Date</div>
              <div style={{ textAlign: "right" }}>Amount</div>
            </div>

            {/* Transaction Rows */}
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <AnimatedItem key={transaction.id}>
                  <TransactionItem
                    transaction={transaction}
                    onMoreClick={setSelectedTransaction}
                  />
                </AnimatedItem>
              ))
            ) : (
              <div className="transactions-empty">
                <h3>No transactions found</h3>
                <p>
                  We couldn't find any transactions matching your search or
                  filter.
                </p>
              </div>
            )}
          </AnimatedList>

      

          {/* Pagination */}
          {/* <div className="pagination">
            <button className="page-btn">← Prev</button>

            <div className="page-numbers">
              <div className="page-number active">1</div>
              <div className="page-number">2</div>
              <div className="page-number">3</div>
            </div>

            <button className="page-btn">Next →</button>
          </div> */}
        </div>
      </AnimatedItem>

    {selectedTransaction && (
  <div className="transaction-modal-overlay">
    <div className="transaction-modal">
      <button
        className="transaction-modal-close"
        onClick={() => setSelectedTransaction(null)}
      >
        ×
      </button>

      <h2>{selectedTransaction.name}</h2>

      <p>Category: {selectedTransaction.category}</p>

      <p>Date: {selectedTransaction.date}</p>

      <p>
        Amount:{" "}
        {selectedTransaction.amount.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        })}
      </p>

      <p>Type: {selectedTransaction.type}</p>
    </div>
  </div>
)}
    </AnimatedPage>
  );
}

export default Transactions;
