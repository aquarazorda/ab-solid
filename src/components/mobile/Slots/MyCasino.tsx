import { Show, Suspense } from "solid-js";
import { createAuthProxyQuery } from "~/queries/webapi";
import { SlotsGame } from "~/types/slots";
import MobileGameProviderHorizontal from "./GameProviderHorizontal";
import { isAuthenticated } from "~/states/user";
import MobileGameWidgetLoader from "./GameWidgetLoader";

export const SlotsMyCasino = () => {
  const lastPlayed = createAuthProxyQuery<SlotsGame[]>({
    path: "apigwcomlazy/games/last-played",
    params: () => ({
      device: "mobile",
      gameType: "slot",
    }),
    options: {
      post: true,
    },
  });

  const favorites = createAuthProxyQuery<SlotsGame[]>({
    path: "apigwcomlazy/games/favorite-games/get",
    params: () => ({
      device: "mobile",
      gameType: "slot",
    }),
    options: {
      post: true,
    },
  });

  return (
    <Show when={isAuthenticated()}>
      <Suspense fallback={<MobileGameWidgetLoader count={1} />}>
        <MobileGameProviderHorizontal
          title="_lang_slots_last_played"
          gameData={{
            providerId: "last-played",
            games: lastPlayed.data!,
          }}
        />
      </Suspense>
      <Suspense fallback={<MobileGameWidgetLoader count={1} />}>
        <MobileGameProviderHorizontal
          title="_lang_slots_favorites"
          gameData={{
            providerId: "favorites",
            games: favorites.data!,
          }}
        />
      </Suspense>
    </Show>
  );
};
