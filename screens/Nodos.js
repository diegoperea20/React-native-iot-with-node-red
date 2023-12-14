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


const Nodos= () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const [nodos, setnodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


  const [idnodo, setIdnodo] = useState("");
  const[nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [estado, setEstado] = useState("");
  const [user, setUser] = useState("");
  const [editMode, setEditMode] = useState(false);


  const fetchnodos = async () => {
    try {
      const response = await fetch(`http://${API_URL}:1880/nodos`);
      const data = await response.json();
      setnodos(data);
    } catch (error) {
      console.error('Error al obtener nodos:', error);
    }
  };

  useEffect(() => {
    fetchnodos();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

   const handleCreateNodo = async () => {
    try {
      const response = await fetch(`http://${API_URL}:1880/crearNodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idnodo,
          nombre,
          ubicacion,
          estado,
          user

        }),
      });
  
      // Aquí puedes manejar la respuesta si es necesario
      // Por ejemplo, verificar si la creación fue exitosa
  
      // Cerrar el modal después de crear el nodo
      setModalVisible(false);
      fetchnodos();
    } catch (error) {
      console.error("Error al crear el nodo:", error);
      // Manejar errores, mostrar mensajes, etc.
    }
  }; 


  const handleDelete = async (item) => {
    try {
      const response = await fetch(`http://${API_URL}:1880/borrarNodo?idnodo=${item.idnodo}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idnodo: item.idnodo,
          nombre: item.nombreNodo,
          ubicacion: item.ubicacion,
          estado: item.estado,
          user: item.user
        }),
      });
  
      if (response.status === 200) {
        fetchnodos();
        
      } else {
        console.error("Error al eliminar el nodo");
        // Puedes agregar lógica adicional para manejar el error según tus necesidades
      }
    } catch (error) {
      console.error("Error al eliminar el nodo:", error);
      // Puedes manejar errores de red u otros aquí
    }
  };
  
  
  const handleEdit = (item) => {
    setEditMode(true);
    setIdnodo(item.idnodo.toString()); // Convertir a cadena
    setNombre(item.nombreNodo);
    setUbicacion(item.ubicacion);
    setEstado(item.estado.toString());
    setUser(item.user);
    setModalVisible(true);
  };
  
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://${API_URL}:1880/modificarNodo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idnodo,
          nombre,
          ubicacion,
          estado,
          user
        }),
      });
  
      if (response.status === 200) {
        console.log("Nodo modificado exitosamente");
        setEditMode(false);
        fetchnodos();
      }
    } catch (error) {
      console.error("Error al modificar el nodo:", error);
    }
  };
  

 

  const renderItem = ({ item }) => (
    <View style={styles.row}>

      <Text>{item.idnodo}</Text>
      <Text>{item.nombreNodo}</Text>
      <Text>{item.ubicacion}</Text>
      <Text>{item.estado}</Text>
      <Text>{item.user}</Text>
      <Button title="Editar" onPress={() => handleEdit(item)} />
      <Button title="Eliminar" onPress={() => handleDelete(item)} />

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
        <Text style={styles.propertyTitle}>idNodo</Text>
        <Text style={styles.propertyTitle}>Nombre</Text>
        <Text style={styles.propertyTitle}>Ubicacion</Text>
        <Text style={styles.propertyTitle}>Estado</Text>
        <Text style={styles.propertyTitle}>User</Text>
        
       
      </View>

      <FlatList
        data={nodos}
        keyExtractor={(item) => item.idnodo}
        renderItem={renderItem}
      />

      <Button
        title="CREAR NODO"
        onPress={() => setModalVisible(true)}
      />

       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setEditMode(false); // Vuelve al modo de creación al cerrar el modal
        }}
      >
        <View style={styles.modal}>
        <Text style={styles.modalTitle}>
      {editMode ? "EDITAR NODO" : "CREAR NODO"}
        </Text>
          <Text style={styles.subtitle}>idNodo</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setIdnodo(text)}
            value={idnodo}
            placeholder="idNodo"
            keyboardType="numeric"
            autoFocus
          />

        <Text style={styles.subtitle}>Nombre</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNombre(text)}
          value={nombre}
          placeholder="Nombre"
          autoFocus
          />

        <Text style={styles.subtitle}>Ubicacion</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUbicacion(text)}
          value={ubicacion}
          placeholder="Ubicacion"
          autoFocus
          />
        <Text style={styles.subtitle}>Estado</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEstado(text)}
          value={estado}
          placeholder="Estado"
          keyboardType="numeric"
          autoFocus
          />

            <Text style={styles.subtitle}>User</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUser(text)}
          value={user}
          placeholder="User"
          autoFocus
          />



          <Button
                title={editMode ? "Guardar cambios" : "Crear"}
                onPress={async () => {
                  if (editMode) {
                    await handleUpdate();
                  } else {
                    await handleCreateNodo();
                  }
                  setModalVisible(false);
                  setEditMode(false); // Vuelve al modo de creación después de guardar cambios
                }}
              />
          <Text ></Text>
          <Button
              title="Cancelar"
              onPress={() => {
                setModalVisible(false);
                setEditMode(false); // Vuelve al modo de creación al cancelar
              }}
            />
        </View>
      </Modal> 
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

export default Nodos;
