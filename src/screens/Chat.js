import React, { useState, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Ionicons } from "@expo/vector-icons";

const Chat = ({ navigation, route }) => {
  const [message, setMessages] = useState([]);
  const { id, name } = route?.params;

  React.useEffect(() => {
    initChat();
  }, []);

  const initChat = async () => {
    const prevChatList =
      JSON.parse(await AsyncStorage.getItem("chatList")) || [];
    setMessages(prevChatList);
  };

  const onSend = useCallback((messages = []) => {
    messages[0].user.name = name;
    let appendList = [];
    setMessages(
      (previousMessages) =>
        (appendList = GiftedChat.append(previousMessages, messages))
    );
    setChatInStorage(appendList);
  }, []);

  const setChatInStorage = async (appendList) => {
    await AsyncStorage.setItem("chatList", JSON.stringify(appendList));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={navigation.goBack}>
        <Ionicons name={"ios-arrow-back"} size={35} color="#38cdcc" />
      </TouchableOpacity>
      <GiftedChat
        messages={message}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: id,
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 40 },
  back: {
    padding: 20,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
});
