import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
// import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpenses/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

//we will use the "route" prop to extract the id:
function ManageExpenses({ route, navigation }) {
  const [error, setError] = useState();
  const [isSendingData, setIsSendingData] = useState(false);
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

  async function deleteExpensesHandler() {
    setIsSendingData(true);
    try {
      await deleteExpense(editExpenseId);
      expensesCtx.deleteExpense(editExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("could not deletet expense. try again later");
      setIsSendingData(false);
    }

    //to delete an item, the items id should be passed:
  }

  function cancelHandler() {
    navigation.goBack();
  }

  //except of saving the data localy using Ctx(context) so will; have anm offline copy, we want to save it in our axios based database
  async function confirmHandler(expenseData) {
    setIsSendingData(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense({
          id: editExpenseId,
          expenseData: expenseData,
        });
        await updateExpense(editExpenseId, expenseData);
      } else {
        //now this id will also be a part of what we are sending to the context:
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data. please try again later");
      setIsSendingData(false);
    }
  } //connection on confirmHandler to ExpenseForm.js will be through thr onSubmit prop in <ExpenseForm>:

  function errorHandler() {
    setError(null);
  }

  if (error && !isSendingData) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSendingData) {
    return <LoadingOverlay />;
  }

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
