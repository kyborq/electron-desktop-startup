import { persist, createJSONStorage } from "zustand/middleware";
import { shared } from "use-broadcast-ts";
import { create } from "zustand";

interface Store {
  // ...
}

export const useAppStore = create(
  shared(
    persist<Store>(
      () => ({
        // ...
      }),
      {
        name: "config",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { name: "config-store" }
  )
);
