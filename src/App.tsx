import { FileRoutes, Routes } from "solid-start";
import { initializeLangs } from "./utils/language";
import { Show } from "solid-js";
import { Popup } from "./states/popup";
import { initializeUser } from "./states/user";

export const App = () => {
  initializeUser();
  const defaultLang = initializeLangs();

  return (
    <Show when={defaultLang()}>
      <Routes>
        <FileRoutes />
      </Routes>
      <Popup />
    </Show>
  );
};
