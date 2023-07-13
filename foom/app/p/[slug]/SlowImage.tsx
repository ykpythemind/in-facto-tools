"use client";

import { useEffect, useRef, useState } from "react";

export const SlowImage = ({ src, delay }: { src: string; delay: number }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const [loadingSection, setLoadingSection] = useState(0);
  const [curDelay, setCurDelay] = useState(delay);

  useEffect(() => {
    const t = setTimeout(() => {
      setWidth(ref.current?.clientWidth ?? 0);
      setHeight(ref.current?.clientHeight ?? 0);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (width !== 0 && height !== 0) {
        setLoadingSection((a) => a + 1);
      }
    }, curDelay);

    return () => {
      clearInterval(t);
    };
  }, [curDelay, width, height]);

  useEffect(() => {
    setCurDelay(() => delay * (Math.random() * 1 + 0.7));
  }, [loadingSection, delay]);

  const sectionHeight = height / 10;

  let currentHeight = sectionHeight * loadingSection;
  if (currentHeight > height) {
    currentHeight = height;
  }
  const blurHeight = height - currentHeight;

  return (
    <div className="relative">
      <div ref={ref} className="relative">
        <div
          className="absolute bottom-0 right-0 w-full"
          style={{ height: blurHeight, backgroundColor: "gray" }}
        ></div>
        <img
          src={src}
          className="w-full"
          style={{ opacity: height === 0 ? 0 : 1 }}
        />
      </div>
    </div>
  );
};
