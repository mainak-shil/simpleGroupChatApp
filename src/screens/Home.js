import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const Home = ({ navigation, route }) => {
  const _logout = () => navigation.goBack();
  const _chat = () =>
    navigation.navigate("Chat", {
      email: route?.params?.email,
      id: route?.params?.id,
      name: route?.params?.name,
    });

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.userC}>
          <Text style={styles.txt1}>{route?.params?.name}</Text>
        </View>
        <View>
          <Text style={styles.txt1}>{route?.params?.name}</Text>
          <Text style={styles.txt2}>{route?.params?.email}</Text>
        </View>
      </View>
      <Button mode="contained" style={styles.btn} onPress={_chat}>
        Group Chat
      </Button>
      <Button mode="contained" style={styles.btn} onPress={_logout}>
        Logout
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 60,
  },
  flexRow: { flexDirection: "row" },
  userC: {
    backgroundColor: "#ececec",
    width: 50,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  txt1: {
    fontSize: 20,
    textTransform: "uppercase",
  },
  txt2: {
    fontSize: 20,
  },
  btn: { backgroundColor: "#38cdcc", marginTop: 50 },
});
