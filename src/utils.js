/*
 * utils.js
 * --------
 * Arquivo que define funções utilizadas por vários arquivos da aplicação.
 * 
 */

import { Alert } from 'react-native'

import * as COLORS from './colors.js'

/* 
 *  getColors
 *
 *  Descrição
 *  ---------
 *  Recebe o tipo principal do Pokémon e retorna as cores que o
 *  representam na interface gráfica. Alterar somente o arquivo 'colors.js'.
 *  
 *  
 *  Argumentos
 *  ----------
 *  type: Tipo principal do Pokémon.
 *  
 *  Retorno
 *  -------
 *  Objeto com os códigos hexadecimais das cores primária e secundária
 *  referente ao tipo do Pokémon.
 * 
 */
export function getColors(type) {
  switch (type) {
    case "grass":
      return { primaryColor: COLORS.GREEN, secondaryColor: COLORS.LIGHT_GREEN }
    case "fire":
      return { primaryColor: COLORS.RED, secondaryColor: COLORS.LIGHT_RED }
    case "water":
      return { primaryColor: COLORS.BLUE, secondaryColor: COLORS.LIGHT_BLUE }
    case "ground":
      return { primaryColor: COLORS.BROWN, secondaryColor: COLORS.LIGHT_BROWN }
    case "fighting":
      return { primaryColor: COLORS.ORANGE, secondaryColor: COLORS.LIGHT_ORANGE }
    case "electric":
      return { primaryColor: COLORS.YELLOW, secondaryColor: COLORS.LIGHT_YELLOW }
    case "psychic":
      return { primaryColor: COLORS.PINK, secondaryColor: COLORS.LIGHT_PINK }
    case "normal":
      return { primaryColor: COLORS.NORMAL, secondaryColor: COLORS.LIGHT_NORMAL }
    case "bug":
      return { primaryColor: COLORS.BUG, secondaryColor: COLORS.LIGHT_BUG }
    case "dark":
      return { primaryColor: COLORS.BLACK, secondaryColor: COLORS.LIGHT_BLACK }
    case "dragon":
      return { primaryColor: COLORS.DRAGON, secondaryColor: COLORS.LIGHT_DRAGON }
    case "fairy":
      return { primaryColor: COLORS.FAIRY, secondaryColor: COLORS.LIGHT_FAIRY }
    case "flying":
      return { primaryColor: COLORS.FLYING, secondaryColor: COLORS.LIGHT_FLYING }
    case "ghost":
      return { primaryColor: COLORS.GHOST, secondaryColor: COLORS.LIGHT_GHOST }
    case "rock":
      return { primaryColor: COLORS.ROCK, secondaryColor: COLORS.LIGHT_GHOST }
    case "ice":
      return { primaryColor: COLORS.ICE, secondaryColor: COLORS.LIGHT_ICE }
    case "poison":
      return { primaryColor: COLORS.POISON, secondaryColor: COLORS.LIGHT_POISON }
    case "steel":
      return { primaryColor: COLORS.STEEL, secondaryColor: COLORS.LIGHT_STEEL }
    default:
      break
  }
}

/*
 *  capitalize
 *
 *  Descrição
 *  ---------
 *    Substitui a primeira letra da string pela mesma letra maiúscula.
 *  
 *  
 *  Argumentos
 *  ----------
 *    str: A string a ser alterada.
 *  
 *  Retorno
 *  -------
 *    str: A string alterada.
 * 
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/*
 *  showError
 *
 *  Descrição
 *  ---------
 *    Exibe um alerta quando ocorre um erro.
 * 
 *  Argumentos
 *  ----------
 *    err: Exceção
 * 
 *  Retorno
 *  -------
 *    null
 * 
 */
export function showError(err) {
  Alert.alert("Erro", err.message)
}