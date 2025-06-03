import { View, TextInput, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLable, defaultValues }) {
  //whenever we fetch an input value, we gat is as a string even if we typed a number in the input. so:
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  // we want to be able to identify each input so be could keep the value of those which havnt changed, and update the values of those which did
  function inputChangeHandler(inputIdentifier, enteredValue) {
    // if we update state based on the previous state, the convention is:
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  //we need to collect and transform the values for submition
  function submitHandler() {
    const expenseData = {
      // + transforms strings to numbers
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };
    const amountIsvalid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsvalid || !dateIsValid || !descriptionIsValid) {
      //Alert.alert("Invalid Input", "Please check your input values");
      setInputValues((currentInputValues) => {
        return {
          amount: {
            value: currentInputValues.amount.value,
            isValid: amountIsvalid,
          },
          date: { value: currentInputValues.date.value, isValid: dateIsValid },
          description: {
            value: currentInputValues.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
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
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            //the "this" has to be there because it is a "bind" argument, but we dont use "this" in inputChangeHandler function
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          lable="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
        lable="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description.value,
        }}
      />
      {!inputValues.amount.value ||
        !inputValues.date.value ||
        (!inputValues.description.value && (
          <Text style={styles.errorText}>Please check your data</Text>
        ))}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
