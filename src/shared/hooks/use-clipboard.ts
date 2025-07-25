import { useRef, useState } from "react";

import { useMount } from "ahooks";
import ClipboardJS from "clipboard";

const useClipboard = () => {
  const [copied, setCopied] = useState(false);
  const copyBtnRef = useRef<HTMLButtonElement | null>(null);

  useMount(() => {
    if (!copyBtnRef.current) return;
    const clipboard = new ClipboardJS(copyBtnRef.current);

    clipboard.on("success", () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });

    return () => {
      clipboard.destroy();
    };
  });

  const getProps = (id: string) => {
    const srcProps = {
      id,
    };
    const targetProps = {
      ref: copyBtnRef,
      "data-clipboard-target": `#${id}`,
    };
    return { srcProps, targetProps };
  };

  return { copied, getProps };
};

export { useClipboard };
