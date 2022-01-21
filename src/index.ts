import { search as _search } from './query/media'
import { userList as _userList } from './query/user'
import { searchReturn } from './query/media.types'


class Anilist {

    [x: string]: any;
    media = {
        /**
         * Search for a media.
         * 
         * @param name The name of the media to search for
         * @param type The type, can be either anime or manga
         * @param page Which page to show
         * @param resultsCount How many results to show per page
         * @param isAdult Will show media for 18+ content if true
         * 
         * @returns {Promise<import('./query/media.types').searchReturn>} An array of all results
         */
        search(name: string, type: string, page: number = 1, resultsCount: number = 5, isAdult: boolean = false) {
            return _search(name, type, page, resultsCount, isAdult)
        }
    };
    user = {
        /**
         * Get a user's list
         * 
         * @param name The name of the user
         * @param type The type of list, can be either anime or manga
         */
        list(name: string, type: string) {
            return _userList(name, type)
        }
    }

    /**
     * Anilist parameters
     * 
     * @constructor
     * @param {any} options Options related to ratelimits
     * @param {boolean} options.rateLimitPrevent Decided if requests gets tracked and prevented by the library or the api
     * @param {number} options.requestsPerMinute The amount of requests per minute the ratelimit is. Default: 90
     */
    constructor(options: {
        rateLimitPrevent: boolean;
        requestsPerMinutes: number;
    } = {
            rateLimitPrevent: false,
            requestsPerMinutes: 90
        }) {
        this.rtp = options.rateLimitPrevent;
        this.rpl = options.requestsPerMinutes
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

}

export default Anilist