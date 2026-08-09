"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { finishNavigationTransition } from "./navigationTransition";

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(finishNavigationTransition);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return <div className="route-transition" key={pathname}>{children}</div>;
}
