export function useCategoriesData() {
  return useAsyncData<string[]>("categories", () => $fetch("/api/categories"), {
    default: () => [],
  });
}
