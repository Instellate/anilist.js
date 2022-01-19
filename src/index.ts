import { search as mediaSearch } from './query/media'



class Anilist {

    [x: string]: any;
    /**
     * Anilist parameters
     * 
     * @constructor
     * @param {any} options Options related to ratelimits
     * @param {boolean} options.rateLimitPrevent Decided if requests gets tracked and prevented by the library or the api
     * @param {number} options.requestsPerMinute The amount of requests per minute the ratelimit is. Default: 90
     */
    constructor(options?: {
        rateLimitPrevent?: boolean;
        requestsPerMinutes?: number;
    }) {
        this.rtp = options.rateLimitPrevent || false;
        this.rpl = options.requestsPerMinutes || 90
        this.AuthToken = null
    }

    /**
     * Set a auth token used in request's needing one
     * 
     * @param {string} auth The auth token to use for requests
     */
    async setAuth(auth: string) {
        this.AuthToken = auth
    }

    /**
     * Search for a media.
     * 
     * @param name The name of the media to search for
     * @param type The type, can be either anime or manga
     * @param page Which page to show
     * @param resultsCount How many results to show per page
     * @param isAdult Will show media for 18+ content if true
     * 
     * @returns {Promise<any>} An array of all results
     */
    search(name: string, type: string, page: number = 1, resultsCount: number = 5, isAdult: boolean = false) {
        mediaSearch(name, type, page, resultsCount, isAdult)
    }
}

export default Anilist;