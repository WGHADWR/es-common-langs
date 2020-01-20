import { http } from './http/HttpClients';
declare const _default: {
    http: typeof http;
    util: {
        finance: {
            format(value: number, places?: number, symbol?: string, thousand?: string, decimal?: string): string;
        };
    };
};
export default _default;
