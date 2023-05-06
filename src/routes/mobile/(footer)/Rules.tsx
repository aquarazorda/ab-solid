import { useLanguage } from "~/utils/language";
import { For, Show } from "solid-js";
import { useRouteData, useSearchParams } from "solid-start";
import { createStaticResource } from "~/queries/static";

type RulesData = {
  list: {
    value: string;
    desc: string;
  }[];
};

type RuleData = {
  list: {
    title: {
      valueString: string;
    };
  }[];
};

export const routeData = () => {
  const [searchParams] = useSearchParams();
  const [rules] = createStaticResource<RulesData>("rulesData", { lang: true });
  const [rule] = createStaticResource<RuleData>(
    () => rules()?.list[Number(searchParams?.rule)]?.value,
    { lang: true }
  );

  return { rules, rule };
};

const Rule = () => {
  const [t] = useLanguage();
  const { rules, rule } = useRouteData<typeof routeData>();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <span
        class="_s_label _s_label-md _s_mb-3"
        onClick={() =>
          setSearchParams({
            rule: undefined,
          })
        }
      >
        {"<"} {t("__lang_footer_rules")}
      </span>
      <div class="_s_flex">
        <div class="_s_color-primary-8 _s_flex _s_flex-wrap _s_label _s_label-xs _s_pt-4">
          <span class="_s_color-primary-1 _s_label-md">
            {t(`_lang_${rules()?.list[Number(searchParams?.rule)]?.value}`)}
          </span>
          <Show when={rule()?.list[0].title.valueString}>
            {/* eslint-disable-next-line */}
            {(html) => <div innerHTML={html()} />}
          </Show>
        </div>
      </div>
    </>
  );
};

export default function RulesMobile() {
  const [t] = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { rules } = useRouteData<typeof routeData>();

  return (
    <div class="_s_container">
      <div class="_s_flex _s_flex-a-start _s_mt-10 _s_mb-10 _s_flex-d-column _s_mt-none _s_pl-5 _s_pr-5">
        <div class="_s_col-12">
          <div class="_s_mb-3 _s_mt-5">
            <Show when={searchParams.rule !== undefined}>
              <Rule />
            </Show>
            <Show when={!searchParams.rule}>
              <span class="_s_label _s_label-md _s_mb-3">{t("__lang_footer_rules")}</span>
              <For each={rules()?.list}>
                {(item, idx) => (
                  <div
                    class="_s_size-w-percent--25 _s_mb-3 _s_bw-1 _s_b-solid _s_b-radius-md _s_b-primary-7 
                  _s_pl-6 _s_pr-3 _s_pt-4 _s_pb-4 _s_cursor-pointer"
                    onClick={() => setSearchParams({ rule: idx() })}
                  >
                    <div class="_s_flex _s_flex-a-center _s_size-w-percent--25 _s_flex-j-between _s_cursor-pointer">
                      <span class="_s_label _s_color-primary-8 _s_aitem-color-primary-1 _s_label-sm _s_label-font-setting-case-on">
                        {t(`_lang_${item.value}`)}
                      </span>
                    </div>
                  </div>
                )}
              </For>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
}
