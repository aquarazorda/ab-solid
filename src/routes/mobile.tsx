import { Outlet } from "solid-start";
import { Footer } from "~/components/mobile/Footer";
import { Header } from "~/components/mobile/Header";
import { createStaticResource } from "~/queries/static";
import "solid-slider/slider.css";
import { Suspense } from "solid-js";

export type MobileRootData = typeof routeData;

type RouteItem = {
  title: {
    lang: boolean;
    langId: string;
  };
  icon: string;
  route: string;
  pathMatch?: "full";
  size?: "lg";
  height?: "auto";
};

export const routeData = () => {
  const [navList] = createStaticResource<{ list: RouteItem[] }>("headerMobileNavListTest", {
    lang: true,
  });

  return { navList };
};

export default function Index() {
  return (
    <div class="_s_color-bg-primary-4 _s_size-h-min-px--10">
      <Header />
      <div class="_s_flex _s_flex-d-column _s_color-bg-primary-0">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
