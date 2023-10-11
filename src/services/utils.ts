import { API_URL_TOKEN } from "./constants/constant";
import { TIngredient, TIngredientDetails } from "./types/ingredient-type";

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

export const getCurrentTimestamp = (): number => new Date().getTime() / 1000;


export const getStatus = (status:string) => {
  if (status === 'done') return 'Выполнен';
  if (status === 'created') return 'Создан';
  if (status === 'pending') return 'Готовится';
  return false
}

export const getStatusColor = (status: string) =>
status === "done" ? "#00CCCC" : "#FFFFFF";

export const splitArr = (arr: any, size: number) =>
arr.reduce(
  (item: any, c: any) => {
    if (item[item.length - 1].length === size) {
      item.push([]);
    }
    item[item.length - 1].push(c);
    return item;
  },
  [[]]
);

export const filterIngredients = (ingredients: TIngredient[], array: string[]): TIngredient[] => {
  return array.map((item) => ingredients.find(i => i._id === item)) as TIngredient[];
};

export const sortIngredientsDetails = (ingredientsArray: TIngredient[]) => {
  const array = ingredientsArray.reduce((acc: TIngredientDetails[], item: TIngredient) => {
    if(acc.find(i => i._id === item._id)) {
      return acc.map((value) => (
        value._id === item._id ? {...value, quantity: value.quantity + 1} : value
      ));
    }
    return [...acc, {...item, quantity: 1}];
  }, []);

  return array;
};