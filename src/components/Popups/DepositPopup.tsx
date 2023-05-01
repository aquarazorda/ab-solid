import { showPopup } from "~/states/popup";

const DepositPopup = () => {
  return <>This is deposit popup</>;
};

export const openDepositPopup = () =>
  showPopup({
    name: "__lang_profile_tabs_cashier_deposit",
    element: () => <DepositPopup />,
  });
