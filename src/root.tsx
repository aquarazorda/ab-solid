// @refresh reload
import { Show, Suspense, createSignal, onMount } from "solid-js";
import { Body, ErrorBoundary, Head, Html, Link, Meta, Scripts, Title } from "solid-start";
import { App } from "./App";
import { ConfigProvider } from "./config";
import { I18nContext, createI18nContext } from "@solid-primitives/i18n";
import { cookieStorage } from "@solid-primitives/storage";
import { Langs } from "./utils/language";
import "./root.css";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

export const [defaultLang, setDefaultLang] = createSignal<Langs>();

const queryClient = new QueryClient();

export default function Root() {
  const i18nContext = createI18nContext();

  onMount(() => {
    setDefaultLang((cookieStorage.getItem("lang") as Langs) || "ka");
  });

  return (
    <Html lang="en">
      <Head>
        <Title>აჭარაბეთი | ონლაინ კაზინო და ტოტალიზატორი</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta
          name="description"
          content="adjarabet.com / აჭარაბეთი - ონლაინ კაზინო და ტოტალიზატორი ყველაზე დიდი მოგებებით და საუკეთესო თამაშებით: სლოტები, სპორტი ავიატორი, პოკერი, სამაგიდო თამაშები, ლაივ კაზინო, betfair exchange, კენო, ვირტუალური სპორტი,  ითამაშე შენს მოედანზე."
        />
        <Link rel="preload" href="/styles/styles.min.css" as="style" />
        <Link rel="stylesheet" href="/styles/styles.min.css" />
        <Link rel="preload" href="/styles/new-fonts.css" as="style" />
        <Link rel="stylesheet" href="/styles/new-fonts.css" />
        <Link rel="manifest" href="/manifest.json" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <ConfigProvider>
              <I18nContext.Provider value={i18nContext}>
                <QueryClientProvider client={queryClient}>
                  <Show when={defaultLang()}>
                    <App />
                  </Show>
                </QueryClientProvider>
              </I18nContext.Provider>
            </ConfigProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
