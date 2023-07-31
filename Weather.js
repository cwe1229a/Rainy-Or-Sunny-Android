import React, { useState } from "react";
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import sun from "./assets/sun.png";
import umbrella from "./assets/umbrella.png";

const Weather = () => {
  const [zip, setZip] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey =
    Constants.manifest?.extra?.openWeatherApiKey ??
    "2894a53f30085c9063c00a0a27f9c6d0";

  const getWeather = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`
      )
      .then((res) => {
        setWeather(res.data.weather[0].main);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rainy or Sunny?</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter ZIP code'
        onChangeText={(text) => setZip(text)}
      />
      <Button onPress={getWeather} title='Check Weather' color='#0000ff' />
      {weather === "Rain" && (
        <View style={styles.weatherContainer}>
          <Image source={umbrella} style={styles.image} />
          <Text style={styles.text}>Grab an umbrella!</Text>
        </View>
      )}
      {weather !== "Rain" && weather !== null && (
        <View style={styles.weatherContainer}>
          <Image source={sun} style={styles.image} />
          <Text style={styles.text}>Soak in the sun!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffe0"
  },
  title: {
    fontSize: 32,
    color: "#0000ff",
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: "#0000ff",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "80%"
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 100
  },
  text: {
    color: "#0000ff",
    fontSize: 18,
    marginTop: 10
  }
});

export default Weather;
