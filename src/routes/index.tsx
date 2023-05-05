import { useNavigate } from "solid-start";
import { MainSlider } from "~/components/pages/Home/MainSlider";
import { SlotsSlider } from "~/components/pages/Home/SlotsSlider";
import { Widgets } from "~/components/pages/Home/Widgets";

export default function Home() {
  const navigate = useNavigate();

  navigate("/mobile");

  return (
    <div class="_s_size-w-percent--25 _s_container _s_color-bg-primary-0 _s_lg-color-bg-transparent ng-star-inserted">
      <MainSlider />
      <Widgets />
      <SlotsSlider />
    </div>
  );
}
