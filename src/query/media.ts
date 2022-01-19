import post from 'axios'

const url = 'https://graphql.anilist.co/'

enum MediaFormat {
    'TV' = 'tv',
    'TV_SHORT' = 'tv_short',
    'MOVIE' = 'movie',
    'SPECIAL' = 'special',
    'OVA' = 'ova',
    'ONA' = 'ona',
    'MUSIC' = 'music',
    'MANGA' = 'manga',
    'NOVEL' = 'novel',
    'ONE_SHOT' = 'one_shot',
}
async function search(name: string, type: String, page: Number = 1, results: Number = 5, isAdult: Boolean = false) {

    if (typeof name != "string") throw new Error('id must be a string')
    if (typeof page != "number") throw new Error('page must be a number')
    if (typeof results != "number") throw new Error('results must be a number')
    if (typeof type != "string") throw new Error('type must be a string')
    if (!(type === 'anime' || 'manga')) throw new Error('type must be anime or manga')
    if (typeof isAdult != "boolean") throw new Error('isAdult must be a boolean')

    let res = await post(url, {
        query: `query($name: String, $type: String, $page: Int, $perPage: Int) {
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

        },
    })
}

