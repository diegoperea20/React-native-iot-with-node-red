import React, { useState , useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Conection to backend flask
import { API_URL } from '@env';


const Client= () => {
  const [userInfo, setUserInfo] = useState(null);
  const [nodoInfo, setNodoInfo] = useState(null);
  const [datosNodo, setDatosNodo] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserInfo = async () => {
        const clienteNombre = await AsyncStorage.getItem('clienteNombre');
      try {
        const urlUserInfo = `http://${API_URL}:1880/userName?name=${encodeURIComponent(clienteNombre)}`;
        
        const responseUserInfo = await fetch(urlUserInfo);
        const userInfoData = await responseUserInfo.json();
        //console.log(userInfoData);
        

        if (Array.isArray(userInfoData) && userInfoData.length > 0) {
          const user = userInfoData[0].user;
          setUserInfo(user);

          const urlNodoUser = `http://${API_URL}:1880/nodoUser?user=${encodeURIComponent(user)}`;
          const responseNodoUser = await fetch(urlNodoUser);
          const nodoInfoData = await responseNodoUser.json();

          if (Array.isArray(nodoInfoData) && nodoInfoData.length > 0) {
            const idNodo = nodoInfoData[0].idnodo;
            setNodoInfo(idNodo);

            const urlDatosNodo = `http://${API_URL}:1880/datos-idnodo?idnodo=${encodeURIComponent(idNodo)}`;
            const responseDatosNodo = await fetch(urlDatosNodo);
            const datosNodoData = await responseDatosNodo.json();

            if (Array.isArray(datosNodoData) && datosNodoData.length > 0) {
              setDatosNodo(datosNodoData);
            } else {
              console.error("Error: No se pudieron obtener datos del nodo");
            }
          } else {
            console.error("Error: El usuario no tiene asignado un nodo");
          }
        } else {
          console.error("Error: No se pudo obtener la información del usuario");
        } 
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchUserInfo();
  }, []);



  const renderItem = ({ item }) => (
    <View style={styles.row}>

      
      <Text>{item.idnodo}</Text>
      <Text>{item.temperatura}</Text>
      <Text>{item.humedad}</Text>
      <Text>{item.fecha}</Text>
      

    </View>
  );

  const logout = async () => {
    await AsyncStorage.removeItem('clienteNombre');
    navigation.navigate("Login")
  }
   
  

  return (
    
    <View style={styles.container}>
        <TouchableOpacity onPress={() => logout()}>
        <Text style={styles.headerText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.propertyTitle}></Text>
        <View style={styles.titlesContainer}>
        
        <Text style={styles.propertyTitle}>IDNODO</Text>
        <Text style={styles.propertyTitle}>TEMPERATURA</Text>
        <Text style={styles.propertyTitle}>HUMEDAD</Text>
        <Text style={styles.propertyTitle}>FECHA</Text>
       
      </View>
      <FlatList
        data={datosNodo}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    menu: {
      backgroundColor: '#fff',
      padding: 20,
      elevation: 5,
    },
    menuItem: {
      fontSize: 18,
      marginVertical: 10,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
  
    
    row: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
      
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
  
    titlesContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingBottom: 10,
    },
    propertyTitle: {
      fontWeight: 'bold',
      marginRight: 5,
      left: 15,
      fontSize: 10,
      
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 10,
      color: "black", 
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: "#ccc",
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: "#fff", // Color del fondo del TextInput en blanco
      color: "#000", // Color del texto del TextInput en negro
    },
  });

export default Client;
