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


// Conection to backend flask
import { API_URL } from '@env';


const Datos= () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
    

  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

   

  


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="ios-menu" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.headerText}>Logout</Text>
        </TouchableOpacity>
        
      </View>

      {/* Menu */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.menuItem}>Usuarios</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Nodos")}>
            <Text style={styles.menuItem}>Nodos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Datos")}>
            <Text style={styles.menuItem}>Datos</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Contenido principal */}
      <View style={styles.container}>
      <Text style={styles.modalTitle}> Seleciona el visualizador de Datos</Text>

            <TouchableOpacity onPress={() => navigation.navigate("TableData")}>
            <Text style={styles.menuItem}> Tabla de Datos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("CardData")}>
            <Text style={styles.menuItem}> Card datos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("GraphTemperature")}>
            <Text style={styles.menuItem}> Grafica Temperatura</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("GraphHumidity")}>
            <Text style={styles.menuItem}> Grafica Humedad</Text>
          </TouchableOpacity>
      
         </View>
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
    left: 8,
    fontSize: 11,
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

export default Datos;
