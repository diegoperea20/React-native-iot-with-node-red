import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Conection to backend flask
import { API_URL } from '@env';

const CardData = () => {
  const [idInput, setIdInput] = useState('');
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const actualizarID = () => {
    // Verifica si el nuevo ID es un número entero positivo
    if (!isNaN(parseInt(idInput)) && idInput >= 0) {
      // Actualiza el ID y la URL
      const url = `http://${API_URL}:1880/datos-id?id=${idInput}`;

      // Realiza la solicitud fetch con la nueva URL
      fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData);
        })
        .catch((error) => console.error(error));
    } else {
      alert('Por favor, ingrese un número entero positivo válido.');
    }
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ paddingBottom: 20, fontSize: 24 }}>DATO ESPECIFICO</Text>
      </View>

      {/* Agrega un input para ingresar el ID */}
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 16 }}>Ingrese un número ID:</Text>
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, padding: 5 }}
          keyboardType="numeric"
          value={idInput}
          onChangeText={(text) => setIdInput(text)}
        />
      </View>

      <Button title="VER ID" onPress={actualizarID} />

      <View style={{ margin: 20 }}>
        {data.map((obj, index) => (
          <View key={index}>
            <Text style={{ textAlign: 'center', paddingBottom: 20, fontSize: 24 }}>{obj.fecha}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View style={{ flex: 1 }}>
                <View>
                  <Text style={{ fontSize: 18  }}>TEMPERATURA</Text>
                  <Text>{obj.temperatura}</Text>
                </View>
                <Button title="Ver gráfica" onPress={() => navigation.navigate("GraphTemperature")} />
              </View>
              <View style={{ flex: 1 }}>
                <View>
                  <Text style={{ fontSize: 18 }}>HUMEDAD</Text>
                  <Text>{obj.humedad}</Text>
                </View>
                <Button title="Ver gráfica"onPress={() => navigation.navigate("GraphHumidity")} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CardData;
