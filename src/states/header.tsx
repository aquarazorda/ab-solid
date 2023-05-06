import { createContext, onCleanup, onMount, useContext } from "solid-js";
import { useCookies } from "./cookie";
import { createStore } from "solid-js/store";

const defaultState = {
  navOpen: true,
  navBlocked: false,
  showBalance: false,
  accountLayerOpen: false,
  hidden: false,
};

type Toggler = (val?: boolean) => void;

type PropType = {
  setShowBalance: (value: boolean) => void;
  blockSubNav: () => void;
  toggleNav: Toggler;
  toggleAccountLayer: Toggler;
  setHidden: (val: boolean) => void;
};

const HeaderContext = createContext([{}, {}] as [typeof defaultState, PropType]);

export const createHeaderProvider = () => (props: { children: Element }) => {
  const [state, setState] = createStore(defaultState);

  const blockSubNav = () => {
    const wasOpen = state.navOpen;

    onMount(() => {
      setState("navBlocked", true);
    });

    onCleanup(() => {
      setState("navBlocked", false);
      setState("navOpen", wasOpen);
    });
  };

  const setShowBalance = (value: boolean) => {
    const cookies = useCookies();
    setState("showBalance", value);
    cookies.set("showBalance", String(value));
  };

  const toggler = (key: keyof typeof defaultState) => (val?: boolean) => {
    setState(key, (op) => (val !== undefined ? val : !op));
  };

  const toggleAccountLayer = toggler("accountLayerOpen");
  const toggleNav = toggler("navOpen");
  const setHidden = (val: boolean) => setState("hidden", val);

  const value: [typeof defaultState, PropType] = [
    state,
    { setShowBalance, toggleAccountLayer, blockSubNav, toggleNav, setHidden },
  ];

  return <HeaderContext.Provider value={value}>{props.children}</HeaderContext.Provider>;
};

export const useHeader = () => useContext(HeaderContext);
