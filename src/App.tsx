import { FileRoutes, Routes } from "solid-start";
import { initializeLangs } from "./utils/language";
import { initializeUser } from "./states/user";
import { Show } from "solid-js";
import { Popup } from "./states/popup";

export const App = () => {
  const defaultLang = initializeLangs();
  initializeUser();

  return (
    <>
      <Routes>
        <Show when={defaultLang()}>
          <FileRoutes />
        </Show>
      </Routes>
      <Popup />
    </>
  );
};
