import { GREEN, RED } from './colors.js'

export function colorPicker(types) {
  if (types[0].name === "grass") return { backgroundColor: GREEN }
  if (types[0].name === "fire") return { backgroundColor: RED }
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}