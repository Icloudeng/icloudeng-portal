import AutoplayPlugin from 'embla-carousel-autoplay';
import FadePlugin from 'embla-carousel-fade';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

type Params = {
  startIndex?: number;
  autoplay?: boolean;
  loop?: boolean;
  fade?: boolean;
};

export const useCustomerEmblaCarousel = ({
  startIndex = 0,
  autoplay,
  loop,
  fade,
}: Params = {}) => {
  const [viewportRef, embla] = useEmblaCarousel(
    { loop: loop || autoplay, startIndex },
    [
      ...(fade ? [FadePlugin()] : []),
      ...(autoplay ? [AutoplayPlugin({ playOnInit: true, delay: 5000 })] : []),
    ]
  );

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index: number) => embla && embla.scrollTo(index),
    [embla]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
    setScrollSnaps(embla.scrollSnapList() as any);

    return () => {
      embla.off('select', onSelect);
    };
  }, [embla, setScrollSnaps, onSelect]);

  return {
    viewportRef,
    scrollPrev,
    scrollNext,
    prevBtnEnabled,
    nextBtnEnabled,
    selectedIndex,
    scrollSnaps,
    scrollTo,
  };
};
