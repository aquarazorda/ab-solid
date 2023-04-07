type Currency = {
  min: number;
  max: number;
};

type Game = {
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

type GamesList = Game[];
