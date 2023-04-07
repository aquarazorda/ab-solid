import { CashdeskBranches } from "~/components/mobile/CashDesk/Branches";
import { CashdeskContact } from "~/components/mobile/CashDesk/Contact";
import { CashdeskFilter } from "~/components/mobile/CashDesk/Filter";
import { BranchAddress } from "~/components/mobile/CashDesk/data";
import { createStaticResource } from "~/queries/utils";

export type CashdeskMobileRouteData = typeof routeData;

export const routeData = () => {
  const [branches] = createStaticResource<BranchAddress[]>("branchesAddressListNew", {
    domain: true,
  });

  return branches;
};

export default function CashDeskPage() {
  return (
    <div
      class="_s_flex _s_flex-d-column _s_mb-10 _s_md-flex-d-column _s_md-pb-10 _s_ml-auto _s_mr-auto 
    _s_mr-xl _s_pb-none _s_pt-10 _s_size-w-max-percent--22 _s_size-w-px--295"
    >
      <CashdeskFilter />
      <CashdeskBranches />
      <CashdeskContact />
    </div>
  );
}
