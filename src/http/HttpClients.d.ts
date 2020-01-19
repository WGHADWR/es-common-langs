
export interface HttpClientsConfig extends AxiosRequestConfig {}

export interface HttpClients {

  get(url: string, data?: any, options?: HttpClientsConfig): Promise<any>;
  post(url: string, data: any, options?: HttpClientsConfig): Promise<any>;
  put(url: string, data: any, options?: HttpClientsConfig): Promise<any>;
  delete(url: string, data: any, options?: HttpClientsConfig): Promise<any>;

}
