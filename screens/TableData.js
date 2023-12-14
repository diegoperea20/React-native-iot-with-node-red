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


const TableData = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  
  const [datos, setdatos] = useState([]);
  const [id, setId] = useState('');
  const [idnodo, setIdnodo] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [humedad, setHumedad] = useState('');
  const [fecha, setFecha] = useState('');
 
  


  const fetchDatos= async () => {
    try {
      const response = await fetch(`http://${API_URL}:1880/datos`);
      const data = await response.json();
      setdatos(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  
  
  
  
  
  
  


  const renderItem = ({ item }) => (
    <View style={styles.row}>

      <Text>{item.id}</Text>
      <Text>{item.idnodo}</Text>
      <Text>{item.temperatura}</Text>
      <Text>{item.humedad}</Text>
      <Text>{item.fecha}</Text>
      

    </View>
  );


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
      <View style={styles.titlesContainer}>
        <Text style={styles.propertyTitle}>ID</Text>
        <Text style={styles.propertyTitle}>IDNODO</Text>
        <Text style={styles.propertyTitle}>TEMPERATURA</Text>
        <Text style={styles.propertyTitle}>HUMEDAD</Text>
        <Text style={styles.propertyTitle}>FECHA</Text>
       
      </View>

      <FlatList
        data={datos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />


      
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

export default TableData;
