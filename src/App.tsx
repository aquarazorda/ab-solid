import { FileRoutes, Routes } from "solid-start";
import { initializeLangs } from "./utils/language";
import { Show } from "solid-js";
import { useI18n } from "@solid-primitives/i18n";

export const App = () => {
  initializeLangs();
  const [, { locale }] = useI18n();
  return (
    <Routes>
      <Show when={locale()}>
        <FileRoutes />
      </Show>
    </Routes>
  );
};
