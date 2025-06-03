import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { getDateMinusDays } from "../util/date";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function RecentExpenses() {
  //i want to have local state here to know if we are loading data or not:
  const [isFetching, setIsFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);
  // const [fetchedExpenses, setFetchedExpenses] = useState([]);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses(); // This now refers to the imported function
      setIsFetching(false);
      const expensesWithDates = expenses.map((expense) => ({
        ...expense,
        date: new Date(expense.date),
      }));
      expensesCtx.setAllExpenses(expensesWithDates);
      // const expensesWithDates = expenses.map((expense) => ({
      //   ...expense,
      //   date: new Date(expense.date),
      // }));
      // setFetchedExpenses(expensesWithDates);
    }
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    //const recentExpenses = fetchedExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expensesPeriod={"Last 7 days"}
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RecentExpenses;
