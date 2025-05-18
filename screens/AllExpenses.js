import { View, StyleSheet, Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function AllExpenses() {
  return (
    <ExpensesOutput expensesPeriod={"Total"} fallbackText="No registered expenses found!" />
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

export default AllExpenses;
