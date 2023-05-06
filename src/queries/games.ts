import { GameProvider, GamesList, Game } from "~/types/game";
import { match } from "ts-pattern";
import { createCreateCoreApiFetch } from "./coreapi/utils";
import { useLanguage } from "~/utils/language";
import { useConfig } from "~/config";
import { checkResponse } from "./common";
import { useUser } from "~/states/user";
import { createResource } from "solid-js";

export const getAllGamesData = () => {
  const [allGamesData] = createResource<{ list: GamesList }>(() =>
    import("~/data/json/allGamesDataMobile.json").then(
      (res) => res.default as unknown as { list: GamesList }
    )
  );
  return allGamesData;
};

export const generateGameUrl = async (game: Game, provider: GameProvider) => {
  const [, { locale }] = useLanguage();
  const { isMobile } = useConfig();
  const [user, { logOut }] = useUser();

  const tokenRes = await createCreateCoreApiFetch("getServiceAuthToken", {
    providerID: provider.pid,
    userID: user()?.UserID,
  });

  if (!tokenRes?.Token) {
    return "";
  }

  const paramsObj = provider.params.reduce((acc, param) => {
    acc[param] = match(param)
      .with("token", () => tokenRes.Token)
      .with("gameId", () => game.gameId)
      .with("lang", () => locale())
      .with("gameChannel", () => (isMobile ? 2 : 1))
      .with("exitUrl", () => "https://www.adjarabet.com")
      .otherwise(() => "");

    return acc;
  }, {} as Record<string, string | number>);

  const gameUrl = await fetch(`${provider.url}`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(paramsObj),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "true",
    },
  })
    .then(checkResponse(logOut))
    .then((res: any) => res?.data?.url);

  return gameUrl;
};
