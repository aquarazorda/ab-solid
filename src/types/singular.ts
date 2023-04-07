export interface SportsBookInterface {
  providerId: string;
  mobileUrl: string;
  desktopUrl: string;
}

interface SportsBookEnvironmentType {
  settings: SingularSettingsInterface;
  com: SportsBookInterface;
  am: SportsBookInterface;
}

interface SingularSettingsInterface {
  name: string;
  elementId: string;
  scriptId: string;
  handlerName: string;
  initMethod: string;
}

export const settings: SingularSettingsInterface = {
  name: "Sportsbook",
  elementId: "sng-sportsbook",
  scriptId: "sng-script",
  handlerName: "SingularSB",
  initMethod: "addSBFrame",
};

export const environment: SportsBookEnvironmentType = {
  settings,
  com: {
    providerId: "5c612dab-74df-4b15-8134-6e38c8d5d3b1",
    mobileUrl: "https://sports.adjarabet.com",
    desktopUrl: "https://sports.adjarabet.com",
  },
  am: {
    providerId: "85e7f371-e8a9-4789-94f1-e85f19ce7678",
    mobileUrl: "https://sportsbook.adjarabet.am",
    desktopUrl: "https://sportsbook.adjarabet.am",
  },
};
