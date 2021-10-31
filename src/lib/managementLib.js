import { root_server } from "../constants"

export const getAliasFromShortenURL = shorten_url => {
  return shorten_url.replace(`${root_server}/`, '')
}