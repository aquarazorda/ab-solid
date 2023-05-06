export const menuDataOPTGel = [
  {
    icon: "deposit",
    title: {
      lang: true,
      langId: "_lang_transaction_history_deposit",
    },
    event: {
      eventMap: "click",
      eventStringPointer: ["PaymentsService.ShowMobilePopUpDeposit()"],
    },
  },
  {
    icon: "withdrawal",
    title: {
      lang: true,
      langId: "_lang_withdraw",
    },
    event: {
      eventMap: "click",
      eventStringPointer: ["PaymentsService.ShowMobilePopUpWithdraw()"],
    },
  },
  {
    icon: "transaction-history",
    title: {
      lang: true,
      langId: "__lang_profile_tabs_transaction_history",
    },
    route: "Transaction-History",
  },
  {
    icon: "notification",
    title: {
      lang: true,
      langId: "__lang_profile_tabs_info_notifications",
    },
    extras: {
      showBalanceNotification: true,
    },
    route: "/Notifications/all",
  },
  {
    icon: "accounts",
    title: {
      lang: true,
      langId: "_lang_my_accounts",
    },
    route: "Accounts",
  },
  {
    icon: "my-bonus",
    title: {
      lang: true,
      langId: "_lang_my_bonus",
    },
    route: "MyBonus/Active",
  },
  {
    icon: "p2p",
    title: {
      lang: true,
      langId: "_lang_referral_promo_code_button",
    },
    route: "Referral",
  },
  {
    icon: "gift1",
    title: {
      lang: true,
      langId: "_lang_promo_code_account_layer",
    },
    route: "PromoCode",
  },
  {
    icon: "wallet",
    title: {
      lang: true,
      langId: "__lang_profile_tabs_cashier_accounts",
    },
    route: "Profile/Wallet/Cashier",
  },
  {
    icon: "incognito",
    title: {
      lang: true,
      langId: "_lang_incognito_name",
    },
    route: "Incognito",
  },
  {
    icon: "list",
    title: {
      lang: true,
      langId: "_lang_my_bets",
    },
    route: "/Sportsbook?src=%2Fhome%2Fhistory%2Ftickets%26activeSportId%3D1",
  },
  {
    icon: "personal-info",
    title: {
      lang: true,
      langId: "_lang_reg_heder_info",
    },
    route: "Personal/MyAccount",
  },
];
