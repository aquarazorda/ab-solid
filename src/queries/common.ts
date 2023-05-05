import { logOut } from "~/states/user";

export const checkResponse = async <T>(res: Response) => {
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const json = await res.json();
  if (json?.StatusCode === 126) {
    logOut();
  }

  return json as T;
};
