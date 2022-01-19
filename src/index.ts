

class Anilist {
    [x: string]: any;
    constructor(options?: {
        rateLimitPrevent?: boolean;
        requestsPerLimits?: number;
    }) {
        this.rtp = options.rateLimitPrevent
        this.rpl = options.requestsPerLimits || 90
        this.AuthToken = null
    }

    async setAuth(auth: string) {
        this.AuthToken = auth
    }
}

export default Anilist;