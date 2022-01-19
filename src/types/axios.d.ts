import 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        query?: any
        variables?: any
    }
}