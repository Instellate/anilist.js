

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
}

export default Anilist;