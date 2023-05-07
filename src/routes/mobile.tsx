import { Outlet } from "solid-start";
import { Footer } from "~/components/mobile/Footer";
import { Header } from "~/components/mobile/Header";
import { Suspense } from "solid-js";

import "solid-slider/slider.css";

export default function Index() {
  return (
    <div class="_s_color-bg-primary-4 _s_size-h-min-px--10">
      <Header />
      <div class="_s_flex _s_flex-d-column _s_color-bg-primary-0">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}
