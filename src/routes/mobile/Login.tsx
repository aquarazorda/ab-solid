import { Field, Form } from "@modular-forms/solid";
import { useI18n } from "@solid-primitives/i18n";
import { createSignal } from "solid-js";
import { P, isMatching } from "ts-pattern";
import { createCoreApiMutation } from "~/queries/utils";
import { blockSubNav } from "~/states/header";
import { FormValues, FormValuesPattern, createForm } from "~/utils/forms";

const minValue =
  (val: number) =>
  (x: unknown): x is string =>
    typeof x === "string" && x.length > val;

const loginPattern = {
  userIdentifier: [
    { pattern: P.when(minValue(4)), message: "_lang_reg_username_mincharacter_error_text" },
  ],
  password: [
    { pattern: P.when(minValue(4)), message: "_lang_reg_username_mincharacter_error_text" },
  ],
};

export default function LoginMobile() {
  blockSubNav();
  const [t] = useI18n();
  const [passwordVisible, setPasswordVisible] = createSignal(false);
  const [errorMessage, setErrorMessage] = createSignal("");
  const loginMutate = createCoreApiMutation("logIn");

  const loginForm = createForm(loginPattern, {
    userIdentifier: "",
    password: "",
  });

  const onSubmit = (sms?: boolean) => (values: FormValues<typeof loginPattern>) => {
    if (sms) {
      if (!isMatching(loginPattern.userIdentifier, values.userIdentifier)) {
        setErrorMessage("_lang_reg_username_mincharacter_error_text");
        return;
      }
      loginForm.values;
      setErrorMessage("");
      loginForm.setValue("password", "");
    }

    loginMutate(values).then(console.log);
  };

  return (
    <div class="_s_pt-5 _s_pl-5 _s_pr-5 _s_pb-10 _s_color-bg-primary-6">
      <Form of={loginForm.form} onSubmit={onSubmit(false)}>
        <Field of={loginForm.form} name="userIdentifier">
          {(field) => (
            <div class="_s_position-relative _s_valid _s_valid-hide-success _s_color-bg-primary-5 _s_mb-2">
              <input
                type="text"
                {...field.props}
                class="_s_input _s_input-md _s_pt-2 _s_size-w-percent--25"
                classList={{
                  "_s_has-value": !!loginForm.values().userIdentifier,
                }}
              />
              <span
                class="_s_position-absolute _s_position-l-percent--0 _s_position-t-px--3 _s_label 
              _s_label-xs _s_pl-2 _s_pt-1 _s_transition-0--3 _s_white-space-nowrap _s_color-primary-8 
              _s_pointer-event-none"
              >
                {t("_lang_reg_firstname_lable")}
              </span>
              <div class="_s_flex _s_position-absolute _s_position-r-percent--0 _s_position-t-px--0 _s_size-h-min-percent--25 _s_z-1">
                <div class="_s_bw-l-1 _s_bl-solid _s_bl-primary-7 _s_flex _s_flex-a-center">
                  <span class="_s_icon _s_icon-xs _s_color-primary-8 _s_adj-forget" />
                </div>
              </div>
            </div>
          )}
        </Field>
        <Field of={loginForm.form} name="password">
          {(field) => (
            <div class="_s_position-relative _s_valid _s_valid-hide-success _s_color-bg-primary-5 _s_mb-2">
              <input
                type={passwordVisible() ? "text" : "password"}
                {...field.props}
                class="_s_input _s_input-md _s_pt-2 _s_size-w-percent--25"
                classList={{
                  "_s_has-value": !!loginForm.values().password,
                }}
              />
              <span
                class="_s_position-absolute _s_position-l-percent--0 _s_position-t-px--3 _s_label 
              _s_label-xs _s_pl-2 _s_pt-1 _s_transition-0--3 _s_white-space-nowrap _s_color-primary-8 
              _s_pointer-event-none"
              >
                {t("_lang_password_")}
              </span>
              <div class="_s_flex _s_position-absolute _s_position-r-percent--0 _s_position-t-px--0 _s_size-h-min-percent--25 _s_z-1">
                <div class="_s_flex _s_flex-a-center" onClick={() => setPasswordVisible((p) => !p)}>
                  <span class="_s_icon _s_color-primary-8 _s_adj-view" />
                </div>
                <div class="_s_bw-l-1 _s_bl-solid _s_bl-primary-7 _s_flex _s_flex-a-center">
                  <span class="_s_icon _s_icon-xs _s_color-primary-8 _s_adj-forget" />
                </div>
              </div>
            </div>
          )}
        </Field>
        <div class="_s_mb-7 _s_mt-3 _s_flex _s_flex-a-center">
          <a
            data-id="mobile-sms-authorization"
            class="_s_ml-auto _s_label _s_label-xxs _s_color-primary-8"
          >
            {t("_lang_login_with_sms2")}
          </a>
        </div>
        <button type="submit">Inshalla</button>
      </Form>
    </div>
  );
}
