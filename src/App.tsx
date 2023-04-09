import { FileRoutes, Routes } from "solid-start";
import { initializeLangs } from "./utils/language";
import { Show } from "solid-js";
import { useI18n } from "@solid-primitives/i18n";
import { initializeUser } from "./states/user";

export const App = () => {
  initializeLangs();
  initializeUser();

  const [, { locale }] = useI18n();

  return (
    <Routes>
      <Show when={locale()}>
        <FileRoutes />
      </Show>
    </Routes>
  );
};
