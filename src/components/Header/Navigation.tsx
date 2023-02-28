import { useI18n } from '@solid-primitives/i18n';
import { createResource, For } from 'solid-js'
import { A } from 'solid-start';

const getNav = async () => (await fetch("https://newstatic.adjarabet.com/static/menuListTurboKa.json?v=1677574185")).json();

export const Navigation = () => {
  const [items] = createResource(getNav);
  const [t] = useI18n();

  return <div class="_s_color-bg-primary-7 _s_display-b _s_position-l-percent--0 _s_position-t-percent--25 _s_size-w-percent--25 _s_position-absolute">
    <div class="_s_container _s_flex _s_flex-a-center _s_size-h-percent--25 _s_size-w-percent--25">
      <For each={items()?.list}>
        {(item) => <A href={`/${item.route}`} class={`_s_flex _s_flex-a-center _s_ml-2 _s_mr-2 _s_position-relative _s_size-h-min-px--10 _s_size-h-percent--25 ${item.className}`}>
          <span class="_s_label _s_label-t-u _s_white-space-nowrap _s_color-primary-1">{t(item.title.langId)}</span>
        </A>}
      </For>
    </div>
  </div>
}