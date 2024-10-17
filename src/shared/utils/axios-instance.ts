/* eslint-disable @typescript-eslint/unbound-method */

/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios";
import type {
  AxiosRequestConfig,
  AxiosInstance as RawAxiosInstance,
} from "axios";
import { produce } from "immer";
import qs from "qs";
import type { IStringifyOptions } from "qs";

import { getApiServerURL, getApiTimeOut } from "./env-utils";

// type Result<T> = {
//   success: boolean;
//   code: number;
//   msg: string;
//   data: T;
// };
type Result<T> = T;

type RequestConfig = AxiosRequestConfig & {
  /**
   * @param indices
   * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' })
   * 'a[0]=b&a[1]=c'
   * @param brackets
   * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' })
   * 'a[]=b&a[]=c'
   * @param repeat
   * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' })
   * 'a=b&a=c'
   * @param comma
   * qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'comma' })
   * 'a=b,c'
   */
  arrayFormat?: IStringifyOptions["arrayFormat"];
};

type AxiosInstance = Omit<
  RawAxiosInstance,
  "get" | "post" | "put" | "delete"
> & {
  get: <T = unknown, R = Result<T>>(
    url: string,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ) => Promise<R>;

  post: <T = unknown, R = Result<T>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<R>;

  put: <T = unknown, R = Result<T>>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<R>;

  delete: <T = unknown, R = Result<T>>(
    url: string,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ) => Promise<R>;
};

/**
 * request interceptor
 */
const interceptRequest = (instance: RawAxiosInstance) => {
  instance.interceptors.request.use((config) => {
    return config;
  });
};

/**
 * response interceptor
 */
const interceptResponse = (instance: RawAxiosInstance) => {
  instance.interceptors.response.use((res) => {
    return res.data;
  });
};

/**
 *  convert request
 */
const setRequestProxy = (instance: RawAxiosInstance) => {
  const _get = instance.get;
  const _delete = instance.delete;

  const appendParamsToUrl = (
    url: string,
    params?: Record<string, unknown>,
    arrayFormat?: RequestConfig["arrayFormat"],
  ) => {
    return `${url}${qs.stringify(params, {
      addQueryPrefix: true,
      arrayFormat: arrayFormat ?? "repeat",
    })}`;
  };

  const filterConfig = (config: RequestConfig) => {
    return produce(config, (draft) => {
      delete draft.arrayFormat;
    });
  };

  instance.get = (
    url: string,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ) => {
    return _get(
      appendParamsToUrl(url, params, config?.arrayFormat),
      config?.arrayFormat ? filterConfig(config) : config,
    );
  };

  instance.delete = (
    url: string,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ) => {
    return _delete(
      appendParamsToUrl(url, params, config?.arrayFormat),
      config?.arrayFormat ? filterConfig(config) : config,
    );
  };
};

const createInstance = () => {
  const axiosInstance = axios.create({
    baseURL: getApiServerURL(),
    timeout: getApiTimeOut(),
  });

  interceptRequest(axiosInstance);
  interceptResponse(axiosInstance);
  setRequestProxy(axiosInstance);

  return axiosInstance as AxiosInstance;
};

export const axiosInstance = createInstance();
