import { View, Text, StyleSheet } from "react-native";

const SearchPage = () => (
  <View style={styles.container}>
    <Text style={styles.text}>This is Search page!</Text>
  </View>
);

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
