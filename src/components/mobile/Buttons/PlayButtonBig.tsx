import { A } from "solid-start";
import { useOpenGame } from "~/utils/games";

type Props = {
  children: Element;
  gameId: number;
  icon: string;
};

const PlayButtonBig = (props: Props) => {
  const openGame = useOpenGame();

  return (
    <div
      onClick={() => openGame(props.gameId)}
      class="_s_flex _s_flex-a-center _s_b-radius-sm _s_p-7 _s_mb-2
_s_size-w-percent--25 _s_color-bg-primary-3"
    >
      <div class="_s_flex _s_flex-a-center _s_size-w-percent--25">
        <span class={`_s_ml-none _s_icon _s_icon-lg _s_adj-${props.icon}`} />
        <span class="_s_label _s_label-md">{props.children}</span>
        <div class="_s_ml-auto">
          <span class="_s_icon _s_icon-sm _s_ml-auto _s_mr-none _s_adj-arrow-right" />
        </div>
      </div>
    </div>
  );
};

export default PlayButtonBig;
