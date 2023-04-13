type Currency = {
  min: number;
  max: number;
};

export type Game = {
  id: number;
  gameId: string;
  pid: number;
  title: {
    langId: string;
  };
  type: string;
  openMode: string;
  backgroundId: number;
  supportsIframe?: boolean;
  gameVendor?: string;
  gameIdNew?: string;
  width?: number;
  height?: number;
  jackpot?: string;
  loyality?: string;
  hasLive?: string;
  currency?: {
    [currencyCode: string]: Currency;
  };
  byTags: {
    [tag: string]: {
      order: number;
    };
  };
};

export type GamesList = Game[];

export type GameProvider = {
  action: string;
  params: string[];
  pid: string;
  type: string;
  url: string;
  urlMobile: string;
};
