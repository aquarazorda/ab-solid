import { createMemo } from "solid-js";
import { createStaticResource } from "./utils";

export const createPageData = (pageId: string) => {
  const [pagesData] = createStaticResource<Record<string, string>>("pagesNew", { lang: true });
  const page = createMemo(() => pagesData()?.[pageId]);

  return page;
};
