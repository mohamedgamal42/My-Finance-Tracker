import { createContext, useState } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  removeExpense: (expense) => {},
});

const ExpenseContextProvider = ({ children }) => {
  const [expenseIds, setExpenseIds] = useState([]);

  const addExpense = (expense) => {
    setExpenseIds((currentExpenseIds) => [...currentExpenseIds, expense]);
  };
  const removeExpense = (id) => {
    setExpenseIds((currentExpenseIds) =>
      currentExpenseIds.filter((expenseID) => expenseID !== id)
    );
  };

  const value = {
    expenses: expenseIds,
    addExpense:addExpense,
    removeExpense:removeExpense,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

export default ExpenseContextProvider;
