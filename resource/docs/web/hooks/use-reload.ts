"use client";
import { useCallback, useEffect, useState } from "react";

export function useReload() {
  const [loading, onLoading] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const handleBeforeUnload = () => onLoading(true);
    const handleLoad = () => onLoading(false);

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const onReload = useCallback(() => {
    setKey(prev => prev + 1);
  }, []);

  const onReloadWindow = useCallback(<T = Element, E = MouseEvent>(e?: React.MouseEvent<T, E>) => {
    window.location.reload();
    e?.preventDefault();
  }, []);

  return { loading, onLoading, key, onReload, onReloadWindow };
}
