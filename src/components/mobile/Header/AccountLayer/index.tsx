import { Show, onMount } from "solid-js";
import { getUserBalance } from "~/queries/user";
import { user } from "~/states/user";
import { formatBalance, getCurrencySymbol } from "~/utils/currency";
import { AccountLayerDropdown, AccountLayerDropdownHead } from "./AccountLayerDropdown";
import { mobileHeaderState, setShowBalance } from "~/states/header";
import { cookies } from "~/states/cookie";

export const AccountLayer = () => {
  const balance = getUserBalance();

  onMount(() => {
    const isHidden = cookies.get().showBalance === "false";
    setShowBalance(!isHidden);
  });

  return (
    <div class="_s_aitem-opacity-0 _s_transition-0--3">
      <a class="_s_position-relative">
        <div class="_s_flex _s_flex-a-center _s_pl-5 _s_pr-5">
          <div class="_s_flex _s_flex-d-column">
            <span
              data-id="mobile-username"
              class="_s_label _s_label-xs _s_flex-j-end _s_white-space-nowrap"
            >
              {user.UserName}
            </span>
            <Show when={balance?.data?.BalanceAmount && mobileHeaderState.showBalance}>
              <span class="_s_label _s_label-md _s_label-bold _s_white-space-nowrap">
                {formatBalance(balance.data!.BalanceAmount!)} {getCurrencySymbol()}
              </span>
            </Show>
          </div>
          <AccountLayerDropdownHead />
        </div>
      </a>
      <Show when={mobileHeaderState.accountLayerOpen}>
        <AccountLayerDropdown />
      </Show>
    </div>
  );
};
