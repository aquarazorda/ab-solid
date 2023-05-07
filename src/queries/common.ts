export const checkResponse =
  <T>(logOut?: (byUser?: boolean | undefined) => void) =>
  async (res: Response) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const json = await res.json();
    if (json?.StatusCode === 126 && logOut) {
      logOut();
    }

    return json as T;
  };
