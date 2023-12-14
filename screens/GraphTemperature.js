import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'; // Importa los componentes necesarios

// Conection to backend flask
import { API_URL } from '@env';

function GraphTemperature() {
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const getdata = async () => {
    try {
      const response = await fetch(`http://${API_URL}:1880/datos`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleClickNext = () => {
    setStartIndex(startIndex + 10);
  };

  const handleClickPrevious = () => {
    setStartIndex(Math.max(0, startIndex - 10));
  };

  const visibleData = data.slice(startIndex, startIndex + 10);

  // Extracción de los valores de temperatura y sus identificadores para usar en el gráfico
  const chartData = {
    labels: visibleData.map((parameter) => parameter.id.toString()),
    datasets: [
      {
        data: visibleData.map((parameter) => parameter.temperatura),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
            data={chartData.datasets[0].data}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fill: 'white', fontSize: 10 }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}°C`}
          />
          <LineChart
            style={{ flex: 1, marginLeft: 10 }}
            data={chartData.datasets[0].data}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ stroke: 'red' ,strokeWidth: 3,}}
          >
            <Grid />
          </LineChart>
        </View>
        <XAxis
          data={chartData.labels}
          formatLabel={(value, index) => chartData.labels[index]}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: 'white' }}
        />
      </View>

      <View style={styles.tableContainer}>
        <ScrollView horizontal>
          {/* Resto del código para la tabla */}
        </ScrollView>

        <View style={styles.pagination}>
          <Button title="Previous" onPress={handleClickPrevious} disabled={startIndex === 0} />
          <Button title="Next" onPress={handleClickNext} disabled={startIndex + 10 >= data.length} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#333',
  },
  chartContainer: {
    flex: 0.7,
    flexDirection: 'column',
    marginBottom: 10,
  },
  // Resto del estilo se mantiene igual
});

export default GraphTemperature;
