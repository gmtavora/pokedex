/*
 * Home.js
 * -------
 * Tela principal da aplicação que exibe a lista de Pokémons e a caixa de busca.
 * 
 * Props
 * -----
 * Nenhum.
 * 
 */

import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, FlatList, ActivityIndicator, useWindowDimensions } from 'react-native'
import { SearchBar } from 'react-native-elements'
import Constants from 'expo-constants'

import { showError } from '../utils.js'
import ListItem from '../components/ListItem.js'
import api from '../services/api.js'

export default props => {
  const [pokemons, setPokemons] = useState([])
  const [count, setCount] = useState(20)
  const [awaitingPagination, setAwaitingPagination] = useState(false)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState({})
  const [searchSent, setSearchSent] = useState(false)
  const [waitingForResults, setWaitingForResults] = useState(false)

  const windowHeight = useWindowDimensions().height

  /* Busca a lista de Pokémons na API */
  useEffect(async () => {
    let isMounted = true

    try {
      const { data } = await api.get(`https://pokeapi.co/api/v2/pokemon`)

      if (isMounted) setPokemons(data.results)
    } catch (err) {
      showError(err)
    }

    return () => { isMounted = false }
  }, [])

  /* Busca a próxima página */
  async function paginate(offset) {
    let newList = pokemons

    setAwaitingPagination(true)

    try {
      const { data } = await api.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)

      setPokemons(newList.concat(data.results))
      setCount(count+20)
    } catch(err) {
      showError(err)
    } finally {
      setAwaitingPagination(false)
    }
  }

  /* Busca Pokémon específico */
  async function searchPokemon(str) {
    const pattern = /({|}|"|')/
    if (pattern.test(str)) return showError({ message: "Invalid string." })

    setWaitingForResults(true)
    setSearchSent(true)

    const url = `https://pokeapi.co/api/v2/pokemon/${str.toLowerCase()}`

    try {
      const { data } = await api.get(url)

      data.url = url
      setSearchResults(data)
      setWaitingForResults(false)
    } catch(err) {
      showError(err)
      setSearchSent(false)
      setWaitingForResults(false)
      setSearchResults({})
    }
  }

  /* Limpa a busca */
  function clearSearch() {
    setSearch("")
    setSearchSent(false)
    setWaitingForResults(false)
    setSearchResults({})
  }

  /* Renderiza cada item da lista */
  function getPokemon({ item }) {
    return (
      <ListItem
        url={item.url}
        action={(pokemon, colors) => props.navigation.navigate("Pokemon", { pokemon, colors })}
        navigation={props.navigation}
      />
    )
  }

  /* Renderiza o rodapé da FlatList */
  function renderFooter() {
    if (awaitingPagination) {
      return (
        <View style={{ margin: 10 }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )
    } else {
      return null
    }
  }

  /* Renderização */
  if (pokemons.length !== 0)
  {
    return (
      <SafeAreaView style={[styles.container, { minHeight: windowHeight }]}>
        {/* Título */}
        <Text style={styles.title}>Pokédex</Text>

        {/* Descrição */}
        <Text style={styles.description}>Select a Pokémon from the list or use the field below to search.</Text>
        
        {/* Caixa de busca */}
        <SearchBar
          placeholder="Search"
          containerStyle={styles.searchBarContainer}
          lightTheme={true}
          round={true}
          value={search}
          onChangeText={setSearch}
          onClear={clearSearch}
          onSubmitEditing={() => searchPokemon(search)}
        />

        {/* Lista de opções */}
        <View style={styles.pokemonList}>
          {
            (!waitingForResults) && (!searchSent) &&
            <FlatList
              data={pokemons}
              renderItem={getPokemon}
              keyExtractor={item => item.name}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              onEndReached={() => paginate(count)}
              ListFooterComponent={renderFooter}
            />
          }
          {
            (!waitingForResults) && (search !== "") && (searchResults.hasOwnProperty("id")) &&
            <FlatList
              data={[searchResults]}
              renderItem={getPokemon}
              keyExtractor={item => item.name}
              showsVerticalScrollIndicator={false}
              numColumns={2}
            />
          }
          {
            (waitingForResults) &&
            <ActivityIndicator size="large" color="#000" />
          }
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
  searchBarContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  pokemonList: {
    flex: 7
  }
})