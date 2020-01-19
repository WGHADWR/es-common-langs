"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
var http;
(function (http) {
    /**
     * Http client;
     * @description default content-type is 'application/x-www-form-urlencoded'
     */
    class HttpClients {
        static registRequestInterceptor(interceptor) {
            this.requestInterceptors.push(interceptor);
        }
        static registResponseInterceptors(interceptor) {
            this.responseInterceptors.push(interceptor);
        }
        static registExceptionInterceptors(interceptor) {
            this.exceptionInterceptors.push(interceptor);
        }
        static dispatchInterceptor(interceptors, params) {
            if (!interceptors || interceptors.length === 0) {
                return {};
            }
            let options = {};
            interceptors.forEach((interceptor) => {
                options = Object.assign(Object.assign({}, options), interceptor(params));
            });
            return options;
        }
        static request(requestOptions) {
            return __awaiter(this, void 0, void 0, function* () {
                const { url, method = 'GET' } = requestOptions;
                let { headers = {}, data } = requestOptions;
                // const contentType: string = headers['content-type'] || '';
                let params = {};
                // if (contentType.indexOf('application/x-www-form-urlencoded') !== -1) {
                //   params = { ...data };
                //   data = null;
                // }
                data = this.removeEmptyParams(data);
                if (method.toUpperCase() === 'GET') {
                    params = Object.assign({}, data);
                    data = null;
                }
                else {
                    data = qs_1.default.stringify(data);
                }
                const options = this.dispatchInterceptor(this.requestInterceptors);
                const { headers: $headers = {} } = options;
                headers = Object.assign(Object.assign({}, headers), $headers);
                try {
                    const response = yield axios_1.default.request({
                        url,
                        method,
                        headers: Object.assign({ 'content-type': 'application/x-www-form-urlencoded' }, headers),
                        params,
                        data,
                        timeout: this.requestTimeout,
                    });
                    return response.data;
                }
                catch (e) {
                    // console.log(e);
                    this.dispatchInterceptor(this.exceptionInterceptors, { e });
                }
                return {};
            });
        }
        static get(url, data) {
            return __awaiter(this, void 0, void 0, function* () {
                return HttpClients.request({
                    url,
                    data,
                });
            });
        }
        static post(url, data, options) {
            return __awaiter(this, void 0, void 0, function* () {
                return HttpClients.request(Object.assign({ url, method: 'POST', data }, options));
            });
        }
        static put(url, data, options) {
            return __awaiter(this, void 0, void 0, function* () {
                return HttpClients.request(Object.assign({ url, method: 'PUT', data }, options));
            });
        }
        static delete(url) {
            return __awaiter(this, void 0, void 0, function* () {
                return HttpClients.request({
                    url,
                    method: 'DELETE',
                });
            });
        }
        static removeEmptyParams(params) {
            if (!params || typeof (params) !== 'object') {
                return params;
            }
            const isNotBlank = (value) => {
                if (value === null) {
                    return false;
                }
                if (typeof value === 'string' && value.trim().length === 0) {
                    return false;
                }
                return true;
            };
            const $params = {};
            const keys = Object.keys(params);
            keys.forEach((p) => {
                if (isNotBlank(params[p])) {
                    $params[p] = params[p];
                }
            });
            return $params;
        }
    }
    HttpClients.requestTimeout = 30000;
    HttpClients.requestInterceptors = [];
    HttpClients.responseInterceptors = [];
    HttpClients.exceptionInterceptors = [];
    http.HttpClients = HttpClients;
})(http = exports.http || (exports.http = {}));
