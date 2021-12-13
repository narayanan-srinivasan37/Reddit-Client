import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  const { pathname } = useLocation();
  const prevLocation = useRef();
  useEffect(() => {
    if (pathname != prevLocation) {
      prevLocation.current = pathname;
      window.scroll(0, 0);
    }
  }, [pathname]);

  return props.children;
};

export default ScrollToTop;
