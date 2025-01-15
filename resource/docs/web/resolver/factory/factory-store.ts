import { GetStylesApiOptions } from "./factory-types";
import { useSyncExternalStore } from "react";

export type StoreSubscriber<Value> = (value: Value) => void;
type SetStateCallback<Value> = (value: Value) => Value;

export interface StoreValue<Value> {
  getState(): Value;
  setState(value: Value | SetStateCallback<Value>): void;
  updateState(value: Value | SetStateCallback<Value>): void;
  initialize(value: Value): void;
  subscribe(callback: StoreSubscriber<Value>): () => void;
}

export type StoreValues<Store extends StoreValue<any>> = ReturnType<
  Store["getState"]
>;

export function createStore<Value extends Record<string, any>>(
  initialState: Value
): StoreValue<Value> {
  let state = initialState;
  let initialized = false;
  const listeners = new Set<StoreSubscriber<Value>>();

  return {
    getState() {
      return state;
    },

    updateState(value) {
      state = typeof value === "function" ? value(state) : value;
    },

    setState(value) {
      this.updateState(value);
      listeners.forEach(listener => listener(state));
    },

    initialize(value) {
      if (!initialized) {
        state = value;
        initialized = true;
      }
    },

    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    }
  };
}

export function useStore<Store extends StoreValue<any>>(store: Store) {
  return useSyncExternalStore<StoreValues<Store>>(
    store.subscribe,
    () => store.getState(),
    () => store.getState()
  );
}

export function clamp(
  value: number,
  min: number | undefined,
  max: number | undefined
) {
  if (min === undefined && max === undefined) {
    return value;
  }
  if (min !== undefined && max === undefined) {
    return Math.max(value, min);
  }
  if (min === undefined && max !== undefined) {
    return Math.min(value, max);
  }

  return Math.min(Math.max(value, min!), max!);
}

export function camelToKebab(n: string): string {
  if (n === undefined) return "";
  return n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

interface SelectorOptions {
  selector: string;
  options?: GetStylesApiOptions;
}
export function getId({ selector, options }: SelectorOptions) {
  // const firstThreeChars = selector.slice(0, 3).toLowerCase();
  // const charCodeSum = firstThreeChars
  //   .split("")
  //   .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // const charIndex = charCodeSum % 26;
  // const alphabet = "abcdefghijklmnopqrstuvwxyz";
  // const number = "0123456789";
  // const char = alphabet.charAt(charIndex);
  // const numb = number.charAt(charIndex);
  const uniqueId = `${Math.floor(Math.random() * 1000)}`;

  return options?.id || `${camelToKebab(selector)}:-${uniqueId}`;
}

export function getAttrs({ selector }: { selector: string }) {
  return {
    "data-command": camelToKebab(selector)
  };
}
