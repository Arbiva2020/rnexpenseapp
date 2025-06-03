import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  // here i wuill hold the expenses array, and a few methods that will be used to manage and change expenses
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setAllExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

// the expenseReducer function will be connected to the useReducer hook, so it will handle the state.
function expensesReducer(state, action) {
  //checking the type of action we recieve:
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "SET":
      // firebase stor data according to publishing date. we would like to alter this:
      //the original array is the action.payload
      const inverted = action.payload.reverse();
      return inverted;
    //return action.payload;
    case "UPDATE":
      //"findindex()" is a js method that returns the index of the first element in the array that matches our demands.
      //meaning that when the id of an element will match the action.payload.id, we will return it.
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data }; //we will override the old data with the new data, but kepp the same id
      const updataedExpenses = [...state];
      updataedExpenses[updatableExpenseIndex] = updatedItem; //we will replace the old item with the new one
      return updataedExpenses;
    case "DELETE":
      //we will filter the state array and return a new array that does not include the expense with the id we want to delete
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  //tha state managment logic:
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  //the "action" parameter in the expenseReducer function is the value we dispatch here:
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setAllExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense({ id, expenseData }) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  //bundeling everything to expose it to the context, and through it to the components that need it:
  const value = {
    expenses: expensesState,
    setAllExpenses: setAllExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
