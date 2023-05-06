import { useLanguage } from "~/utils/language";
import { JSX, Show, createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import clickOutside from "~/utils/directives/clickOutside";

false && clickOutside;

type PopupItem = {
  name: string;
  element: () => JSX.Element;
};

const [popupQueue, setPopupQueue] = createSignal<PopupItem[]>([]);

const closePopup = () => {
  setPopupQueue((queue) => queue.slice(1));
};

export const showPopup = (item: PopupItem) => setPopupQueue((q) => [...q, item]);

export const Popup = () => {
  const [t] = useLanguage();

  return (
    <Show when={popupQueue()[0]}>
      {(item) => (
        <Portal>
          <div class="_s_position-fixed _s_position-l-px--0 _s_position-t-px--0 _s_size-w-percent--25 _s_size-h-percent--25 _s_color-rgba-bg-primary-0-0--8 _s_flex _s_flex-j-center  _s_flex-d-column _s_flex-a-center _s_z-9 _s_pl-3 _s_pr-3 _s_scroll _s_scroll-sm _s_overflow-y-auto">
            <div class="_s_b-radius-md _s_color-bg-primary-6 _s_size-w-max-px--90 _s_size-w-percent--25">
              <div
                class="_s_flex _s_flex-a-center _s_flex-j-between _s_size-w-percent--25 _s_p-4 _s_pr-5 
                _s_pl-5 _s_color-bg-primary-6 _s_bw-1 _s_bd-solid _s_bd-primary-7 _s_b-radius-tr-md _s_b-radius-tl-md"
                use:clickOutside={closePopup}
              >
                <div class="_s_size-w-percent--25 _s_b-radius-md _s_b-radius-tl-none _s_b-radius-tr-none _s_color-bg-primary-5">
                  <div class="_s_color-bg-primary-6 _s_flex _s_flex-a-center _s_flex-j-between _s_size-w-percent--25">
                    <span class="_s_label _s_label-t-u">{t(item().name)}</span>
                    <a
                      class="_s_icon _s_icon-sm _s_adj-close _s_m-none _s_cursor-pointer"
                      onClick={closePopup}
                    />
                  </div>
                </div>
              </div>
              <div class="_s_size-w-percent--25 _s_b-radius-md _s_b-radius-tl-none _s_b-radius-tr-none _s_color-bg-primary-5">
                <div class=" _s_color-bg-primary-6 _s_media-max-h-scroll">{item().element()}</div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </Show>
  );
};
