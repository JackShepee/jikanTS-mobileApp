import { View, Text, StyleSheet } from "react-native";

const Profile: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>This is Profile page!</Text>
  </View>
);

export default Profile;

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
