import { View, TextInput, StyleSheet, Text } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";

function ExpenseForm({ onCancel, onSubmit, submitButtonLable }) {
  //whenever we fetch an input value, we gat is as a string even if we typed a number in the input. so:
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });

  // we want to be able to identify each input so be could keep the value of those which havnt changed, and update the values of those which did
  function inputChangeHandler(inputIdentifier, enteredValue) {
    // if we update state based on the previous state, the convention is:
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  //we need to collect and transform the values for submition
  function submitHandler() {
    const expenseData = {
      // + transforms strings to numbers
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };
    //we need the data in ManageExpenses.js where we trigger different context method:
    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense:</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          lable="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            //the "this" has to be there because it is a "bind" argument, but we dont use "this" in inputChangeHandler function
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          style={styles.rowInput}
          lable="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        lable="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttonsContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLable}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginBottom: 20,
    marginVertical: 24,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
