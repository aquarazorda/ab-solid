import { Accessor } from "solid-js";
import { createWebApiQuery } from "../webapi";
import { ProviderGameData, SlotsProvider } from "~/types/slots";

export const getProviderGames = (providers: Accessor<SlotsProvider[] | undefined>, index: number) =>
  createWebApiQuery<ProviderGameData[]>({
    path: "games/by-provider-ids/get",
    params: () =>
      providers() && {
        providerIds: providers()
          ?.slice(index, index + 3)
          .map(({ id }) => String(id)),
      },
    options: {
      post: true,
    },
  });
