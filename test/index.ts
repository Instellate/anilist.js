import Anilist from '../src/index'

const anilist = new Anilist()

anilist.search('naruto', 'anime', 1, 5, false).then(res => {
    console.log(res.data[0])
})
