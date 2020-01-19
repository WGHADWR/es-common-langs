import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

interface HttpClientsConfig extends AxiosRequestConfig {}

/**
 * Http client;
 * @description default content-type is 'application/x-www-form-urlencoded'
 */
export class HttpClients {

  private static readonly requestTimeout = 30000;
  private static requestInterceptors: Function[] = [];
  private static responseInterceptors: Function[] = [];
  private static exceptionInterceptors: Function[] = [];

  public static registRequestInterceptor(interceptor: Function) {
    this.requestInterceptors.push(interceptor);
  }

  public static registResponseInterceptors(interceptor: Function) {
    this.responseInterceptors.push(interceptor);
  }

  public static registExceptionInterceptors(interceptor: Function) {
    this.exceptionInterceptors.push(interceptor);
  }

  private static dispatchInterceptor(interceptors: Function[], params?: any) {
    if (!interceptors || interceptors.length === 0) {
      return {};
    }
    let options = {};
    interceptors.forEach((interceptor: Function) => {
      options = { ...options, ...interceptor(params) };
    });
    return options;
  }

  public static async request(requestOptions: HttpClientsConfig): Promise<any> {
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
      params = { ...data };
      data = null;
    } else {
      data = qs.stringify(data);
    }

    const options: any = this.dispatchInterceptor(this.requestInterceptors);
    const { headers: $headers = {} } = options;
    headers = {
      ...headers, ...$headers,
    };

    try {
      const response = await axios.request({
        url,
        method,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          ...headers,
        },
        params,
        data,
        timeout: this.requestTimeout,
      });
      return response.data;
    } catch (e) {
      // console.log(e);
      this.dispatchInterceptor(this.exceptionInterceptors, { e });
    }
    return {};
  }

  public static async get(url: string, data?: any): Promise<any> {
    return HttpClients.request({
      url,
      data,
    });
  }

  public static async post(url: string, data: any, options?: HttpClientsConfig): Promise<any> {
    return HttpClients.request({
      url,
      method: 'POST',
      data,
      ...options,
    });
  }

  public static async put(url: string, data: any, options?: HttpClientsConfig): Promise<any> {
    return HttpClients.request({
      url,
      method: 'PUT',
      data,
      ...options,
    });
  }

  public static async delete(url: string): Promise<any> {
    return HttpClients.request({
      url,
      method: 'DELETE',
    });
  }

  private static removeEmptyParams(params: any) {
    if (!params || typeof (params) !== 'object') {
      return params;
    }

    const isNotBlank = (value: any) => {
      if (value === null) {
        return false;
      }
      if (typeof value === 'string' && value.trim().length === 0) {
        return false;
      }
      return true;
    };

    const $params: any = {};
    const keys = Object.keys(params);
    keys.forEach((p: string) => {
      if (isNotBlank(params[p])) {
        $params[p] = params[p];
      }
    });
    return $params;
  }

}
