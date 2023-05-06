import { Field, Form } from "@modular-forms/solid";
import { cityList } from "./data";
import { Dropdown } from "../Form/Dropdown";
import { BigCheckbox } from "../Form/Checkbox";
import { createEffect, createMemo } from "solid-js";
import { useSearchParams } from "solid-start";
import { useLanguage } from "~/utils/language";
import { createForm } from "~/utils/forms";
import { P } from "ts-pattern";

type FilterForm = {
  city: string;
  alwaysOpen: boolean;
};

const formPattern = {
  city: [{ pattern: P.string }],
  alwaysOpen: [{ pattern: P.boolean }],
};

// TODO
export const CashdeskFilter = () => {
  const [t] = useLanguage();
  const [, setSearchParams] = useSearchParams();
  const filterForm = createForm(formPattern, {
    city: "1",
    alwaysOpen: false,
  });

  createEffect(() => {
    setSearchParams(filterForm.values());
  });

  return (
    <>
      <span class="_s_label _s_label-md _s_label-t-u _s_mb-5">{t("_lang_branches")}</span>
      <Form
        of={filterForm.form}
        class="_s_b-radius-md _s_color-bg-primary-6 _s_flex _s_flex-a-center _s_flex-wrap _s_mb-none 
      _s_md-mb-5 _s_pb-5 _s_pl-5 _s_pr-5 _s_pt-5"
      >
        <Field of={filterForm.form} name="city">
          {(field, props) => (
            <div class="_s_size-w-percent--25 _s_md-size-w-auto _s_position-relative">
              <Dropdown
                {...props}
                value={field.value}
                options={cityList}
                class="_s_display-b _s_position-relative _s_size-w-percent--25"
              />
            </div>
          )}
        </Field>
        <Field of={filterForm.form} name="alwaysOpen">
          {(field) => (
            <div class="_s_flex _s_flex-a-center _s_mr-3 _s_md-mt-none _s_mt-5">
              <BigCheckbox {...field} checked={field.value} form={filterForm.form} />
            </div>
          )}
        </Field>

        <div class="_s_flex _s_flex-a-center _s_md-mt-none _s_mt-5">
          <span class="_s_color-primary-8 _s_label _s_label-sm _s_mr-2">
            {t("_lang_verify_24_7")}
          </span>
        </div>
      </Form>
    </>
  );
};
