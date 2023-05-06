import {
  Accessor,
  JSX,
  createContext,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  onMount,
  useContext,
} from "solid-js";
import { createUserData, isSessionActive } from "~/queries/user";
import { User } from "~/types/user";
import { useCookies } from "./cookie";
import { useServerContext } from "solid-start";
import { getCookies } from "~/utils/common";

type PropType = {
  isAuthenticated: Accessor<boolean>;
  setUserData: (data: User | undefined) => void;
  logOut: (byUser?: boolean) => void;
};

export type UserProviderType = [Accessor<User | undefined>, PropType];

const UserContext = createContext([{}, {}] as UserProviderType);

export const createUserProvider = () => (props: { children: JSX.Element }) => {
  const [state, setState] = createSignal<User>();
  const event = useServerContext();

  const UserID = Number(getCookies(event).userId);
  const [session] = createResource(() => isSessionActive(UserID));

  const isAuthenticated = createMemo(() => session() && state());

  const setUserData = (data?: User) => {
    const cookies = useCookies();

    if (data?.UserID) {
      cookies.set("userId", String(data.UserID));
      setState(data);
    } else {
      setState(undefined);
      cookies.remove("userId");
    }
  };

  const logOut = (byUser?: boolean) => {
    setUserData();
    if (byUser) {
      // todo
    }
  };

  const user: [Accessor<User | undefined>, PropType] = [
    state,
    {
      isAuthenticated,
      setUserData,
      logOut,
    },
  ];

  return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
