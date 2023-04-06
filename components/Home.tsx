import { View, Image, StyleSheet } from "react-native";

const Home = () => (
  <View style={styles.container}>
    <Image
      source={{
        uri: "https://cdn.midjourney.com/21f8cd5f-a2b7-44d0-b569-d97731e8cf2e/0_2.png",
      }}
      style={styles.backgroundImage}
    />
  </View>
);

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "cover",
  },
});
