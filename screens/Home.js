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


const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const[nombre, setNombre] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");
  const [editMode, setEditMode] = useState(false);


  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`http://${API_URL}:1880/usuarios`);
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch(`http://${API_URL}:1880/crearUsuario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          nombre,
          password,
          tipo
        }),
      });
  
      // Aquí puedes manejar la respuesta si es necesario
      // Por ejemplo, verificar si la creación fue exitosa
  
      // Cerrar el modal después de crear el usuario
      setModalVisible(false);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Manejar errores, mostrar mensajes, etc.
    }
  };


  const handleDelete = async (item) => {
    try {
      const response = await fetch(`http://${API_URL}:1880/borrarUsuario?user=${item.user}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: item.user,
        }),
      });
  
      if (response.status === 200) {
        fetchUsuarios();
        
      } else {
        console.error("Error al eliminar el usuario");
        // Puedes agregar lógica adicional para manejar el error según tus necesidades
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      // Puedes manejar errores de red u otros aquí
    }
  };
  
  
  const handleEdit = (item) => {
    setEditMode(true);
    setNombre(item.nombre);
    setUser(item.user);
    setPassword(item.password);
    setTipo(item.tipo.toString());
    setModalVisible(true);
  };
  
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://${API_URL}:1880/modificarUsuario`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          nombre,
          password,
          tipo,
        }),
      });
  
      if (response.status === 200) {
        console.log("Usuario modificado exitosamente");
        setEditMode(false);
        fetchUsuarios();
      }
    } catch (error) {
      console.error("Error al modificar el usuario:", error);
    }
  };
  



  const renderItem = ({ item }) => (
    <View style={styles.row}>

      <Text>{item.nombre}</Text>
      <Text>{item.user}</Text>
      <Text>{item.password}</Text>
      <Text>{item.tipo}</Text>
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
        <Text style={styles.propertyTitle}>Nombre</Text>
        <Text style={styles.propertyTitle}>Usuario</Text>
        <Text style={styles.propertyTitle}>Password</Text>
        <Text style={styles.propertyTitle}>Tipo</Text>
       
      </View>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.user}
        renderItem={renderItem}
      />

      <Button
        title="CREAR USUARIO"
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
      {editMode ? "EDITAR USUARIO" : "CREAR USUARIO"}
    </Text>
          <Text style={styles.subtitle}>Nombre</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setNombre(text)}
            value={nombre}
            placeholder="Nombre"
            autoFocus
          />

        <Text style={styles.subtitle}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUser(text)}
          value={user}
          placeholder="Username"
          autoFocus
          />

        <Text style={styles.subtitle}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          autoFocus
          />
        <Text style={styles.subtitle}>Tipo</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTipo(text)}
          value={tipo}
          placeholder="Tipo"
          autoFocus
          keyboardType="numeric"
          />



          <Button
                title={editMode ? "Guardar cambios" : "Crear"}
                onPress={async () => {
                  if (editMode) {
                    await handleUpdate();
                  } else {
                    await handleCreateUser();
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
    fontSize: 13,
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

export default Home;
