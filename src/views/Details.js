import React from 'react'
import { Text, StyleSheet, SafeAreaView, View, Image } from 'react-native'
import Constants from 'expo-constants'

import { colorPicker, capitalize } from '../utils.js'

export default props => {
  const pokemon = props.route.params;

  return (
    <SafeAreaView style={[styles.container, , colorPicker(pokemon.types)]}>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: pokemon.sprites.front_default }} />

        <View>
          <Text style={styles.number}>#{pokemon.id}</Text>
          <Text style={styles.name}>{capitalize(pokemon.species.name)}</Text>
        </View>
      </View>

      <View style={styles.content}>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flex: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  name: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 32
  },
  number: {
    color: "#FFF",
    fontSize: 16
  },
  image: {
    width: 128,
    height: 128
  }
})