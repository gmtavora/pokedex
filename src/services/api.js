/*
 * api.js
 * ------
 * Arquivo que define as configurações da API.
 * 
 */

import axios from 'axios'

const api = axios.create({
  //baseURL: "https://pokeapi.co/api/v2/"
  // Não é possível utilizar baseURL, porque a API retorna a URL completa.
})

export default api