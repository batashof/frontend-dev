
import { stringify } from 'qs';
import {CustomFetchConfig} from "./types";
// import {useV1AuthTokenRefreshCreate} from "./auth/auth";

export const useCustomInstance = <T>(): ((config: CustomFetchConfig) => Promise<T>) => {

  // const { mutateAsync: refresh } =useV1AuthTokenRefreshCreate()
  return async (config: CustomFetchConfig) => {
    // Обновление токена
    // const refreshed = await refresh({
    //   data: {
    //     refresh: sessionStorage.getItem('token') || ''
    //   }
    // });
    // if (refreshed ) {
    //   sessionStorage.setItem('token', refreshed.access);
    // }

    const token = localStorage.getItem('token');
    // if (!token) {
    //   throw new Error('Недопустимый токен');
    // }

    const { url, method = 'GET', params, data, headers } = config;
    const queryString = Boolean(params)
      ? `?${stringify(params, { arrayFormat: 'repeat', encode: false })}`
      : '';
    const fullUrl = `${url}${queryString}`;

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...headers
        },
        body: method !== 'GET' ? JSON.stringify(data) : undefined
      });

      // Обработка ошибок ответа
      if (!response.ok) {
        const errorResponse = await response.json();
        handleErrors(response.status, errorResponse.message);
        throw new Error(
          errorResponse.message || 'Неизвестная ошибка. Свяжитесь со службой поддержки.'
        );
      }

      // Обработка успешного ответа
      return await parseResponse<T>(response);
    } catch (err) {
      // handleNetworkError(err);
      throw err;
    }
  };
};

const parseResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get('Content-Type');
  if (!contentType) {
    return {} as T;
  }
  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  }
  try {
    return (await response.blob()) as T;
  } catch (e) {
    return {} as T;
  }
};

const handleErrors = (status: number, message?: string) => {
  const defaultMessage = 'Произошла ошибка. Свяжитесь со службой поддержки.';

  if ([400, 403, 404, 500, 501, 502, 504].includes(status)) {}
  //   showSystemMessages({
  //     text: message || defaultMessage,
  //     type: NotificationType.ERROR
  //   });
  // } else if (status === 503) {
  //   showSystemMessages({
  //     text: 'Сервер временно недоступен. Свяжитесь со службой поддержки.',
  //     type: NotificationType.ERROR
  //   });
  // }
};

// Функция для обработки сетевых ошибок
// const handleNetworkError = (err: unknown) => {
//   const defaultMessage = 'Произошла неизвестная ошибка. Свяжитесь со службой поддержки.';
//
//   // showSystemMessages({
//   //   text: err instanceof Error ? err.message || 'Потеряно интернет соединение' : defaultMessage,
//   //   type: NotificationType.ERROR
//   // });
// };