import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, FlatList, TextInput, ActivityIndicator } from 'react-native'
import Constants from 'expo-constants'

import { showError } from '../utils.js'
import ListItem from '../components/ListItem.js'
import api from '../services/api.js'

export default props => {
  const [pokemons, setPokemons] = useState([])
  const [count, setCount] = useState(20)

  useEffect(async () => {
    let newList = []

    try {
      const { data } = await api.get(`https://pokeapi.co/api/v2/pokemon`)

      setPokemons(data.results)
    } catch (err) {
      showError(err)
    }
  }, [])

  async function paginate(offset) {
    let newList = pokemons

    try {
      const { data } = await api.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)

      setPokemons(newList.concat(data.results))
      setCount(count+20)
    } catch(err) {
      showError(err)
    }
  }

  function getPokemon({ item }) {
    return (
      <ListItem
        url={item.url}
        action={(pokemon, colors) => props.navigation.navigate("Pokemon", { pokemon, colors })}
      />
    )
  }

  if (pokemons.length !== 0)
  {
    return (
      <SafeAreaView style={styles.container}>
        {/* Título */}
        <Text style={styles.title}>Pokédex</Text>

        {/* Descrição */}
        <Text style={styles.description}>Select a Pokémon from the list or use the field below to search.</Text>
        
        {/* Caixa de busca */}
        <TextInput 
          style={styles.searchBox}
        />

        {/* Lista de opções */}
        <View style={styles.pokemonList}>
          <FlatList
            data={pokemons}
            renderItem={getPokemon}
            keyExtractor={item => item.name}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            onEndReached={() => paginate(count)}
          />
        </View>
      </SafeAreaView>
    )
  }
  else
  {
    return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )
  }
}

const styles = StyleSheet.create({ 
  activityContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    marginLeft: 30,
    marginTop: 30,
    marginRight: 30,
    paddingTop: Constants.statusBarHeight
  },
  title: {
    flex: 1,
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: 5
  },
  description: {
    flex: 1,
    fontFamily: "Roboto",
    fontSize: 15,
    flexWrap: "wrap",
    color: "#6C6C80",
  },
  searchBox: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#E3E1E1"
  },
  pokemonList: {
    flex: 7
  }
})