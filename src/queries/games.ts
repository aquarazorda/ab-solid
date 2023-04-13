import { GameProvider, GamesList, Game } from "~/types/game";
import { createStaticResource } from "./utils";
import { match } from "ts-pattern";
import { createCoreApiQuery, createCreateCoreApiFetch } from "./coreapi/utils";
import { user } from "~/states/user";
import { useI18n } from "@solid-primitives/i18n";
import { useConfig } from "~/config";

export const getAllGamesData = () => {
  const [allGamesData] = createStaticResource<{ list: GamesList }>("allGamesDataMobile");
  return allGamesData;
};

export const generateGameUrl = async (game: Game, provider: GameProvider) => {
  const [, { locale }] = useI18n();
  const { isMobile } = useConfig();

  const tokenRes = await createCreateCoreApiFetch("getServiceAuthToken", {
    providerID: provider.pid,
    userID: user.UserID,
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

  // const params = new URLSearchParams();
  // Object.entries(paramsObj).forEach(([key, value]) => {
  //   if (key === "exitUrl") {
  //     params.append(key, decodeURIComponent(value as string));
  //   } else {
  //     params.append(key, String(value));
  //   }
  // });

  const gameUrl = await fetch(`${provider.url}`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(paramsObj),
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "true",
    },
  })
    .then((res) => res.json())
    .then((res) => res?.data?.url);

  return gameUrl;
};
