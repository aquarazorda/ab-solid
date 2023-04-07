export const scrollToTop = () => window.scrollTo(0, 0);

export const searchParamsToPartial = <T extends object>(search: string): Partial<T> => {
  const searchParams = new URLSearchParams(search);
  const queryObject = {} as Partial<T>;

  for (const [key, value] of searchParams.entries()) {
    queryObject[key as keyof T] =
      value === "true" ? true : value === "false" ? false : (value as any);
  }

  return queryObject;
};
