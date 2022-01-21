import axios from 'axios'
import { StatusFormat } from './user.types'

const url = 'https://graphql.anilist.co/'

async function userList(name: String, type: string) {
    if(!(typeof name ==='string')) throw new Error('name must be a string')
    if(!(typeof type ==='string')) throw new Error('type must be string')
    if(!(type === 'anime' || 'manga')) throw new Error('type must be either be anime or manga')

    let res = await axios(url, {
        method: 'POST',
        data: {
            query: `
            query($name: String, $type: MediaType){
                MediaListCollection(userName: $name, sort: SCORE_DESC, type: $type) {
                  lists{
                    status
                    entries{
                      score
                      notes
                      media{
                        id
                        title {
                          romaji
                          english
                          native
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: {
                name: name,
                type: type.toUpperCase()
            }
        }
    })

    const filterData = {
        data: {
            watching: [],
            completed: [],
            paused: [],
            dropped: [],
            planning: [],
        }
    }

    const completedArray = res.data.data.MediaListCollection.lists.find( ({ status }) => status === 'COMPLETED' )?.entries 
    const watchingArray = res.data.data.MediaListCollection.lists.find( ({ status }) => status === 'CURRENT' )?.entries 
    const pausedArray = res.data.data.MediaListCollection.lists.find( ({ status }) => status === 'PAUSED')?.entries 
    const droppedArray = res.data.data.MediaListCollection.lists.find( ({ status}) => status === 'DROPPED')?.entries 
    const planningArray = res.data.data.MediaListCollection.lists.find( ({ status }) => status === 'PLANNING')?.entries 

    if(completedArray) {
        completedArray.forEach(element => {
            filterData.data.completed.push({
                score: element.score,
                id: element.media.id,
                titles: element.media.title,
                notes: element.notes
            })
        });
    }
    if(watchingArray) {
        watchingArray.forEach(element => {
            filterData.data.watching.push({
                score: element.score,
                id: element.media.id,
                titles: element.media.title,
                notes: element.notes
            })
        });
    }
    if(pausedArray) {
        pausedArray.forEach(element => {
            filterData.data.paused.push({
                score: element.score,
                id: element.media.id,
                titles: element.media.title,
                notes: element.notes
            })
        })
    }
    if(droppedArray) {
        droppedArray.forEach(element => {
            filterData.data.dropped.push({
                score: element.score,
                id: element.media.id,
                titles: element.media.title,
                notes: element.notes
            })
        })
    }
    if(planningArray) {
        planningArray.forEach(element => {
            filterData.data.planning.push({
                score: element.score,
                id: element.media.id,
                titles: element.media.title,
                notes: element.notes
            })
        })
    }

    return filterData
}

export { userList } 