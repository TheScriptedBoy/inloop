import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavigationStack from "./src/navigation/Stack";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationStack />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
