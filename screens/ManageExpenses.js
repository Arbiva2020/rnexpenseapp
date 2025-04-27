import { View, StyleSheet, Text } from "react-native";

function ManageExpenses() {
  return (
    <View style={styles.container}>
      <Text>Manage Expenses</Text>
    </View>
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
