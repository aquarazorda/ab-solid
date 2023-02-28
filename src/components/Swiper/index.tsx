import { JSX } from 'solid-js';
import { Dynamic, mergeProps } from 'solid-js/web';

interface ContainerInput extends JSX.HTMLAttributes<HTMLDivElement> {
  autoplay?: boolean
};

interface SlideInput extends JSX.HTMLAttributes<HTMLDivElement> {
  lazy?: boolean;
};

export const SwiperContainer = (props: ContainerInput) => Dynamic(mergeProps({ component: 'swiper-container'}, props));
export const SwiperSlide = (props: SlideInput) => Dynamic(mergeProps({ component: 'swiper-slide'}, props));