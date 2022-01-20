enum AnimeFormat {
    'TV' = 'tv',
    'TV_SHORT' = 'tv_short',
    'MOVIE' = 'movie',
    'SPECIAL' = 'special',
    'OVA' = 'ova',
    'ONA' = 'ona',
    'MUSIC' = 'music',
    'MANGA' = 'manga',
    'NOVEL' = 'novel',
    'ONE_SHOT' = 'tv',
}


/**
 * The data from searchReturn
 * 
 * @interface searchReturn
 * @property {number} id The id of the media
 * @property {any} title The title of the media
 * @property {string} title.romaji The romaji title of the media
 * @property {string} title.english The english title of the media
 * @property {string} title.native The native title of the media
 * @property {AnimeFormat} format The format of the media
 * @property {boolean} isAdult Is the media 18+
 */
interface searchReturn {
    id: number;
    title: {
        romaji: string;
        english: string;
        native: string;
    };
    format: AnimeFormat;
    isAdult?: boolean;
}

export { AnimeFormat, searchReturn };