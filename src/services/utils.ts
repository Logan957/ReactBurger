import { API_URL_TOKEN } from "./constants/constant";

interface RefreshData {
  success: boolean;
  refreshToken: string;
  accessToken: string;
}

export const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options).then(checkResponse<T>);
};

export const fetchWithRefresh = async<T> (url: string, options: RequestInit): Promise<T> => {
  try {
    return await request<T>(url, options);
  } catch (err) {
    if (err === "403") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers = {
        ...(options.headers || {}),
        authorization: refreshData.accessToken,
      };
      return await request<T>(url, options); //повторяем запрос
    } else {
      return Promise.reject(err);
    }
  }
};

export function checkResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json() as Promise<T>;
  }
  return Promise.reject(`${res.status}`);
}

export const refreshToken = (): Promise<RefreshData> => {
  return request<RefreshData>(`${API_URL_TOKEN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};