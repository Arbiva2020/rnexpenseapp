import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpenses/ExpenseForm";
import { storeExpense } from "../util/http";

//we will use the "route" prop to extract the id:
function ManageExpenses({ route, navigation }) {
  // to trigger the deletion function, we need access to context:
  const expensesCtx = useContext(ExpensesContext);
  const editExpenseId = route.params?.expenseId;
  //to convert an elenent to a boolean, we use: !! in this way, a falsy value turns into false, and a truthy value turns into true
  const isEditing = !!editExpenseId;

  //when we want to edit a specific expense, we want the values of that expense to appear in the edditing form.
  //so, we go through all of the expenses in the context, and when an expense id matches the edited expense we
  //want to edit now, we upload the relevant values of that expense to the edditing form.
  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editExpenseId
  );

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

  //except of saving the data localy using Ctx(context) so will; have anm offline copy, we want to save it in our axios based database
  function confirmHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense({
        id: editExpenseId,
        expenseData: expenseData,
      });
    } else {
      storeExpense(expenseData);
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
        defaultValues={selectedExpense}
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
