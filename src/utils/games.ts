import { useNavigate } from "solid-start";
import { checkWithAuth } from "~/states/login";
import { Game, GamesList } from "~/types/game";

export const generateWidgetData = (gamesList: GamesList) => {
  const defaultValues = {
    slots: [] as Game[],
    casino: [] as Game[],
    poker: [] as Game[],
  };

  if (!gamesList.length) return defaultValues;

  const { slots, casino, poker } = gamesList.reduce((acc, game) => {
    if (game.byTags.slots && game.byTags.top) {
      acc.slots.push(game);
      return acc;
    }

    if (game.byTags.casino && game.byTags.t_home) {
      acc.casino.push(game);
      return acc;
    }

    if (game.byTags.t_p2p) {
      acc.poker.push(game);
      return acc;
    }

    return acc;
  }, defaultValues);

  return {
    poker: poker.sort((a, b) => a.byTags.t_p2p?.order - b.byTags.t_p2p?.order),
    slots: slots.sort((a, b) => a.byTags.top?.order - b.byTags.top?.order),
    casino: casino.sort((a, b) => a.byTags.t_home?.order - b.byTags.t_home.order),
  };
};

export const useOpenGame = () => {
  const navigate = useNavigate();

  return (gameId: number | string) =>
    checkWithAuth(() => navigate("/mobile/ingame/" + gameId), navigate);
};
