import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, SafeAreaView, View, Image, ScrollView } from 'react-native'
import Constants from 'expo-constants'

import { capitalize } from '../utils.js'

export default props => {
  const pokemon = props.route.params.pokemon
  const colors = props.route.params.colors
  
  function prettifyAbilities(abilities) {
    let value = ""

    abilities.forEach((item, index) => {
      value += capitalize(item.ability.name)
      if (index !== abilities.length-1)
        value += ", "
    })

    return value
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.number}>#{pokemon.id}</Text>
          <Text style={styles.name}>{capitalize(pokemon.species.name)}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: pokemon.sprites.other["official-artwork"].front_default }} />
        </View>     
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.mainContent}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.infoHeader}>Weight</Text>
              <Text style={styles.infoHeader}>Height</Text>
              <Text style={styles.infoHeader}>Abilities</Text>
            </View>

            <View>
              <Text>{pokemon.weight}</Text>
              <Text>{pokemon.height}</Text>
              <Text>{prettifyAbilities(pokemon.abilities)}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Base Stats</Text>
          
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.infoHeader}>HP</Text>
              <Text style={styles.infoHeader}>Attack</Text>
              <Text style={styles.infoHeader}>Defense</Text>
              <Text style={styles.infoHeader}>Special Attack</Text>
              <Text style={styles.infoHeader}>Special Defense</Text>
              <Text style={styles.infoHeader}>Speed</Text>
            </View>

            <View>
              <Text>{pokemon.stats[0].base_stat}</Text>
              <Text>{pokemon.stats[1].base_stat}</Text>
              <Text>{pokemon.stats[2].base_stat}</Text>
              <Text>{pokemon.stats[3].base_stat}</Text>
              <Text>{pokemon.stats[4].base_stat}</Text>
              <Text>{pokemon.stats[5].base_stat}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    justifyContent: "center"
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 20
  },
  content: {
    flex: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  mainContent: {
    margin: 20
  },
  infoHeader: {
    color: "#6C6C80"
  },
  name: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 32
  },
  number: {
    color: "#FFF",
    fontSize: 16,
    marginRight: 10
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 200
  },
  sectionTitle: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  column: {
    marginRight: 50
  }
})