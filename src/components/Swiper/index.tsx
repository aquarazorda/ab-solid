import { JSX, mergeProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

interface ContainerInput extends JSX.HTMLAttributes<HTMLDivElement> {
  autoplay?: boolean,
  'slides-per-view'?: string | 'auto',
  'space-between'?: number,
  'slides-per-group'?: number,
  'slides-per-group-auto'?: boolean
  loop?: boolean,
  'free-mode'?: boolean,
  initial?: number,
  'watch-overflow'?: boolean
}

interface SlideInput extends JSX.HTMLAttributes<HTMLDivElement> {
  lazy?: boolean;
}

export const SwiperContainer = (props: ContainerInput) => Dynamic(mergeProps({ component: 'swiper-container'}, props));
export const SwiperSlide = (props: SlideInput) => Dynamic(mergeProps({ component: 'swiper-slide'}, props));