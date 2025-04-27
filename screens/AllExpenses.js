import { View, StyleSheet, Text } from "react-native";

function AllExpenses() {
  return (
    <View style={styles.container}>
      <Text>All Expenses</Text>
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

export default AllExpenses;
