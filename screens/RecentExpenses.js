import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function ManageExpenses() {
  return (
    <ExpensesOutput expensesPeriod={"Last 7 days"}  />
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

export default ManageExpenses;
