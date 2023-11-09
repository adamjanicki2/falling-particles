import { useCallback, useEffect, useState } from "react";
import { getHTMLElementSize } from "./util";

export const useElementSize = (ref: React.RefObject<HTMLElement>) => {
  const [size, setSize] = useState(getHTMLElementSize(ref.current));

  const handleResize = useCallback(() => {
    const element = ref.current;
    if (element) {
      setSize(getHTMLElementSize(element));
    }
  }, [ref, setSize]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return size;
};
