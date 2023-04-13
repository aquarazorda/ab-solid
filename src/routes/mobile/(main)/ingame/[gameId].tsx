import { useI18n } from "@solid-primitives/i18n";
import { A, useRouteData } from "@solidjs/router";
import { Show, createEffect, createMemo, createResource, onCleanup, onMount } from "solid-js";
import { Portal } from "solid-js/web";
import { RouteDataArgs, useParams } from "solid-start";
import { P, match } from "ts-pattern";
import { setFooterState } from "~/components/mobile/Footer";
import { generateGameUrl, getAllGamesData } from "~/queries/games";
import { createStaticResource } from "~/queries/utils";
import { setMobileHeaderState } from "~/states/header";
import { GameProvider } from "~/types/game";

type GameProviders = {
  [key: number]: GameProvider;
};

export const routeData = ({ params }: RouteDataArgs) => {
  const allGames = getAllGamesData();
  const [providers] = createStaticResource<GameProviders>("gameProviders");
  const game = createMemo(() => allGames()?.list.find((game) => game.id === Number(params.gameId)));
  const provider = createMemo(() =>
    match(game()?.pid)
      .with(P.number, (pid) => providers()?.[pid])
      .otherwise(() => null)
  );

  return { game, provider };
};

export default function InGameMobile() {
  const [t] = useI18n();
  const { game, provider } = useRouteData<typeof routeData>();

  onMount(() => {
    setMobileHeaderState("hidden", true);
    setFooterState("hidden", true);

    onCleanup(() => {
      setMobileHeaderState("hidden", false);
      setFooterState("hidden", false);
    });
  });

  const [gameUrl] = createResource(
    () => game() && provider(),
    async () => {
      if (!game() && !provider()) return "";

      return await generateGameUrl(game()!, provider()!);
    }
  );

  return (
    <>
      <div class="_s_color-bg-primary-4 _s_flex _s_p-2">
        <div class="_s_flex _s_flex-a-center _s_mr-auto">
          <A href="/mobile" class="_s_icon _s_icon-md _s_adj-logo" />
        </div>
        <div
          class="_s_b-radius-full _s_color-rgba-bg-primary-7-0--4 _s_flex _s_flex-a-center 
          _s_flex-j-center _s_mr-3 _s_size-h-px--8 _s_size-w-px--8"
        >
          <div class="_s_icon _s_icon-sm _s_adj-gift1" />
        </div>
        <div class="_s_b-radius-xxl _s_color-rgba-bg-primary-7-0--4 _s_flex _s_flex-a-center _s_flex-j-center _s_pl-2 _s_pr-2">
          <span class="_s_label _s_label-t-u _s_mr-1">{t("_lang_my_account_deposit")}</span>
          <span class="_s_icon _s_icon-sm _s_adj-deposit _s_color-primary-2 _s_m-none" />
        </div>
      </div>
      <Show when={gameUrl()}>
        {/* <Portal> */}
        <iframe
          src={gameUrl()}
          class="_s_overflow-hidden _s_size-w-percent--25 _s_position-relative _s_z-5"
          style={{ height: "calc(100vh - 48px" }}
          frameborder="0"
        />
        {/* </Portal> */}
      </Show>
    </>
  );
}
