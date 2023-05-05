import { useI18n } from "@solid-primitives/i18n";
import { Show } from "solid-js";
import { SlotsGame } from "~/types/slots";
import { VisibilityProps, useVisibility } from "~/utils/directives/visibility";

type Props = {
  game: SlotsGame;
  providerName?: string;
  big?: boolean;
} & VisibilityProps;

const MobileGameWidgetItem = (props: Props) => {
  const [t] = useI18n();
  let ref: HTMLDivElement | undefined;

  if (props.shouldObserve) {
    useVisibility({
      ref: () => ref,
      onObserve: props.onObserve,
      shouldObserve: props.shouldObserve,
    });
  }

  return (
    <div
      ref={ref}
      class={
        props.big
          ? "_s_size-slot-item _s_mb-3"
          : "_s_flex-shrink-0 _s_mr-2 _s_size-w-percent--11 _s_position-relative"
      }
    >
      {/* (click)="openGame()" */}
      <div
        class="_s_size-w-percent--25 _s_position-relative"
        data-id={`${props.providerName}-lobby`}
      >
        <div class="_s_flex _s_mb-1 _s_position-absolute _s_position-minus-t-px--1 _s_position-l-px--2">
          <Show when={props.game.isNew && !props.game.downtime?.hasDowntime}>
            <span
              classList={{ "_s_mr-1": props.game.isHot }}
              class="_s_color-bg-primary-2 _s_label _s_label-xs _s_b-radius-sm _s_size-h-px--5 
                _s_pl-1 _s_pr-1 _s_white-space-nowrap _s_label-t-c"
            >
              {t("_lang_slot_navigation_new")}
            </span>
          </Show>
          <Show when={props.game.isHot && !props.game.downtime?.hasDowntime}>
            <span
              class="_s_color-bg-primary-3 _s_label _s_label-xs _s_b-radius-sm _s_size-h-px--5 
              _s_pr-1 _s_white-space-nowrap _s_label-t-c"
            >
              <span class="_s_icon _s_adj-hot _s_icon-xs _s_ml-none _s_mr-none" />
              {t("_lang_slots_hot")}
            </span>
          </Show>
        </div>
        <div
          class="_s_flex _s_mb-1 _s_position-absolute _s_position-b-px--2 _s_position-l-px--0 
          _s_size-w-percent--25 _s_pl-2 _s_pr-2 _s_overflow-hidden"
        >
          <Show when={props.game.isJackpot}>
            <span
              classList={{ "_s_mr-1": props.game.isExclusive || props.game.isPopular }}
              class="_s_color-rgba-bg-primary-1-0--8 _s_label _s_label-xs _s_b-radius-sm 
                _s_size-h-px--5 _s_pr-1 _s_white-space-nowrap _s_label-t-c _s_color-primary-0"
            >
              <span class="_s_icon _s_adj-jackpot _s_icon-xs _s_ml-none _s_mr-none _s_color-primary-0" />
              {t("_lang_slot_navigation_jackpot")}
            </span>
          </Show>
          <Show when={props.game.isExclusive}>
            <span
              classList={{ "_s_mr-1": props.game.isPopular }}
              class="_s_color-rgba-bg-primary-1-0--8 _s_label _s_label-xs _s_b-radius-sm 
                _s_size-h-px--5 _s_pr-1 _s_white-space-nowrap _s_label-t-c _s_color-primary-0"
            >
              <span class="_s_icon _s_adj-award _s_icon-xs _s_ml-none _s_mr-none _s_color-primary-0" />
              {t("_lang_slot_navigation_exclusive")}
            </span>
          </Show>
          <Show when={props.game.isPopular}>
            <span
              class="_s_color-rgba-bg-primary-1-0--8 _s_label _s_label-xs _s_b-radius-sm 
              _s_size-h-px--5 _s_pr-1 _s_white-space-nowrap _s_label-t-c _s_color-primary-0"
            >
              <span class="_s_icon _s_adj-hot _s_icon-xs _s_ml-none _s_mr-none _s_color-primary-0" />
              {t("_lang_slot_navigation_popular")}
            </span>
          </Show>
        </div>
        <div class="_s_b-radius-md _s_overflow-hidden">
          <img
            class="_s_b-radius-md _s_size-w-percent--25"
            loading="lazy"
            src={props.game.imageCommon}
            alt={props.game.gameName}
          />
        </div>
        <div
          // (click)="addToFavorites($event)"
          class="_s_position-absolute _s_position-b-px--2 _s_position-r-px--2 _s_size-w-px--8 
            _s_size-h-px--8 _s_color-rgba-bg-primary-0-0--7 _s_b-radius-full _s_flex _s_flex-a-center _s_flex-j-center"
        >
          <span
            class="_s_icon _s_m-none"
            classList={{
              "_s_adj-star": props.game.isFavorite,
              "_s_adj-star-outline": !props.game.isFavorite,
            }}
          />
        </div>
      </div>
      <Show when={props.game.downtime?.hasDowntime}>
        <div
          class=" _s_p-2 _s_color-rgba-bg-primary-4-0--7 _s_position-absolute _s_position-b-px--0 
          _s_position-l-percent--0 _s_size-h-percent--25 _s_size-w-percent--25 _s_flex _s_flex-a-center _s_flex-j-center"
        >
          <div class="_s_flex _s_flex-d-column _s_flex-a-center _s_color-bg-primary-3 _s_p-2 _s_b-radius-sm _s_size-w-percent--25">
            <span class="_s_label _s_label-xs _s_label-a-center">{t("__lang_game_downtime")}</span>
            <span class="_s_label _s_label-sm _s_label-a-center _s_label-font-setting-case-on _s_label-t-u">
              {/* {{data?.downtime?.endDate | date: 'd MMM. HH:mm' : '' : (currentLang | async)}} */}
              {/* TODO */}
            </span>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default MobileGameWidgetItem;
