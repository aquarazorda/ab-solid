import { createContext, useContext } from "solid-js";

type Config = {
  staticPath: string;
  domain: "com" | "am";
};

const defaultValue: Config = {
  staticPath: "https://newstatic.adjarabet.com/static",
  // @ts-ignore
  domain: "com",
  // domain: window.location.hostname.split(".").pop(),
};

const ConfigContext = createContext(defaultValue);

type Props = {
  children: Element;
};
export const ConfigProvider = (props: Props) => {
  return (
    <ConfigContext.Provider value={defaultValue}>
      {props.children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
