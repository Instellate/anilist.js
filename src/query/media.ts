import axios from 'axios'
import { AnimeFormat } from './media.types'

const url = 'https://graphql.anilist.co/'


async function search(name: string, type: String, page: Number = 1, resultsCount: Number = 5, isAdult: Boolean = false) {

  if (typeof name != "string") throw new Error('id must be a string')
  if (typeof page != "number") throw new Error('page must be a number')
  if (typeof resultsCount != "number") throw new Error('results must be a number')
  if (typeof type != "string") throw new Error('type must be a string')
  if (!(type === 'anime' || 'manga')) throw new Error('type must be anime or manga')
  if (typeof isAdult != "boolean") throw new Error('isAdult must be a boolean')
  if (resultsCount > 50) throw new Error('resultsCount must be less than 50')

  let res = await axios('https://graphql.anilist.co', {
    method: 'post',
    data: {
      query: `query($name: String, $type: MediaType, $page: Int, $perPage: Int) {
            Page(page: $page, perPage: $perPage) {
              media(search: $name, type: $type) {
                id
                title {
                  romaji
                  english
                  native
                }
                format
                isAdult
              }
            }
          }
          `,
      variables: {
        name: name,
        type: type.toUpperCase(),
        page: page,
        perPage: resultsCount
      }
    }
  })
  const data = {
    data: []
  }
  res.data.data.Page.media.forEach(element => {
    if (isAdult === false) {
      if (element.isAdult === false) {
        data.data.push({
          id: element.id,
          title: element.title,
          format: AnimeFormat[element.format],
        })
      } else {
        return
      }
    } else {
      data.data.push(element)
    }
  });
  return data
}

export { search }