import { useI18n } from "@solid-primitives/i18n";
import { createScriptLoader } from "@solid-primitives/script-loader";
import { createSignal, onMount } from "solid-js";
import { useConfig } from "~/config";
import { environment } from "~/types/singular";

export const getSportsbookConfig = () => {
  const { domain, isMobile } = useConfig();
  const [, { locale }] = useI18n();
  const { mobileUrl, desktopUrl } = environment[domain];
  const configUrl = isMobile ? mobileUrl : desktopUrl;
  const defaultUrl = "/home/wrapper/dashboard?activeSportId=1";
  const [url, setUrl] = createSignal("");

  onMount(() => {
    setUrl(
      `${configUrl}/iframe.js?domain=${
        window.location.hostname
      }&lang=${locale()}&src=${configUrl}${defaultUrl}&v=${new Date().toISOString()}`
    );
  });

  return {
    url,
    scriptId: environment.settings.scriptId,
  };
};

export const mountSportsbook = () => {
  const { scriptId, url } = getSportsbookConfig();

  onMount(() => {
    createScriptLoader({
      src: url(),
      id: scriptId,
      onLoad,
    });
  });
};

const onLoad = () => {
  const { elementId, handlerName, initMethod } = environment.settings;
  const sb = window[handlerName]();
  sb[initMethod](elementId);
};
