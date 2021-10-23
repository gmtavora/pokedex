import React from 'react'
import { SafeAreaView, View, StyleSheet, Text, FlatList, TextInput } from 'react-native'
import Constants from 'expo-constants'

import ListItem from '../components/ListItem.js'

export default props => {

  function viewPokemonDetails(pokemon) {
    return () => props.navigation.navigate("Pokemon", pokemon)
  }

  function getPokemon({ item: pokemon }) {
    return (
      <ListItem
        id={pokemon.id}
        species={pokemon.species}
        sprites={pokemon.sprites}
        types={pokemon.types}
        action={viewPokemonDetails(pokemon)}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Pokédex</Text>

      {/* Descrição */}
      <Text style={styles.description}>Select a Pokémon from the list or use the field below to search by name.</Text>
      
      {/* Caixa de busca */}
      <TextInput 
        style={styles.searchBox}
      />

      {/* Lista de opções */}
      <View style={styles.pokemonList}>
        <FlatList
          data={pokemons}
          renderItem={getPokemon}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({ 
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

const pokemons = [{
  id: 1,
  species: {
    name: "bulbasaur"
  },
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  },
  types: [{
    name: "grass"
  }, {
    name: "poison"
  }]
}, {
  id: 2,
  species: {
    name: "ivysaur"
  },
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
  },
  types: [{
    name: "grass"
  }, {
    name: "poison"
  },]
}, {
  id: 3,
  species: {
    name: "venusaur"
  },
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
  },
  types: [{
    name: "grass"
  }, {
    name: "poison"
  }]
}, {
  id: 4,
  species: {
    name: "charmander"
  },
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
  },
  types: [{
    name: "fire"
  }]
}, {
  id: 5,
  species: {
    name: "charmeleon"
  },
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
  },
  types: [{
    name: "fire"
  }]
}, {
  id: 6,
  species: {
    name: "charizard"
  },
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
  },
  types: [{
    name: "fire"
  }]
}
]