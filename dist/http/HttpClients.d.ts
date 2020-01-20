import { AxiosRequestConfig } from 'axios';
export interface HttpClientsConfig extends AxiosRequestConfig {
}
/**
 * Http client;
 * @description default content-type is 'application/x-www-form-urlencoded'
 */
export declare class HttpClients {
    private static readonly requestTimeout;
    private static requestInterceptors;
    private static responseInterceptors;
    private static exceptionInterceptors;
    static registRequestInterceptor(interceptor: Function): void;
    static registResponseInterceptors(interceptor: Function): void;
    static registExceptionInterceptors(interceptor: Function): void;
    private static dispatchInterceptor;
    static request(requestOptions: HttpClientsConfig): Promise<any>;
    static get(url: string, data?: any): Promise<any>;
    static post(url: string, data: any, options?: HttpClientsConfig): Promise<any>;
    static put(url: string, data: any, options?: HttpClientsConfig): Promise<any>;
    static delete(url: string): Promise<any>;
    private static removeEmptyParams;
}
