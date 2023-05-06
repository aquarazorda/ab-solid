import { Match, Switch } from "solid-js";
import { A, useLocation, useMatch } from "solid-start";
import { useNavigateBack } from "~/utils/window";
import { AccountLayer } from "./AccountLayer";
import { useUser } from "~/states/user";
import { useLanguage } from "~/utils/language";

const LoginButton = () => {
  const [t] = useLanguage();

  return (
    <div class="_s_position-relative _s_z-1 _s_pl-7 _s_pl-5 _s_pr-5 _s_flex _s_col _s_col-4 _s_flex-j-end">
      <A
        data-id="mobile-login"
        class="_s_label _s_label-md _s_label-t-u _s_aitem-opacity-0 _s_position-relative _s_transition-0--3"
        href="/mobile/Login"
        aria-label={t("_lang_login_button_login")}
      >
        {t("_lang_login_button_login")}
      </A>
    </div>
  );
};

const CloseButton = () => {
  const navigateBack = useNavigateBack();
  return (
    <div class="_s_position-relative _s_z-1 _s_pl-7 _s_pl-5 _s_pr-5 _s_flex _s_col _s_col-4 _s_flex-j-end">
      <a class="_s_icon _s_adj-close" data-id="mobile-login" onClick={() => navigateBack()} />
    </div>
  );
};

export const RightSideHeader = () => {
  const location = useLocation();
  const [, { isAuthenticated }] = useUser();
  const match = useMatch(() => "/mobile/Login");

  return (
    <Switch fallback={<LoginButton />}>
      <Match when={match()}>
        <CloseButton />
      </Match>
      <Match when={isAuthenticated()}>
        <AccountLayer />
      </Match>
    </Switch>
  );
};
