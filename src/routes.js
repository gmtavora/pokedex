/*
 *  routes.js
 *  ---------
 *  Arquivo que armazena as configurações do React Navigation.
 * 
 *  Parâmetros
 *  ----------
 *  Nenhum.
 * 
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './views/Home.js'
import PokemonScreen from './views/Details.js'

const Stack = createStackNavigator()

export default props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pokemon" component={PokemonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}