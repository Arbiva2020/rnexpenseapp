import { TextInput, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

// pay attention: there is a use of style as a prop to be able to specifically target certain elements:
// the reason to use styles as prop here is because adding the specific style we wanted to the main view
// in ExpenseForm.js will mess up the whole styling of the page.

function Input({ lable, textInputConfig, style }) {
  let inputStyles = [styles.input];
  // pay atenttion to this conditional styling!!! :
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.lable}>{lable}</Text>
      {/* we could specify in the textInput what we want to access, for example: keyboardType={type} maxLength={maxLength} and than
       state them as props, or we coul destructur them, like so: */}
      <TextInput style={inputStyles} {...textInputConfig} />
      {/* the "textInputConfig" is an object marging all configurations*/}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 10,
  },
  lable: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 8,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
