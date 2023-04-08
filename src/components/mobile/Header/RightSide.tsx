import { useI18n } from "@solid-primitives/i18n";
import { Match, Switch } from "solid-js";
import { A, useLocation } from "solid-start";
import { useNavigateBack } from "~/utils/window";

const LoginButton = () => {
  const [t] = useI18n();

  return (
    <A
      data-id="mobile-login"
      class="_s_label _s_label-md _s_label-t-u _s_aitem-opacity-0 _s_position-relative _s_transition-0--3"
      href="/mobile/Login"
    >
      {t("_lang_login_button_login")}
    </A>
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

  return (
    <div class="_s_position-relative _s_z-1 _s_pl-7 _s_pl-5 _s_pr-5 _s_flex _s_col _s_col-4 _s_flex-j-end">
      <Switch fallback={<LoginButton />}>
        <Match when={location.pathname === "/mobile/Login"}>
          <CloseButton />
        </Match>
      </Switch>
    </div>
  );
};
