import { Accessor } from "solid-js";
import { createWebApiQuery } from "../webapi";
import { ProviderGameData, SlotsProvider } from "~/types/slots";

export const getProviderGames = (providers: Accessor<SlotsProvider[] | undefined>, index: number) =>
  createWebApiQuery<ProviderGameData[]>(
    "games/by-provider-ids/get",
    () =>
      providers() && {
        providerIds: providers()
          ?.slice(index, index + 3)
          .map(({ id }) => String(id)),
      },
    true
  );
