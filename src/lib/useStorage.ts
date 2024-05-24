import { useCallback, useEffect } from "react";
import useSWR from "swr";

type Key = "prompts";

export function useStorage<T = unknown>({
  key,
  storage = "local",
  validator,
}: {
  /** The key to be inserted into the storage.
   *
   * Should be unique across the app.
   */
  key: Key;
  storage?: "local" | "sync";
  validator: (value: unknown) => T;
}) {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate: baseMutate,
  } = useSWR(
    `chrome.storage.${storage}.${key}`,
    async (): Promise<T | undefined> => {
      const value = await chrome.storage[storage].get(key);
      return validator(value);
    },
  );

  const mutate = useCallback(async () => {
    await baseMutate();
  }, []);

  const setData = useCallback(async () => {
    await chrome.storage[storage].set({ [key]: data });
    await mutate();
  }, []);

  useEffect(() => {
    chrome.storage[storage].onChanged.addListener(mutate);
    return () => {
      chrome.storage[storage].onChanged.removeListener(mutate);
    };
  });

  return {
    data,
    setData,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
