import { firebase } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet, Image, Pressable } from "react-native";

export default function ProfileScreen({ route }) {
  const [user, setUser] = useState(null);
  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log(currentUser);
    setUser(currentUser.user);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Image style={styles.thumbail} source={{ uri: user.photo }} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.label}>{user.email}</Text>
          </View>
          <Pressable style={styles.mainAction} onPress={signOut}>
            <Text style={styles.mainActionText}>{"Cerrar sesion"}</Text>
          </Pressable>
        </View>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  mainAction: {
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 18,
    backgroundColor: "#4E598C",
    borderRadius: 40,
  },
  mainActionText: {
    color: "#fff",
    fontSize: 16,
  },
  thumbail: {
    flex: 2,
    backgroundColor: "#F6F6F6",
    aspectRatio: 1,
    marginRight: 16,
    borderRadius: 10,
  },
});
