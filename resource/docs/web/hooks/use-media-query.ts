"use client";
import { useState, useEffect, useRef } from "react";

export interface UseMediaQueryOptions {
  getInitialValueInEffect: boolean;
}

type MediaQueryCallback = (event: { matches: boolean; media: string }) => void;

function attachMediaListener(query: MediaQueryList, callback: MediaQueryCallback) {
  try {
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
  } catch (e) {
    console.log(e);
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}

function getInitialValue(query: string, initialValue?: boolean) {
  if (typeof initialValue === "boolean") {
    return initialValue;
  }

  if (typeof window !== "undefined" && "matchMedia" in window) {
    return window.matchMedia(query).matches;
  }

  return false;
}

export function useMediaQuery(
  query: string,
  initialValue?: boolean,
  { getInitialValueInEffect }: UseMediaQueryOptions = {
    getInitialValueInEffect: true
  }
) {
  const [matches, setMatches] = useState(getInitialValueInEffect ? initialValue : getInitialValue(query, initialValue));
  const queryRef = useRef<MediaQueryList>();

  useEffect(() => {
    if ("matchMedia" in window) {
      queryRef.current = window.matchMedia(query);
      setMatches(queryRef.current.matches);
      return attachMediaListener(queryRef.current, event => setMatches(event.matches));
    }

    return undefined;
  }, [query]);

  return matches;
}
