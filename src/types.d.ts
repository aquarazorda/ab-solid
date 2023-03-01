import { JSX } from 'solid-js';
import Swiper, { SwiperOptions } from 'swiper';

interface SwiperContainer extends SwiperOptions {
  children: JSX.Element,
  class?: string,
  ref?:  Swiper
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': SwiperContainer;
      'swiper-slide': any;
    }
  }
}