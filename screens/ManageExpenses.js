import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpenses/ExpenseForm";

//we will use the "route" prop to extract the id:
function ManageExpenses({ route, navigation }) {
  // to trigger the deletion function, we need access to context:
  const expensesCtx = useContext(ExpensesContext);
  const editExpenseId = route.params?.expenseId;
  //to convert an elenent to a boolean, we use: !! in this way, a falsy value turns into false, and a truthy value turns into true
  const isEditing = !!editExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add expense",
    });
  }, [navigation, isEditing]);

  function deleteExpensesHandler() {
    //to delete an item, the items id should be passed:
    expensesCtx.deleteExpense(editExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(editExpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  } //connection on confirmHandler to ExpenseForm.js will be through thr onSubmit prop in <ExpenseForm>:

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLable={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
      />
      <TextInput />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpensesHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
    // alignItems: "center",
    // justifyContent: "center",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpenses;
