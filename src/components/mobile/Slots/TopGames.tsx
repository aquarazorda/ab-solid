import { Suspense } from "solid-js";
import MobileGameWidgetLoader from "./GameWidgetLoader";
import MobileGameProviderHorizontal from "./GameProviderHorizontal";
import { createWebApiQuery } from "~/queries/webapi";
import { SearchGameData } from "~/types/slots";

export const TopGames = () => {
  const top = createWebApiQuery<SearchGameData>({
    path: "games",
    options: {
      post: true,
    },
    params: () => ({
      from: 0,
      categoryId: 57,
      limit: 20,
      type: "slot",
      device: "mobile",
    }),
  });

  return (
    <Suspense fallback={<MobileGameWidgetLoader count={1} />}>
      <MobileGameProviderHorizontal
        title="_lang_slots_topgames"
        gameData={{
          providerId: "top-games",
          games: top.data!.items,
        }}
      />
    </Suspense>
  );
};
