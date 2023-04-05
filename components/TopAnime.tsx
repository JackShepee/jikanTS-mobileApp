import { View, Text, StyleSheet } from "react-native";

const TopAnime: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>This is Top Anime page</Text>
  </View>
);

export default TopAnime;

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
