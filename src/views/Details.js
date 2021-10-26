/*
 *  Details.js
 *  ----------
 *  Nesta tela, são exibidas as informações detalhadas de cada Pokémon.
 *
 *  Props
 *  -----
 *  É necessário passar como Route Params:
 *   - Objeto com as as informações do Pokémon
 *   - Objeto com as cores da UI.
 * 
 */

import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, SafeAreaView, View, Image, ScrollView, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants'
import Icon from 'react-native-vector-icons/FontAwesome'

import { capitalize, showError } from '../utils.js'
import api from '../services/api.js'

export default props => {
  const pokemon = props.route.params.pokemon
  const colors = props.route.params.colors
  const [species, setSpecies] = useState({})

  /* Busca na API as informações da espécie. */
  useEffect(async () => {
    try {
      const species = await api.get(pokemon.species.url)
      const result = await api.get(species.data.evolution_chain.url)

      /* Concatena os nomes dos estágios de evolução do Pokémon */
      let evolutionString = capitalize(result.data.chain.species.name) + " > "
      let next = result.data.chain

      while (true) {
        if (next && next.evolves_to.length) {
          if (next.evolves_to[0].evolves_to.length > 0)
            evolutionString += capitalize(next.evolves_to[0].species.name) + " > "
          else {
            evolutionString += capitalize(next.evolves_to[0].species.name)
          }
          next = next.evolves_to[0]
        } else {
          break
        }
      }

      species.data.evolutionString = evolutionString

      setSpecies(species.data)
    } catch(err) {
      showError(err)
    }
  }, [])
  
  /* Recebe um array com as habilidades do Pokémon e as concatena */
  function prettifyAbilities(abilities) {
    let value = ""

    abilities.forEach((item, index) => {
      value += capitalize(item.ability.name)
      if (index !== abilities.length-1)
        value += ", "
    })

    return value
  }

  /* Retorna o tamanho da barra de habilidades */
  function getStatusWidth(x, m) {
    let value = (x/m) * 100

    if (value < 100)
      return value
    else
      return 100
  }

  /* Renderização */
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>


      <ScrollView style={{ marginLeft: 15, marginRight: 15, marginTop: 15 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <Text style={styles.number}>#{pokemon.id}</Text>
            <Text style={styles.name}>{capitalize(pokemon.species.name)}</Text>
          </View>

          <View style={[styles.imageContainer, { backgroundColor: colors.secondaryColor }]}>
            <Image style={styles.image} source={{ uri: pokemon.sprites.other["official-artwork"].front_default }} />
          </View>     
        </View>

        <View style={styles.content}>
          <View style={styles.wrapper}>
            <Text style={styles.sectionTitle}>About</Text>
            
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.infoHeader}>Weight</Text>
                <Text style={styles.infoHeader}>Height</Text>
                <Text style={styles.infoHeader}>Abilities</Text>
              </View>

              <View>
                <Text>{(pokemon.weight * 0.1).toFixed(2)} kg</Text>
                <Text>{(pokemon.height * 0.1).toFixed(2)} m</Text>
                <Text style={styles.abilities}>{prettifyAbilities(pokemon.abilities)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.wrapper}>
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
                <View style={styles.row}>
                  <Text>{pokemon.stats[0].base_stat}</Text>
                  <View
                    style={[styles.statusBar, {
                      width: getStatusWidth(pokemon.stats[0].base_stat, 100),
                      borderBottomColor: colors.primaryColor
                    }]}
                  />
                </View>

                <View style={styles.row}>
                  <Text>{pokemon.stats[1].base_stat}</Text>
                  <View
                    style={[styles.statusBar, {
                      width: getStatusWidth(pokemon.stats[1].base_stat, 100),
                      borderBottomColor: colors.primaryColor
                    }]}
                  />
                </View>

                <View style={styles.row}>
                  <Text>{pokemon.stats[2].base_stat}</Text>
                  <View
                    style={[styles.statusBar, {
                      width: getStatusWidth(pokemon.stats[2].base_stat, 100),
                      borderBottomColor: colors.primaryColor
                    }]}
                  />
                </View>

                <View style={styles.row}>
                  <Text>{pokemon.stats[3].base_stat}</Text>
                  <View
                    style={[styles.statusBar, {
                      width: getStatusWidth(pokemon.stats[3].base_stat, 100),
                      borderBottomColor: colors.primaryColor
                    }]}
                  />
                </View>

                <View style={styles.row}>
                  <Text>{pokemon.stats[4].base_stat}</Text>
                  <View
                    style={[styles.statusBar, {
                      width: getStatusWidth(pokemon.stats[4].base_stat, 100),
                      borderBottomColor: colors.primaryColor
                    }]}
                  />
                </View>

                <View style={styles.row}>
                  <Text>{pokemon.stats[5].base_stat}</Text>
                  <View
                    style={[styles.statusBar, {
                      width: getStatusWidth(pokemon.stats[5].base_stat, 100),
                      borderBottomColor: colors.primaryColor
                    }]}
                  />
                </View>
              </View>
            </View>
          </View>
          
          {
            !species.hasOwnProperty("evolutionString") && (
              <View style={styles.wrapper}>
                <ActivityIndicator size="large" color="#000" />
              </View>
            )
          }

          {
            species.hasOwnProperty("evolutionString") && (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.sectionTitle}>Other</Text>

                  <View style={styles.row}>
                    <View style={styles.column}>
                      <Text style={styles.infoHeader}>Base Hapiness</Text>
                      <Text style={styles.infoHeader}>Capture Rate</Text>
                      <Text style={styles.infoHeader}>Growth Rate</Text>
                      <Text style={styles.infoHeader}>Habitat</Text>
                      <Text style={styles.infoHeader}>Shape</Text>
                      <Text style={styles.infoHeader}>Baby</Text>
                      <Text style={styles.infoHeader}>Mythical</Text>
                      <Text style={styles.infoHeader}>Legendary</Text>
                    </View>

                    <View style={styles.column}>
                      <Text>{species.base_happiness}</Text>
                      <Text>{species.capture_rate}</Text>
                      <Text>{capitalize(species.growth_rate.name)}</Text>
                      <Text>{capitalize(species.habitat.name)}</Text>
                      <Text>{capitalize(species.shape.name)}</Text>
                      <Text>{species.is_baby ? "Yes": "No"}</Text>
                      <Text>{species.is_mythical ? "Yes" : "No"}</Text>
                      <Text>{species.is_legendary ? "Yes" : "No"}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.sectionTitle}>Evolution</Text>

                  <View style={styles.row}>
                    <Text>{species.evolutionString}</Text>
                  </View>
                </View>
              </View>
            )
          }
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
    justifyContent: "flex-start"
  },
  content: {
    flex: 2,
  },
  wrapper: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20
  },
  infoHeader: {
    color: "#6C6C80",
    textTransform: "uppercase"
  },
  name: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 32
  },
  number: {
    color: "#FFF",
    fontSize: 32,
    marginRight: 10
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 100,
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
    marginBottom: 10,
    textTransform: "uppercase"
  },
  row: {
    flexDirection: "row"
  },
  column: {
    marginRight: 40
  },
  statusBar: {
    borderBottomWidth: 2,
    marginBottom: 7,
    marginLeft: 10
  },
  abilities: {
    flexWrap: "wrap",
    maxWidth: "80%"
  }
})