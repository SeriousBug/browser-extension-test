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
  validator: (value: unknown) => T | Promise<T>;
}) {
  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate: baseMutate,
  } = useSWR(`chrome.storage.${storage}.${key}`, async () => {
    const value = await chrome.storage[storage].get(key);
    return await validator(value);
  });

  const mutate = useCallback(async () => {
    await baseMutate();
  }, [baseMutate]);

  const setData = useCallback(
    async (newValue: Awaited<T>) => {
      await chrome.storage[storage].set({ [key]: newValue });
      await mutate();
    },
    [key, mutate, storage],
  );

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
