import { createMemo } from "solid-js";
import { createStaticResource } from "./static";

export const createPageData = (pageId: string) => {
  const [pagesData] = createStaticResource<Record<string, string>>("pagesNew", { lang: true });
  const page = createMemo(() => pagesData()?.[pageId]);

  return page;
};
