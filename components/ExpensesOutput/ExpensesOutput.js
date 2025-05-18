import { View, Text, FlatList, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";
//a shoet expenses of expenses + list of relevant expenses
// i will destructur what i expect to get from the props:

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.25,
    date: new Date("2023-01-12"),
  },
  {
    id: "e2",
    description: "A pair of pants",
    amount: 39.99,
    date: new Date("2023-01-13"),
  },
  {
    id: "e3",
    description: "A pair of socks",
    amount: 19.5,
    date: new Date("2023-01-14"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 10.65,
    date: new Date("2024-05-14"),
  },
  {
    id: "e5",
    description: "A pair of shoes",
    amount: 59.25,
    date: new Date("2023-01-12"),
  },
  {
    id: "e6",
    description: "A pair of pants",
    amount: 39.99,
    date: new Date("2023-01-13"),
  },
  {
    id: "e7",
    description: "A pair of socks",
    amount: 19.5,
    date: new Date("2023-01-14"),
  },
  {
    id: "e8",
    description: "A book",
    amount: 10.65,
    date: new Date("2024-05-14"),
  },
];
function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
