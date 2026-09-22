import type { Business } from "~/types/business";

export function useBusinessesData() {
  return useAsyncData<Business[]>("businesses", () => $fetch("/api/businesses"), {
    default: () => [],
  });
}
