import { View, Text, FlatList } from "react-native";
import ExpenseItem from "../ExpenseItem";
import { GlobalStyles } from "../../constants/styles";

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
