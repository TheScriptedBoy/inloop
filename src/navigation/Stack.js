import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../features/Home";
import Feedback from "../features/Feedback";

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // could build common header
        }}
      >
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="feedback" component={Feedback} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
