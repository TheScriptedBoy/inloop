import React from "react";
import { StyleSheet } from "react-native";
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import { GiphyData } from "../models/Giphy";
import { SafeAreaView } from "react-native-safe-area-context";

interface FeedbackProps {
  navigation: {
    navigate: (route: string, params: object) => void;
  };
}

const Home = ({ navigation }: FeedbackProps) => {
  const [searchText, setSearchText] = React.useState<string>("");

  const onPress = async (item: GiphyData) => {
    // passing unnecessary data can be avoided
    // or could do a simple context api?
    navigation.navigate("feedback", item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header canSearch onSearch={setSearchText} />
      <ItemList onPress={onPress} searchText={searchText} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
