export type SlotsProvider = {
  id: number;
  name: {
    [k: string]: string;
  };
  route: string;
  onlyMobile: boolean;
  new: boolean;
  remote: boolean;
  hasSubmenu: boolean;
  isAllGames: boolean;
  isEvent: boolean;
  event: null;
  onlyLoggedIn: boolean;
  icon: string | null;
  iconImg: string;
};

export type SlotsFilter = {
  id: number;
  name: {
    [k: string]: string;
  };
  route: string;
  onlyMobile: boolean;
  new: boolean;
  remote: boolean;
  hasSubmenu: boolean;
  isAllGames: boolean;
  isEvent: boolean;
  event: null | string;
  onlyLoggedIn: boolean;
  icon: null | string;
  iconImg: null | string;
  filterType: null | string;
};

export type SlotsGame = {
  cmsId: number;
  gameId: string;
  type: string;
  openMode: string;
  isNew: boolean;
  isJackpot: boolean;
  isPopular: boolean;
  categoriesProvider: {
    id: string;
    order: string;
    name: {
      ka: string;
      en: string;
      ru: string;
    };
  }[];
  categoriesFilter: {
    id: string;
    order: string;
    name: {
      ka: string;
      en: string;
      ru: string;
    };
  }[];
  thematicTag: {
    id: string;
  }[];
  provider: {
    id: number;
    pid: string;
    openNewTab: boolean;
  };
  isIos: boolean;
  isAndroid: boolean;
  gameName: string;
  imageCommon: string;
  imageBackground: string;
  imageDesktop: string;
  isHot: boolean;
  isExclusive: boolean;
  downtime?: {
    hasDowntime: boolean;
  };
  isFavorite: boolean;
};

export type ProviderGameData = {
  games: SlotsGame[];
  providerId: string;
};
