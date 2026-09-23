import { createContext, useContext, useEffect, useState } from "react";

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [pots, setPots] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFinanceData() {
      try {
        setLoading(true);
        setError(null);

        const [transactionsResponse, budgetsResponse, potsResponse] =
          await Promise.all([
            fetch("http://localhost:3000/transactions"),
            fetch("http://localhost:3000/budgets"),
            fetch("http://localhost:3000/pots"),
          ]);

        if (
          !transactionsResponse.ok ||
          !budgetsResponse.ok ||
          !potsResponse.ok
        ) {
          throw new Error("Failed to fetch finance data");
        }

        const transactionsData = await transactionsResponse.json();
        const budgetsData = await budgetsResponse.json();
        const potsData = await potsResponse.json();

        setTransactions(transactionsData);
        setBudgets(budgetsData);
        setPots(potsData);
      } catch (error) {
        console.error("Error fetching finance data:", error);
        setError("Unable to load finance data.");
      } finally {
        setLoading(false);
      }
    }

    fetchFinanceData();
  }, []);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        budgets,
        pots,
        setTransactions,
        setBudgets,
        setPots,
        loading,
        error,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  return useContext(FinanceContext);
}