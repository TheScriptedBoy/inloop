import React, { useEffect } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface HeaderProps {
  canSearch?: boolean;
  onSearch?: (searchText: string) => void;
  onBackButtonPress?: () => void;
}

// Renders searchBar or a back button on the header
// Room for improvements

const Header = ({
  canSearch = false,
  onBackButtonPress,
  onSearch,
}: HeaderProps) => {
  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    onSubmitEditing();
  }, [searchText, onSearch]);

  const onSubmitEditing = () => {
    // Should search when user clears existing query or on at least 3 chars.
    if ((searchText?.length >= 3 || searchText?.length === 0) && onSearch) {
      onSearch(searchText);
    }
  };

  return (
    <View style={styles.container}>
      {canSearch ? (
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchText}
          autoCorrect={false}
          onChangeText={setSearchText}
          returnKeyType={"search"}
          onSubmitEditing={onSubmitEditing}
          accessibilityLabel={"Type here to search"}
        />
      ) : (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackButtonPress}
          accessible={true}
          accessibilityLabel="Click to navigates to the previous screen"
        >
          <Ionicons name="arrow-back-sharp" size={24} color={"white"} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: "center",
    backgroundColor: "#4C4AD3",
  },
  backButton: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginLeft: 5,
  },
  searchBar: {
    height: 40,
    paddingHorizontal: 15,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "white",
  },
});
