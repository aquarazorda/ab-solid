import { useNavigate, useParams, useRouteData } from "solid-start";
import { CasinoMobileData } from "../Casino";
import { For, createMemo } from "solid-js";
import { createStaticUrl } from "~/utils/string";
import { useI18n } from "@solid-primitives/i18n";
import { useOpenGame } from "~/utils/games";

export default function CasinoCategoryView() {
  const params = useParams();
  const [t, { locale }] = useI18n();
  const { casinoGames } = useRouteData<CasinoMobileData>();
  const openGame = useOpenGame();

  const games = createMemo(() =>
    casinoGames()
      ?.filter((game) => Object.hasOwn(game.byTags, params.category.toLowerCase()))
      .sort(
        (a, b) =>
          a.byTags[params.category.toLowerCase()].order -
          b.byTags[params.category.toLowerCase()].order
      )
  );

  return (
    <div class="_s_flex _s_flex-wrap _s_position-relative _s_pt-1 _s_z-1">
      <For each={games()}>
        {(game) => (
          <div
            class="_s_col-6 _s_overflow-hidden _s_aitem-opacity-1 _s_position-relative 
            _s_aitem-size-h-auto _s_aitem-pl-1 _s_aitem-pt-1 _s_aitem-pr-1 _s_aitem-pb-1 _s_a-size _s_a-p _s_a-opacity"
          >
            <div class="_s_flex _s_flex-a-start _s_m-1 _s_overflow-hidden _s_b-radius-sm">
              <img
                class="_s_col-12 _s_transition-0--5 _s_color-rgba-bg-primary-0-0--1"
                src={createStaticUrl(`/images/common/${game.id}_${locale()}.jpg`)}
                alt={t(game.title.langId)}
                onClick={() => openGame(game.id)}
                loading="lazy"
              />
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
