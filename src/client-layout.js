"use client";
import { useEffect, useState } from "react";

import Menu from "@/components/Menu/Menu";

import { ReactLenis } from "lenis/react";

export default function ClientLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 1000px), (pointer: coarse)");
    const updateDeviceType = () => setIsMobile(mediaQuery.matches);

    updateDeviceType();
    mediaQuery.addEventListener("change", updateDeviceType);

    return () => mediaQuery.removeEventListener("change", updateDeviceType);
  }, []);

  const scrollSettings = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 1,
    infinite: false,
    lerp: 0.1,
    wheelMultiplier: 1,
    orientation: "vertical",
    smoothWheel: true,
    syncTouch: false,
  };

  if (isMobile) {
    return (
      <>
        <Menu />
        {children}
      </>
    );
  }

  return (
    <ReactLenis root options={scrollSettings}>
      <>
        <Menu />
      </>
      {children}
    </ReactLenis>
  );
}
