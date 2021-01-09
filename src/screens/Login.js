import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { Alert, View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { generateId, validateEmail } from "../utils";

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  const _login = async () => {
    if (email === "" || !validateEmail(email)) {
      Alert.alert("Enter valid email");
      return;
    }
    if (pass === "") {
      Alert.alert("Enter password");
      return;
    }

    let userList = JSON.parse(await AsyncStorage.getItem("userList")) || [];
    console.log(userList);

    const isFound = userList.find((e) => e.email == email);
    console.log("isFound: ", isFound);
    let localData = {};
    if (isFound) {
      localData = {
        email,
        id: isFound.id,
        name: isFound.name,
      };
    } else {
      const genNum = generateId(5);
      localData = {
        email,
        id: genNum,
        name: email.split("@")[0] || "User",
      };
      userList.push(localData);
      await AsyncStorage.setItem("userList", JSON.stringify(userList));
    }
    setTimeout(() => {
      Alert.alert(
        !isFound ? "New user created successfully" : "Logged in successfully"
      );
      navigation.navigate("Home", { ...localData });
      setEmail("");
      setPass("");
    }, 500);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <TextInput
          label="Email"
          mode="outlined"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text.trim().toLowerCase())}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          mode="outlined"
          style={styles.input}
          secureTextEntry
          onChangeText={(text) => setPass(text)}
          value={pass}
        />
        <Button mode="contained" style={styles.bg} onPress={_login}>
          Log in
        </Button>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    margin: 60,
  },
  input: {
    marginBottom: 20,
  },
  bg: { backgroundColor: "#38cdcc" },
});
