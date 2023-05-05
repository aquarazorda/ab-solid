import { SearchGameData } from "~/types/slots";
import { createWebApiQuery } from "../webapi";
import { useConfig } from "~/config";
import { useParams, useSearchParams } from "solid-start";
import { SlotsRouteSearchParams } from "~/routes/mobile/(main)/Slots";
import { createMemo } from "solid-js";

type Props = {
  from: number;
  type: "slot" | "casino";
};

export const getFilteredGames = (props: Props) => {
  const { isMobile, isAm } = useConfig();
  const [search] = useSearchParams<SlotsRouteSearchParams>();
  const params = useParams<{ provider: string }>();

  const queryKey = createMemo(() => {
    const arr: any[] = [props.from];

    if (search.text) {
      arr.push(search.text);
      return arr;
    }

    search.category && arr.push(search.category);
    params.provider && arr.push(params.provider);
    return arr;
  });

  return createWebApiQuery<SearchGameData>({
    path: "games",
    key: queryKey,
    params: () =>
      search.text || search.category || params.provider
        ? {
            from: props.from,
            type: props.type,
            device: isMobile ? "mobile" : "desktop",
            domain: isAm ? "am" : "com",
            limit: 8,
            ...(search?.text
              ? { name: search.text }
              : {
                  categoryId: search?.category,
                  providerId: params?.provider,
                }),
          }
        : undefined,
    options: {
      post: true,
    },
  });
};
