import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, StyleSheet, Image, View, ActivityIndicator } from 'react-native'

import api from '../services/api.js'
import { getColors, capitalize, showError } from '../utils.js'

export default props => {
  const [pokemon, setPokemon] = useState({})
  const [colors, setColors] = useState({})
  const [ready, setReady] = useState(false)

  useEffect(async () => {
    try {
      const { data } = await api.get(props.url)
      setPokemon(data)
    } catch(err) {
      showError(err)
    }
  }, [])

  useEffect(() => {
    if (pokemon.hasOwnProperty("types")) {
      const colors = getColors(pokemon.types[0].type.name)

      setColors(colors)
      setReady(true)
    }
  }, [pokemon])

  if (!ready)
    return (
      <View style={[styles.container, styles.grayBackground]}>
        <ActivityIndicator color="#000" />
      </View>)
  else
    return (
      <TouchableOpacity 
        style={[styles.container, { 
          backgroundColor: colors.primaryColor,
          borderBottomColor: colors.secondaryColor
        }]}
        onPress={() => props.action(pokemon, colors)}
      >

        <Image
          style={[styles.image, { backgroundColor: colors.secondaryColor }]}
          source={{ uri: pokemon.sprites.front_default }}
        />

        <View style={styles.nameContainer}>
          <Text style={styles.number}>#{pokemon.id}</Text>
          <Text style={styles.name}>{capitalize(pokemon.species.name)}</Text>
        </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  grayBackground: {
    backgroundColor: "#7D7D7D"
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    margin: 5,
    borderBottomWidth: 10,
    borderBottomLeftRadius: 2
  },
  nameContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  name: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 15,
    color: "#FFF"
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#FFF"
  },
  number: {
    color: "#FFF",
    marginRight: 2
  }
})