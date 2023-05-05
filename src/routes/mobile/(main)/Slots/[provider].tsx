import { useRouteData } from "solid-start";
import { SlotsRouteData } from "../Slots";
import MobileSlotsGamePage from "~/components/mobile/Slots/GamePage";

const MobileSlotsProviderPage = () => {
  const routeData = useRouteData<SlotsRouteData>();
  return <MobileSlotsGamePage initialData={routeData.searchResults.data} />;
};

export default MobileSlotsProviderPage;
