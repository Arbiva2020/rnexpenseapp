import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";

function IconButton({ icon, onPress, color, size }) {
  return (
    <Pressable
      onPress={onPress}
      //the pressed style is a boolean, when pressed the style will be applyed and if not it wont be:
      style={({ pressed }) => (pressed ? styles.pressed : null)}
    >
      <View>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
