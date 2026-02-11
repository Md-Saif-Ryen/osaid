

"use client";

import { useEffect, useState } from "react";
import DesktopHome from "../components/DesktopHome";
import MobileHome from "../components/MobileHome";

export default function HomePage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop ? <DesktopHome /> : <MobileHome />;
}
