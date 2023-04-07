import { createContext, useContext } from "solid-js";

type Config = {
  staticPath: string;
  domain: "com" | "am";
  isAm: boolean;
  isMobile: boolean;
};

const defaultValue: Config = {
  staticPath: "https://newstatic.adjarabet.com/static",
  domain: "com",
  isAm: false,
  isMobile: true,
  // domain: window.location.hostname.split(".").pop(),
};

const ConfigContext = createContext(defaultValue);

type Props = {
  children: Element;
};
export const ConfigProvider = (props: Props) => {
  return <ConfigContext.Provider value={defaultValue}>{props.children}</ConfigContext.Provider>;
};

export const useConfig = () => useContext(ConfigContext);
