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
