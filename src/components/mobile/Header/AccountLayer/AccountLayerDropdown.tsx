import { Show, Suspense } from "solid-js";
import { getUserBalance } from "~/queries/user";
import { formatBalance, getCurrencySymbol } from "~/utils/currency";
import { Radio } from "../../Form/Checkbox";
import { AccountLayerMenu } from "./Menu";
import { openDepositPopup } from "~/components/Popups/DepositPopup";
import { useUser } from "~/states/user";
import { useHeader } from "~/states/header";
import { useLanguage } from "~/utils/language";

export const AccountLayerDropdownHead = () => {
  const [, { toggleAccountLayer }] = useHeader();

  return (
    <div
      class="_s_position-relative _s_apollo-data-theme-header--user"
      onClick={() => toggleAccountLayer()}
    >
      <span
        id="acc-layer-dropdown"
        class="_s_icon _s_icon-lg _s_mr-none _s_adj-user-verified _s_aitem-ewl-primary-3 _s_color-primary-8 _s_cursor-pointer"
      />
      <div class="_s_position-absolute _s_position-minus-t-px--1 _s_position-minus-r-px--1">
        <span
          class="_s_color-bg-primary-3 _s_position-absolute _s_position-minus-t-px--1 
          _s_position-minus-r-px--2 _s_b-radius-full _s_icon _s_icon-sm _s_mr-0"
        >
          <span class="_s_label _s_label-xs _s_flex-j-center">9+</span>
        </span>
      </div>
    </div>
  );
};

export const AccountLayerDropdown = () => {
  const [, { toggleAccountLayer }] = useHeader();
  return (
    <div>
      <div
        class="_s_position-absolute _s_position-r-percent--0 _s_position-t-px--15 _s_z-5 
  _s_display-b _s_color-rgba-bg-primary-0-0--7 _s_size-w-percent--25 _x_md-size-w-px--100"
        style={{ height: "calc(100vh - 60px)" }}
        onClick={() => toggleAccountLayer(false)}
      />
      <div
        id="accountDropDown"
        class="_s_b-radius-sm _s_position-absolute _s_position-r-percent--0 
_s_z-5 _s_size-w-px--80 _s_position-t-px--15 _s_display-b _s_apollo-data-theme-header--layer"
      >
        <div
          class="_s_flex _s_flex-d-column _s_pb-10 _s_position-relative _s_size-h-max-percent--25 
  _s_color-bg-primary-5"
        >
          <BalanceBox />
          <AccountLayerMenu />
        </div>
      </div>
    </div>
  );
};

const BalanceBox = () => {
  const [t] = useLanguage();
  const balance = getUserBalance();
  const [user] = useUser();
  const [header, { setShowBalance }] = useHeader();

  return (
    <div>
      <div class="_s_p-5 _s_apollo-data-theme-balance--layer">
        <div class="_s_flex _s_flex-a-center">
          <div class="_s_col-6 _s_flex _s_flex-d-column">
            <div class="_s_flex _s_flex-a-center _s_pb-1 ng-star-inserted">
              <span class="_s_adj-check-badge _s_color-primary-2 _s_icon _s_icon-sm _s_m-none" />
              <span class="_s_label _s_label-sm _s_ml-1 _s_color-primary-1">{user.UserName}</span>
            </div>
            <div class="_s_flex _s_flex-a-center">
              <div class="_s_flex _s_flex-a-center _s_cursor-pointer ng-star-inserted">
                <span class="_s_label _s_label-sm _s_color-primary-8 _s_size-w-min-px--4 _s_flex-j-center">
                  ID
                </span>
                <span class="_s_label _s_label-sm _s_ml-2 _s_color-primary-1">{user.UserID}</span>
                <span class="_s_icon _s_icon-xs _s_adj-copy" />
              </div>
            </div>
          </div>
          <div class="_s_col-6">
            <button
              class="_s_btn _s_btn-positive _s_btn-sm _s_size-w-percent--25 _s_m-none"
              onClick={openDepositPopup}
            >
              <span class="_s_label _s_label-md">{t("__lang_profile_tabs_cashier_deposit")}</span>
            </button>
          </div>
        </div>
        <Suspense>
          <div class="_s_flex _s_mt-2">
            <div class="_s_col-4">
              <div class="_s_label _s_label-xs _s_color-primary-8">{t("__lang__main")}</div>
              <Show when={balance?.data?.BalanceAmount}>
                {(b) => (
                  <div data-id="current-balance" class="_s_label _s_label-sm _s_color-primary-1">
                    {formatBalance(b())} {getCurrencySymbol()}
                  </div>
                )}
              </Show>
            </div>
          </div>
        </Suspense>
      </div>
      <div
        class="_s_color-bg-primary-6 _s_p-5 _s_pt-2 _s_pb-2 _s_flex 
      _s_flex-a-center _s_bw-t-1 _s_bt-solid _s_bt-primary-4 
        _s_apollo-data-theme-switch--layer"
      >
        <span class="_s_label _s_label-xs _s_color-primary-8 _s_mr-auto">
          {t("_lang_show_balance")}
        </span>
        <div class="_s_a-color _s_a-p">
          <Radio onClick={() => setShowBalance(!header.showBalance)} value={header.showBalance} />
        </div>
      </div>
    </div>
  );
};
