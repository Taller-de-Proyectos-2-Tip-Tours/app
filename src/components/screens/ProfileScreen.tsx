import { firebase } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet, Image} from "react-native";

export default function ProfileScreen({ route }) {
    const [user, setUser] = useState(null);
    const getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        console.log(currentUser)
        setUser(currentUser.user);
      };
      getCurrentUser()

  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <Image source={{uri: user.photo}}/>
          <Text style={styles.title} >Bienvenido, {user.name}</Text>
          <Text style={styles.title} >{user.email}</Text>
          {/* Display other user information as needed */}
          <Button title="Cerrar sesion" onPress={signOut} />
        </View>
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#004E98"
  },
  toggleButton: {
    backgroundColor: "#A9A9A9",
    marginVertical: 10,
    padding: 10,
    borderRadius: 40,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
