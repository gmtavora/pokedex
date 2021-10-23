import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native'

import { colorPicker, capitalize } from '../utils.js'

export default props => {
  return (
    <TouchableOpacity 
      style={[styles.container, colorPicker(props.types)]}
      onPress={props.action}
    >
      <View>
        <Text style={styles.number}>#{props.id}</Text>
        <Text style={styles.name}>{capitalize(props.species.name)}</Text>
      </View>

      <Image style={styles.image} source={{ uri: props.sprites.front_default }} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10
  },
  name: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFF"
  },
  image: {
    width: 64,
    height: 64
  },
  number: {
    color: "#FFF"
  }
})