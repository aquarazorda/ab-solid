import { Game } from "./game";

export type BannerData = {
  id: number;
  name: string;
  img: string;
  game?: Game;
  title: {
    langId: string;
  };
  description: {
    langId: string;
  };
  byTags: {
    [key: string]: {
      order: number;
    };
  };
  segments?: number[];
  route?: string;
  offer?: {
    has: number;
    route: string;
  };
};
