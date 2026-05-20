export const useSearch = () => useState<string>("search-query", () => "");

export const useDebouncedSearch = (delay = 150) => {
  const raw = useSearch();
  const debounced = useState<string>("search-query-debounced", () => "");

  if (import.meta.client) {
    let timer: ReturnType<typeof setTimeout>;
    watch(raw, (val) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        debounced.value = val;
      }, delay);
    });
  }

  return debounced;
};
