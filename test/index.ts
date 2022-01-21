import Anilist from '../src/index'

const anilist = new Anilist()

anilist.userList('flazepe', 'anime').then(res => {
    console.log(res.data.completed)
})
