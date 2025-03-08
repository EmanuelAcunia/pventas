import React from "react";
import { View, StyleSheet } from "react-native";
import LoginForm from "./LoginForm"; // ✅ Importa el formulario
import LoginProvider from "../../context/login/LoginProvider"; // ✅ Importa el provider

const LoginScreen = ({ navigation }) => {
  return (
    <LoginProvider>
      <View style={styles.screen}>
        <LoginForm navigation={navigation} />
      </View>
    </LoginProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});

export default LoginScreen;
