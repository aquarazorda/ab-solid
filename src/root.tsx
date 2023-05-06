// @refresh reload
import { Suspense } from "solid-js";
import { Body, ErrorBoundary, Head, Html, Link, Meta, Scripts, Title } from "solid-start";
import { App } from "./App";
import { ConfigProvider, useConfig } from "./config";
import "./root.css";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { createUserProvider } from "./states/user";
import { createHeaderProvider } from "./states/header";
import { createLanguageProvider } from "./utils/language";

export default function Root() {
  const LanguageProvider = createLanguageProvider();
  const UserProvider = createUserProvider();
  const HeaderProvider = createHeaderProvider();
  const { staticPath } = useConfig();
  const queryClient = new QueryClient();

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
        <Link rel="preconnect" href={staticPath} />
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
              <LanguageProvider>
                <QueryClientProvider client={queryClient}>
                  <UserProvider>
                    <HeaderProvider>
                      <App />
                    </HeaderProvider>
                  </UserProvider>
                </QueryClientProvider>
              </LanguageProvider>
            </ConfigProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
